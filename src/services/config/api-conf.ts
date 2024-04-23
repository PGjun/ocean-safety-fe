import axios, { AxiosError } from 'axios'

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
    // 성공적인 응답 처리
    if (res.status >= 200 && res.status < 300) {
      return res
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // 클라이언트 또는 서버 오류 처리
      handleAxiosError(error)
    } else {
      // 예외 에러 처리
      console.error('An unexpected error occurred:', error)
    }
  }
}

function handleAxiosError(error: AxiosError) {
  if (error.response) {
    console.error(
      `서버 응답 기반 오류 처리: ${error.response.status}`,
      error.response.data,
    )
    alertUserOfError(error.response.status, error.response.data)
  } else if (error.request) {
    console.error('요청은 이루어졌으나 응답을 받지 못함:', error.request)
  } else {
    console.error('요청 설정 중에 발생한 오류:', error.message)
  }
}

function alertUserOfError(status: number, data: any) {
  if (status === 400) {
    alert(data.detail || '...클라이언트 요청 에러')
  } else if (status === 401) {
    alert('...필요 인증 에러')
  } else if (status >= 500) {
    alert('...서버 에러')
  } else {
    alert('...예외 에러')
  }
}
