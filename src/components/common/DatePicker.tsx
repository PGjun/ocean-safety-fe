import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { ko } from 'date-fns/locale'
import moment from 'moment'
import { Controller } from 'react-hook-form'
import { CommonIcon } from '../SvgIcons'
import { forwardRef } from 'react'
import {
  DatePickerControllerProps,
  DatePickerRangeProps,
  DatePickerSingleProps,
  DatePickerWrapperProps,
} from '@/types/datePicker'

const CustomInput = forwardRef((props: any, _: any) => {
  return <input {...props} type="text" className="w-full outline-none" />
})

const RangeCustomInput = forwardRef((props: any, _: any) => {
  return (
    <input
      {...props}
      type="text"
      className="w-full text-[14px] outline-none placeholder:text-[#C4C4C4]"
    />
  )
})

CustomInput.displayName = 'CustomInput'
RangeCustomInput.displayName = 'RangeCustomInput'

export const DatePickerSingle = ({
  name,
  placeholder,
  field,
}: DatePickerSingleProps) => {
  return (
    <DatePicker
      customInput={<CustomInput id={name} />}
      locale={ko}
      placeholderText={placeholder}
      dateFormat={'yyyy-MM-dd'}
      selected={field.value ? moment(field.value, 'YYYY-MM-DD').toDate() : null}
      onChange={(date: any) => field.onChange(date)}
    />
  )
}

export const DatePickerRange = ({
  name,
  placeholder,
  field,
}: DatePickerRangeProps) => {
  const onChange = (dates: any) => {
    const [start, end] = dates
    field.onChange({ start, end })
  }
  return (
    <DatePicker
      customInput={<RangeCustomInput id={name} />}
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

export const DatePickerSingleWrapper = ({
  name,
  label,
  children,
}: DatePickerWrapperProps) => {
  return (
    <label htmlFor={name} className="group">
      <div className="text-[12px] font-bold leading-[24px]">{label}</div>
      <div className="flex w-full items-center justify-between rounded border border-[#C4C4C4] px-[15px] py-[10px] text-[14px] outline-1 focus-within:border-black focus-within:outline">
        {children}
        <div className="flex h-[21px] items-center">
          <CommonIcon.Date />
        </div>
      </div>
    </label>
  )
}

export const DatePickerRangeWrapper = ({
  name,
  label,
  children,
}: DatePickerWrapperProps) => {
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

export const DatePickerSingleController = ({
  control,
  name,
  label,
  placeholder,
}: DatePickerControllerProps) => {
  return (
    <Controller
      control={control}
      name={name ? name : ''}
      rules={{ required: true }}
      defaultValue={{ start: '', end: '' }}
      render={({ field }) => {
        return (
          <DatePickerSingleWrapper label={label}>
            <DatePickerSingle
              name={name}
              placeholder={placeholder}
              field={field}
            />
          </DatePickerSingleWrapper>
        )
      }}
    />
  )
}

export const DatePickerRangeController = ({
  control,
  name,
  label,
  placeholder,
}: DatePickerControllerProps) => {
  return (
    <Controller
      control={control}
      name={name ? name : ''}
      defaultValue={{ start: '', end: '' }}
      render={({ field }) => {
        return (
          <DatePickerRangeWrapper label={label}>
            <DatePickerRange
              name={name}
              placeholder={placeholder}
              field={field}
            />
          </DatePickerRangeWrapper>
        )
      }}
    />
  )
}
