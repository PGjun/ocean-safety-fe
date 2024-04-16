import { useMediaQuery } from '@/hooks/useMediaQuery'
import { FormEventHandler, ReactNode } from 'react'
import { CommonIcon } from '../SvgIcons'
import { Control } from 'react-hook-form'
import { SearchParams } from './Pagination'

interface GenericSearchForm {
  searchFields: {
    name: string
    component: ({
      control,
      value,
      name,
    }: {
      control: Control
      value?: string | object | undefined
      name: string
    }) => ReactNode
    width: number
  }[]
  searchParams: SearchParams
  handleSubmit: (onSubmit: any) => FormEventHandler
  onSubmit: (data: any) => void
  control: Control
}

export const GenericSearchForm = ({
  searchFields,
  searchParams,
  handleSubmit,
  onSubmit,
  control,
}: GenericSearchForm) => {
  const isMobile = useMediaQuery('768')

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mt-[10px] flex flex-col gap-[8px] border border-[#E9ECEF] bg-[#F8F9FA] p-[28px] md:flex-row">
        <div className="grid gap-[8px] md:grid-cols-[repeat(6,auto)]">
          {searchFields.map((field, index) => {
            const value = searchParams[field.name]
            return (
              <div
                key={index}
                className="w-full"
                style={{ width: isMobile ? '100%' : field.width }}
              >
                <field.component
                  control={control}
                  {...field}
                  value={value}
                  name={field.name}
                />
              </div>
            )
          })}
          <button className="flex items-center justify-center gap-[8px] rounded bg-[#333333] px-[28px] py-[10px] text-[16px] text-white md:text-[18px]">
            <CommonIcon.Search /> 검색
          </button>
        </div>
      </div>
    </form>
  )
}
