<template>
  <LoadingBase v-if="adminStore.loading" />
  <div v-else>
    <div class="mt-2">
      <Input class="w-3/12" v-model="adminStore.search" placeholder="Buscar" />
    </div>
    <TableBase :items="adminStore.filter" :columns="columns" :options="options" @action="action" />
  </div>
</template>
<script setup lang="ts">
import TableBase from '@/commun/me/TableBase.vue'
import Input from '@/commun/ui/input/Input.vue'
import LoadingBase from '@/commun/me/LoadingBase.vue'
import { useAdminStore } from '@/stores/admin.stores'
import { useToast } from 'vue-toastification'
import { inject } from 'vue'
import { useRouter } from 'vue-router'
const adminStore = useAdminStore()
const toast = useToast()
const swal = inject('$swal')
const router = useRouter()
const columns = [
  { title: 'id', key: 'id' },
  { title: 'Nombre', key: 'firstName' },
  { title: 'Apellido', key: 'lastName' },
  { title: 'Fecha', key: 'birthday', type: 'date' },
  { title: 'CI', key: 'ci' },
  { title: 'email', key: 'email' },
  { title: 'Activo', key: 'isActive', type: 'boolean' },
  { title: 'Ultimo Acceso', key: 'lastLogin', type: 'dateTime' }
]
const options = [
  { id: 'edit', name: 'Editar', icon: 'fa-edit' },
  { id: 'delete', name: 'Deshabilitar', icon: 'fa-trash' }
]
try {
  adminStore.getAdmins()
} catch (error) {
  toast.error('Error al cargar los administradores')
}

const action = (data) => {
  if (data.action === 'edit') {
    router.push({ name: 'admin-edit', query: { id: data.id } })
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
        adminStore.deleteAdmin(data.id)
        adminStore.getAdmins()
      }
    })
  }
}
</script>
