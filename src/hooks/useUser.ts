import { roles } from '@/constants/roles'
import { User } from '@/types/user'
import { useEffect, useState } from 'react'

export const useUser = () => {
  const [user, setUser] = useState<User | null>(null)

  const [role, setRole] = useState('')

  useEffect(() => {
    const userInfo: any = localStorage.getItem('userInfo')
    const parseUserInfo = JSON.parse(userInfo)
    if (userInfo) {
      setUser(parseUserInfo)
      setRole(roles[parseUserInfo.crew_level])
    }
  }, [])

  return { user, role }
}
