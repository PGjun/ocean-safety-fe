import { Control } from 'react-hook-form'
import { FieldController, NumberFieldController } from './Controller'
import { DatePickerSingleController } from '../common/DatePicker'
import { ShipForm } from '@/app/(page)/groupinfo/shipedit/page'

export const ShipInputForm = ({
  control,
  fields,
}: {
  control: Control<any>
  fields: ShipForm
}) => {
  return (
    <div className="mt-[10px] grid gap-[16px] md:mx-[10px] md:grid-cols-3 md:gap-[32px]">
      <FieldController
        control={control}
        name={fields.ship_number}
        label="선박번호"
        placeholder="선박번호을 입력하세요."
      />
      <FieldController
        control={control}
        name={fields.ship_name}
        label="선박명"
        placeholder="선박명을 입력하세요."
      />
      <FieldController
        control={control}
        name={fields.nationality}
        label="선적항(국적)"
        placeholder="선적항(국적)을 입력하세요."
      />
      <NumberFieldController
        control={control}
        name={fields.inter_tonnage}
        label="국제총톤수"
        placeholder="국제총톤수를 입력하세요."
        maxLength={20}
      />
      <NumberFieldController
        control={control}
        name={fields.weight_tonnage}
        label="재화중량톤수"
        placeholder="재화중량톤수를 입력하세요."
        maxLength={20}
      />
      <FieldController
        control={control}
        name={fields.reg_classname}
        label="등록선급명"
        placeholder="등록선급명을 입력하세요."
      />
      <DatePickerSingleController
        control={control}
        name={fields.launch_date}
        label="진수일"
        placeholder="날짜 선택"
      />
      <FieldController
        control={control}
        name={fields.shipyard}
        label="조선소"
        placeholder="조선소을 입력하세요."
      />
      <FieldController
        control={control}
        name={fields.ship_owner}
        label="선박소유자"
        placeholder="선박소유자을 입력하세요."
      />
      <FieldController
        control={control}
        name={fields.business_name}
        label="사업자명"
        placeholder="사업자명을 입력하세요."
      />
      <FieldController
        control={control}
        name={fields.ship_lessee}
        label="선박임차인"
        placeholder="선박임차인을 입력하세요."
      />
      <DatePickerSingleController
        control={control}
        name={fields.rental_period}
        label="임차기간"
        placeholder="날짜 선택"
      />
    </div>
  )
}
