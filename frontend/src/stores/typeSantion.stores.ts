import { defineStore } from 'pinia'
import {
  getTypeSantionsRequest,
  getTypeSantionRequest,
  createTypeSantionRequest,
  updateTypeSantionRequest,
  deleteTypeSantionRequest
} from '@/services/typeSantion.services'
import { ref, reactive, computed } from 'vue'
import type { TypeSantion } from '@/interfaces/TypeSantion.interfaces'

export const useTypeSantionStore = defineStore('typeSantion', () => {
  const typeSantions = reactive<TypeSantion[]>([])
  const typeSantion = ref<TypeSantion>()
  const search = ref('')
  const loading = ref(false)
  const filter = computed(() => {
    return typeSantions.filter((data) => {
      return (
        data.severity.toLowerCase().includes(search.value.toLowerCase()) ||
        data.typePayorder.name.toLowerCase().includes(search.value.toLowerCase()) ||
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
        userName: `${typeSantion?.user?.firstName} ${typeSantion.user?.lastName}`,
        name: `${typeSantion?.typePayorder?.name}`,
        amount: `${typeSantion?.typePayorder?.amount}`,
        detail: `${typeSantion?.typePayorder?.detail}`
      }
    })
    typeSantions.splice(0, typeSantions.length, ...dataMap)
    loading.value = false
  }
  async function getTypeSantion(id: number): Promise<void> {
    const { data } = await getTypeSantionRequest(id)
    typeSantion.value = data
  }
  async function createTypeSantion(data: TypeSantion): Promise<void> {
    await createTypeSantionRequest(data)
  }
  async function updateTypeSantion(id: number, data: TypeSantion): Promise<void> {
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
