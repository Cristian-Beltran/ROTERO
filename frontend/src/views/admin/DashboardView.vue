<template>
  <div class="space-y-2">
    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium"> Operadores</CardTitle>
          <v-icon name="fa-user-tie" class="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent v-if="operators">
          <div class="text-2xl font-bold">{{ operators.length }}</div>
          <p class="text-xs text-muted-foreground">Numero total de operadores registrados</p>
        </CardContent>
        <CardContent v-else>
          <LoadBase />
        </CardContent>
      </Card>
      <Card>
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium"> Vehiculos </CardTitle>
          <v-icon name="fa-car" class="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent v-if="vehicles">
          <div class="text-2xl font-bold">
            {{
              vehicles.reduce((acc, item) => {
                return acc + parseInt(item.count)
              }, 0)
            }}
          </div>
          <p class="text-xs text-muted-foreground">Vehiculos totales registrados</p>
        </CardContent>
        <CardContent v-else>
          <LoadBase />
        </CardContent>
      </Card>
      <Card>
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium"> Usuarios</CardTitle>
          <v-icon name="fa-shopping-cart" class="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent v-if="adminStore.filter">
          <div class="text-2xl font-bold">{{ adminStore.filter.length }}</div>
          <p class="text-xs text-muted-foreground">Numero total de usuarios del sistema</p>
        </CardContent>
        <CardContent v-else>
          <LoadBase />
        </CardContent>
      </Card>
    </div>
    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
      <Card class="col-span-5">
        <CardHeader>
          <CardTitle> Clases de vehiculos</CardTitle>
        </CardHeader>
        <CardContent v-if="loadVehicle" class="pl-2">
          <Bar :data="vehiclesChart" :options="options"
        /></CardContent>
        <CardContent v-else>
          <LoadBase />
        </CardContent>
      </Card>
      <Card class="col-span-2">
        <CardHeader>
          <CardTitle>Operadores</CardTitle>
          <CardDescription> Afiliados de operadores. </CardDescription>
        </CardHeader>
        <CardContent v-if="loadOperator">
          <Pie :data="operatorsChart" :options="options" />
        </CardContent>
        <CardContent v-else>
          <LoadBase />
        </CardContent>
      </Card>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Pie } from 'vue-chartjs'
import {
  Chart as ChartJS,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'
import { Bar } from 'vue-chartjs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/commun/ui/card'
import { useVehicleStore } from '@/stores/vehicle.stores'
import { useOperatorStore } from '@/stores/operator.stores'
import { useAdminStore } from '@/stores/admin.stores'
import { ref } from 'vue'
import { useToast } from 'vue-toastification'
import LoadBase from '@/commun/me/LoadingBase.vue'
const loadOperator = ref(false)
const loadVehicle = ref(false)
const toast = useToast()
const vehicleStore = useVehicleStore()
const operatorStore = useOperatorStore()
const adminStore = useAdminStore()

ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)
try {
  adminStore.getAdmins()
} catch (error) {
  toast.error('Error al cargar los usuarios')
}
const vehicles = ref([])
const operators = ref([])
const vehiclesChart = ref(null)
const operatorsChart = ref(null)
const loadVehicles = async () => {
  loadVehicle.value = false
  vehicles.value = await vehicleStore.getVehicleForClass()

  vehiclesChart.value = {
    labels: ['Vehiculos registrados'],
    datasets: vehicles.value.map((item) => {
      return {
        label: item.className,
        backgroundColor: generateColor(item.className),
        data: item.count
      }
    })
  }
  loadVehicle.value = true
}

const loadOperators = async () => {
  loadOperator.value = false
  const data = await operatorStore.getTotalAffiliate()
  operators.value = data.map((item) => {
    return {
      businessName: item.businessName,
      total: parseInt(item.driverCount) + parseInt(item.ownerCount)
    }
  })
  operatorsChart.value = {
    labels: operators.value.map((item) => item.businessName),
    datasets: [
      {
        data: operators.value.map((item) => item.total),
        backgroundColor: operators.value.map((item) => generateColor(item.businessName))
      }
    ]
  }
  loadOperator.value = true
}
const generateColor = (text: string) => {
  let hash = 0
  for (let i = 0; i < text.length; i++) {
    hash = text.charCodeAt(i) + ((hash << 5) - hash)
  }
  const c = (hash & 0x00ffffff).toString(16).toUpperCase()
  return '#' + '00000'.substring(0, 6 - c.length) + c
}
const options = {
  responsive: true
}
loadOperators()
loadVehicles()
</script>
