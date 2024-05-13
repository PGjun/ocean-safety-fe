'use client'

import { useEffect, useState } from 'react'
import { PageProps } from '@/types/common'
import {
  editUser,
  fetchCompanyList,
  fetchCrewLevel,
  fetchShipNameList,
  fetchUserInfo,
} from '@/services/api/user'
import { useForm } from 'react-hook-form'
import { CrewInputForm } from '@/components/form/CrewInputForm'
import moment from 'moment'
import { useUser } from '@/hooks/useUser'
import { ROLES } from '@/constants/roles'
import { PATHS } from '@/constants/paths'
import { useRouter } from 'next/navigation'

const editDefaultValues: any = {
  name: '',
  user_id: '',
  // password: '',
  phone: '',
  birth: '',
  age: '',
  gender: '',
  zipcode: '',
  roadname: '',
  address: '',
  company_id: '',
  safety_training: '',
  safety_training_date: '',
  crewlevel: '',
  join_date: '',
  personal_agreement: '',
  personal_agreement_date: '',
}

export default function CrewEditPage(props: PageProps<{ user_id: number }>) {
  const { handleSubmit, control, setValue, watch } = useForm({
    defaultValues: editDefaultValues,
  })
  const router = useRouter()
  const userId = props.searchParams.user_id
  const { user, role } = useUser()
  const [crewLevels, setCrewLevels] = useState<[]>()
  const [companies, setCompanies] = useState()
  const [ships, setShips] = useState()
  const [shipId, setShipId] = useState()

  const brithField = watch('birth')

  const onSubmit = async (data: any) => {
    const formattedData = {
      ...data,
      age: parseInt(data.age, 10), // 나이를 숫자로 변환
      zipcode: parseInt(data.zipcode, 10), // 우편번호를 숫자로 변환
      birth: moment(data.birth).format('YYYY-MM-DD'), // 날짜를 문자열로 포맷
      join_date: moment(data.join_date).format('YYYY-MM-DD'), // 날짜를 문자열로 포맷
      company_id: data.company_id.value, // company_id에서 value 추출
      crewlevel: data.crewlevel.value, // crewlevel에서 value 추출
      ship_id: shipId, // ship_id에서 value 추출
      personal_agreement: data.personal_agreement === 'Y', // 'Y'이면 true, 아니면 false
      safety_training: data.safety_training === 'Y', // 'Y'이면 true, 아니면 false
    }
    // personal_agreement가 false이면 관련 날짜 제거
    if (!formattedData.personal_agreement) {
      delete formattedData.personal_agreement_date
    } else {
      formattedData.personal_agreement_date = moment(
        data.personal_agreement_date,
      ).format('YYYY-MM-DD')
    }

    // safety_training가 false이면 관련 날짜 제거
    if (!formattedData.safety_training) {
      delete formattedData.safety_training_date
    } else {
      formattedData.safety_training_date = moment(
        data.safety_training_date,
      ).format('YYYY-MM-DD')
    }

    const res = await editUser(formattedData, { user_index: userId })
    if (res) {
      alert('유저 수정 성공!')
      router.push(PATHS.CREW_INFO())
    }
  }

  //나이 자동 설정
  useEffect(() => {
    const today = moment()
    const age = today.diff(brithField, 'years')

    if (brithField) {
      setValue('age', age)
    }
  }, [setValue, brithField])

  //! 1
  useEffect(() => {
    if (!user || (crewLevels && crewLevels.length > 0)) return
    const getCrewLevel = async () => {
      const res = await fetchCrewLevel()

      const resData = res?.data.data.map((item: any) => ({
        value: item.id,
        label: item.crew_level,
      }))

      let roleFilterData = resData

      if (role === ROLES.SHIP) {
        roleFilterData = resData.filter((item: any) => item.value === 4)
      }
      if (role === ROLES.GROUP) {
        roleFilterData = resData.filter(
          (item: any) => item.value !== 1 && item.value !== 2,
        )
      }

      const sortLevels = roleFilterData.sort(
        (a: any, b: any) => a.value - b.value,
      )

      setCrewLevels(sortLevels)
    }
    const getCompanyList = async () => {
      const res = await fetchCompanyList()
      setCompanies(
        res?.data.data.map((item: any) => ({
          value: item.id,
          label: item.company_name,
        })),
      )
    }
    const getShipList = async () => {
      const res = await fetchShipNameList({
        group_id: user?.group_id.toString(),
      })
      setShips(
        res?.data.data.map((item: any) => ({
          value: item.ship_id,
          label: item.ship_name,
        })),
      )
    }
    getCrewLevel()
    getCompanyList()
    getShipList()
  }, [user, role])

  //! 2
  useEffect(() => {
    if (!crewLevels || !companies) return
    const getUserInfo = async () => {
      const res = await fetchUserInfo(userId)
      if (res?.status !== 200) return
      const resData = res.data

      if (resData.gender === 1) {
        resData.gender = '남'
      } else if (resData.gender === 2) {
        resData.gender = '여'
      }

      resData.roadname = resData.road_name
      resData.zipcode = resData.zip_code
      resData.safety_training_date = resData.training_date
      resData.safety_training = resData.safety_training_status
      resData.personal_agreement = resData.personal_agreement_status
      resData.crewlevel = (crewLevels as any).find(
        (item: any) => item.label === resData.crew_level,
      )
      resData.company_id = (companies as any).find(
        (item: any) => item.label === resData.company_name,
      )

      Object.keys(editDefaultValues).forEach((key) => {
        setValue(key, resData[key] || editDefaultValues[key])
      })

      setShipId(resData.ship_id)
    }

    getUserInfo()
  }, [setValue, crewLevels, companies, userId])

  return (
    <div className="md:mx-[40px]">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="text-[22px] font-bold">승선원 수정</div>
        <div className="mt-[20px] font-bold">승선원 내역</div>
        <CrewInputForm
          control={control}
          dropDatas={{ crewLevels, companies, ships }}
        />
        <div className="mt-[30px] flex justify-center gap-[5px] md:mt-[60px]">
          <button
            onClick={() => router.back()}
            type="button"
            className="rounded border border-[#C4C4C4] bg-[#DEE2E6] px-[36px] py-[10px] text-[14px] font-bold md:py-[15px] md:text-[18px]"
          >
            취소
          </button>
          <button
            type="submit"
            className="flex-1 rounded border border-[#333333] bg-[#333333] px-[36px] py-[10px] text-[14px] font-bold text-white md:flex-none md:py-[15px] md:text-[18px]"
          >
            수정
          </button>
        </div>
      </form>
    </div>
  )
}
