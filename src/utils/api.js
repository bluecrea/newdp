import { getMap, request } from './request'
import axios from 'axios'
import {mapURL} from '@/utils/config'

export const getAreaMarketInfo = (data) => request({ url:'getAreaMarketInfo', data: data })
export const getCoutryAreas = () => request({ url: 'getCoutryAreas', data: {}})
export const getDeviceInfo = (data) => request({ url: 'getDeviceWeightCleanInfo', data: data})
export const getMarketStatistics = (data) => request({ url:'getMarketStatistics', data: data })
export const getPriceTrendData = (data) => request({url: 'getPriceTrendData', data: data})
export const getOnMap = (data) => getMap({url: `${data}.json`})
export const getStallStatisticsInfo = (data) => request({url:'getStallStatisticsInfo', data: data})
export const getDeviceStatistics = (data) => request({url: 'getDeviceStatistics', data: data})
export const getComplaintList = (data) => request({url: 'getComplaintList', data: data})
export const getVerifyCode = (data) => axios.post(`${mapURL}/dcApi/getVerifyCode`,data,{responseType: 'blob'})
export const getAreaIndexStatistics = (data) => request({url:'getAreaIndexStatistics', data: data})
export const getIndexUp = (data) => request({url: 'getIndexUp', data: data})
export const getIndexDown = (data) => request({url: 'getIndexDown', data: data})
export const getGoodsIndex = (data) => request({url: 'getGoodsIndex', data: data})
export const getMarketStallList = (data) => request({url: 'getMarketStallList', data: data})
export const getMarketStatisticsInfo = (data) => request({url: 'getMarketStatisticsInfo', data: data})
export const login = (data) => request({url:'login', data: data})