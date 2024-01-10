<template>
  <LoadingBase v-if="operatorStore.loading" />
  <div v-else>
    <div class="mt-2">
      <Input class="w-3/12" v-model="operatorStore.search" placeholder="Buscar" />
    </div>
    <TableBase
      :items="operatorStore.filter"
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
import { useOperatorStore } from '@/stores/operator.stores'

const operatorStore = useOperatorStore()
const toast = useToast()
const swal = inject('$swal')
const router = useRouter()
const columns = [
  { title: 'id', key: 'id' },
  { title: 'Razon social', key: 'businessName' },
  { title: 'Representante legal', key: 'legalRepresentative' },
  { title: 'NIT', key: 'nit' },
  { title: 'Entidad Matriz', key: 'entityMatris'},
  { title: 'Estado', key: 'state' },
  { title: 'Administrador', key: 'operatorName' },
  { title: 'Actualizdo por', key: 'userName' },
  { title: 'createdAt', key: 'createdAt', type: 'dateTime' }
]

const options = [
  { id: 'edit', name: 'Editar', icon: 'fa-edit' },
  { id: 'delete', name: 'Deshabilitar', icon: 'fa-trash' },
  { id: 'view', name: 'Ver', icon: 'fa-eye' },
  { id: 'authorize', name: 'Autorizar', icon: 'fa-check' }
]

try {
  operatorStore.getOperators()
  console.log('operatorStore', operatorStore.operators)
} catch (error) {
  toast.error('Error al cargar los operadores')
}
const action = (data) => {
  if (data.action === 'edit') {
    router.push({ name: 'operator-edit', query: { id: data.id } })
  } else if (data.action === 'delete') {
    swal({
      title: '¿Estas seguro?',
      text: 'Dar de baja al operador',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'Cancelar!'
    }).then((result) => {
      if (result.isConfirmed) {
        operatorStore.deleteOperator(data.id)
        operatorStore.getOperators()
      }
    })
  } else if (data.action === 'view') {
    router.push({ name: 'operator-info', params: { id: data.id } })
  } else if (data.action === 'authorize') {
    swal({
      title: '¿Estas seguro?',
      text: 'Autorizar al operador',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'Cancelar!'
    }).then((result) => {
      if (result.isConfirmed) {
        operatorStore.authorizeOperator(data.id)
        operatorStore.getOperators()
      }
    })
  }
}
</script>
