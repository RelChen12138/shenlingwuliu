import { createAPI } from '@/utils/request'
// 获取停用车辆列表
export const getBadorGoodcarList = (params) => createAPI(`/truck/page?page=${params.page}&pageSize=${params.pageSize}&workStatus=${params.workStatus}`, 'get')
// 获取启用车辆列表
export const getGoodcarList = (params) => createAPI(`/truck/page?page=${params.page}&pageSize=${params.pageSize}&workStatus=${params.workStatus}`, 'get')

