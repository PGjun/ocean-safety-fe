/**규칙 : 엔드 포인트와 Key값의 이름이 동일해야됨 부모 Key값에 알맞게 입력 */

import {
  FetchShipListParams,
  FetchUserListParams,
  FetchUserNameListParams,
  ModifyEmergencyCall,
  NoticeListParams,
  UserEmergencyListParams,
  UserHealthListParams,
  UserOwnEmergencyListParams,
  UserSpecificHealthParams,
} from '@/types/requestParams'
import { getQueryString } from '@/utils/getQueryString'

const API_USER = '/api/user'
const API_ADMIN = '/api/admin' //todo 어드민 페이지 추가시

const USER = {
  // 로그인
  LOGIN: `${API_USER}/login`,
  // 선박 추가
  ADD_SHIP: `${API_USER}/addShip`,
  // 선박 상세 조회
  GET_SHIP_INFO: (ship_id: number) =>
    `${API_USER}/getShipInfo?ship_id=${ship_id}`,
  // 선박 목록 조회
  GET_SHIP_LIST: (params: FetchShipListParams) => {
    const query = getQueryString(params)
    return `${API_USER}/getShipList?${query}`
  },
  // 선박이름 목록 조회
  GET_SHIP_NAME_LIST: (params: { group_id: string }) => {
    const query = getQueryString(params)
    return `${API_USER}/getShipNameList?${query}`
  },
  // 그룹이름 목록 조회
  GET_GROUP_NAME_LIST: `${API_USER}/getGroupNameList`,
  // 유저 상세 조회
  GET_USER_INFO: (user_id: number) =>
    `${API_USER}/getUserInfo?user_id=${user_id}`,
  // 유저 목록 조회
  GET_USER_LIST: (params: FetchUserListParams) => {
    const query = getQueryString(params)
    return `${API_USER}/getUserList?${query}`
  },
  // 유저이름 목록 조회
  GET_USER_NAME_LIST: (params: FetchUserNameListParams) => {
    const query = getQueryString(params)
    return `${API_USER}/getUserNameList?${query}`
  },
  // 유저 추가
  ADD_USER: `${API_USER}/addUser`,
  // 건강 목록 조회
  GET_USER_HEALTH_LIST: (params: UserHealthListParams) => {
    const query = getQueryString(params)
    return `${API_USER}/getUserHealthList?${query}`
  },
  // 건강 상세 조회
  GET_USER_SPECIFIC_HEALTH: (params: UserSpecificHealthParams) => {
    const query = getQueryString(params)
    return `${API_USER}/getUserSpecificHealth?${query}`
  },
  // 건강 자동 경고 조회
  GET_HEALTH_WARNING: (params: { ship_id: number }) => {
    const query = getQueryString(params)
    return `${API_USER}/getHealthWarning?${query}`
  },
  // 건강 자동 경고 추가
  SET_HEALTH_WARNING: `${API_USER}/setHealthWarning`,
  // 위치 목록 조회
  GET_USER_LOCATION_LIST: (ship_id: number) =>
    `${API_USER}/getUserLocationList?ship_id=${ship_id}`,
  // 응급 알림 목록
  GET_USER_EMERGENCY_LIST: (params: UserEmergencyListParams) => {
    const query = getQueryString(params)
    return `${API_USER}/getUserEmergencyList?${query}`
  },
  // 유저 응급 알림 목록 조회
  GET_USER_OWN_EMERGENCY: (params: UserOwnEmergencyListParams) => {
    const query = getQueryString(params)
    return `${API_USER}/getUserOwnEmergency?${query}`
  },
  // 응급 상세 조회
  GET_USER_SPECIFIC_EMERGENCY: (sos_id: number) =>
    `${API_USER}/getUserSpecificEmergency?sos_id=${sos_id}`,
  // 응급 처리현황 추가
  POST_MODIFY_EMERGENCY_CALL: `${API_USER}/modifyEmergencyCall`,
  // 공지 목록 조회
  GET_NOTICE_LIST: (params: NoticeListParams) => {
    const query = getQueryString(params)
    return `${API_USER}/getNoticeList?${query}`
  },
  // 공지 상세 조회
  GET_SPECIFIC_NOTICE: (notice_id: string) => {
    return `${API_USER}/getSpecificNotice?notice_id=${notice_id}`
  },
  // 공지 추가
  ADD_NOTICE: `${API_USER}/addNotice`,
  // 승선원 구분 조회
  GET_CREW_LEVEL: `${API_USER}/getCrewlevel`,
  // 업체 목록 조회
  GET_COMPANY_LIST: `${API_USER}/getCompanyList`,
  // 워치 목록 조회
  GET_WATCHES: (params: { ship_id: number }) => {
    const query = getQueryString(params)
    return `${API_USER}/getWatches?${query}`
  },
  // 워치 상세 조회
  GET_USER_WATCH_INFO: (params: { user_id: number }) => {
    const query = getQueryString(params)
    return `${API_USER}/getUserWatchInfo?${query}`
  },
  // 승선원 모니터링 목록 조회
  GET_CREW_LOCATION: (params: { ship_id: number }) => {
    const query = getQueryString(params)
    return `${API_USER}/getCrewLocation?${query}`
  },
  // 승선원 일반메시지 목록 조회
  GET_CREW_MESSAGE: (params: {
    ship_id: number
    message_level_name: string
  }) => {
    const query = getQueryString(params)
    return `${API_USER}/getCrewMessage?${query}`
  },
  // 제한구역 조회
  GET_RESTRICT_AREAS: (params: { ship_id: number }) => {
    const query = getQueryString(params)
    return `${API_USER}/getRestrictAreas?${query}`
  },
  // 비콘 위치 조회
  GET_BEACONS: (params: { ship_id: number }) => {
    const query = getQueryString(params)
    return `${API_USER}/getBeacons?${query}`
  },
  // 그룹 추가
  ADD_GROUP: `${API_USER}/addGroup`,
}

export const END_POINT = { USER }
