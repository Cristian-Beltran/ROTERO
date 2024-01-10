import { defineStore } from 'pinia'
import { ref, reactive, computed } from 'vue'
import {
  loginRequest,
  updatePasswordRequest,
  updateProfileRequest,
  verifyTokenRequest,
  uploadFirmOneRequest,
  uploadFirmTwoRequest
} from '@/services/auth.services'
import Cookies from 'js-cookie'
import type { Auth } from '@/interfaces/Auth.interfaces'

export const useAuthStore = defineStore('auth', () => {
  // create const whit reactive type auth
  const auth = reactive<Auth>({
    accessToken: '',
    id: 0,
    firstName: '',
    lastName: '',
    birthday: '',
    ci: '',
    email: '',
    password: '',
    permissionLevel: '',
    isActive: false,
    lastLogin: '',
    createdAt: '',
    updatedAt: ''
  })
  const isAuthenticated = ref(false)
  const initialName = computed(() => {
    return `${auth.firstName.charAt(0)}${auth.lastName.charAt(0)}`
  })
  async function login(email: string, password: string) {
    const { data } = await loginRequest(email, password)
    Object.assign(auth, data)
    isAuthenticated.value = true
    Cookies.set('token', data.accessToken, { expires: 7 })
  }
  async function logout() {
    isAuthenticated.value = false
    Object.assign(auth, {})
    Cookies.remove('token')
  }
  async function verifyToken() {
    if (isAuthenticated.value) {
      return true
    }
    const token = Cookies.get('token')
    if (!token) {
      isAuthenticated.value = false
      Object.assign(auth, {})
      return false
    }
    try {
      const { data } = await verifyTokenRequest()
      Object.assign(auth, data)
      isAuthenticated.value = true
      return true
    } catch (error) {
      Object.assign(auth, {})
      isAuthenticated.value = false
      return false
    }
  }
  async function updateProfile(data: any) {
    await updateProfileRequest(data)
    auth.firstName = data.firstName
    auth.lastName = data.lastName
    auth.birthday = data.birthday
    auth.ci = data.ci
    auth.email = data.email
    auth.cellphone = data.cellphone
  }
  async function updatePassword(data: { password: string; oldpassword: string }) {
    await updatePasswordRequest(data)
  }
  async function uploadFirmOne(file: FormData) {
    return await uploadFirmOneRequest(file)
  }
  async function uploadFirmTwo(file: FormData) {
    return await uploadFirmTwoRequest(file)
  }

  return {
    auth,
    isAuthenticated,
    initialName,
    login,
    logout,
    verifyToken,
    updateProfile,
    updatePassword,
    uploadFirmOne,
    uploadFirmTwo
  }
})
