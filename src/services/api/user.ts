import { convertFormData } from '@/utils/convertFormData'
import { httpClient } from '../config/api-conf'
import { END_POINT } from '../config/end-point'

export interface LoginParams {
  id: string
  password: string
}

export const postUserLogin = async (params: LoginParams) => {
  return httpClient({
    method: 'post',
    endPoint: END_POINT.USER.LOGIN,
    data: params,
  })
}

export interface addShipParams {
  group_id: number
  ship_name: string
  ship_number: number
  nationality: string
  inter_tonnage: number
  weight_tonnage: number
  reg_classname: string
  launch_date: string // 날짜 형식의 문자열입니다. 실제 사용시 Date 객체나 라이브러리(예: moment.js, date-fns)를 활용할 수 있습니다.
  shipyard: string
  ship_owner: string
  business_name: string
  ship_lessee: string
  rental_period: string // 날짜 형식의 문자열입니다.
  ship_drawing_img?: Blob // 바이너리 데이터를 담을 문자열, 선택적 필드로 표시
  ship_drawing_img_name?: string // 선택적 필드로 표시
}

export const postAddShip = async (params: addShipParams) => {
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

export interface ShipInfoParams extends addShipParams {
  id: number
  group_name: string
}

export const fetchShipInfo = async (shipId: number) => {
  return httpClient({
    method: 'get',
    endPoint: END_POINT.USER.GET_SHIP_INFO(shipId),
  })
}

export interface FetchShipListParams {
  group_id: string
  page_num: string
  item_count: string
  search_group?: string
  search_ship?: string
  ship_id?: number
}

export const fetchShipList = async (params: FetchShipListParams) => {
  return httpClient({
    method: 'get',
    endPoint: END_POINT.USER.GET_SHIP_LIST(params),
  })
}

export interface User extends ShipInfoParams {
  id: number
  name: string
  company_id: number
  email: string
  phone: string
  birth: string
  age: number
  gender: number
  zip_code: number
  road_name: string
  address: string
  join_date: string | null
  password: string
  created_at: string
  ship_id: number
  crew_level: number
  user_id: string
  user_index: number
}

export const fetchUserInfo = async (userId: number) => {
  return httpClient({
    method: 'get',
    endPoint: END_POINT.USER.GET_USER_INFO(userId),
  })
}

export interface FetchUserListParams {
  group_id: number
  ship_id: number
  page_num: number
  item_count: number
  search_name?: string
  search_phone?: string
}

export const fetchUserList = async (params: FetchUserListParams) => {
  return httpClient({
    method: 'get',
    endPoint: END_POINT.USER.GET_USER_LIST(params),
  })
}

export interface UserHealth extends User {
  blood_pressure: string
  health_date: string
  health_rate: number
  oxygen_saturation: number
  temperature: number
}

export interface UserHealthListParams {
  group_id: string
  page_num: string
  item_count: string
  user_id?: string
  ship_id?: string
  search_group?: string
  search_ship?: string
  search_name?: string
  search_start_date?: string
  search_end_date?: string
}

export const fetchUserHealthList = async (params: UserHealthListParams) => {
  return httpClient({
    method: 'get',
    endPoint: END_POINT.USER.GET_USER_HEALTH_LIST(params),
  })
}

export interface Location extends User {
  rssi: number
  scan_time: string
  beacon_uuid: string //Mac address?
}

export const fetchUserLocationList = async (shipId: number) => {
  return httpClient({
    method: 'get',
    endPoint: END_POINT.USER.GET_USER_LOCATION_LIST(shipId),
  })
}

export interface UserEmergencyListParams {
  group_id: string
  page_num: string
  item_count: string
  ship_id?: string
  search_name?: string
  search_code?: string
  search_status?: string
  search_start_date?: string
  search_end_date?: string
}

export interface UserEmergencyData {
  sos_id: number
  id: number
  name: string
  user_id: string
  phone: string
  sos_date: string
  longitude: number
  latitude: number
  emergency_code: string
  emergency_status_code: string
}

export const fetchUserEmergencyList = async (
  params: UserEmergencyListParams,
) => {
  return httpClient({
    method: 'get',
    endPoint: END_POINT.USER.GET_USER_EMERGENCY_LIST(params),
  })
}

export const fetchUserSpecificEmergency = async (sos_id: number) => {
  return httpClient({
    method: 'get',
    endPoint: END_POINT.USER.GET_USER_SPECIFIC_EMERGENCY(sos_id),
  })
}

export interface NoticeListParams {
  group_id: string
  page_num: string
  item_count: string
  ship_id?: string
}

export const fetchNoticeList = async (params: NoticeListParams) => {
  return httpClient({
    method: 'get',
    endPoint: END_POINT.USER.GET_NOTICE_LIST(params),
  })
}

export const fetchSpecificNotice = async (notice_id: string) => {
  return httpClient({
    method: 'get',
    endPoint: END_POINT.USER.GET_SPECIFIC_NOTICE(notice_id),
  })
}

export interface UserSpecificHealthParams {
  user_id: number //user_index
  search_start_datetime: string
  search_end_datetime: string
}

export interface AddNoticeParams {
  group_id: number
  ship_id?: number
  user_id: number
  title: string
  content: string
  upload_files?: File[]
  upload_file_names?: string[]
}

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

export const fetchUserSpecificHealth = async (
  params: UserSpecificHealthParams,
) => {
  return httpClient({
    method: 'get',
    endPoint: END_POINT.USER.GET_USER_SPECIFIC_HEALTH(params),
  })
}
