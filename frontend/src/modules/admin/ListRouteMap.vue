<template>
  <LoadingBase v-if="routeStore.loading" />
  <div v-else>
    <div class="mt-2 flex gap-x-3">
      <Input class="w-3/12" v-model="routeStore.search" placeholder="Buscar" />
    </div>
    <TableBase
      :items="routeStore.filter"
      :columns="columns"
      :options="options"
      check="true"
      @action="action"
      @click="handleRowClick"
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
import { useRouteStore } from '@/stores/route.stores'
import { ref } from 'vue'

const routeStore = useRouteStore()
const toast = useToast()
const swal = inject('$swal')
const router = useRouter()
const columns = [
  { title: 'id', key: 'id' },
  { title: 'Punto de inicio', key: 'startText' },
  { title: 'Punto de fin', key: 'endText' },
  { title: 'Vehiculo', key: 'vehicleName' },
  { title: 'Placa', key: 'vehiclePlate' },
  { title: 'Operador', key: 'operatorName' },
  { title: 'Actualizdo por', key: 'userName' },
  { title: 'createdAt', key: 'createdAt', type: 'dateTime' }
]

const options = [
  { id: 'edit', name: 'Editar', icon: 'fa-edit' },
  { id: 'delete', name: 'Eliminar', icon: 'fa-trash' }
]

try {
  routeStore.getRoutes()
} catch (error) {
  toast.error('Error al cargar los operadores')
}
const action = (data) => {
  if (data.action === 'edit') {
    router.push({ name: 'route-edit', query: { id: data.id } })
  } else if (data.action === 'delete') {
    swal({
      title: '¿Estas seguro?',
      text: 'Eliminar orden de pago',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'Cancelar!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await routeStore.deleteRoute(data.id)
          await routeStore.getRoutes()
        } catch (error) {
          toast.error('La multa ya fue cancelada')
        }
      }
    })
  }
}
</script>
