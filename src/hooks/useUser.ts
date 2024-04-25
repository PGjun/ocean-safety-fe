import { roles } from '@/constants/roles'
import { UserLoginData } from '@/types/responseData'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

export const useUser = () => {
  const { data } = useSession()

  const [user, setUser] = useState<UserLoginData | undefined>(undefined)
  const [role, setRole] = useState('')

  useEffect(() => {
    if (data) {
      const userSession = data?.user as UserLoginData

      setUser(userSession)
      setRole(roles[userSession.crew_level])
    }
  }, [data])

  return { user, role }
}
