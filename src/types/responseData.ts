//! 반환값 타입

export interface UserLoginData {
  address: string
  age: number
  birth: string
  company_name: string
  crew_level: string
  email: string
  gender: string
  group_id: number
  group_name: string
  id: number
  join_date: string | null
  phone: string
  road_name: string
  ship_id: number
  ship_name: string
  user_id: string
  zip_code: number
}

export interface UserInfoData {
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
}

export interface ShipInfoData {
  id: number
  group_id: number
  ship_name: string
  ship_number: number
  nationality: string
  inter_tonnage: number
  weight_tonnage: number
  reg_classname: string
  launch_date: string
  shipyard: string
  ship_owner: string
  business_name: string
  ship_lessee: string
  rental_period: string
  created_at: string
  uuid: string
  group_name: string
  ship_drawings_name: string
  ship_drawings_url: string
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
  content: string
}

export interface LocationData {
  id: number
  beacon_uuid: string
  scan_time: string
  rssi: number
  user_id: string
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
  crewlevel: number
}

export interface UserHealthData {
  id: number
  name: string
  user_id: string
  user_index: number
  health_rate: number
  blood_pressure: string
  temperature: number
  oxygen_saturation: number
  health_date: string
  ship_name: string
  group_name: string
}

export interface HealthWarningData {
  id: number
  min_heartrate: number
  max_heartrate: number
  min_skin_temperature: number
  max_skin_temperature: number
  min_battery: number
  min_sp02: number
  ship_id: number
}
