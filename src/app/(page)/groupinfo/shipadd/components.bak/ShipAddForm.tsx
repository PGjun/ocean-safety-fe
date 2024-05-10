import { DatePickerSingleController } from '@/components/common/DatePicker'
import { Control, Controller } from 'react-hook-form'

interface Field {
  control: Control<any>
  name: string
  label: string
  currentValue?: string
  defaultValue?: string
  placeholder?: string
}

// 기본 필드와 커스텀 필드 컴포넌트 정의
const Field = ({ control, name, label, placeholder }: Field) => (
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
        />
      </div>
    )}
  />
)

// 필드 설정을 포함한 배열 정의
export const groupFields = [
  {
    name: 'ship_number',
    label: '선박번호',
    placeholder: '선박번호를 입력하세요.',
    defaultValue: '',
    component: Field,
  },
  {
    name: 'ship_name',
    label: '선박명',
    placeholder: '선박명을 입력하세요.',
    defaultValue: '',
    component: Field,
  },
  {
    name: 'nationality',
    label: '선적항(국적)',
    placeholder: '선적항(국적)을 입력하세요.',
    defaultValue: '',
    component: Field,
  },
  {
    name: 'inter_tonnage',
    label: '국제총톤수',
    placeholder: '국제총톤수를 입력하세요.',
    defaultValue: '',
    component: Field,
  },
  {
    name: 'weight_tonnage',
    label: '재화중량톤수',
    placeholder: '재화중량톤수를 입력하세요',
    defaultValue: '',
    component: Field,
  },
  {
    name: 'reg_classname',
    label: '등록선급명',
    placeholder: '등록선급명을 입력하세요',
    defaultValue: '',
    component: Field,
  },
  {
    name: 'launch_date',
    label: '진수일',
    placeholder: '진수일을 입력하세요',
    defaultValue: '',
    component: DatePickerSingleController,
  },
  {
    name: 'shipyard',
    label: '조선소',
    placeholder: '조선소를 입력하세요',
    defaultValue: '',
    component: Field,
  },
  {
    name: 'ship_owner',
    label: '선박소유자',
    placeholder: '선박소유자를 입력하세요',
    defaultValue: '',
    component: Field,
  },
  {
    name: 'business_name',
    label: '사업자명',
    placeholder: '사업자명을 입력하세요',
    defaultValue: '',
    component: Field,
  },
  {
    name: 'ship_lessee',
    label: '선박임차인',
    placeholder: '선박임차인을 입력하세요',
    defaultValue: '',
    component: Field,
  },
  {
    name: 'rental_period',
    label: '임차기간',
    placeholder: '임차기간을 입력하세요',
    defaultValue: '',
    component: DatePickerSingleController,
  },
]

export const ShipAddForm = ({ control }: { control: Control<any> }) => {
  return (
    <div className="mt-[10px] grid gap-[16px] md:grid-cols-3 md:gap-[32px]">
      <>
        {groupFields.map((field, index) => {
          return <field.component key={index} control={control} {...field} />
        })}
      </>
    </div>
  )
}
