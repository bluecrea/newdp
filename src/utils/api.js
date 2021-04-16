import { getMap, request } from './request'

export const getOnMap = (data) => getMap({url: `${data}.json`})

export const getAreaMarketInfo = (data) => request({ url:'getAreaMarketInfo', data: data })
export const getCoutryAreas = () => request({ url: 'getCoutryAreas', data: {}})
export const getDeviceInfo = (data) => request({ url: 'getDeviceWeightCleanInfo', data: data})
export const getMarketStatistics = (data) => request({ url:'getMarketStatistics', data: data })