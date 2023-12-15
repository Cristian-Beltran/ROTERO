import { defineStore } from 'pinia'
import { ref, reactive, computed } from 'vue'
import {
  getRolesRequest,
  getRoleRequest,
  createRoleRequest,
  deleteRoleRequest,
  updateRoleRequest
} from '@/services/role.services'
import type { Role } from '@/interfaces/Roles.interfaces'

export const useRoleStore = defineStore('role', () => {
  const roles = reactive<Role[]>([])
  const role = ref<Role | null>(null)
  const search = ref('')
  const loading = ref(false)
  const filter = computed(() => {
    return roles.filter((data) => {
      // filter by firstName and lastName and ci, and email
      return (
        data.name.toLowerCase().includes(search.value.toLowerCase()) ||
        data.description.toLowerCase().includes(search.value.toLowerCase())
      )
    })
  })
  async function getRoles(): Promise<void> {
    loading.value = true
    const { data } = await getRolesRequest()
    const dataMap = data.map((role) => {
      return {
        ...role,
        userName: `${role.user?.firstName} ${role.user?.lastName}`
      }
    })
    roles.splice(0, roles.length, ...dataMap)
    loading.value = false
  }
  async function getRole(id: number): Promise<void> {
    const { data } = await getRoleRequest(id)
    role.value = data
  }
  async function createRole(role: Role): Promise<void> {
    await createRoleRequest(role)
  }
  async function updateRole(id: number, role: Role): Promise<void> {
    await updateRoleRequest(id, role)
  }
  async function deleteRole(id: number): Promise<void> {
    await deleteRoleRequest(id)
  }

  return {
    roles,
    role,
    search,
    loading,
    getRoles,
    getRole,
    createRole,
    updateRole,
    deleteRole,
    filter
  }
})
