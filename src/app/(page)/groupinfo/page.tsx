'use client'

import { Pagination } from '@/components/common/Pagination'
import { PATHS } from '@/constants/paths'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { CommonIcon } from '@/components/SvgIcons'
import Image from 'next/image'
import {
  ShipInfoParams,
  fetchShipInfo,
  fetchShipList,
} from '@/services/api/user'

const shipDetails = [
  { name: 'ship_number', title: '선박번호', content: '191-' },
  { name: 'ship_name', title: '선박명', content: '한국호' },
  { name: 'nationality', title: '선적항(국적)', content: '제주(대한민국)' },
  { name: 'inter_tonnage', title: '국제총톤수', content: '28,827.00' },
  { name: 'weight_tonnage', title: '재화중량톤수', content: '38.985.00' },
  { name: 'reg_classname', title: '등록선급명', content: '등록선급명' },
  { name: 'launch_date', title: '진수일', content: '2012-11-23' },
  { name: 'shipyard', title: '조선소', content: 'Hyundai Mipo' },
  { name: 'ship_owner', title: '선박소유자', content: '해운㈜' },
  { name: 'business_name', title: '사업자명', content: '해운㈜' },
  { name: 'ship_lessee', title: '선박임차인', content: '-' },
  { name: 'rental_period', title: '임차기간', content: '-' },
]

const GroupDetail = ({ shipId }: { shipId: number | null }) => {
  const [detail, setDetail] = useState([{ name: '', title: '', content: '' }])

  useEffect(() => {
    const fetchShipDetail = async () => {
      if (shipId === null) return

      const res = await fetchShipInfo(shipId)

      if (res?.status === 200) {
        const updatedShipDetails = shipDetails.map((item) => {
          const apiValue = res.data[item.name] // title에 해당하는 API 응답 데이터를 찾음
          return {
            ...item,
            content: apiValue ? apiValue : item.content, // API 응답에 해당 데이터가 있다면 업데이트, 없으면 기존 값 유지
          }
        })
        setDetail(updatedShipDetails)
      }
    }
    fetchShipDetail()
  }, [shipId])

  return (
    <div className="md:grid md:grid-cols-3 md:gap-x-[32px] md:gap-y-[16px]">
      {detail &&
        detail.map((item, idx) => {
          return (
            <div key={idx}>
              <div className="mt-[12px] text-[12px] font-bold">
                {item.title}
              </div>
              <div className="rounded bg-[#F8F9FA] p-[8px] text-[14px]">
                {item.content}
              </div>
            </div>
          )
        })}
    </div>
  )
}

const COLTITLES = ['No', '그룹명', '선박명', '선적항(국적)', '선박 소유자']

export default function GroupInfoPage() {
  const isMobile = useMediaQuery('768')

  const [shipList, setShipList] = useState([])
  const [shipId, setShipId] = useState<number | null>(null)

  useEffect(() => {
    const fetchShipListData = async () => {
      const res = await fetchShipList('1')
      if (res?.status === 200) {
        setShipList(res.data)
        console.log('🚀 ~ fetchShipListData ~ res.data:', res.data)
      }
    }
    fetchShipListData()
  }, [])

  return (
    <div className="md:mx-[40px]">
      <div>
        <div className="text-[26px] font-bold">그룹(선박) 정보</div>
        <div className="mt-[10px] flex flex-col gap-[8px] border border-[#E9ECEF] bg-[#F8F9FA] p-[28px] md:flex-row">
          <div className="grid gap-[8px] md:w-[650px] md:grid-cols-2">
            <div className="w-full rounded border border-[#DEE2E6] bg-white px-[24px] py-[18px] md:w-[313px] md:py-[10px]">
              <div className="text-[14px] font-bold md:text-[12px]">그룹명</div>
              <input
                type="text"
                className="w-full bg-white md:text-[14px]"
                placeholder="그룹명을 입력해 주세요."
              />
            </div>
            <div className="w-full rounded border border-[#DEE2E6] bg-white px-[24px] py-[18px] md:w-[313px] md:py-[10px]">
              <div className="text-[14px] font-bold md:text-[12px]">선박명</div>
              <input
                type="text"
                className="w-full bg-white md:text-[14px]"
                placeholder="선박명을 입력해 주세요."
              />
            </div>
          </div>
          <button className="flex items-center gap-[3px] rounded bg-[#333333] px-[28px] py-[10px] text-white">
            <CommonIcon.Search /> 검색
          </button>
        </div>
      </div>

      <div className="mt-[40px] flex items-center justify-between">
        <div className="text-[18px] font-bold">선박 정보</div>
        <Link href={PATHS.GROUP_ADD}>
          <button className="rounded border border-[#c4c4c4] px-[10px] py-[3px] text-[12px] font-bold">
            + 추가
          </button>
        </Link>
      </div>

      {isMobile ? (
        <div className="mt-[10px] border-t border-[#c4c4c4]">
          {shipList &&
            shipList
              .slice(-5)
              .reverse()
              .map((item: ShipInfoParams, idx) => (
                <div
                  key={idx}
                  className="cursor-pointer border-b p-[16px] text-[12px] hover:bg-slate-50"
                  onClick={() => {
                    return setShipId(item.id)
                  }}
                >
                  <div>{`No. ${idx + 1} : 그룹명`}</div>
                  <div>
                    <span>{`아이디 : ${item.ship_name ?? ''} `}</span>
                    <span>{`구분 : ${item.nationality ?? ''} `}</span>
                    <span>{`가입일 : ${item.ship_owner ?? ''}`}</span>
                  </div>
                </div>
              ))}
        </div>
      ) : (
        <table className="mt-[10px] w-full table-fixed border-collapse text-center">
          <thead>
            <tr>
              {COLTITLES.map((item, idx) => (
                <th
                  key={idx}
                  className="border-y border-[#c4c4c4] py-[10px] text-[14px] font-bold"
                >
                  {item}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {shipList &&
              shipList
                .slice(-5)
                .reverse()
                .map((item: ShipInfoParams, idx) => (
                  <tr
                    key={idx}
                    className="cursor-pointer hover:bg-slate-50"
                    onClick={() => {
                      return setShipId(item.id)
                    }}
                  >
                    <td className="border-b py-[16px]">{idx + 1}</td>
                    <td className="border-b py-[16px]">{'그룹명'}</td>
                    <td className="border-b py-[16px]">
                      {item.ship_name ?? ''}
                    </td>
                    <td className="border-b py-[16px]">
                      {item.nationality ?? ''}
                    </td>
                    <td className="border-b py-[16px]">
                      {item.ship_owner ?? ''}
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      )}
      <div className="mt-[20px] flex w-full justify-center">
        <Pagination
          path={() => {
            return '/'
          }}
        />
      </div>
      {shipId && (
        <div className="relative">
          <div className="mt-[40px] flex items-center justify-between">
            <div className="text-[18px] font-bold">그룹(선박) 정보</div>
            <button className="rounded border border-[#c4c4c4] px-[10px] py-[3px] text-[12px] font-bold">
              수정
            </button>
          </div>
          <GroupDetail shipId={shipId} />
          <div className="mt-[50px] text-[18px] font-bold">선박 도면</div>

          <div className="mt-[10px]">
            <Image
              src="/temp-ship.png"
              alt="tempship"
              width={1100}
              height={200}
              style={{ objectFit: 'fill' }}
            />
          </div>
        </div>
      )}
    </div>
  )
}
