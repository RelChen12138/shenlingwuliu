
import { createAPI } from '@/utils/request'

// 获取司机分页数据
export const getDrivers = data => createAPI('/driver/page', 'get', data)

// 获取详情页司机数据
export const getDriver = id => createAPI(`/driver/${id}?0=${id}`, 'get')

// 保存司机数据
export const saveDriver = (id, data) => createAPI(`/driver/${id}`, 'put', data)

// 获取司机驾驶证信息
export const getDriverCard = id => createAPI(`driverLicense/${id}?0=${id}`, 'get')

// 获取所有车辆信息
export const getTrucks = () => createAPI('/unWorkingTrucks', 'get')

// 获取树数据
export const getTreeData = () => createAPI('business-hall/tree', 'get')
