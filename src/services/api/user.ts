import { convertFormData } from '@/utils/convertFormData'
import { httpClient } from '../config/api-conf'
import { END_POINT } from '../config/end-point'
import { filterParamsByRole } from '@/utils/filterParamsByRole'
import {
  AddNoticeParams,
  AddShipParams,
  FetchShipListParams,
  FetchUserListParams,
  FetchUserNameListParams,
  LoginParams,
  NoticeListParams,
  UserEmergencyListParams,
  UserHealthListParams,
  UserOwnEmergencyListParams,
  UserSpecificHealthParams,
} from '@/types/requestParams'

//* 로그인
export const postUserLogin = async (params: LoginParams) => {
  return httpClient({
    method: 'post',
    endPoint: END_POINT.USER.LOGIN,
    data: params,
  })
}

//* 선박 추가
export const postAddShip = async (params: AddShipParams) => {
  const formData = new FormData()

  // 텍스트 필드를 FormData에 추가
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && key !== 'ship_drawing_img') {
      formData.append(key, value)
    }
  })

  // 'ship_drawing_img'가 파일이라면 FormData에 파일로 추가
  if (params.ship_drawing_img) {
    // 여기서 params.ship_drawing_img는 실제 파일 객체가 되어야 합니다.
    formData.append(
      'ship_drawing_img',
      params.ship_drawing_img,
      params.ship_drawing_img_name,
    )
  }

  return httpClient({
    method: 'post',
    endPoint: END_POINT.USER.ADD_SHIP,
    data: formData, // FormData 인스턴스를 data로 설정
  })
}

//* 선박 상세 조회
export const fetchShipInfo = async (shipId: number) => {
  return httpClient({
    method: 'get',
    endPoint: END_POINT.USER.GET_SHIP_INFO(shipId),
  })
}

//* 선박 목록 조회
export const fetchShipList = async (params: FetchShipListParams) => {
  const filteredParams = await filterParamsByRole({ params })
  return httpClient({
    method: 'get',
    endPoint: END_POINT.USER.GET_SHIP_LIST(filteredParams),
  })
}

//* 선박이름 목록 조회
export const fetchShipNameList = async (params: { group_id: string }) => {
  return httpClient({
    method: 'get',
    endPoint: END_POINT.USER.GET_SHIP_NAME_LIST(params),
  })
}

//* 유저 상세 조회
export const fetchUserInfo = async (userId: number) => {
  return httpClient({
    method: 'get',
    endPoint: END_POINT.USER.GET_USER_INFO(userId),
  })
}

//* 유저 목록 조회
export const fetchUserList = async (params: FetchUserListParams) => {
  const { noFilter, ...rest } = params
  let lastParams = await filterParamsByRole({ params })
  if (noFilter) lastParams = rest

  return httpClient({
    method: 'get',
    endPoint: END_POINT.USER.GET_USER_LIST(lastParams),
  })
}

//* 유저이름 목록 조회
export const fetchUserNameList = async (params: FetchUserNameListParams) => {
  return httpClient({
    method: 'get',
    endPoint: END_POINT.USER.GET_USER_NAME_LIST(params),
  })
}

//* 유저 추가
export const postUser = async (data: any) => {
  return httpClient({
    method: 'post',
    endPoint: END_POINT.USER.ADD_USER,
    data: data,
  })
}

//* 건강 목록 조회
export const fetchUserHealthList = async (params: UserHealthListParams) => {
  const { noFilter, ...rest } = params
  let lastParams = await filterParamsByRole({ params })
  if (noFilter) lastParams = rest

  return httpClient({
    method: 'get',
    endPoint: END_POINT.USER.GET_USER_HEALTH_LIST(lastParams),
  })
}

//* 건강 상세 조회
export const fetchUserSpecificHealth = async (
  params: UserSpecificHealthParams,
) => {
  return httpClient({
    method: 'get',
    endPoint: END_POINT.USER.GET_USER_SPECIFIC_HEALTH(params),
  })
}

//* 위치 목록 조회
export const fetchUserLocationList = async (shipId: number) => {
  return httpClient({
    method: 'get',
    endPoint: END_POINT.USER.GET_USER_LOCATION_LIST(shipId),
  })
}

//* 응급 알림 목록
export const fetchUserEmergencyList = async (
  params: UserEmergencyListParams,
) => {
  const { noFilter, ...rest } = params
  let lastParams = await filterParamsByRole({ params })
  if (noFilter) lastParams = rest

  return httpClient({
    method: 'get',
    endPoint: END_POINT.USER.GET_USER_EMERGENCY_LIST(lastParams),
  })
}

//* 응급 상세 조회
export const fetchUserOwnEmergencyList = async (
  params: UserOwnEmergencyListParams,
) => {
  return httpClient({
    method: 'get',
    endPoint: END_POINT.USER.GET_USER_OWN_EMERGENCY(params),
  })
}

//* 응급 상세 조회
export const fetchUserSpecificEmergency = async (sos_id: number) => {
  return httpClient({
    method: 'get',
    endPoint: END_POINT.USER.GET_USER_SPECIFIC_EMERGENCY(sos_id),
  })
}

//* 공지 목록 조회
export const fetchNoticeList = async (params: NoticeListParams) => {
  const filteredParams = await filterParamsByRole({ params })
  return httpClient({
    method: 'get',
    endPoint: END_POINT.USER.GET_NOTICE_LIST(filteredParams),
  })
}

//* 공지 상세 조회
export const fetchSpecificNotice = async (notice_id: string) => {
  return httpClient({
    method: 'get',
    endPoint: END_POINT.USER.GET_SPECIFIC_NOTICE(notice_id),
  })
}

//* 공지 추가
export const postAddNotice = async (params: AddNoticeParams) => {
  // const formData = new FormData()
  const formData = convertFormData({ params, excludeKeys: ['upload_files'] })

  if (params.upload_files) {
    params.upload_files.forEach((file) => {
      formData.append('upload_files', file, file.name) // 파일 객체의 name 속성 사용
      formData.append('upload_file_names', file.name) // 파일 객체의 name 속성 사용
    })
  }

  return httpClient({
    method: 'post',
    endPoint: END_POINT.USER.ADD_NOTICE,
    data: formData, // FormData 인스턴스를 data로 설정
  })
}

//* 승선원 구분 조회
export const fetchCrewLevel = async () => {
  return httpClient({
    method: 'get',
    endPoint: END_POINT.USER.GET_CREW_LEVEL,
  })
}

//* 업체 목록 조회
export const fetchCompanyList = async () => {
  return httpClient({
    method: 'get',
    endPoint: END_POINT.USER.GET_COMPANY_LIST,
  })
}

//* 워치 목록 조회
export const fetchWatches = async (params: { ship_id: number }) => {
  return httpClient({
    method: 'get',
    endPoint: END_POINT.USER.GET_WATCHES(params),
  })
}

//* 워치 상세 조회
export const fetchWatchInfo = async (params: { user_id: number }) => {
  return httpClient({
    method: 'get',
    endPoint: END_POINT.USER.GET_USER_WATCH_INFO(params),
  })
}
