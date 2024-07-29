<template>
  <LoadingBase v-if="rosseteStore.loading" />
  <div v-else>
    <div class="mt-2 flex gap-x-3">
      <Input class="w-3/12" v-model="rosseteStore.search" placeholder="Buscar" />
    </div>
    <TableBase
      :items="rosseteStore.filter"
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
import { useRosseteStore } from '@/stores/rossete.stores'
const rosseteStore = useRosseteStore()

const toast = useToast()
const swal = inject('$swal')
const router = useRouter()
const columns = [
  { title: 'id', key: 'id' },
  { title: 'Operador', key: 'operatorName' },
  { title: 'Vehiculo', key: 'vehicleName' },
  { title: 'Estado', key: 'status'},
  { title: 'Servicio y tipo', key: 'vehicleType' },
  { title: 'Placa', key: 'vehiclePlate' },
  { title: 'Fecha de expiración', key: 'expiration' },
  { title: 'Actualizdo por', key: 'userName' },
  { title: 'createdAt', key: 'createdAt', type: 'dateTime' }
]

const options = [
  { id: 'edit', name: 'Editar', icon: 'fa-edit' },
  { id: 'delete', name: 'Eliminar', icon: 'fa-trash' },
  { id: 'print', name: 'Imprimir', icon: 'fa-file-pdf' }
]

try {
  rosseteStore.getRossetes()
} catch (error) {
  toast.error('Error al cargar los operadores')
}
const action = (data) => {
  if (data.action === 'edit') {
    router.push({ name: 'rossete-edit', query: { id: data.id } })
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
          await rosseteStore.deleteRossete(data.id)
          await rosseteStore.getRossetes()
        } catch (error) {
          toast.error('error')
        }
      }
    })
  } else if (data.action === 'print') {
    try {
      rosseteStore.getRossetePdf(data.id)
    } catch (error) {
      toast.error('Error al imprimir')
    }
  }
}
</script>
