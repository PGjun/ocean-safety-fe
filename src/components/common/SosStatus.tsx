import { sosCodeBgColors, sosCodeColors } from '@/constants/sosCodeColors'
import { useMediaQuery } from '@/hooks/useMediaQuery'

export const SosStatus = ({ status }: { status: string }) => {
  const isMobile = useMediaQuery('768')
  return (
    <>
      {isMobile ? (
        <div
          className="inline-flex items-center gap-[4px] px-[20px] py-[2px]"
          style={{
            backgroundColor: sosCodeBgColors[status],
          }}
        >
          <div
            className="h-[10px] w-[10px] rounded-full"
            style={{
              backgroundColor: sosCodeColors[status],
            }}
          />
          {status}
        </div>
      ) : (
        <div className="flex items-center justify-center gap-2">
          <div
            className="h-[10px] w-[10px] rounded-full"
            style={{ backgroundColor: sosCodeColors[status] }}
          />
          {status}
        </div>
      )}
    </>
  )
}
