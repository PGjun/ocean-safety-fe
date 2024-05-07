'use client'

import { useEffect, useState } from 'react'
import CrewAddPage from '../crewadd/page'
import { PageProps } from '@/types/common'
import { fetchUserInfo } from '@/services/api/user'

export default function CrewEditPage(props: PageProps<{ user_id: number }>) {
  const userId = props.searchParams.user_id

  const [userInfo, setUserInfo] = useState()
  useEffect(() => {
    const getUserInfo = async () => {
      const res = await fetchUserInfo(userId)
      if (res?.status !== 200) return
      const resData = res.data
      console.log('🚀 ~ getUserInfo ~ resData:', resData)

      // gender 필드의 값에 따라 '남자' 또는 '여자'로 변환
      if (resData.gender === 1) {
        resData.gender = '남'
      } else if (resData.gender === 2) {
        resData.gender = '여'
      }

      resData.roadname = resData.road_name
      resData.zipcode = resData.zip_code
      resData.safety_training_date = resData.training_date
      delete resData.road_name
      delete resData.zip_code
      delete resData.training_date

      setUserInfo(resData)
    }

    getUserInfo()
  }, [userId])
  return <CrewAddPage userInfo={userInfo} type="수정" />
}
