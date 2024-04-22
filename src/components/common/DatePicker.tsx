import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { ko } from 'date-fns/locale'
import moment from 'moment'
import { Control, Controller } from 'react-hook-form'
import { CommonIcon } from '../SvgIcons'
import { ReactNode, useState } from 'react'

interface DatePickerSingle {
  name: string
  label: string
  control: Control<any>
  [key: string]: any // 나머지 속성은 어떤 속성이든 허용
}

const CustomInput = (props: any, _: any) => {
  return <input {...props} type="text" className="w-full" />
}

export const DatePickerSingle = ({
  name = '',
  label = '',
  control,
  ...rest
}: DatePickerSingle) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <div className="">
          <label htmlFor={name} className="text-[12px] font-bold">
            {label}
          </label>
          <div className="flex w-full items-center justify-between rounded border border-[#C4C4C4] px-[15px] py-[10px] text-[14px]">
            <DatePicker
              customInput={<CustomInput />}
              {...rest}
              locale={ko}
              placeholderText="날짜 선택"
              dateFormat={'yyyy-MM-dd'}
              selected={
                field.value ? moment(field.value, 'YYYY-MM-DD').toDate() : null
              }
              onChange={(e: any) =>
                field.onChange(moment(e).format('YYYY-MM-DD'))
              }
            />
            <CommonIcon.Date />
          </div>
        </div>
      )}
    ></Controller>
  )
}

const CustomInput2 = (props: any, _: any) => {
  return (
    <input
      {...props}
      type="text"
      className="w-full text-[14px] outline-none placeholder:text-[#C4C4C4]"
    />
  )
}

interface DatePickerProps {
  control?: Control
  name?: string
  label?: string
  placeholder?: string
  children?: ReactNode
  value?: string | object
  field?: any
}

export const DatePickerRange = ({
  name,
  placeholder,
  field,
}: DatePickerProps) => {
  const onChange = (dates: any) => {
    const [start, end] = dates
    field.onChange({ start, end })
  }
  return (
    <DatePicker
      customInput={<CustomInput2 id={name} />}
      selected={field.value.start}
      locale={ko}
      placeholderText={placeholder}
      dateFormat={'yy.MM.dd'}
      startDate={field.value.start}
      endDate={field.value.end}
      onChange={onChange}
      selectsRange
    />
  )
}

export const DatePickerWrapper = ({
  name,
  label,
  children,
}: DatePickerProps) => {
  return (
    <label
      htmlFor={name}
      className="flex flex-col rounded border border-[#DEE2E6] bg-white px-[1rem] py-[0.7rem]"
    >
      <div className="text-[14px] font-bold md:text-[12px]">{label}</div>
      <div className="flex h-[21px] items-center">
        {children}
        <div className="h-[21px]">
          <CommonIcon.SearchDate />
        </div>
      </div>
    </label>
  )
}

export const DatePickerController = ({
  control,
  name,
  label,
  placeholder,
}: DatePickerProps) => {
  return (
    <Controller
      control={control}
      name={name ? name : ''}
      defaultValue={{ start: '', end: '' }}
      render={({ field }) => {
        return (
          <DatePickerWrapper label={label}>
            <DatePickerRange
              name={name}
              placeholder={placeholder}
              field={field}
            />
          </DatePickerWrapper>
        )
      }}
    />
  )
}

export const DateComponent = {
  DatePickerSingle,
  DatePickerRange,
  DatePickerController,
}
