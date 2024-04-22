'use client'

import { useRouter } from 'next/navigation'
import { Slider } from './components/Slider'

export default function SosSettingsPage() {
  const router = useRouter()

  return (
    <div className="max-w-[310px] md:mx-[40px] md:max-w-full ">
      <div className="text-[22px] font-bold md:text-[26px]">SOS 자동 설정</div>
      <section className="mt-[44px] flex flex-col gap-[44px] md:mt-[24px] md:gap-[24px]">
        <div className="rounded-[8px] border-[#E9ECEF] md:border md:p-[28px]">
          <div className="text-[18px] font-bold">심박수 SOS 설정</div>
          <div className="grid md:grid-cols-2 md:gap-[48px] md:p-[8px]">
            <Slider title="최저 심박수" current={45} min={40} max={80} />
            <Slider title="최대 심박수" current={141} min={80} max={150} />
          </div>
        </div>
        <div className="rounded-[8px] border-[#E9ECEF] md:border md:p-[28px]">
          <div className="text-[18px] font-bold">혈압 SOS 설정</div>
          <div className="grid md:grid-cols-2 md:gap-[48px] md:p-[8px]">
            <Slider title="최저 혈압" current={62} min={40} max={80} />
            <Slider title="최대 혈압" current={130} min={80} max={150} />
          </div>
        </div>
        <div className="rounded-[8px] border-[#E9ECEF] md:border md:p-[28px]">
          <div className="text-[18px] font-bold">피부온도 SOS 설정</div>
          <div className="grid md:grid-cols-2 md:gap-[48px] md:p-[8px]">
            <Slider title="최저 피부온도" current={32} min={30} max={35} />
            <Slider title="최대 피부온도" current={40} min={35} max={45} />
          </div>
        </div>
        <div className="flex flex-col gap-[20px] md:flex-row">
          <div className="w-full rounded-[8px] border-[#E9ECEF] md:border md:p-[28px]">
            <div className="text-[18px] font-bold">배터리 SOS 설정</div>
            <div className="grid md:p-[8px]">
              <Slider title="배터리량" current={30} min={1} max={100} />
            </div>
          </div>
          <div className="w-full rounded-[8px] border-[#E9ECEF] md:border md:p-[28px]">
            <div className="text-[18px] font-bold">산소포화도 SOS 설정</div>
            <div className="grid md:p-[8px]">
              <Slider title="산소포화도량" current={50} min={1} max={100} />
            </div>
          </div>
        </div>
      </section>
      <div className="mt-[30px] flex justify-end gap-[5px] md:mt-[60px]">
        <button
          onClick={() => router.back()}
          className="rounded border border-[#C4C4C4] bg-[#DEE2E6] px-[36px] py-[10px] text-[14px] font-bold md:py-[15px] md:text-[18px]"
        >
          이전
        </button>
        <button className="flex-1 rounded border border-[#333333] bg-[#333333] px-[36px] py-[10px] text-[14px] font-bold text-white md:flex-none md:py-[15px] md:text-[18px]">
          완료
        </button>
      </div>
    </div>
  )
}
