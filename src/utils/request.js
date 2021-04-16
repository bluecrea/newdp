import axios from 'axios'

export const request = axios.create({
  baseURL: 'http://192.168.1.69:8080/dcApi/',
  //baseURL: 'https://www.cnnmcloud.com/apis/dcApi/',
  headers: { 'Content-Type': 'application/json'},
  timeout: 6000,
  method: 'POST',
})

export const getMap = axios.create({
  baseURL: 'https://map.xiachuyi.com/map/',
  timeout: 6000,
  method: 'GET'
})

request.interceptors.response.use(response => {
  return response.data
}, error => {
  console.log(error)
})