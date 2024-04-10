import { fetchUserInfo } from '@/services/api/user'
import { useEffect, useState } from 'react'

const userDetails = [
  { name: 'name', title: '이름', content: '이름' },
  { name: 'user_id', title: '사용자 ID', content: 'Safety1' },
  { name: 'phone', title: '연락처', content: '010-1234-1234' },
  { name: 'birth', title: '생년월일', content: '1995-02-26' },
  { name: 'age', title: '나이', content: '30' },
  { name: 'gender', title: '성별', content: '남' },
  { name: 'zip_code', title: '우편번호', content: '55555' },
  { name: 'road_name', title: '도로명 주소', content: '부천시 은성로' },
  { name: 'address', title: '상세주소', content: '99-99 999호' },
  { name: '', title: '소속 업체', content: '제이디아이' },
  { name: '', title: '사전 예방 안전교육 이수 여부', content: 'O' },
  { name: '', title: '마지막 이수 일자', content: '2024-03-01' },
  { name: '', title: '승선원 구분', content: '승선원' },
  { name: 'join_date', title: '승선원 가입일', content: '2024-03-01' },
  { name: '', title: '소속 그룹', content: '항해' },
  { name: '', title: '개인정보제공동의 여부', content: 'O' },
  { name: '', title: '개인정보제공 등의 일', content: '2024-03-18' },
  { name: '', title: '승무원 탈퇴 여부', content: 'X' },
]

export const CrewDetail = ({ userId }: { userId: number | null }) => {
  const [detail, setDetail] = useState([{ name: '', title: '', content: '' }])

  useEffect(() => {
    const fetchUserDetail = async () => {
      if (userId === null) return

      const res = await fetchUserInfo(userId)

      if (res?.status === 200) {
        const updatedUserDetails = userDetails.map((item) => {
          const apiValue = res.data[item.name] // title에 해당하는 API 응답 데이터를 찾음
          return {
            ...item,
            content: apiValue ? apiValue : item.content, // API 응답에 해당 데이터가 있다면 업데이트, 없으면 기존 값 유지
          }
        })
        setDetail(updatedUserDetails)
      }
    }
    fetchUserDetail()
  }, [userId])

  return (
    <div className="mt-[10px] p-[10px] md:grid md:grid-cols-3 md:gap-x-[32px] md:gap-y-[16px]">
      {detail &&
        detail.map((item, idx) => {
          return (
            <div key={idx}>
              <div className="mt-[12px] text-[12px] font-bold">
                {item.title}
              </div>
              <div className="rounded bg-[#F8F9FA] p-[8px] text-[14px]">
                {item.content}
              </div>
            </div>
          )
        })}
    </div>
  )
}
