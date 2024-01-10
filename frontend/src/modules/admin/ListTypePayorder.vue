<template>
  <LoadingBase v-if="typePayorderStore.loading" />
  <div v-else>
    <div class="mt-2">
      <Input class="w-3/12" v-model="typePayorderStore.search" placeholder="Buscar" />
    </div>
    <TableBase
      :items="typePayorderStore.filter"
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
import { useTypePayorderStore } from '@/stores/typePayorder.stores'
import { useToast } from 'vue-toastification'
import { inject } from 'vue'
import { useRouter } from 'vue-router'
const toast = useToast()
const swal = inject('$swal')
const router = useRouter()
const typePayorderStore = useTypePayorderStore()

const columns = [
  { title: 'id', key: 'id' },
  { title: 'Nombre', key: 'name' },
  { title: 'Detalle', key: 'detail' },
  { title: 'Monto (Bs)', key: 'amount' },
  { title: 'Actualizado por', key: 'userName' },
  { title: 'Actualizado', key: 'updatedAt', type: 'date' },
  { title: 'Creado', key: 'createdAt', type: 'date' }
]

const options = [
  { id: 'edit', name: 'Editar', icon: 'fa-edit' },
  { id: 'delete', name: 'Eliminar', icon: 'fa-trash' }
]
try {
  typePayorderStore.getTypePayorders()
} catch (error) {
  toast.error('Error al cargar los tipos de pagos')
}

const action = (data) => {
  if (data.action === 'edit') {
    router.push({ name: 'type-order-edit', query: { id: data.id } })
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
    }).then(async (result) => {
      if (result.isConfirmed) {
        await typePayorderStore.deleteTypePayorder(data.id)
        await typePayorderStore.getTypePayorders()
      }
    })
  }
}
</script>
