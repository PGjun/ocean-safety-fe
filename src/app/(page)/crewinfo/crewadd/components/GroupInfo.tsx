const WearableInfos = [
  { title: '그룹명', content: '유에스티21' },
  { title: '선박명', content: '강원호' },
  { title: '선박 소유자', content: '해운㈜' },
  { title: '사업자명', content: '해운㈜' },
  { title: '국제 총톤수', content: '28,287.00' },
  { title: '재화 중량 톤수', content: '38,985.00' },
]

export const GroupInfo = () => {
  return (
    <div className="mt-[10px] p-[10px] md:grid md:grid-cols-3 md:gap-x-[32px] md:gap-y-[16px]">
      {WearableInfos.map((item, idx) => {
        return (
          <div key={idx}>
            <div className="mt-[12px] text-[12px] font-bold">{item.title}</div>
            <div className="rounded bg-[#F8F9FA] p-[8px] text-[14px]">
              {item.content}
            </div>
          </div>
        )
      })}
    </div>
  )
}
