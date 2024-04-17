import { useEffect, useState } from 'react'

interface User {
  address: string
  age: number
  birth: string
  company_name: string
  crew_level: string
  email: string
  gender: string
  group_id: number
  group_name: string
  id: number
  join_date: null | string
  phone: string
  road_name: string
  ship_id: number
  ship_name: string
  user_id: string
  zip_code: number
}

export const useUser = () => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo')
    if (userInfo) {
      setUser(JSON.parse(userInfo))
    }
  }, [])

  return user
}
