import { Control, Controller } from 'react-hook-form'
import DropDown from '../common/DropDown'
import { DropItem } from '@/types/common'
import { formatPhoneNumber } from '@/utils/formatPhonNumber'

interface FieldControllerParams {
  control: Control<any>
  name: string
  label: string
  placeholder?: string
  disabled?: boolean
}

export const FieldController = ({
  control,
  name,
  label,
  placeholder,
  disabled = false,
}: FieldControllerParams) => (
  <Controller
    control={control}
    name={name}
    rules={{ required: true }}
    render={({ field }) => (
      <div>
        <label htmlFor={name} className="text-[12px] font-bold">
          {label}
        </label>
        <input
          {...field}
          value={field.value || ''}
          onChange={(e) => field.onChange(e.target.value)}
          id={name}
          type="text"
          className="block w-full rounded border border-[#C4C4C4] px-[15px] py-[10px] text-[14px]"
          placeholder={placeholder}
          disabled={disabled}
        />
      </div>
    )}
  />
)

export const PhoneController = ({
  control,
  name,
  label,
  placeholder,
}: FieldControllerParams) => (
  <Controller
    control={control}
    name={name}
    rules={{ required: true }}
    render={({ field }) => (
      <div>
        <label htmlFor={name} className="text-[12px] font-bold">
          {label}
        </label>
        <input
          {...field}
          value={formatPhoneNumber(field.value)}
          onChange={(e) => {
            // 입력값이 11자리를 초과하지 않도록 조정
            const formatted = formatPhoneNumber(e.target.value)
            if (formatted.replace(/[^0-9]/g, '').length <= 11) {
              field.onChange(formatted)
            }
          }}
          id={name}
          type="text"
          className="block w-full rounded border border-[#C4C4C4] px-[15px] py-[10px] text-[14px]"
          placeholder={placeholder}
        />
      </div>
    )}
  />
)

interface NumFieldControllerParams {
  control: Control<any>
  name: string
  label: string
  placeholder?: string
  maxLength: number
  disabled?: boolean
}

export const NumberFieldController = ({
  control,
  name,
  label,
  placeholder,
  maxLength,
  disabled = false,
}: NumFieldControllerParams) => (
  <Controller
    control={control}
    name={name}
    rules={{ required: true }}
    render={({ field }) => (
      <div>
        <label htmlFor={name} className="text-[12px] font-bold">
          {label}
        </label>
        <input
          {...field}
          value={field.value || ''}
          onChange={(e) => {
            if (!maxLength) return
            const newValue = e.target.value.replace(/\D/g, '') // 숫자만 허용
            if (newValue !== field.value && newValue.length <= maxLength) {
              // 길이 제한 검사
              field.onChange(newValue)
            }
          }}
          id={name}
          maxLength={maxLength}
          type="number"
          className="block w-full rounded border border-[#C4C4C4] px-[15px] py-[10px] text-[14px]"
          placeholder={placeholder}
          disabled={disabled}
        />
      </div>
    )}
  />
)

export const RadioFieldController = ({
  control,
  name,
  label,
}: FieldControllerParams) => {
  let value1 = ''
  let value2 = ''
  let text1 = ''
  let text2 = ''

  if (name === 'gender') {
    value1 = '남'
    value2 = '여'
    text1 = '남'
    text2 = '여'
  } else if (name === 'personal_agreement' || name === 'safety_training') {
    value1 = 'Y'
    value2 = 'N'
    text1 = 'o'
    text2 = 'x'
  }

  const common =
    'w-full rounded border py-[10px] text-center text-[14px] font-bold cursor-pointer'
  const normal = 'border-[#C4C4C4] text-[#333333]'
  const active = 'border-[#2262C6] bg-[#F3F5FF] text-[#2262C6]'
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <div className="">
          <label className="text-[12px] font-bold">{label}</label>
          <div className="flex gap-[5px]">
            <label
              htmlFor={name + value1}
              className={`${field.value === value1 ? active : normal} ${common}`}
            >
              {text1}
            </label>
            <input
              id={name + value1}
              type="radio"
              value={field.value}
              onChange={() => field.onChange(value1)}
              checked={field.value === value1}
              className="hidden"
            />
            <label
              htmlFor={name + value2}
              className={`${field.value === value2 ? active : normal} ${common}`}
            >
              {text2}
            </label>
            <input
              id={name + value2}
              type="radio"
              value={field.value}
              onChange={() => field.onChange(value2)}
              checked={field.value === value2}
              className="hidden"
            />
          </div>
        </div>
      )}
    />
  )
}

interface DropFieldControllerParams {
  control: Control<any>
  name: string
  label: string
  placeholder?: string
  dropData: DropItem[]
}

export const DropFieldController = ({
  control,
  name,
  label,
  placeholder,
  dropData,
}: DropFieldControllerParams) => (
  <Controller
    control={control}
    name={name}
    rules={{ required: true }}
    render={({ field }) => (
      <div>
        <label htmlFor={name} className="text-[12px] font-bold">
          {label}
        </label>
        <div className="block w-full rounded border border-[#C4C4C4] py-[10px] text-[14px]">
          <DropDown.Content
            fieldValue={field.value}
            fieldOnChange={field.onChange}
            id={name}
            dropData={dropData}
            placeholder={placeholder}
            type="between"
          />
        </div>
      </div>
    )}
  />
)
