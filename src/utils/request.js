import axios from 'axios'
import { basicUrl } from '@/utils/config'

export const request = axios.create({
  baseURL: basicUrl,
  timeout: 6000,
  method: 'POST'
})

export const getMap = axios.create({
  baseURL: 'https://map.xiachuyi.com/map/',
  timeout: 6000,
  method: 'GET'
})
