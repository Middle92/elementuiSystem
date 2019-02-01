import request from '@/utils/request'

export function getList (params) {
  return request({
    url: '/table/list',
    method: 'post',
    params
  })
}
