import axios from 'axios'

const userInfo = sessionStorage.getItem('userInfo') || null

export const request = axios.create({
  //baseURL: 'http://192.168.1.60:8080/dcApi/',
  baseURL: 'https://www.cnnmcloud.com/apis/dcApi/',
  headers: {'Content-Type': 'application/json'},
  timeout: 6000,
  method: 'POST',

})

export const getMap = axios.create({
  baseURL: 'https://map.xiachuyi.com/map/',
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