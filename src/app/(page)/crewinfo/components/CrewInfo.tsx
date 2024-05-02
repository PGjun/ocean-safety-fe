import { useUserInfoLogic } from '@/hooks/logic/useCrewDetailLogic'

export const CrewInfo = ({ userId }: { userId: number | null }) => {
  const { userInfos, loading } = useUserInfoLogic({ userId, type: 'crew' })

  if (loading) return null
  return (
    <div className="mt-[10px] p-[10px] md:grid md:grid-cols-3 md:gap-x-[32px] md:gap-y-[16px]">
      {userInfos.map((item, idx) => {
        return (
          <div key={idx}>
            <div className="mt-[12px] text-[12px] font-bold">{item.title}</div>
            <div className="h-[37px] rounded bg-[#F8F9FA] p-[8px] text-[14px]">
              {item.content}
            </div>
          </div>
        )
      })}
    </div>
  )
}
