import { getMap, request } from './request'

export const getOnMap = (data) => getMap({url: `${data}.json`})

export const getAreaMarketInfo = (data) => request({ url:'getAreaMarketInfo', data: data })
export const getCoutryAreas = () => request({ url: 'getCoutryAreas', data: {}})
export const getDeviceInfo = (data) => request({ url: 'getDeviceWeightCleanInfo', data: data})
export const getMarketStatistics = (data) => request({ url:'getMarketStatistics', data: data })
export const getPriceTrendData = (data) => request({url: 'getPriceTrendData', data: data})
export const getStallStatisticsInfo = (data) => request({url: 'getGoodsIndex', data: data})
export const getDeviceStatistics = (data) => request({url: 'getDeviceStatistics', data: data})
export const getComplaintList = (data) => request({url: 'getComplaintList', data: data})