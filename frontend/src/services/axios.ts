import axios, { type AxiosInstance } from 'axios'

const instance: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3000'
  //baseURL: "https://envibol.app.dexdserver.site/api",
})

instance.defaults.headers.common['Authorization'] = `Bearer ${getCookie('token')}`
function getCookie(name: string) {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) {
    return parts.pop()?.split(';').shift()
  }
}

export default instance
