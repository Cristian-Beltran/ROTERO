import { defineStore } from 'pinia'
import { ref, reactive, computed } from 'vue'
import type { Owner } from '@/interfaces/Owner.interface'
import {
  getOwnerRequest,
  getOwnersRequest,
  createOwnerRequest,
  updateOwnerRequest,
  deleteOwnerRequest
} from '@/services/owner.services'

export const useOwnerStore = defineStore('owner', () => {
  const owners = reactive<Owner[]>([])
  const owner = ref<Owner | null>(null)
  const search = ref('')
  const loading = ref(false)
  const filter = computed(() => {
    return owners.filter((data) => {
      return (
        data.firstName?.toLowerCase().includes(search.value.toLowerCase()) ||
        data.lastName?.toLowerCase().includes(search.value.toLowerCase()) ||
        data.ci?.toLowerCase().includes(search.value.toLowerCase()) 
      )
    })
  })
  async function getOwners(id: number): Promise<void> {
    loading.value = true
    const { data } = await getOwnersRequest(id)
    const dataMap = data.map((item) => {
      return {
        ...item,
        userName: `${item?.user?.firstName} ${item.user?.lastName}`
      }
    })
    owners.splice(0, owners.length, ...dataMap)
    loading.value = false
  }
  async function getOwner(id: number): Promise<void> {
    const { data } = await getOwnerRequest(id)
    owner.value = data
  }
  async function createOwner(data: any) {
    return await createOwnerRequest(data)
  }
  async function updateOwner(id: number, data: any) {
    return await updateOwnerRequest(id, data)
  }
  async function deleteOwner(id: number) {
    return await deleteOwnerRequest(id)
  }
  return {
    owners,
    owner,
    search,
    loading,
    filter,
    getOwners,
    getOwner,
    createOwner,
    updateOwner,
    deleteOwner
  }
})
