<template>
  <LoadingBase v-if="roleStore.loading" />
  <div v-else>
    <div class="mt-2">
      <Input class="w-3/12" v-model="roleStore.search" placeholder="Buscar" />
    </div>
    <TableBase :items="roleStore.filter" :columns="columns" :options="options" @action="action" />
  </div>
</template>
<script setup lang="ts">
import TableBase from '@/commun/me/TableBase.vue'
import Input from '@/commun/ui/input/Input.vue'
import LoadingBase from '@/commun/me/LoadingBase.vue'
import { useRoleStore } from '@/stores/role.stores'
import { useToast } from 'vue-toastification'
import { inject } from 'vue'
import { useRouter } from 'vue-router'
const roleStore = useRoleStore()
const toast = useToast()
const swal = inject('$swal')
const router = useRouter()

const columns = [
  { title: 'id', key: 'id' },
  { title: 'name', key: 'name' },
  { title: 'description', key: 'description' },
  { title: 'Permiso Personal', key: 'pPersonal', type: 'boolean' },
  {
    title: 'Permiso de Operador',
    key: 'pOwner',
    type: 'boolean'
  },
  { title: 'Actualizado por', key: 'userName' },
  { title: 'Actualizado', key: 'updatedAt', type: 'date' },
  { title: 'Creado', key: 'createdAt', type: 'date' }
]
const options = [
  { id: 'edit', name: 'Editar', icon: 'fa-edit' },
  { id: 'delete', name: 'Eliminar', icon: 'fa-trash' }
]
try {
  roleStore.getRoles()
} catch (error) {
  toast.error('Error al cargar los administradores')
}

const action = (data) => {
  if (data.action === 'edit') {
    router.push({ name: 'role-edit', query: { id: data.id } })
  } else if (data.action === 'delete') {
    swal({
      title: '¿Estas seguro?',
      text: 'Deshabilitarás al administrador',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'Cancelar!'
    }).then((result) => {
      if (result.isConfirmed) {
        roleStore.deleteRole(data.id)
        roleStore.getRoles()
      }
    })
  }
}
</script>
