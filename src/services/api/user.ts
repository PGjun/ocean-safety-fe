import { httpClient } from '../config/api-conf'
import { END_POINT } from '../config/end-point'

// export const fetchUserInfo = async () => {
//   return httpClient({
//     method: 'get',
//     endPoint: END_POINT.BASE.USER,
//     clientType: 'auth',
//   })
// }

// export const updateUserInfo = async (idUsr: string, data: object) => {
//   return httpClient({
//     method: 'put',
//     endPoint: END_POINT.BASE.USER_EDIT(idUsr),
//     clientType: 'auth',
//     data,
//   })
// }

export interface LoginParams {
  id: string
  password: string
}

export const postUserLogin = async (params: LoginParams) => {
  return httpClient({
    method: 'post',
    endPoint: END_POINT.LOGIN,
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
    endPoint: END_POINT.ADD_SHIP,
    data: formData, // FormData 인스턴스를 data로 설정
  })
}

export interface ShipInfoParams extends addShipParams {
  id: number
}

export const fetchShipInfo = async (shipId: number) => {
  return httpClient({
    method: 'get',
    endPoint: END_POINT.GET_SHIP_INFO(shipId),
  })
}

export const fetchShipList = async (groupId: string) => {
  return httpClient({
    method: 'get',
    endPoint: END_POINT.GET_SHIP_LIST(groupId),
  })
}

export interface User {
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
  crewlevel: number
  user_id: string
  group_id: number
  ship_name: string
  ship_number?: string
  nationality?: string
  inter_tonnage?: number
  weight_tonnage?: number
  reg_classname?: string
  launch_date?: string
  shipyard?: string
  ship_owner?: string
  business_name?: string
  ship_lessee?: string
  rental_period?: string
}

export const fetchUserInfo = async (userId: number) => {
  return httpClient({
    method: 'get',
    endPoint: END_POINT.GET_USER_INFO(userId),
  })
}

export const fetchUserList = async (shipId: number) => {
  return httpClient({
    method: 'get',
    endPoint: END_POINT.GET_USER_LIST(shipId),
  })
}
