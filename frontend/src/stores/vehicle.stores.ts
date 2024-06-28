import { defineStore } from 'pinia'
import { ref, reactive, computed } from 'vue'
import type { Vehicle } from '@/interfaces/Vehicle.interfaces'
import {
  getVehiclesRequest,
  getVehicleRequest,
  getVehicleByPlateRequest,
  getVehiclesForClassRequest,
  createVehicleRequest,
  updateVehicleRequest,
  deleteVehicleRequest,
  getCertificationPdfRequest
} from '@/services/vehicle.services'

export const useVehicleStore = defineStore('vehicle', () => {
  const vehicles = reactive<Vehicle[]>([])
  const vehicle = ref<Vehicle | null>(null)
  const search = ref('')
  const loading = ref(false)
  const filter = computed(() => {
    return vehicles.filter((data) => {
      return (
        data.brand?.toLowerCase().includes(search.value.toLowerCase()) ||
        data.model?.toLowerCase().includes(search.value.toLowerCase()) ||
        data.plate?.toLowerCase().includes(search.value.toLowerCase()) ||
        data.ownerName?.toLowerCase().includes(search.value.toLowerCase()) ||
        data.typeVehicle?.toLowerCase().includes(search.value.toLowerCase())
      )
    })
  })
  async function getVehicles(id: number): Promise<void> {
    loading.value = true
    const { data } = await getVehiclesRequest(id)
    const dataMap = data.map((item) => {
      return {
        ...item,
        userName: `${item?.user?.firstName} ${item.user?.lastName}`,
        ownerName: `${item?.owner?.firstName} ${item.owner?.lastName}`,
      }
    })
    vehicles.splice(0, vehicles.length, ...dataMap)
    loading.value = false
  }
  async function getVehicle(id: number): Promise<void> {
    const { data } = await getVehicleRequest(id)
    vehicle.value = data
  }
  async function createVehicle(vehicle: any) {
    return await createVehicleRequest(vehicle)
  }
  async function updateVehicle(id: number, vehicle: any) {
    return await updateVehicleRequest(id, vehicle)
  }
  async function deleteVehicle(id: number) {
    return await deleteVehicleRequest(id)
  }
  async function getVehicleByPlate(plate: string) {
    const { data } = await getVehicleByPlateRequest(plate)
    vehicle.value = data
  }
  async function getVehicleForClass() {
    const { data } = await getVehiclesForClassRequest()
    return data
  }
  async function getCertifaction(id: number) {
    const response = await getCertificationPdfRequest(id)
    const pdfDataUrl = URL.createObjectURL(response.data)
    window.open(pdfDataUrl, '_blank')
  }
  return {
    vehicles,
    vehicle,
    search,
    loading,
    filter,
    getCertifaction,
    getVehicles,
    getVehicle,
    createVehicle,
    getVehicleByPlate,
    getVehicleForClass,
    updateVehicle,
    deleteVehicle
  }
})
