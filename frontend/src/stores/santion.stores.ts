import { defineStore } from 'pinia'
import { ref, reactive, computed, watch } from 'vue'
import type { Santion } from '@/interfaces/Santion.interfaces'
import {
  createSantionRequest,
  deleteSantionRequest,
  getSantionRequest,
  getSantionsRequest,
  updateSantionRequest
} from '@/services/santion.services'
import { cancelationPayorderRequest, getPayorderPdfRequest } from '@/services/payorder.service'

export const useSantionStore = defineStore('santion', () => {
  const santions = reactive<Santion[]>([])
  const santion = ref<Santion | null>(null)
  const search = ref('')
  const loading = ref(false)
  const date = new Date()
  const initDate = ref(new Date(date.getFullYear(), date.getMonth(), 1).toISOString().substr(0, 10))
  const endDate = ref(new Date().toISOString().substr(0, 10))
  const filter = computed(() => {
    return santions.filter((data) => {
      return (
        data.operatorName?.toLowerCase().includes(search.value.toLowerCase()) ||
        data.detail?.toLowerCase().includes(search.value.toLowerCase()) ||
        data.nit?.toLowerCase().includes(search.value.toLowerCase())
      )
    })
  })
  watch([initDate, endDate], () => {
    getSantions()
  })
  async function getSantions(): Promise<void> {
    loading.value = true
    const { data } = await getSantionsRequest(initDate.value, endDate.value)
    const dataMap = data.map((santion) => {
      return {
        ...santion,
        userName: `${santion?.user?.firstName} ${santion.user?.lastName}`,
        operatorName: `${santion?.operator?.businessName}`,
        nit: `${santion?.operator?.nit}`,
        cancellationDate: santion.payorder.cancellationDate,
        cancellation: santion.payorder.cancellation,
        amount: santion?.typeSantion?.typePayorder.amount,
        typePayorderName: `${santion?.typeSantion?.typePayorder?.name}`,
        severity: `${santion?.typeSantion?.severity}`
      }
    })
    santions.splice(0, santions.length, ...dataMap)
    loading.value = false
  }
  async function getSantion(id: number): Promise<void> {
    const { data } = await getSantionRequest(id)
    santion.value = data
  }
  async function createSantion(payorder: any) {
    return await createSantionRequest(payorder)
  }
  async function updateSantion(id: number, payorder: any) {
    return await updateSantionRequest(id, payorder)
  }
  async function deleteSantion(id: number) {
    return await deleteSantionRequest(id)
  }
  async function cancelationSantion(id: number) {
    const payorderId = santions.find((santion) => santion.id === id)?.payorder?.id
    if (!payorderId) throw new Error('No se encontro el id de la orden de pago')
    return await cancelationPayorderRequest(payorderId)
  }
  async function getPayorderPdf(id: number) {
    const idPayorder = santions.find((santion) => santion.id === id)?.payorder?.id
    if (!idPayorder) throw new Error('No se encontro el id de la orden de pago')
    const response = await getPayorderPdfRequest(idPayorder)
    const pdfDataUrl = URL.createObjectURL(response.data)
    window.open(pdfDataUrl, '_blank')
  }
  return {
    santions,
    santion,
    search,
    loading,
    filter,
    initDate,
    endDate,
    getSantion,
    getSantions,
    createSantion,
    updateSantion,
    deleteSantion,
    cancelationSantion,
    getPayorderPdf
  }
})
