//! 요청값 타입

export interface LoginParams {
  id: string
  password: string
}

export interface AddShipParams {
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

export interface FetchShipListParams {
  group_id: string
  ship_id: number
  page_num: string
  item_count: string
  search_group?: string
  search_ship?: string
}
//----

export interface FetchUserListParams {
  group_id: number
  ship_id: number
  page_num?: number
  item_count?: number
  search_name?: string
  search_phone?: string
  noFilter?: boolean
}

export interface FetchUserNameListParams {
  group_id: number
  ship_id: number
}

export interface UserHealthListParams {
  group_id: string
  ship_id?: string
  user_id?: string
  page_num: string
  item_count: string
  search_group?: string
  search_ship?: string
  search_name?: string
  search_start_date?: string
  search_end_date?: string
  noFilter?: boolean
}

export interface UserSpecificHealthParams {
  user_id: number //user_index
  search_start_datetime: string
  search_end_datetime: string
}

export interface HealthWarningParams {
  ship_id: number
  min_heartrate: number
  max_heartrate: number
  min_skin_temperature: number
  max_skin_temperature: number
  min_battery: number
  min_SPO2: number
}

export interface UserEmergencyListParams {
  group_id: string
  ship_id: string
  page_num: string
  item_count: string
  search_name?: string
  search_code?: string
  search_status?: string
  search_start_date?: string
  search_end_date?: string
  noFilter?: boolean
}

export interface UserOwnEmergencyListParams {
  user_index: number
  page_num: string
  item_count: string
}

export interface ModifyEmergencyCall {
  emergency_id: number
  status: string
  content: string
}

export interface NoticeListParams {
  group_id?: string
  ship_id?: string
  page_num: string
  item_count: string
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
