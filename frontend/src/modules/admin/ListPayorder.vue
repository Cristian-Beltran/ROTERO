<template>
  <LoadingBase v-if="payorderStore.loading" />
  <div v-else>
    <div class="mt-2 flex gap-x-3">
      <Input class="w-3/12" v-model="payorderStore.search" placeholder="Buscar" />
      <Input
        class="w-3/12"
        type="date"
        v-model="payorderStore.initDate"
        placeholder="Fecha inicio"
      />
      <Input class="w-3/12" type="date" v-model="payorderStore.endDate" placeholder="Fecha fin" />
    </div>
    <TableBase
      :items="payorderStore.filter"
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
import { usePayorderStore } from '@/stores/payorder.stores'

const payorderStore = usePayorderStore()
const toast = useToast()
const swal = inject('$swal')
const router = useRouter()
const columns = [
  { title: 'id', key: 'id' },
  { title: 'Razon', key: 'reason' },
  { title: 'Monto (Bs)', key: 'total' },
  { title: 'Extra (Bs)', key: 'amountExtra' },
  { title: 'Detalle', key: 'detail' },
  { title: 'Pagado', key: 'cancellation', type: 'boolean' },
  { title: 'Fecha de pago', key: 'cancellationDate', type: 'date' },
  { title: 'NIT', key: 'nit' },
  { title: 'Operador', key: 'operatorName' },
  { title: 'Actualizdo por', key: 'userName' },
  { title: 'createdAt', key: 'createdAt', type: 'dateTime' }
]

const options = [
  { id: 'edit', name: 'Editar', icon: 'fa-edit' },
  { id: 'delete', name: 'Eliminar', icon: 'fa-trash' },
  { id: 'cancell', name: 'Pagado', icon: 'fa-dollar-sign' },
  { id: 'print', name: 'Imprimir', icon: 'fa-file-pdf' }
]

try {
  payorderStore.getPayorders()
} catch (error) {
  toast.error('Error al cargar los operadores')
}
const action = (data) => {
  if (data.action === 'edit') {
    router.push({ name: 'payorder-edit', query: { id: data.id } })
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
          await payorderStore.deletePayorder(data.id)
          await payorderStore.getPayorders()
        } catch (error) {
          toast.error('La orden de pago ya fue cancelada')
        }
      }
    })
  } else if (data.action === 'cancell') {
    swal({
      title: '¿Estas seguro?',
      text: 'Marcar como pagado',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'Cancelar!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await payorderStore.cancelationPayorder(data.id)
          await payorderStore.getPayorders()
        } catch (error) {
          toast.error('La orden de pago ya fue cancelada')
        }
      }
    })
  } else if (data.action === 'print') {
    try {
      payorderStore.getPayorderPdf(data.id)
    } catch (error) {
      toast.error('Error al descargar')
    }
  }
}
</script>
