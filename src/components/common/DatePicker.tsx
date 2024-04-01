import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { ko } from 'date-fns/locale'
import moment from 'moment'
import { Control, Controller } from 'react-hook-form'
import { CommonIcon } from '../SvgIcons'

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
