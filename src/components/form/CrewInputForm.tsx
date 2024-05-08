import { Control } from 'react-hook-form'
import {
  DropFieldController,
  FieldController,
  NumberFieldController,
  PhoneController,
  RadioFieldController,
} from './Controller'
import { DatePickerSingleController } from '../common/DatePicker'

export const CrewInputForm = ({
  control,
  dropDatas,
}: {
  control: Control<any>
  dropDatas: any
}) => {
  return (
    <div className="mt-[10px] grid gap-[16px] md:mx-[10px] md:grid-cols-3 md:gap-[32px]">
      <FieldController
        control={control}
        name="name"
        label="이름"
        placeholder="이름을 입력하세요."
      />
      <FieldController
        control={control}
        name="user_id"
        label="사용자 ID"
        placeholder="사용자 ID를 입력하세요."
        disabled
      />
      {/* <FieldController
        control={control}
        name="password"
        label="비밀번호"
        placeholder="비밀번호를 입력하세요."
      /> */}
      <PhoneController
        control={control}
        name="phone"
        label="연락처"
        placeholder="연락처를 입력하세요."
      />
      <DatePickerSingleController
        control={control}
        name="birth"
        label="생년월일"
        placeholder="날짜 선택"
      />
      <NumberFieldController
        control={control}
        name="age"
        label="나이"
        placeholder="나이를 입력하세요."
        maxLength={3}
        disabled
      />
      <RadioFieldController control={control} name="gender" label="성별" />
      <NumberFieldController
        control={control}
        name="zipcode"
        label="우편번호"
        placeholder="우편번호를 입력하세요."
        maxLength={10}
      />
      <FieldController
        control={control}
        name="roadname"
        label="도로명 주소"
        placeholder="도로명 주소를 입력하세요."
      />
      <FieldController
        control={control}
        name="address"
        label="상세 주소"
        placeholder="상세 주소를 입력하세요."
      />
      <DropFieldController
        control={control}
        name="company_id"
        label="소속 업체"
        placeholder="소속 업체를 입력하세요."
        dropData={dropDatas.companies}
      />
      <RadioFieldController
        control={control}
        name="safety_training"
        label="사전 예방 안전교육 이수 여부"
      />
      <DatePickerSingleController
        control={control}
        name="safety_training_date"
        label="마지막 이수 일자"
        placeholder="날짜 선택"
      />
      <DropFieldController
        control={control}
        name="crewlevel"
        label="승선원 구분"
        placeholder="승선원 구분를 입력하세요."
        dropData={dropDatas.crewLevels}
      />
      <DatePickerSingleController
        control={control}
        name="join_date"
        label="승선원 가입일"
        placeholder="날짜 선택"
      />
      <RadioFieldController
        control={control}
        name="personal_agreement"
        label="개인정보제공 동의 여부"
      />
      <DatePickerSingleController
        control={control}
        name="personal_agreement_date"
        label="개인정보제공 동의 일"
        placeholder="날짜 선택"
      />
    </div>
  )
}
