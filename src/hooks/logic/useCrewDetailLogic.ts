import { fetchUserInfo } from '@/services/api/user'
import { useEffect, useState } from 'react'

const fieldsAttr = {
  crew: [
    { name: 'name', title: '이름', content: '' },
    { name: 'user_id', title: '사용자 ID', content: '' },
    { name: 'phone', title: '연락처', content: '' },
    { name: 'birth', title: '생년월일', content: '' },
    { name: 'age', title: '나이', content: '' },
    { name: 'gender', title: '성별', content: '' },
    { name: 'zip_code', title: '우편번호', content: '' },
    { name: 'road_name', title: '도로명 주소', content: '' },
    { name: 'address', title: '상세주소', content: '' },
    { name: 'company_name', title: '소속 업체', content: '' },
    {
      name: 'safety_training_status',
      title: '사전 예방 안전교육 이수 여부',
      content: '',
    },
    { name: 'training_date', title: '마지막 이수 일자', content: '' },
    { name: 'crew_level', title: '승선원 구분', content: '' },
    { name: 'join_date', title: '승선원 가입일', content: '' },
    { name: 'group_name', title: '소속 그룹', content: '' },
    {
      name: 'personal_agreement_status',
      title: '개인정보제공동의 여부',
      content: '',
    },
    {
      name: 'personal_agreement_date',
      title: '개인정보제공 등의 일',
      content: '',
    },
    { name: 'withdraw', title: '승무원 탈퇴 여부', content: '' },
  ],
  group: [
    { name: 'group_name', title: '그룹명', content: '' },
    { name: 'ship_name', title: '선박명', content: '' },
    { name: 'ship_owner', title: '선박 소유자', content: '' },
    { name: 'business_name', title: '사업자명', content: '' },
    { name: 'inter_tonnage', title: '국제 총톤수', content: '' },
    { name: 'weight_tonnage', title: '재화 중량 톤수', content: '' },
  ],
}

export const useUserInfoLogic = ({
  userId,
  type,
}: {
  userId: number | null
  type: 'crew' | 'group'
}) => {
  const [userInfos, setUserInfos] = useState([
    { name: '', title: '', content: '' },
  ])

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchUserDetail = async () => {
      if (userId === null) return
      setLoading(true)

      const res = await fetchUserInfo(userId)

      if (res?.status === 200) {
        const updatedUserDetails = fieldsAttr[type].map((item) => {
          let apiValue = res.data[item.name] ?? item.content // 기본값으로 현재 item의 content 사용

          switch (item.name) {
            case 'gender':
              apiValue = res.data.gender === 1 ? '남' : '여'
              break
            case 'safety_training_status':
              apiValue = res.data.safety_training_status === 'Y' ? 'O' : 'X'
              break
            case 'personal_agreement_status':
              apiValue = res.data.personal_agreement_status === 'Y' ? 'O' : 'X'
              break
            case 'withdraw':
              apiValue = res.data.withdraw === 'Y' ? 'O' : 'X'
              break
            case 'inter_tonnage':
              apiValue = res.data.inter_tonnage.toLocaleString()
              break
            case 'weight_tonnage':
              apiValue = res.data.weight_tonnage.toLocaleString()
              break
            default:
              break
          }

          return {
            ...item,
            content: apiValue, // 업데이트된 값을 content에 할당
          }
        })

        setUserInfos(updatedUserDetails)
        setLoading(false)
      }
    }
    fetchUserDetail()
  }, [type, userId])

  return { userInfos, loading }
}
