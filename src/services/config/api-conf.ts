import axios from 'axios'

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
})

//공통 api처리 함수
interface httpClient {
  method: 'get' | 'post' | 'put' | 'delete'
  endPoint: string
  data?: object | FormData | null
}

export const httpClient = async ({
  method,
  endPoint,
  data = null,
}: httpClient) => {
  try {
    const res = await apiClient({
      method,
      url: endPoint,
      ...(data && { data }), // data가 null이 아닌 경우에만 객체에 추가
    })
    if (res.status === 200 || res.status === 201) return res
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 400) {
        alert(error.response.data.detail)
      } else {
        console.log(error.response?.data)
      }
    } else {
      //예외 에러 처리
      console.error('An unexpected error occurred:', error)
    }
  }
}
