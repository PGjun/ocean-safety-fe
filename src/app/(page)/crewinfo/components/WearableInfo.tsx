import { GenericTable } from '@/components/common/GenericTable'

export const WearableInfo = () => {
  return (
    <div className="mt-[20px]">
      <GenericTable
        mobileContents={() => (
          <>
            <div>기기명 : Galaxy Watch6 Classic (1NZW) 기종 : SM-R930</div>
            <div>
              등록 일시 : 2024-03-01 16:00:00 착용자 : 이정희
              <div className="inline-block rounded-full border-2 border-[#2AB0FC] px-[6px] text-[10px] font-bold text-[#2AB0FC] md:text-[12px]">
                ON
              </div>
            </div>
          </>
        )}
        hideNo
        columns={[
          { field: 'device_name', title: '기기명', width: '1fr' },
          { field: 'device_model', title: '기종', width: '1fr' },
          { field: 'reg_date', title: '등록 일시', width: '1fr' },
          {
            field: 'wearer',
            title: '착용자',
            width: '1fr',
            render: (code) => {
              return (
                <div className="flex items-center justify-center gap-2">
                  {code}
                  <div className="rounded-full border-2 border-[#2AB0FC] px-[6px] text-[12px] font-bold text-[#2AB0FC]">
                    ON
                  </div>
                </div>
              )
            },
          },
        ]}
        data={[
          {
            id: '1',
            device_name: 'Galaxy Watch6 Classic (1NZW)',
            device_model: 'SM-R930',
            reg_date: '2024-03-01 16:00:00',
            wearer: '박기철',
          },
        ]}
        onRowClick={(item) => {}}
      />
    </div>
  )
}
