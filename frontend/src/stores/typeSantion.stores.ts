import { defineStore } from 'pinia'
import {
  getTypeSantionsRequest,
  getTypeSantionRequest,
  createTypeSantionRequest,
  updateTypeSantionRequest,
  deleteTypeSantionRequest
} from '@/services/typeSantion.services'
import { ref, reactive, computed } from 'vue'
import type { Service } from '@/interfaces/Service'

export const useTypeSantionStore = defineStore('typeSantion', () => {
  const typeSantions = reactive<Service[]>([])
  const typeSantion = ref<Service>()
  const search = ref('')
  const loading = ref(false)
  const filter = computed(() => {
    return typeSantions.filter((data) => {
      return (
        data.name.toLowerCase().includes(search.value.toLowerCase()) ||
        data.detail.toLowerCase().includes(search.value.toLowerCase())
      )
    })
  })
  async function getTypeSantions(): Promise<void> {
    loading.value = true
    const { data } = await getTypeSantionsRequest()
    const dataMap = data.map((typeSantion) => {
      return {
        ...typeSantion,
        userName: `${typeSantion?.user?.firstName} ${typeSantion.user?.lastName}`
      }
    })
    typeSantions.splice(0, typeSantions.length, ...dataMap)
    loading.value = false
  }
  async function getTypeSantion(id: number): Promise<void> {
    const { data } = await getTypeSantionRequest(id)
    typeSantion.value = data
  }
  async function createTypeSantion(data: Service): Promise<void> {
    await createTypeSantionRequest(data)
  }
  async function updateTypeSantion(id: number, data: Service): Promise<void> {
    await updateTypeSantionRequest(id, data)
  }
  async function deleteTypeSantion(id: number): Promise<void> {
    await deleteTypeSantionRequest(id)
  }
  return {
    filter,
    typeSantion,
    search,
    loading,
    getTypeSantions,
    getTypeSantion,
    createTypeSantion,
    updateTypeSantion,
    deleteTypeSantion,
    typeSantions
  }
})
