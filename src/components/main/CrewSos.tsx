export const CrewSos = () => {
  return (
    <div>
      <div className="text-[20px] font-bold">SOS 내역</div>
      <div className="border-t border-[#c4c4c4]">
        {Array.from({ length: 5 }).map((_, idx) => (
          <div key={idx} className="border-b p-[16px] text-[12px]">
            <div>No. 1 : 이름</div>
            <div>응급코드 : SOS 기록일시 : : 2024-03-01 16:00:00</div>
            <div className="inline-flex items-center gap-[4px] rounded bg-[#FFF0F0] px-[20px] py-[2px]">
              <div className="h-[10px] w-[10px] rounded-full bg-[#FF3819]"></div>
              이상보고
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
