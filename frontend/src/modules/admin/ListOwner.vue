<template>
  <LoadingBase v-if="ownerStore.loading" />
  <div v-else>
    <div class="mt-2">
      <Input class="w-3/12" v-model="ownerStore.search" placeholder="Buscar" />
    </div>
    <TableBase :items="ownerStore.filter" :columns="columns" :options="options" @action="action" />
  </div>
</template>
<script setup lang="ts">
import TableBase from '@/commun/me/TableBase.vue'
import Input from '@/commun/ui/input/Input.vue'
import LoadingBase from '@/commun/me/LoadingBase.vue'
import { useOwnerStore } from '@/stores/owner.stores'
import { useToast } from 'vue-toastification'
import { inject } from 'vue'
import { useRouter } from 'vue-router'
import { useRoute } from 'vue-router'
import { ref } from 'vue'
const ownerStore = useOwnerStore()
const toast = useToast()
const swal = inject('$swal')
const router = useRouter()
const route = useRoute()
const id = ref(route.params.id)
const columns = [
  { title: 'id', key: 'id' },
  { title: 'Nombre', key: 'firstName' },
  { title: 'Apellido', key: 'lastName' },
  { title: 'CI', key: 'ci' },
  { title: 'Celular', key: 'cellphone' },
  { title: 'Actualizado por', key: 'userName' },
  { title: 'Actualizado', key: 'updatedAt', type: 'date' },
  { title: 'Creado', key: 'createdAt', type: 'date' }
]
const options = [
  { id: 'edit', name: 'Editar', icon: 'fa-edit' },
  { id: 'delete', name: 'Eliminar', icon: 'fa-trash' }
]
try {
  ownerStore.getOwners(id.value)
} catch (error) {
  toast.error('Error al cargar los administradores')
}

const action = (data) => {
  if (data.action === 'edit') {
    router.push({ name: 'owner-edit', query: { id: data.id }, params: { id: id.value } })
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
        ownerStore.deleteOwner(data.id)
        ownerStore.getOwners(id.value)
      }
    })
  }
}
</script>
