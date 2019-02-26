import request from '@/utils/request'

export function loginByUsername (username, password) {
  const data = {
    username,
    password
  }
  return request({
    url: 'http://192.168.0.98:3000/login',
    method: 'post',
    data
  })
}

export function logout () {
  return request({
    url: 'http://192.168.0.98:3000/logout',
    method: 'post'
  })
}

export function getUserInfo (token, username) {
  return request({
    url: 'http://192.168.0.98:3000/getUserInfo',
    method: 'get',
    params: { token, username }
  })
}
