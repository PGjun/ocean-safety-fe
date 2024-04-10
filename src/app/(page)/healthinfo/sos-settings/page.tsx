import { Slider } from './components/Slider'

export default function SosSettingsPage() {
  return (
    <div className="md:mx-[40px]">
      <div className="text-[22px] font-bold md:text-[26px]">SOS 자동 설정</div>
      <div className="mt-[44px] flex flex-col gap-[44px] md:mt-[24px] md:gap-[24px]">
        <div className="rounded-[8px] border-[#E9ECEF] md:border md:p-[28px]">
          <div className="text-[18px] font-bold">심박수 SOS 설정</div>
          <div className="grid md:grid-cols-2 md:gap-[48px] md:p-[8px]">
            <Slider title="최저 심박수" />
            <Slider title="최대 심박수" min={80} max={150} />
          </div>
        </div>
        <div className="rounded-[8px] border-[#E9ECEF] md:border md:p-[28px]">
          <div className="text-[18px] font-bold">혈압 SOS 설정</div>
          <div className="grid md:grid-cols-2 md:gap-[48px] md:p-[8px]">
            <Slider title="최저 혈압" />
            <Slider title="최대 혈압" min={80} max={150} />
          </div>
        </div>
        <div className="rounded-[8px] border-[#E9ECEF] md:border md:p-[28px]">
          <div className="text-[18px] font-bold">체온 SOS 설정</div>
          <div className="grid md:grid-cols-2 md:gap-[48px] md:p-[8px]">
            <Slider title="최저 체온" min={30} max={35} />
            <Slider title="최대 체온" min={35} max={45} />
          </div>
        </div>
        <div className="rounded-[8px] border-[#E9ECEF] md:border md:p-[28px]">
          <div className="text-[18px] font-bold">배터리 SOS 설정</div>
          <div className="grid md:p-[8px]">
            <Slider title="배터리량" min={1} max={100} />
          </div>
        </div>
        <div className="rounded-[8px] border-[#E9ECEF] md:border md:p-[28px]">
          <div className="text-[18px] font-bold">산소포화도 SOS 설정</div>
          <div className="grid md:p-[8px]">
            <Slider title="산소포화도량" min={1} max={100} />
          </div>
        </div>
      </div>
    </div>
  )
}
