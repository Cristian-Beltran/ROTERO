import type { Driver } from '@/interfaces/Driver.interfaces'
import {
  getDriverRequest,
  getDriversRequest,
  createDriverRequest,
  updateDriverRequest
} from '@/services/driver.services'
import { defineStore } from 'pinia'
import { ref, reactive, computed } from 'vue'

export const useDriverStore = defineStore('driver', () => {
  const drivers = reactive<Driver[]>([])
  const driver = ref<Driver | null>(null)
  const search = ref('')
  const loading = ref(false)
  const filter = computed(() => {
    return drivers.filter((data) => {
      return (
        data.firstName?.toLowerCase().includes(search.value.toLowerCase()) ||
        data.lastName?.toLowerCase().includes(search.value.toLowerCase()) ||
        data.ci?.toLowerCase().includes(search.value.toLowerCase()) ||
        data.cellphone?.toLowerCase().includes(search.value.toLowerCase())
      )
    })
  })
  async function getDrivers(id: number): Promise<void> {
    loading.value = true
    const { data } = await getDriversRequest(id)
    drivers.splice(0, drivers.length, ...data)
    loading.value = false
  }
  async function getDriver(id: number): Promise<void> {
    const { data } = await getDriverRequest(id)
    driver.value = data
  }
  async function createDriver(driver: any) {
    return await createDriverRequest(driver)
  }
  async function updateDriver(id: number, driver: any) {
    return await updateDriverRequest(id, driver)
  }
  return {
    drivers,
    driver,
    search,
    loading,
    filter,
    getDrivers,
    getDriver,
    createDriver,
    updateDriver
  }
})
