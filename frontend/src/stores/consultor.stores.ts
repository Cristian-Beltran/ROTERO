import { defineStore } from 'pinia'
import { ref, reactive, computed } from 'vue'
import {
  createUserRequest,
  deleteUserRequest,
  getUserRequest,
  getUsersRequest,
  updateUserRequest
} from '@/services/user.services'
import { type User, PermissionLevel } from '@/interfaces/User.interfaces'

export const useConsultorStore = defineStore('consultor', () => {
  const consultors = reactive<User[]>([])
  const consultor = ref<User>()
  const search = ref('')
  const loading = ref(false)
  const filter = computed(() => {
    return consultors.filter((data) => {
      return (
        data.firstName.toLowerCase().includes(search.value.toLowerCase()) ||
        data.lastName.toLowerCase().includes(search.value.toLowerCase()) ||
        data.ci.toLowerCase().includes(search.value.toLowerCase()) ||
        data.email.toLowerCase().includes(search.value.toLowerCase())
      )
    })
  })

  async function getUsers(): Promise<void> {
    loading.value = true
    const { data } = await getUsersRequest(PermissionLevel.CONSULTOR)
    const consultorsMap = data.map((consultor) => {
      return {
        ...consultor,
        roleName: consultor?.role?.name
      }
    })
    consultors.splice(0, consultors.length, ...consultorsMap)
    loading.value = false
  }
  async function getUser(id: number): Promise<void> {
    const { data } = await getUserRequest(id)
    consultor.value = data
  }
  async function createUser(data: User): Promise<void> {
    await createUserRequest(data, PermissionLevel.CONSULTOR)
  }
  async function updateUser(id: number, data: User): Promise<void> {
    await updateUserRequest(id, data)
  }
  async function deleteUser(id: number): Promise<void> {
    await deleteUserRequest(id)
  }
  return {
    filter,
    consultor,
    search,
    loading,
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
  }
})
