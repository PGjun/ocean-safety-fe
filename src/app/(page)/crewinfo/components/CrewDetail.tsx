const CrewDetails = [
  { title: '이름', content: '이름' },
  { title: '사용자 ID', content: 'Safety1' },
  { title: '연락처', content: '010-1234-1234' },
  { title: '생년월일', content: '1995-02-26' },
  { title: '나이', content: '30' },
  { title: '성별', content: '남' },
  { title: '우편번호', content: '55555' },
  { title: '도로명 주소', content: '부천시 은성로' },
  { title: '상세주소', content: '99-99 999호' },
  { title: '소속 업체', content: '주식회사 제이디아이' },
  { title: '사전 예방 안전교육 이수 여부', content: 'O' },
  { title: '마지막 이수 일자', content: '2024-03-01' },
  { title: '승선원 구분', content: '승선원' },
  { title: '승선원 가입일', content: '2024-03-01' },
  { title: '소속 그룹', content: '항해' },
  { title: '개인정보제공동의 여부', content: 'O' },
  { title: '개인정보제공 등의 일', content: '2024-03-18' },
  { title: '승무원 탈퇴 여부', content: 'X' },
]

export const CrewDetail = () => {
  return (
    <div className="mt-[10px] p-[10px] md:grid md:grid-cols-3 md:gap-x-[32px] md:gap-y-[16px]">
      {CrewDetails.map((item, idx) => {
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
