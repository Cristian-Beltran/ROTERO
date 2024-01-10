<template>
  <LoadingBase v-if="classVehicleStore.loading" />
  <div v-else>
    <div class="mt-2">
      <Input class="w-3/12" v-model="classVehicleStore.search" placeholder="Buscar" />
    </div>
    <TableBase
      :items="classVehicleStore.filter"
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
import { useClassVehicleStore } from '@/stores/classVehicle.stores'
import { useToast } from 'vue-toastification'
import { inject } from 'vue'
import { useRouter } from 'vue-router'
const toast = useToast()
const swal = inject('$swal')
const router = useRouter()
const classVehicleStore = useClassVehicleStore()

const columns = [
  { title: 'id', key: 'id' },
  { title: 'Nombre', key: 'name' },
  { title: 'Description', key: 'description' },
  { title: 'Actualizado por', key: 'userName' },
  { title: 'Actualizado', key: 'updatedAt', type: 'date' },
  { title: 'Creado', key: 'createdAt', type: 'date' }
]

const options = [
  { id: 'edit', name: 'Editar', icon: 'fa-edit' },
  { id: 'delete', name: 'Eliminar', icon: 'fa-trash' }
]
try {
  classVehicleStore.getClassVehicles()
} catch (error) {
  toast.error('Error al cargar las clases de vehiculos')
}

const action = (data) => {
  if (data.action === 'edit') {
    router.push({ name: 'class-vehicle-edit', query: { id: data.id } })
  } else if (data.action === 'delete') {
    swal({
      title: '¿Estas seguro?',
      text: 'Eliminar Clase de vehiculo',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'Cancelar!'
    }).then((result) => {
      if (result.isConfirmed) {
        classVehicleStore.deleteClassVehicle(data.id)
        classVehicleStore.getClassVehicles()
      }
    })
  }
}
</script>
