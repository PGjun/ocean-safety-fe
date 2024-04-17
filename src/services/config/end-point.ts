/**규칙 : 엔드 포인트와 Key값의 이름이 동일해야됨 부모 Key값에 알맞게 입력(BASE, AUTH, COMMON) */

import { getQueryString } from '@/utils/getQueryString'
import {
  FetchShipListParams,
  FetchUserListParams,
  NoticeListParams,
  UserEmergencyListParams,
  UserHealthListParams,
  UserSpecificHealthParams,
} from '../api/user'

const API_USER = '/api/user'
const API_ADMIN = '/api/admin'

const USER = {
  LOGIN: `${API_USER}/login`,
  ADD_SHIP: `${API_USER}/addShip`,
  GET_SHIP_INFO: (ship_id: number) =>
    `${API_USER}/getShipInfo?ship_id=${ship_id}`,
  GET_SHIP_LIST: (params: FetchShipListParams) => {
    const query = getQueryString(params)
    return `${API_USER}/getShipList?${query}`
  },
  GET_USER_INFO: (user_id: number) =>
    `${API_USER}/getUserInfo?user_id=${user_id}`,
  GET_USER_LIST: (params: FetchUserListParams) => {
    const query = getQueryString(params)
    return `${API_USER}/getUserList?${query}`
  },
  GET_USER_HEALTH_LIST: (params: UserHealthListParams) => {
    const query = getQueryString(params)
    return `${API_USER}/getUserHealthList?${query}`
  },
  GET_USER_LOCATION_LIST: (ship_id: number) =>
    `${API_USER}/getUserLocationList?ship_id=${ship_id}`,
  GET_USER_EMERGENCY_LIST: (params: UserEmergencyListParams) => {
    const query = getQueryString(params)
    return `${API_USER}/getUserEmergencyList?${query}`
  },
  GET_NOTICE_LIST: (params: NoticeListParams) => {
    const query = getQueryString(params)
    return `${API_USER}/getNoticeList?${query}`
  },
  GET_SPECIFIC_NOTICE: (notice_id: string) => {
    return `${API_USER}/getSpecificNotice?notice_id=${notice_id}`
  },
  ADD_NOTICE: `${API_USER}/addNotice`,
  GET_USER_SPECIFIC_HEALTH: (params: UserSpecificHealthParams) => {
    const query = getQueryString(params)
    return `${API_USER}/getUserSpecificHealth?${query}`
  },
}

export const END_POINT = { USER }
