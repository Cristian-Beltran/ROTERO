<template>
  <LoadingBase v-if="vehicleStore.loading" />
  <div v-else>
    <div class="mt-2">
      <Input class="w-3/12" v-model="vehicleStore.search" placeholder="Buscar" />
    </div>
    <TableBase
      :items="vehicleStore.filter"
      :columns="columns"
      :options="options"
      @action="action"
    />
  </div>
</template>
<script setup lang="ts">
import TableBase from '@/commun/me/TableBase.vue'
import Input from '@/commun/ui/input/Input.vue'
import LoadingBase from '@/commun/me/LoadingBase.vue'
import { useToast } from 'vue-toastification'
import { inject } from 'vue'
import { useRouter } from 'vue-router'
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import { useVehicleStore } from '@/stores/vehicle.stores'
const vehicleStore = useVehicleStore()
const toast = useToast()
const swal = inject('$swal')
const router = useRouter()
const route = useRoute()
const id = ref(route.params.id)
const columns = [
  { title: 'id', key: 'id' },
  { title: 'Placa', key: 'plate' },
  { title: 'Marca', key: 'brand' },
  { title: 'Modelo', key: 'model' },
  { title: 'Tipo', key: 'typeVehicle' },
  { title: 'Propietario', key: 'ownerName' },
  { title: 'Actualizado por', key: 'userName' },
  { title: 'Actualizado', key: 'updatedAt', type: 'date' },
  { title: 'Creado', key: 'createdAt', type: 'date' }
]
const options = [
  { id: 'edit', name: 'Editar', icon: 'fa-edit' },
  { id: 'delete', name: 'Eliminar', icon: 'fa-trash' },
  { id: 'print', name: 'Imprimir Certificado', icon: 'fa-print' }
]
try {
  vehicleStore.getVehicles(id.value)
} catch (error) {
  toast.error('Error al cargar los administradores')
}

const action = async (data) => {
  if (data.action === 'edit') {
    router.push({ name: 'vehicle-edit', query: { id: data.id }, params: { id: id.value } })
  } else if (data.action === 'delete') {
    swal({
      title: '¿Estas seguro?',
      text: 'Elminar al propietario',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'Cancelar!'
    }).then((result) => {
      if (result.isConfirmed) {
        vehicleStore.deleteVehicle(data.id)
        vehicleStore.getVehicles(id.value)
      }
    })
  } else if (data.action === 'print') {
    try {
      await vehicleStore.getCertifaction(data.id)
    } catch (error) {
      toast.error('Error al imprimir el certificado')
    }
  }
}
</script>
