'use client'

import GoogleMapWrapper from '@/components/common/GoogleMapWrapper'
import { CommonIcon } from '@/components/SvgIcons'
import DropDown from '@/components/common/DropDown'
import { PATHS } from '@/constants/paths'
import Link from 'next/link'
import { GenericTable } from '@/components/common/GenericTable'
import { UserEmergencyData } from '@/services/api/user'
import { PageProps } from '@/types/common'

export default function SosDetailPage(pageProps: PageProps<UserEmergencyData>) {
  const searchParams = pageProps.searchParams
  console.log(searchParams)

  return (
    <div className="md:mx-[40px]">
      <div className="text-[26px] font-bold">SOS 상세내역</div>
      <GenericTable
        mobileContents={(item: UserEmergencyData, idx) => (
          <Link key={idx} href={PATHS.SOS_DETAIL()}>
            <div className="space-x-1">
              <span>No. {idx + 1}</span>
              <span>이름 : {item.name}</span>
              <span>아이디 : {item.user_id}</span>
            </div>
            <div className="space-x-1">
              <span>좌표X : {item.longitude.toFixed(2)} </span>
              <span>좌표Y : {item.latitude.toFixed(2)} </span>
              <span>응급코드 : {item.emergency_code}</span>
            </div>
            <div>비상연락처 : {item.phone}</div>
            <div>기록일시 : {item.sos_date}</div>
            <div className="inline-flex items-center gap-[4px] rounded bg-[#FFF0F0] px-[20px] py-[2px]">
              <div className="h-[10px] w-[10px] rounded-full bg-[#FF3819]" />
              {item.emergency_status_code}
            </div>
          </Link>
        )}
        columns={[
          { field: 'id', title: 'No', width: '50px' },
          { field: 'name', title: '이름', width: '1fr' },
          { field: 'user_id', title: '아이디', width: '1fr' },
          {
            field: 'longitude',
            title: 'X좌표',
            width: '2fr',
          },
          {
            field: 'latitude',
            title: 'Y좌표',
            width: '2fr',
          },
          { field: 'emergency_code', title: '응답코드', width: '1fr' },
          { field: 'phone', title: '비상연락처', width: '2fr' },
          { field: 'sos_date', title: '기록 일시', width: '3fr' },
          {
            field: 'emergency_status_code',
            title: '처리현황',
            width: '1fr',
            render: (code) => {
              return (
                <div className="flex items-center justify-center gap-2">
                  <div className="h-[10px] w-[10px] rounded-full bg-[#FF3819]" />
                  {code}
                </div>
              )
            },
          },
        ]}
        data={[searchParams]}
        onRowClick={() => {}}
      />

      <div className="mt-[28px] h-[410px]">
        <GoogleMapWrapper
          location={{
            lng: Number(searchParams.longitude),
            lat: Number(searchParams.latitude),
          }}
        />
      </div>

      <div className="mt-[28px] text-[18px] font-bold">처리 내용</div>
      <div className="mt-[8px] flex rounded bg-[#F3F5FF] p-[24px] text-[18px] leading-[21.6px] text-[#2262C6]">
        <div className="p-[3px]">
          <CommonIcon.BLUE_Exclamation />
        </div>
        <div className="flex-1 whitespace-pre-line text-[14px] md:text-[18px]">
          {`승선원으로부터 갤럭시워치를 통해 SOS 신호를 수신하였습니다. 즉시 관제 시스템을 통해 신속하고 효율적으로 대응 완료. 
          선원의 안전을 최우선으로 하여 해당 위치를 파악하고 구조 대상에게 신속한 지원`}
        </div>
      </div>

      <div className="mt-[16px] flex flex-col gap-[4px] md:max-w-[332px] md:flex-row">
        <DropDown.Container>
          <DropDown.Content
            id="sos_detail_type"
            dropData={[
              { value: '0', label: 'SOS' },
              { value: '1', label: '낙상감지' },
            ]}
          />
        </DropDown.Container>
        <DropDown.Container>
          <DropDown.Content
            id="sos_detail_status"
            dropData={[
              { value: '0', label: '처리완료' },
              { value: '1', label: '이상보고' },
            ]}
          />
        </DropDown.Container>
      </div>
      <div className="mt-[30px] flex justify-center gap-[5px] md:mt-[60px]">
        <Link href={PATHS.SOS()}>
          <button className="rounded border border-[#C4C4C4] bg-[#DEE2E6] px-[36px] py-[10px] text-[14px] font-bold md:py-[15px] md:text-[18px]">
            이전
          </button>
        </Link>
        <button className="flex-1 rounded border border-[#333333] bg-[#333333] px-[36px] py-[10px] text-[14px] font-bold text-white md:flex-none md:py-[15px] md:text-[18px]">
          완료
        </button>
      </div>
    </div>
  )
}
