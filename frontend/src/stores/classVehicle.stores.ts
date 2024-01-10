import { defineStore } from 'pinia'
import {
  getClassVehiclesRequest,
  getClassVehicleRequest,
  createClassVehicleRequest,
  updateClassVehicleRequest,
  deleteClassVehicleRequest
} from '@/services/classVehicle.services'
import type { ClassVehicle } from '@/interfaces/ClassVehicle.interfaces'
import { ref, reactive, computed } from 'vue'

export const useClassVehicleStore = defineStore('classVehicle', () => {
  const classVehicles = reactive<ClassVehicle[]>([])
  const classVehicle = ref<ClassVehicle>()
  const search = ref('')
  const loading = ref(false)
  const filter = computed(() => {
    return classVehicles.filter((data) => {
      return (
        data.name.toLowerCase().includes(search.value.toLowerCase()) ||
        data.description.toLowerCase().includes(search.value.toLowerCase())
      )
    })
  })

  async function getClassVehicles(): Promise<void> {
    loading.value = true
    const { data } = await getClassVehiclesRequest()
    const dataMap = data.map((classVehicle) => {
      return {
        ...classVehicle,
        userName: `${classVehicle?.user?.firstName} ${classVehicle.user?.lastName}`
      }
    })
    classVehicles.splice(0, classVehicles.length, ...dataMap)
    loading.value = false
  }
  async function getClassVehicle(id: number): Promise<void> {
    const { data } = await getClassVehicleRequest(id)
    classVehicle.value = data
  }
  async function createClassVehicle(data: ClassVehicle): Promise<void> {
    await createClassVehicleRequest(data)
  }
  async function updateClassVehicle(id: number, data: ClassVehicle): Promise<void> {
    await updateClassVehicleRequest(id, data)
  }
  async function deleteClassVehicle(id: number): Promise<void> {
    await deleteClassVehicleRequest(id)
  }
  return {
    filter,
    classVehicle,
    search,
    loading,
    getClassVehicles,
    getClassVehicle,
    createClassVehicle,
    updateClassVehicle,
    deleteClassVehicle,
    classVehicles,
  }
})
