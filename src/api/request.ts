import axios from 'axios'

import type { ApiResponse } from '@/types/music'

const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 10000,
})

// 请求拦截器：预留统一注入鉴权信息等
request.interceptors.request.use((config) => config)

// 响应拦截器：预留统一错误处理
request.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error),
)

export async function get<T>(url: string, params?: Record<string, unknown>): Promise<T> {
  const response = await request.get<ApiResponse<T>>(url, { params })
  if (response.data.code !== 200) {
    throw new Error(response.data.message || 'Request failed')
  }
  return response.data.data
}

export default request
