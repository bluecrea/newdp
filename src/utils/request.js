import axios from 'axios'

const userInfo = sessionStorage.getItem('userInfo') || null
export const mapURL = process.env.VUE_APP_MAP
export const basicUrl = process.env.VUE_APP_API

console.log(mapURL)
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