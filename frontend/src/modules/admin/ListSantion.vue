<template>
  <LoadingBase v-if="santionStore.loading" />
  <div v-else>
    <div class="mt-2 flex gap-x-3">
      <Input class="w-3/12" v-model="santionStore.search" placeholder="Buscar" />
      <Input
        class="w-3/12"
        type="date"
        v-model="santionStore.initDate"
        placeholder="Fecha inicio"
      />
      <Input class="w-3/12" type="date" v-model="santionStore.endDate" placeholder="Fecha fin" />
    </div>
    <TableBase
      :items="santionStore.filter"
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
import { useSantionStore } from '@/stores/santion.stores'

const santionStore = useSantionStore()
const toast = useToast()
const swal = inject('$swal')
const router = useRouter()
const columns = [
  { title: 'id', key: 'id' },
  { title: 'Tipo de multa', key: 'typePayorderName' },
  { title: 'Monto (Bs)', key: 'amount' },
  { title: 'Extra (Bs)', key: 'amountExtra' },
  { title: 'Severidad', key: 'severity' },
  { title: 'Detalle', key: 'detail' },
  { title: 'Pagado', key: 'cancellation', type: 'boolean' },
  { title: 'Cancelado', key: 'cancellationDate', type: 'date' },
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
  santionStore.getSantions()
} catch (error) {
  toast.error('Error al cargar los operadores')
}
const action = (data) => {
  if (data.action === 'edit') {
    router.push({ name: 'santion-edit', query: { id: data.id } })
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
          await santionStore.deleteSantion(data.id)
          await santionStore.getSantions()
        } catch (error) {
          toast.error('La multa ya fue cancelada')
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
          await santionStore.cancelationSantion(data.id)
          await santionStore.getSantions()
        } catch (error) {
          console.log(error)
          toast.error('La multa ya fue cancelada')
        }
      }
    })
  } else if (data.action === 'print') {
    try {
      santionStore.getPayorderPdf(data.id)
    } catch (error) {
      toast.error('Error al generar el pdf')
    }
  }
}
</script>
