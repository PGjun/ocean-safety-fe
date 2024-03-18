export const CrewSos = () => {
  return (
    <div>
      <div className="text-[20px] font-bold">SOS 내역</div>
      <div className="border-t border-[#c4c4c4]">
        {Array.from({ length: 5 }).map((_, idx) => (
          <div key={idx} className="border-b p-[16px] text-[12px]">
            <div>No. 1 : 이름</div>
            <div>심박수 : 81 혈압 : 120 / 80 체온 : 36.8 산소포화도 : 0</div>
            <div>기록 일시 : 2024-03-01 16:00:00</div>
          </div>
        ))}
      </div>
    </div>
  )
}
