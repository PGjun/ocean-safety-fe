'use client'

import { ShipInputForm } from '@/components/form/ShipInputForm'
import { useShipEditLogic } from '@/hooks/logic/useShipEditLogic'
import { PageProps } from '@/types/common'
import { ShipDrawing } from '../../../../components/common/ShipDrawing'
import { CreateDataTable } from '@/components/common/CreateDataTable'
import { formatPhoneNumber } from '@/utils/formatPhonNumber'

export interface ShipForm {
  [key: string]: string | number
  ship_number: string
  ship_name: string
  nationality: string
  inter_tonnage: string
  weight_tonnage: string
  reg_classname: string
  launch_date: any
  shipyard: string
  ship_owner: string
  business_name: string
  ship_lessee: string
  rental_period: any
}

export default function ShipEditPage(props: PageProps<{ ship_id: number }>) {
  const {
    control,
    handleSubmit,
    onSubmit,
    router,
    shipDrawingProps,
    wearableProps,
  } = useShipEditLogic({ shipId: props.searchParams.ship_id })

  // const [wearables, setWearables] = useState()

  // const handleWearables = (data: any) => {
  //   const newDate = data.map(
  //     ({ device_id, phone_number, model_name }: any) => ({
  //       device_id: device_id,
  //       phone_number: phone_number,
  //       model_name: model_name,
  //     }),
  //   )

  //   setWearables(newDate)
  // }
  // useEffect(() => {
  //   if (!props.searchParams.ship_id) return
  //   const getWatches = async () => {
  //     const res = await fetchWatches({ ship_id: props.searchParams.ship_id })
  //     handleWearables(res?.data.data)
  //   }
  //   getWatches()
  // }, [props.searchParams.ship_id])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="md:mx-[40px]">
      <div className="text-[22px] font-bold">그룹(선박) 수정</div>
      <ShipInputForm control={control} />
      <div className="my-[30px] h-[1px] w-full bg-[#DEE2E6]" />
      <ShipDrawing
        file={shipDrawingProps.file}
        setFile={shipDrawingProps.setFile}
        dots={shipDrawingProps.dots}
        rects={shipDrawingProps.rects}
        setDots={shipDrawingProps.setDots}
        setRects={shipDrawingProps.setRects}
        shipDrawingsUrl={shipDrawingProps.shipDrawingsUrl}
      />
      <div className="my-[30px] h-[1px] w-full bg-[#DEE2E6]" />
      {wearableProps.wearables && (
        <CreateDataTable
          columns={[
            { field: 'no', title: 'No', width: '50px' },
            { field: 'device_id', title: '기기명 (디바이스 ID)', width: '1fr' },
            { field: 'model_name', title: '기종', width: '1fr' },
            {
              field: 'phone_number',
              title: '폰번호',
              width: '1fr',
              render: (value, handleInputChange, idx, col) => {
                return (
                  <input
                    value={formatPhoneNumber(value) || ''}
                    placeholder={col.title}
                    onChange={(e) => {
                      // 입력값이 11자리를 초과하지 않도록 조정
                      const formatted = formatPhoneNumber(e.target.value)
                      if (formatted.replace(/[^0-9]/g, '').length <= 11) {
                        handleInputChange(formatted, idx, col.field)
                      }
                    }}
                    className="w-full rounded border p-[4px]"
                  />
                )
              },
            },
          ]}
          rowDatas={wearableProps.wearables}
          handleData={wearableProps.handleWearables}
        />
      )}
      <div className="mt-[30px] flex justify-center gap-[5px] md:mt-[60px]">
        <button
          onClick={() => router.back()}
          type="button"
          className="rounded border border-[#C4C4C4] bg-[#DEE2E6] px-[36px] py-[10px] text-[14px] font-bold md:py-[15px] md:text-[18px]"
        >
          취소
        </button>
        <button
          type="submit"
          className="flex-1 rounded border border-[#333333] bg-[#333333] px-[36px] py-[10px] text-[14px] font-bold text-white md:flex-none md:py-[15px] md:text-[18px]"
        >
          수정
        </button>
      </div>
    </form>
  )
}
