import { getMap }  from './request'

export const getOnMap = (data) => getMap({url: `${data}.json`})