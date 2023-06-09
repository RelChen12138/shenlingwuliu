import { createAPI } from '@/utils/request'
// 获取停用车辆列表
// export const getBadorGoodcarList = (params) => createAPI(`/truck/page?page=${params.page}&pageSize=${params.pageSize}&workStatus=${params.workStatus}&truckTypeId=${params.truckTypeId}&licensePlate=${params.licensePlate}`, 'get')

export const getBadorGoodcarList = (params) => {
  const truckTypeIdParam = params.truckTypeId ? `&truckTypeId=${params.truckTypeId}` : ''
  const licensePlateParam = params.licensePlate ? `&licensePlate=${params.licensePlate}` : ''
  return createAPI(`/truck/page?page=${params.page}&pageSize=${params.pageSize}&workStatus=${params.workStatus}${truckTypeIdParam}${licensePlateParam}`, 'get')
}
