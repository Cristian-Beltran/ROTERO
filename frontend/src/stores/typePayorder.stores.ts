import { defineStore } from 'pinia'
import {
  getTypePayordersRequest,
  getTypePayorderRequest,
  createTypePayorderRequest,
  updateTypePayorderRequest,
  deleteTypePayorderRequest
} from '@/services/typePayorder.services'
import { ref, reactive, computed } from 'vue'
import type { TypePayorder } from '@/interfaces/TypePayorder.interfaces'

export const useTypePayorderStore = defineStore('typePayorder', () => {
  const typePayorders = reactive<TypePayorder[]>([])
  const typePayorder = ref<TypePayorder>()
  const search = ref('')
  const loading = ref(false)
  const filter = computed(() => {
    return typePayorders.filter((data) => {
      return (
        data.name.toLowerCase().includes(search.value.toLowerCase()) ||
        data.detail.toLowerCase().includes(search.value.toLowerCase())
      )
    })
  })
  async function getTypePayorders(): Promise<void> {
    loading.value = true
    const { data } = await getTypePayordersRequest()
    const dataMap = data.map((typePayorder) => {
      return {
        ...typePayorder,
        userName: `${typePayorder?.user?.firstName} ${typePayorder.user?.lastName}`
      }
    })
    typePayorders.splice(0, typePayorders.length, ...dataMap)
    loading.value = false
  }
  async function getTypePayorder(id: number): Promise<void> {
    const { data } = await getTypePayorderRequest(id)
    typePayorder.value = data
  }
  async function createTypePayorder(data: TypePayorder): Promise<void> {
    await createTypePayorderRequest(data)
  }
  async function updateTypePayorder(id: number, data: TypePayorder): Promise<void> {
    await updateTypePayorderRequest(id, data)
  }
  async function deleteTypePayorder(id: number): Promise<void> {
    await deleteTypePayorderRequest(id)
  }
  return {
    filter,
    typePayorder,
    search,
    loading,
    getTypePayorders,
    getTypePayorder,
    createTypePayorder,
    updateTypePayorder,
    deleteTypePayorder,
    typePayorders
  }
})
