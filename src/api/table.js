import request from '@/utils/request'

export function getList (url, data) {
  return request({
    // url: '/table/list',
    url: url,
    method: 'post',
    data
  })
}

export function addUser (data) {
  return request({
    url: 'http://192.168.0.98:3000/system/addUser',
    method: 'post',
    data
  })
}

export function editUser (data) {
  return request({
    url: 'http://192.168.0.98:3000/system/editUser',
    method: 'post',
    data
  })
}

export function deleteUser (data) {
  return request({
    url: 'http://192.168.0.98:3000/system/deleteUser',
    method: 'post',
    data
  })
}

export function exportFile (data) {
  return request({
    url: 'http://192.168.0.98:3000/exportFile',
    method: 'post',
    data
  })
}

export function upload (form) {
  return request({
    url: 'http://192.168.0.98:3000/upload',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data: form
  })
}

export function uploadFile (form) {
  return request({
    url: 'http://192.168.0.98:3000/uploadFile',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data: form
  })
}
