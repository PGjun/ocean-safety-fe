import { Pagination } from '@/components/common/Pagination'
import { GenericTable } from '@/components/main/GenericTable'
import { useMediaQuery } from '@/hooks/useMediaQuery'

export const WearableList = () => {
  const isMobile = useMediaQuery('768')
  return (
    <div className="mt-[20px]">
      {isMobile ? (
        <div className="border-t border-[#c4c4c4]">
          {Array.from({ length: 5 }).map((_, idx) => (
            <div key={idx} className="border-b p-[16px] text-[12px]">
              <div>기기명 : Galaxy Watch6 Classic (1NZW) 기종 : SM-R930</div>
              <div>
                등록 일시 : 2024-03-01 16:00:00 착용자 : 이정희
                <div className="inline-block rounded-full border-2 border-[#2AB0FC] px-[6px] text-[10px] font-bold text-[#2AB0FC] md:text-[12px]">
                  ON
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <GenericTable
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
            {
              id: '1',
              device_name: 'Galaxy Watch6 Classic (1NZW)',
              device_model: 'SM-R930',
              reg_date: '2024-03-01 16:00:00',
              wearer: '박기철',
            },
            {
              id: '1',
              device_name: 'Galaxy Watch6 Classic (1NZW)',
              device_model: 'SM-R930',
              reg_date: '2024-03-01 16:00:00',
              wearer: '박기철',
            },
            {
              id: '1',
              device_name: 'Galaxy Watch6 Classic (1NZW)',
              device_model: 'SM-R930',
              reg_date: '2024-03-01 16:00:00',
              wearer: '박기철',
            },
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
      )}

      <div className="mt-[20px] flex w-full justify-center">
        <Pagination
          path={() => {
            return '/'
          }}
        />
      </div>
    </div>
  )
}
