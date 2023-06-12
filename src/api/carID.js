import { createAPI } from '@/utils/request'
export const getcarlist = (id) => createAPI(`/truckType/${id}`, 'get')
