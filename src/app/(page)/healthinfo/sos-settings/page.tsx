'use client'

import { useRouter } from 'next/navigation'
import { Slider } from './components/Slider'
import { useEffect, useState } from 'react'
import { fetchHealthWarning, postHealthWarning } from '@/services/api/user'
import { useUser } from '@/hooks/useUser'
import { HealthWarningData } from '@/types/responseData'

const initData = {
  id: 0,
  min_heartrate: 0,
  max_heartrate: 0,
  min_skin_temperature: 0,
  max_skin_temperature: 0,
  min_battery: 0,
  min_spO2: 0,
  ship_id: 0,
}

export default function SosSettingsPage() {
  const router = useRouter()
  const { user } = useUser()

  const [settings, setSettings] = useState<HealthWarningData>()

  useEffect(() => {
    if (!user || settings) return
    const getHealthWarning = async () => {
      const res = await fetchHealthWarning({ ship_id: user.ship_id })
      if (res?.status === 200) {
        const resData = res.data.data
        // 데이터가 없으면 초기값 세팅
        if (resData.length === 0) {
          setSettings({ ...initData, ship_id: user.ship_id })
          return
        }
        setSettings(resData[resData.length - 1])
      }
    }

    getHealthWarning()
  }, [user])

  const handleSubmit = async () => {
    if (!settings) return
    const { id, min_spO2, ...rest } = settings

    const newData = { min_SPO2: min_spO2, ...rest }

    const res = await postHealthWarning(newData)
    if (res?.status === 201) {
      alert('설정 완료')
    }
  }

  return (
    <div className="max-w-[310px] md:mx-[40px] md:max-w-full ">
      <div className="text-[22px] font-bold md:text-[26px]">SOS 자동 설정</div>
      {settings && (
        <section className="mt-[44px] flex flex-col gap-[44px] md:mt-[24px] md:gap-[24px]">
          <div className="rounded-[8px] border-[#E9ECEF] md:border md:p-[28px]">
            <div className="text-[18px] font-bold">심박수 SOS 설정</div>
            <div className="grid md:grid-cols-2 md:gap-[48px] md:p-[8px]">
              <Slider
                title="최저 심박수"
                current={settings.min_heartrate}
                min={40}
                max={80}
                settingName={'min_heartrate'}
                setNewSettings={setSettings}
              />
              <Slider
                title="최대 심박수"
                current={settings.max_heartrate}
                min={80}
                max={150}
                settingName={'max_heartrate'}
                setNewSettings={setSettings}
              />
            </div>
          </div>
          <div className="rounded-[8px] border-[#E9ECEF] md:border md:p-[28px]">
            <div className="text-[18px] font-bold">피부온도 SOS 설정</div>
            <div className="grid md:grid-cols-2 md:gap-[48px] md:p-[8px]">
              <Slider
                title="최저 피부온도"
                current={settings.min_skin_temperature}
                min={30}
                max={35}
                settingName={'min_skin_temperature'}
                setNewSettings={setSettings}
              />
              <Slider
                title="최대 피부온도"
                current={settings.max_skin_temperature}
                min={35}
                max={45}
                settingName={'max_skin_temperature'}
                setNewSettings={setSettings}
              />
            </div>
          </div>
          <div className="flex flex-col gap-[20px] md:flex-row">
            <div className="w-full rounded-[8px] border-[#E9ECEF] md:border md:p-[28px]">
              <div className="text-[18px] font-bold">배터리 SOS 설정</div>
              <div className="grid md:p-[8px]">
                <Slider
                  title="배터리량"
                  current={settings.min_battery}
                  min={1}
                  max={100}
                  settingName={'min_battery'}
                  setNewSettings={setSettings}
                />
              </div>
            </div>
            <div className="w-full rounded-[8px] border-[#E9ECEF] md:border md:p-[28px]">
              <div className="text-[18px] font-bold">산소포화도 SOS 설정</div>
              <div className="grid md:p-[8px]">
                <Slider
                  title="산소포화도량"
                  current={settings.min_spO2}
                  min={1}
                  max={100}
                  settingName={'min_spO2'}
                  setNewSettings={setSettings}
                />
              </div>
            </div>
          </div>
        </section>
      )}
      <div className="mt-[30px] flex justify-center gap-[5px] md:mt-[60px]">
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded border border-[#C4C4C4] bg-[#DEE2E6] px-[36px] py-[10px] text-[14px] font-bold md:py-[15px] md:text-[18px]"
        >
          이전
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          className="flex-1 rounded border border-[#333333] bg-[#333333] px-[36px] py-[10px] text-[14px] font-bold text-white md:flex-none md:py-[15px] md:text-[18px]"
        >
          완료
        </button>
      </div>
    </div>
  )
}
