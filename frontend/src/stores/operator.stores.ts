import type { Operator } from '@/interfaces/Operator.interfaces'
import type { User } from '@/interfaces/Roles.interfaces'
import {
  authorizeOperatorRequest,
  createOperatorRequest,
  deleteOperatorRequest,
  getTotalAffiliateRequest,
  getOperatorRequest,
  getOperatorsRequest,
  updateOperatorRequest,
  uploadFileRequest
} from '@/services/operator.services'
import { defineStore } from 'pinia'
import { ref, reactive, computed } from 'vue'

export const useOperatorStore = defineStore('operator', () => {
  const operators = reactive<Operator[]>([])
  const operator = ref<Operator | null>(null)
  const search = ref('')
  const loading = ref(false)
  const filter = computed(() => {
    return operators.filter((data) => {
      return (
        data.businessName?.toLowerCase().includes(search.value.toLowerCase()) ||
        data.legalRepresentative?.toLowerCase().includes(search.value.toLowerCase()) ||
        data.nit?.toLowerCase().includes(search.value.toLowerCase()) ||
        data.operatorName?.toLowerCase().includes(search.value.toLowerCase()) ||
        data.legalNumber?.toLowerCase().includes(search.value.toLowerCase())
      )
    })
  })
  async function getOperators(): Promise<void> {
    loading.value = true
    const { data } = await getOperatorsRequest()
    const dataMap = data.map((operator) => {
      return {
        ...operator,
        userName: `${operator?.user?.firstName} ${operator.user?.lastName}`,
        operatorName: `${operator?.operator?.firstName} ${operator.operator?.lastName}`
      }
    })
    operators.splice(0, operators.length, ...dataMap)
    loading.value = false
  }
  async function getOperator(id: number): Promise<void> {
    const { data } = await getOperatorRequest(id)
    operator.value = data
  }
  async function createOperator(operator: {
    opeator: Operator
    operatorUser: User
    files?: {
      operatorCertification?: File
      administrativeResolution?: File
      route?: File
    }
  }): Promise {
    return await createOperatorRequest(operator)
  }
  async function updateOperator(
    id: number,
    operator: {
      opeator: Operator
      operatorUser: User
      files?: {
        operatorCertification?: File
        administrativeResolution?: File
        route?: File
      }
    }
  ): Promise {
    return await updateOperatorRequest(id, operator)
  }
  async function uploadFile(id: number, formData: FormData, file: string) {
    return await uploadFileRequest(id, formData, file)
  }
  async function authorizeOperator(id: number) {
    return await authorizeOperatorRequest(id)
  }
  async function deleteOperator(id: number) {
    return await deleteOperatorRequest(id)
  }
  async function getTotalAffiliate() {
    const { data } = await getTotalAffiliateRequest()
    return data
  }
  return {
    operators,
    operator,
    search,
    loading,
    getOperators,
    getOperator,
    createOperator,
    updateOperator,
    uploadFile,
    filter,
    authorizeOperator,
    deleteOperator,
    getTotalAffiliate
  }
})
