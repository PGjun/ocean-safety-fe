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
      setUserInfo(res?.data)
    }

    getUserInfo()
  }, [userId])
  return <CrewAddPage userInfo={userInfo} type="수정" />
}
