import type { Payorder } from '@/interfaces/Payorder.interfaces'
import {
  createPayorderRequest,
  getPayordersRequest,
  getPayorderRequest,
  updatePayorderRequest,
  deletePayorderRequest,
  cancelationPayorderRequest,
  getPayorderPdfRequest,
  getPayordersPdfRequest
} from '@/services/payorder.service'
import { defineStore } from 'pinia'
import { ref, reactive, computed, watch } from 'vue'

export const usePayorderStore = defineStore('payorder', () => {
  const payorders = reactive<Payorder[]>([])
  const payorder = ref<Payorder | null>(null)
  const search = ref('')
  const loading = ref(false)
  const date = new Date()
  const initDate = ref(new Date(date.getFullYear(), date.getMonth(), 1).toISOString().substr(0, 10))
  const endDate = ref(new Date().toISOString().substr(0, 10))
  const filter = computed(() => {
    return payorders.filter((data) => {
      return (
        data.operatorName?.toLowerCase().includes(search.value.toLowerCase()) ||
        data.detail?.toLowerCase().includes(search.value.toLowerCase()) ||
        data.nit?.toLowerCase().includes(search.value.toLowerCase())
      )
    })
  })

  watch([initDate, endDate], () => {
    getPayorders()
  })
  async function getPayorders(): Promise<void> {
    loading.value = true
    const { data } = await getPayordersRequest(initDate.value, endDate.value)
    const dataMap = data.map((payorder) => {
      return {
        ...payorder,
        userName: `${payorder?.user?.firstName} ${payorder.user?.lastName}`,
        operatorName: `${payorder?.operator?.businessName}`,
        nit: `${payorder?.operator?.nit}`,
      }
    })
    payorders.splice(0, payorders.length, ...dataMap)
    loading.value = false
  }

  async function getPayorder(id: number): Promise<void> {
    const { data } = await getPayorderRequest(id)
    payorder.value = data
  }
  async function createPayorder(payorder: any) {
    return await createPayorderRequest(payorder)
  }
  async function updatePayorder(id: number, payorder: any) {
    return await updatePayorderRequest(id, payorder)
  }
  async function deletePayorder(id: number) {
    return await deletePayorderRequest(id)
  }
  async function cancelationPayorder(id: number) {
    return await cancelationPayorderRequest(id)
  }
  async function getPayorderPdf(id: number) {
    const response = await getPayorderPdfRequest(id)
    const pdfDataUrl = URL.createObjectURL(response.data)
    window.open(pdfDataUrl, '_blank')
  }
  async function getPayordersPdf() {
    const response = await getPayordersPdfRequest(initDate.value, endDate.value)
    const pdfDataUrl = URL.createObjectURL(response.data)
    window.open(pdfDataUrl, '_blank')
  }
  return {
    payorders,
    payorder,
    search,
    loading,
    filter,
    initDate,
    endDate,
    getPayorders,
    getPayorder,
    createPayorder,
    updatePayorder,
    deletePayorder,
    cancelationPayorder,
    getPayorderPdf,
    getPayordersPdf
  }
})
