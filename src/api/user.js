import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/user/current',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

export function userList(data) {
  return request({
    url: '/user/userList',
    method: 'post',
    data
  })
}

export function addUser(data) {
  return request({
    url: '/user',
    method: 'post',
    data
  })
}
