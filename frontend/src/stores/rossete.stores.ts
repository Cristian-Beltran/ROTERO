import { defineStore } from 'pinia'
import type { Rossete } from '@/interfaces/Rossete.interfaces'
import { ref, reactive, computed } from 'vue'
import {
  getRossetesRequest,
  getRosseteRequest,
  createRosseteRequest,
  updateRosseteRequest,
  deleteRosseteRequest,
  getRossetePdfRequest,
  readQrRosseteRequest
} from '@/services/rossete.services'
export const useRosseteStore = defineStore('rossete', () => {
  const rosettes = reactive<Rossete[]>([])
  const rosette = ref<Rossete | null>(null)
  const search = ref('')
  const loading = ref(false)
  const filter = computed(() => {
    return rosettes.filter((data) => {
      return (
        data.route.endText.toLowerCase().includes(search.value.toLowerCase()) ||
        data.vehiclePlate.toLowerCase().includes(search.value.toLowerCase()) ||
        data.vehicleName.toLowerCase().includes(search.value.toLowerCase()) ||
        data.operatorName?.toLowerCase().includes(search.value.toLowerCase()) ||
        data.vehicleType?.toLowerCase().includes(search.value.toLowerCase()) ||
        data.route.startText.toLowerCase().includes(search.value.toLowerCase())
      )
    })
  })
  async function getRossetes() {
    loading.value = true
    const { data } = await getRossetesRequest()
    const dataMap = data.map((rosette) => {
      return {
        ...rosette,
        routePoint: `${rosette.route.startText} - ${rosette.route.endText}`,
        userName: `${rosette.user?.firstName} ${rosette.user?.lastName}`,
        operatorName: `${rosette.route.vehicle.operator.businessName}`,
        vehicleName: `${rosette.route.vehicle.brand} ${rosette.route.vehicle.model}`,
        vehiclePlate: `${rosette.route.vehicle.plate}`,
        vehicleType: `${rosette.route.vehicle.typeService} - ${rosette.route.vehicle.typeVehicle}`
      }
    })
    rosettes.splice(0, rosettes.length, ...dataMap)
    loading.value = false
  }
  async function getRossete(id: number) {
    const { data } = await getRosseteRequest(id)
    rosette.value = data
  }
  async function createRossete(rosette: any) {
    await createRosseteRequest(rosette)
  }
  async function updateRossete(id: number, rosette: any) {
    await updateRosseteRequest(id, rosette)
  }
  async function deleteRossete(id: number) {
    await deleteRosseteRequest(id)
  }
  async function getRossetePdf(id: number) {
    const response = await getRossetePdfRequest(id)
    const pdfDataUrl = URL.createObjectURL(response.data)
    window.open(pdfDataUrl, '_blank')
  }
  async function readQrRossete(token: string) {
    const { data } = await readQrRosseteRequest(token)
    rosette.value = data
  }
  return {
    rosettes,
    rosette,
    search,
    loading,
    getRossetes,
    getRossete,
    createRossete,
    updateRossete,
    deleteRossete,
    getRossetePdf,
    readQrRossete,
    filter
  }
})
