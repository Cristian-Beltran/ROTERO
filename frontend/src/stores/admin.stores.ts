import { defineStore } from 'pinia'
import { ref, reactive, computed } from 'vue'
import {
  getUserRequest,
  getUsersRequest,
  createUserRequest,
  updateUserRequest,
  deleteUserRequest
} from '@/services/user.services'
import { type User, PermissionLevel } from '@/interfaces/User.interfaces'

export const useAdminStore = defineStore('admin', () => {
  const admins = reactive<User[]>([])
  const admin = ref<User>()
  const search = ref('')
  const loading = ref(false)
  const filter = computed(() => {
    return admins.filter((data) => {
      return (
        data.firstName.toLowerCase().includes(search.value.toLowerCase()) ||
        data.lastName.toLowerCase().includes(search.value.toLowerCase()) ||
        data.ci.toLowerCase().includes(search.value.toLowerCase()) ||
        data.email.toLowerCase().includes(search.value.toLowerCase())
      )
    })
  })

  async function getAdmins(): Promise<void> {
    loading.value = true
    const { data } = await getUsersRequest(PermissionLevel.ADMINISTRADOR)
    admins.splice(0, admins.length, ...data)
    loading.value = false
  }
  async function getAdmin(id: number): Promise<void> {
    const { data } = await getUserRequest(id)
    admin.value = data
  }
  async function createAdmin(data: User): Promise<void> {
    await createUserRequest(data, PermissionLevel.ADMINISTRADOR)
  }
  async function updateAdmin(id: number, data: User): Promise<void> {
    await updateUserRequest(id, data)
  }
  async function deleteAdmin(id: number): Promise<void> {
    await deleteUserRequest(id)
  }
  return {
    filter,
    admin,
    search,
    loading,
    getAdmins,
    getAdmin,
    createAdmin,
    updateAdmin,
    deleteAdmin
  }
})
