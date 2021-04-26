import axios from 'axios'
import { mapURL, basicUrl } from '@/utils/config'

const userInfo = sessionStorage.getItem('userInfo')

export const request = axios.create({
  baseURL: mapURL,
  headers: {'Content-Type': 'application/json'},
  timeout: 6000,
  method: 'POST',
})

export const getMap = axios.create({
  baseURL: basicUrl,
  timeout: 6000,
  method: 'GET'
})

request.interceptors.response.use(response => {
  if (userInfo) {
    response.headers['fpmsToken'] = JSON.parse(userInfo).token
  }
  return response.data
}, error => {
  console.log(error)
})