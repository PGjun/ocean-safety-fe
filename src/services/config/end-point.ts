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
  GET_USER_SPECIFIC_HEALTH: (params: UserSpecificHealthParams) => {
    const query = getQueryString(params)
    return `${API_USER}/getUserSpecificHealth?${query}`
  },
}

export const END_POINT = { USER }

// export const END_POINT = {
//   LOGIN: `${USER}/login`,
//   ADD_SHIP: `${USER}/addShip`,
//   GET_SHIP_INFO: (ship_id: number) => `${USER}/getShipInfo?ship_id=${ship_id}`,
//   GET_SHIP_LIST: (group_id: string) =>
//     `${USER}/getShipList?group_id=${group_id}`,
//   GET_USER_INFO: (user_id: number) => `${USER}/getUserInfo?user_id=${user_id}`,
//   GET_USER_LIST: ({
//     group_id,
//     ship_id,
//     page_num,
//     item_count,
//   }: {
//     group_id: number
//     ship_id: number
//     page_num: number
//     item_count: number
//   }) =>
//     `${USER}/getUserList?group_id=${group_id}&ship_id=${ship_id}&page_num=${page_num}&item_count=${item_count}`,
//   GET_USER_HEALTH_LIST: (ship_id: number) =>
//     `${USER}/getUserHealthList?ship_id=${ship_id}`,
//   GET_USER_LOCATION_LIST: (ship_id: number) =>
//     `${USER}/getUserLocationList?ship_id=${ship_id}`,
// }
// const PATH = {
//   BASE: "/api/v1/web",
//   AUTH: "/api/v1/auth/web",
//   COMMON: "api/v1/",
// }

// export const END_POINT = {
//   BASE: {
//     INTERESTS_LIST: PATH.BASE + "/interests/list", //관심분야 리스트
//     NOTICE_LIST: PATH.BASE + "/notice/list", //공지 리스트
//     NOTICE_Detail: (id: string) => PATH.BASE + `/notice/${id}`, //공지 리스트
//     PROJECT: PATH.BASE + "/project", //프로젝트 생성
//     PROJECT_EDIT: (id_proj: string) => PATH.BASE + `/project/${id_proj}`, //프로젝트 생성
//     PROJECT_TEMP: PATH.BASE + "/project_tmp", //프로젝트 임시저장
//     PROJECT_LIST: PATH.BASE + "/project/list", //프로젝트 리스트
//     PROJECT_MY_LIST: PATH.BASE + "/project/mylist", //프로젝트 My리스트
//     PROJECT_DATA_TYPE: PATH.BASE + "/dataservice/list", //수집정보 대분류
//     PROJECT_DATA_TYPE_VALUE: (
//       id_comm: string | null, //수집정보 소분류
//     ) => PATH.BASE + `/dataservice/${id_comm}`,
//     PROJECT_GENDER_LIST: PATH.BASE + "/target/gender/list", //성별 리스트
//     PROJECT_AGE_LIST: PATH.BASE + "/target/age/list", //나이 리스트
//     PROJECT_DETAIL: (id_proj: string) => PATH.BASE + `/project/${id_proj}`, //프로젝트 상세
//     PROJECT_STATUS: PATH.BASE + "/project_status", //프로젝트 상태변경
//     PROJECT_LIKE: PATH.BASE + "/projectlike", //프로젝트 찜
//     PROJECT_UNLIKE: (id_proj: string) => PATH.BASE + `/projectlike/${id_proj}`, //프로젝트 찜
//     PROJECT_LIKE_LIST: PATH.BASE + "/projectlike/list", //프로젝트 찜
//     PROJECT_PARTICIPATE_LIST: PATH.BASE + "/project/participate/list",
//     PAYMENT: PATH.BASE + "/payment",
//     USER: PATH.BASE + `/user`, //유저 상세
//     USER_EDIT: (id_usr: string) => PATH.BASE + `/user/${id_usr}`, //유저 수정
//   },
//   AUTH: {
//     SIGN_IN: PATH.AUTH + "/signin", //로그인
//     SIGN_UP_SOCIAL_INFO: PATH.AUTH + "/signup_social_info", //소셜 제공자 정보
//     SIGN_UP_SOCIAL_PROFILE: PATH.AUTH + "/signup_social_profile", //유저 프로필 조회
//     CHECK_NICK: PATH.AUTH + "/check_nick", //닉네임 중복 체크
//     SIGN_UP_SOCIAL: PATH.AUTH + "/signup_social", //회원가입
//   },
//   COMMON: {
//     UPLOAD: PATH.COMMON + "/upload", //파일 업로드
//   },
// } as const
