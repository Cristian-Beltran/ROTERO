<template>
  <form action="" @submit="handleSubmit">
    <div class="mt-6 grid grid-cols-2 gap-x-4 gap-y-4">
      <div class="grid items-center">
        <Label for="expiration">Fecha de expiración</Label>
        <Input id="expiration" type="date" v-model="v$.expiration.$model" />
        <Error :errors="v$.expiration.$errors" />
      </div>
      <div>
        <Label for="operator">Operador</Label>
        <Select id="operator" v-model="v$.operatorId.$model">
          <SelectTrigger class="">
            <SelectValue placeholder="Selecione un operador" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Operadores</SelectLabel>
              <SelectItem
                v-for="operator in operatorStore.operators"
                :key="operator.id"
                :value="operator.id"
              >
                {{ operator.businessName }}
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Error :errors="v$.operatorId.$errors" />
      </div>
      <div class="grid items-center">
        <Label for="routeId">Ruta</Label>
        <Select id="routeId" v-model="v$.routeId.$model">
          <SelectTrigger class="">
            <SelectValue placeholder="Selecione una ruta" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Rutas</SelectLabel>
              <SelectItem
                v-for="route in routeStore.routes.filter(
                  (route) => route.vehicle.operator.id === formData.operatorId
                )"
                :key="route.id"
                :value="route.id"
              >
                {{ route.startText }} - {{ route.endText }} {{ route.vehicle.plate }}</SelectItem
              >
            </SelectGroup>
          </SelectContent>
        </Select>
        <Error :errors="v$.routeId.$errors" />
      </div>
      <div class="grid items-center">
        <Label for="status">Estado de la roseta</Label>
        <Select id="status" v-model="v$.status.$model">
          <SelectTrigger class="">
            <SelectValue placeholder="Selecione un estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Estados</SelectLabel>
              <SelectItem value="BAJA"> BAJA </SelectItem>
              <SelectItem value="DUPLICADO"> DUPLICADO</SelectItem>
              <SelectItem value="REIMPRESO"> REIMPRESO</SelectItem>
              <SelectItem value="REPOSICION"> REPOSICION</SelectItem>
              <SelectItem value="VIGENTE"> VIGENTE</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Error :errors="v$.routeId.$errors" />
      </div>
    </div>

    <div class="container mt-5" v-if="routeStore.route">
      <div class="grid grid-cols-2 md:grid-cols-2 gap-4">
        <!-- Columna izquierda -->
        <div>
          <div class="mb-4">
            <h3 class="text-lg font-bold mb-2">Información del Operador y propietario</h3>
            <div class="bg-gray-100 p-4 rounded shadow mt-4">
              <h2 class="text-xl font-bold mb-4">Información de la Ruta</h2>
              <p><strong>Punto de Inicio:</strong> {{ routeStore.route.startText }}</p>
              <p><strong>Punto de Destino:</strong> {{ routeStore.route.endText }}</p>
              <p><strong>Hora de Entrada:</strong> {{ routeStore.route.hourEntry }}</p>
              <p><strong>Hora de Salida:</strong> {{ routeStore.route.hourExit }}</p>
              <p><strong>Día de Entrada:</strong> {{ routeStore.route.dayEntry }}</p>
              <p><strong>Día de Salida:</strong> {{ routeStore.route.dayExit }}</p>
              <!-- Agrega más detalles de la ruta según sea necesario -->
            </div>

            <div class="bg-gray-100 p-4 rounded shadow mt-4">
              <h2 class="text-xl font-bold mb-4">Información del Vehículo</h2>
              <p>
                <strong>Tipo de Servicio:</strong>
                {{ routeStore.route.vehicle.typeService }}
              </p>
              <p><strong>Modalidad:</strong> {{ routeStore.route.vehicle.modality }}</p>
              <p><strong>Carga Máxima:</strong> {{ routeStore.route.vehicle.maxLoad }}</p>
              <p><strong>Pasajeros Máximos:</strong> {{ routeStore.route.vehicle.maxPass }}</p>
              <p>
                <strong>Tipo de Vehículo:</strong>
                {{ routeStore.route.vehicle.typeVehicle }}
              </p>
              <p><strong>Modelo:</strong> {{ routeStore.route.vehicle.model }}</p>
              <p><strong>Marca:</strong> {{ routeStore.route.vehicle.brand }}</p>
              <p><strong>Motor:</strong> {{ routeStore.route.vehicle.motor }}</p>
              <p><strong>Chasis:</strong> {{ routeStore.route.vehicle.chassis }}</p>
              <p><strong>SOAT:</strong> {{ routeStore.route.vehicle.soat }}</p>
              <p><strong>Placa:</strong> {{ routeStore.route.vehicle.plate }}</p>
              <!-- Agrega más detalles del vehículo según sea necesario -->
            </div>

            <div class="bg-gray-100 p-4 rounded shadow mt-4">
              <h2 class="text-xl font-bold mb-4">Información del Operador</h2>
              <p>
                <strong>Razon social:</strong>
                {{ routeStore.route.vehicle.operator.businessName }}
              </p>
              <p>
                <strong>Representante Legal:</strong>
                {{ routeStore.route.vehicle.operator.legalRepresentative }}
              </p>
              <p>
                <strong>Propietario:</strong>
                {{ routeStore.route.vehicle.operator.owner }}
              </p>
              <p><strong>NIT:</strong> {{ routeStore.route.vehicle.operator.nit }}</p>
              <p>
                <strong>Resolución Administrativa:</strong>
                <a
                  class="text-blue-600"
                  :href="routeStore.route.vehicle.operator.administrativeResolution"
                >
                  Ver</a
                >
              </p>
              <p>
                <strong>Fecha de Resolución:</strong>
                {{ routeStore.route.vehicle.operator.dateRa }}
              </p>
              <p>
                <strong>Número Técnico:</strong>
                {{ routeStore.route.vehicle.operator.tecnicalNumber }}
              </p>
              <p>
                <strong>Número Legal:</strong>
                {{ routeStore.route.vehicle.operator.legalNumber }}
              </p>
              <p>
                <strong>Observaciones:</strong>
                {{ routeStore.route.vehicle.operator.observations }}
              </p>
              <p><strong>Estado:</strong> {{ routeStore.route.vehicle.operator.state }}</p>
              <p><strong>Validez:</strong> {{ routeStore.route.vehicle.operator.validity }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="flex justify-between mt-4">
      <router-link to="/rossete">
        <Button type="button" variant="destructive"
          ><v-icon name="fa-times" class="mr-2" />Salir</Button
        >
      </router-link>
      <Button class=""><v-icon name="fa-save" type="submit" />Guardar</Button>
    </div>
  </form>
</template>
<script setup lang="ts">
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/commun/ui/select'
import Input from '@/commun/ui/input/Input.vue'
import Label from '@/commun/ui/label/Label.vue'
import Error from '@/commun/me/ErrorBase.vue'
import Button from '@/commun/ui/button/Button.vue'
import { useVuelidate } from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'
import { reactive, computed, onMounted, watch } from 'vue'
import { useToast } from 'vue-toastification'
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'
import { useRosseteStore } from '@/stores/rossete.stores'
import { useRouteStore } from '@/stores/route.stores'
import { useOperatorStore } from '@/stores/operator.stores'

const operatorStore = useOperatorStore()
const routeStore = useRouteStore()
const rosseteStore = useRosseteStore()
const toast = useToast()
const route = useRoute()
const router = useRouter()
const formData = reactive({
  expiration: '',
  routeId: '',
  operatorId: '',
  status: ''
})

const rules = computed(() => ({
  operatorId: { required: helpers.withMessage('Operador es requerido', required) },
  expiration: { required: helpers.withMessage('Fecha de expiración es requerida', required) },
  routeId: { required: helpers.withMessage('Ruta es requerida', required) },
  status: { required: helpers.withMessage('Status es requerido', required) }
}))

const v$ = useVuelidate(rules, formData)

try {
  operatorStore.getOperators()
} catch (error) {
  toast.error('Error al cargar los operadores')
}
try {
  routeStore.getRoutes()
} catch (error) {
  toast.error('Error al cargar las rutas')
}

watch(
  () => formData.routeId,
  (routeId) => {
    if (routeId) {
      routeStore.getRoute(routeId)
    }
  }
)

async function handleSubmit(e) {
  if (e) e.preventDefault()
  const isFormCorrect = await v$.value.$validate()
  if (isFormCorrect) {
    const data = {
      expiration: formData.expiration,
      routeId: formData.routeId,
      status: formData.status
    }
    try {
      if (!route.query.id) await rosseteStore.createRossete(data)
      else await rosseteStore.updateRossete(route.query.id, data)
      toast.success('Rol guardado con éxito')
      router.push({ name: 'rossete' })
    } catch (error) {
      toast.error(error?.response?.data?.message)
    }
  }
}

onMounted(async () => {
  if (route.query.id) {
    try {
      await rosseteStore.getRossete(route.query.id)
      formData.expiration = rosseteStore.rosette?.expiration
      formData.routeId = rosseteStore.rosette?.route.id
      formData.operatorId = rosseteStore.rosette?.route.vehicle.operator.id
      formData.status = rosseteStore.rosette?.status
      routeStore.getRoute(formData.routeId)
    } catch (error) {
      console.log(error)
      toast.error(error?.response.data.errors[0])
    }
  }
})
</script>
