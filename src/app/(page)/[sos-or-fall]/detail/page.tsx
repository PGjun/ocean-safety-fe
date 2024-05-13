'use client'

import GoogleMapWrapper from '@/components/common/GoogleMapWrapper'
import DropDown from '@/components/common/DropDown'
import { PATHS } from '@/constants/paths'
import Link from 'next/link'
import { GenericTable } from '@/components/common/GenericTable'
import {
  fetchUserSpecificEmergency,
  postModifyEmergencyCall,
} from '@/services/api/user'
import { PageProps } from '@/types/common'
import { useFetch } from '@/hooks/useFetch'
import { useRouter } from 'next/navigation'
import { UserEmergencyData } from '@/types/responseData'
import { Controller, useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { SosStatus } from '@/components/common/SosStatus'

export default function SosDetailPage(pageProps: PageProps<UserEmergencyData>) {
  const searchParams = pageProps.searchParams

  const router = useRouter()

  const { data } = useFetch<
    {
      data: UserEmergencyData[]
      history_data: UserEmergencyData[]
      last_location_data: { latitude: 0; longitude: 0; send_timestamp: '' }[]
    },
    number
  >({
    apiFn: fetchUserSpecificEmergency,
    params: Number(searchParams.sos_id),
    defVal: {
      data: [
        {
          emergency_code: '',
          emergency_code_name: '',
          emergency_status_code_name: '',
          id: 0,
          latitude: 0,
          longitude: 0,
          sos_date: '',
          status_code: 0,
          user_id: 0,
          content: '',
        },
      ],
      last_location_data: [{ latitude: 0, longitude: 0, send_timestamp: '' }],
      history_data: [],
    },
  })

  const { control, handleSubmit, setValue } = useForm()

  const onSubmit = async (data: any) => {
    const params = {
      emergency_id: Number(searchParams.sos_id),
      status: data.status?.value,
      content: data.content,
    }

    if (!params.status || params.content === '') {
      alert('모든 필드를 입력해주세요.')
      return // 함수를 여기서 종료
    }

    const res = await postModifyEmergencyCall(params)
    if (res?.status === 202) {
      alert('변경 완료')
      router.back()
    }
  }

  useEffect(() => {
    if (!data.data) return
    setValue('content', data.data[0].content)
  }, [data.data, setValue])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="md:mx-[40px]">
      <div className="text-[26px] font-bold">SOS/낙상감지 상세내역</div>
      <div className="mb-[10px] flex justify-end">
        <div className="mt-[16px] flex max-w-[332px] flex-1 flex-col gap-[4px] md:flex-row">
          {data.data[0].emergency_code && (
            <>
              <div
                style={{
                  background:
                    data.data[0].emergency_code === '낙상'
                      ? '#2AB0FC'
                      : '#FF3819',
                }}
                className="h-[46.67px] w-full place-content-center rounded text-center font-bold text-white"
              >
                {data.data[0].emergency_code}
              </div>

              <Controller
                name="status"
                control={control}
                defaultValue={{
                  value: data.data[0].emergency_status_code,
                  label: data.data[0].emergency_status_code,
                }}
                render={({ field }) => {
                  return (
                    <DropDown.Container>
                      <DropDown.Content
                        id="sos_detail_status"
                        dropData={[
                          { value: '이상보고', label: '이상보고' },
                          { value: '처리중', label: '처리중' },
                          { value: '처리완료', label: '처리완료' },
                        ]}
                        placeholder="처리현황 선택"
                        fieldOnChange={field.onChange}
                        fieldValue={field.value}
                      />
                    </DropDown.Container>
                  )
                }}
              />
            </>
          )}
        </div>
      </div>
      <GenericTable
        mobileContents={(item: UserEmergencyData, idx) => (
          <Link key={idx} href={PATHS.SOS_DETAIL()}>
            <div className="space-x-1">
              {/* <span>No. {item.id}</span> */}
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
            <SosStatus status={item.emergency_status_code} />
          </Link>
        )}
        columns={[
          // { field: 'id', title: 'No', width: '50px' },
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
          { field: 'emergency_code', title: '응급코드', width: '1fr' },
          { field: 'phone', title: '비상연락처', width: '2fr' },
          { field: 'sos_date', title: '기록 일시', width: '3fr' },
          {
            field: 'emergency_status_code',
            title: '처리현황',
            width: '1fr',
            render: (status) => {
              return <SosStatus status={status} />
            },
          },
        ]}
        data={[data.data[0]]}
        onRowClick={() => {}}
      />
      <div className="mt-[28px] h-[410px]">
        <GoogleMapWrapper
          markerInfo={{
            location: {
              lng: data.data[0].longitude,
              lat: data.data[0].latitude,
            },
            info: {
              name: data.data[0].name,
              sos_date: data.data[0].sos_date,
            },
          }}
          trackingMarkerInfos={data.last_location_data
            .slice(0, 2)
            .map(({ latitude, longitude, send_timestamp }) => ({
              position: {
                lat: latitude,
                lng: longitude,
              },
              info: send_timestamp,
            }))}
        />
      </div>
      <div className="mt-[28px] text-[18px] font-bold">처리 내용</div>
      <Controller
        name="content"
        control={control}
        render={({ field }) => {
          return (
            <textarea
              value={field.value || ''}
              onChange={field.onChange}
              rows={5}
              className="w-full resize-none rounded border border-[#C4C4C4] p-[10px] text-[14px]"
            />
          )
        }}
      />
      <div className="mt-[28px] text-[18px] font-bold">처리 내역</div>
      <textarea
        value={data.history_data
          .map(
            ({ sos_date, emergency_status_code, name, content }) =>
              `[${sos_date}] [${emergency_status_code} - ${name}] \n ${content ? content + '\n' : ''}`,
          )
          .join('')}
        readOnly
        disabled
        onChange={() => {}}
        rows={10}
        className="w-full resize-none rounded border border-[#C4C4C4] p-[10px] text-[14px]"
      />
      <div className="mt-[30px] flex justify-center gap-[5px] md:mt-[60px]">
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded border border-[#C4C4C4] bg-[#DEE2E6] px-[36px] py-[10px] text-[14px] font-bold md:py-[15px] md:text-[18px]"
        >
          이전
        </button>
        <button
          type="submit"
          className="flex-1 rounded border border-[#333333] bg-[#333333] px-[36px] py-[10px] text-[14px] font-bold text-white md:flex-none md:py-[15px] md:text-[18px]"
        >
          완료
        </button>
      </div>
    </form>
  )
}
