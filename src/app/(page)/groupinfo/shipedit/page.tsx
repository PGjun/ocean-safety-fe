'use client'

import { ShipInputForm } from '@/components/form/ShipInputForm'
import { PageProps } from '@/types/common'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

export interface ShipForm {
  ship_number: string
  ship_name: string
  nationality: string
  inter_tonnage: string
  weight_tonnage: string
  reg_classname: string
  launch_date: any
  shipyard: string
  ship_owner: string
  business_name: string
  ship_lessee: string
  rental_period: any
}

export default function ShipEditPage(props: PageProps<{ ship_id: number }>) {
  const fieldValues: ShipForm = {
    ship_number: '',
    ship_name: '',
    nationality: '',
    inter_tonnage: '',
    weight_tonnage: '',
    reg_classname: '',
    launch_date: '',
    shipyard: '',
    ship_owner: '',
    business_name: '',
    ship_lessee: '',
    rental_period: '',
  }

  const router = useRouter()
  const { control, handleSubmit } = useForm({
    defaultValues: fieldValues,
  })

  const onSubmit = async (data: any) => {
    console.log(data)
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="md:mx-[40px]">
      <div className="text-[22px] font-bold">그룹(선박) 수정</div>
      <ShipInputForm control={control} fields={fieldValues} />
      <div className="my-[30px] h-[1px] w-full bg-[#DEE2E6]" />
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
  )
}