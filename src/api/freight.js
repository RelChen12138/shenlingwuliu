// 运费管理
import { createAPI } from '@/utils/request'

// 获取运费列表
export const freightList = () => createAPI(`/carriages`, 'get')

// 新增/修改运费
export const changefright = (obj) => createAPI(`/carriages`, 'POST', obj)

// 删除运费
export const delfreight = (id) => createAPI(`/carriages/${id}`, 'DELETE', id)
