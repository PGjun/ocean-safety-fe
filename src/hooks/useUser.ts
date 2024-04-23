import { roles } from '@/constants/roles'
import { User } from '@/types/user'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

export const useUser = () => {
  const { data } = useSession()

  const [user, setUser] = useState<User | undefined>(undefined)
  const [role, setRole] = useState('')

  useEffect(() => {
    if (data) {
      const userSession = data?.user as User

      setUser(userSession)
      setRole(roles[roles[userSession.crew_level]])
    }
  }, [data])

  return { user, role }
}
