import CanvasDots from '@/components/common/CanvasDots'
import CanvasRect from '@/components/common/CanvasRect'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { CommonIcon } from '@/icons/common'
import Image from 'next/image'
import { CSSProperties, ChangeEvent, useRef, useState } from 'react'

const wrapperStyles: CSSProperties = {
  position: 'absolute',
  top: 0,
  left: 0,
  zIndex: 1,
  width: '100%',
  height: '100%',
}

const formatMacAddress = (value: string) => {
  if (!value) return value

  // 알파벳과 숫자만 허용
  const mac = value.replace(/[^0-9A-Fa-f]/g, '').toUpperCase()

  // 각 두 자리마다 콜론(:) 추가
  const formatted = mac.split('').reduce((acc, char, idx) => {
    return acc + char + (idx % 2 === 1 && idx !== mac.length - 1 ? ':' : '')
  }, '')

  // 17자리를 초과하는 입력 제거 (XX:XX:XX:XX:XX:XX - 콜론 포함 17자)
  return formatted.length <= 17 ? formatted : formatted.slice(0, 17)
}

const DotInputComponent = ({ dots, setDots }: any) => {
  // 레이블 변경 핸들러
  const handleNameChange = (index: number, beacon_name: string) => {
    const newDots = [...dots]
    newDots[index] = { ...newDots[index], beacon_name }
    setDots(newDots)
  }
  const handleMcAdressChange = (index: number, mac_address: string) => {
    const formattedMac = formatMacAddress(mac_address)
    const newDots = [...dots]
    newDots[index] = { ...newDots[index], mac_address: formattedMac }
    setDots(newDots)
  }
  // 도트 삭제 핸들러
  const handleRemoveDot = (index: number) => {
    const newDots = dots.filter((_: any, i: any) => i !== index)
    setDots(newDots)
  }

  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
      {dots.map((dot: any, index: any) => (
        <div
          key={index}
          className="flex w-full items-center gap-2 rounded border border-[#C4C4C4]"
        >
          <div className="h-full w-[60px] place-content-center bg-[#F3F5FF] text-center text-[20px] font-bold leading-[16px] text-[#2262C6] md:w-[50px]">
            {index + 1}
          </div>
          <input
            className="min-w-0 flex-grow border-r outline-none"
            type="text"
            placeholder="비콘 이름"
            value={dot.beacon_name || ''}
            onChange={(e) => handleNameChange(index, e.target.value)}
          />
          <input
            className="min-w-0 flex-grow outline-none"
            type="text"
            placeholder="Mac Address"
            value={dot.mac_address || ''}
            onChange={(e) => handleMcAdressChange(index, e.target.value)}
          />
          <div className="px-[18px] py-[15px] text-[20px] leading-[16px]">
            <button type="button" onClick={() => handleRemoveDot(index)}>
              <CommonIcon.Xmark />
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

const RectInputComponent = ({ rects, setRects }: any) => {
  // 레이블 변경 핸들러
  const handleNameChange = (index: number, area_name: string) => {
    const newRects = [...rects]
    newRects[index] = { ...newRects[index], area_name }
    setRects(newRects)
  }

  // 네모 삭제 핸들러
  const handleRemoveRect = (index: number) => {
    const newRects = rects.filter((_: any, i: any) => i !== index)
    setRects(newRects)
  }

  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
      {rects.map((rect: any, index: any) => (
        <div
          key={index}
          className="flex w-full items-center gap-2 rounded border border-[#C4C4C4]"
        >
          <div className="h-full w-[60px] place-content-center bg-[#F3F5FF] text-center text-[20px] font-bold leading-[16px] text-[#2262C6] md:w-[50px]">
            {index + 1}
          </div>
          <input
            className="min-w-0 flex-grow border-r outline-none"
            type="text"
            placeholder="제한구역 이름"
            value={rect.area_name || ''}
            onChange={(e) => handleNameChange(index, e.target.value)}
          />

          <div className="px-[18px] py-[15px] text-[20px] leading-[16px]">
            <button type="button" onClick={() => handleRemoveRect(index)}>
              <CommonIcon.Xmark />
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export const ShipDrawing = ({
  file,
  setFile,
  dots,
  setDots,
  rects,
  setRects,
  shipDrawingsUrl,
}: {
  file: File | null
  setFile: (file: File) => void
  dots: {
    location_x: number
    location_y: number
  }[]
  setDots: any
  rects: {
    location_start_x: number
    location_start_y: number
    location_end_x: number
    location_end_y: number
  }[]
  setRects: any
  shipDrawingsUrl?: string
}) => {
  const isMobile = useMediaQuery('768')

  const [preview, setPreview] = useState<string>('')
  const fileRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const localFile = event.target.files ? event.target.files[0] : null
    if (localFile) {
      // 파일이 선택되었을 때만 타입 검사 진행
      if (localFile.type === 'image/png' || localFile.type === 'image/jpeg') {
        setFile(localFile)

        const reader = new FileReader()
        reader.onloadend = () => {
          setPreview(reader.result as string)
        }
        reader.readAsDataURL(localFile)
      } else {
        alert('PNG, JPG, JPEG 파일만 업로드 가능합니다.')
      }
    }
  }

  const onDotsChange = (dots: { x: number; y: number }[]) => {
    setDots(
      dots.map(({ x, y, ...rest }) => ({
        ...rest,
        location_x: x,
        location_y: y,
      })),
    )
  }

  const onRectsChange = (
    rects: { x1: number; x2: number; y1: number; y2: number }[],
  ) => {
    setRects(
      rects.map(({ x1, x2, y1, y2, ...rest }) => ({
        ...rest,
        location_start_x: x1,
        location_end_x: x2,
        location_start_y: y1,
        location_end_y: y2,
      })),
    )
  }

  const imgView = () => {
    if (preview) return preview
    if (shipDrawingsUrl)
      return process.env.NEXT_PUBLIC_API_URL + '/' + shipDrawingsUrl
    return ''
  }

  return (
    <div>
      <div className="text-[18px] font-bold">선박 도면</div>
      <div className="mt-[10px] flex w-full justify-between rounded py-[7px] pl-[16px] pr-[6px] text-[14px] outline-dotted outline-[2px] outline-[#C4C4C4]">
        <input
          type="text"
          className="flex-1 bg-white"
          placeholder="선박 도면을 등록해 주세요."
          value={file ? file.name : ''}
          disabled
        />
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="rounded border border-[#C4C4C4] px-[12px] py-[2px] text-[12px]"
        >
          파일 업로드
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="image/png, image/jpeg" // PNG, JPG, JPEG만 선택 가능
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
      {(preview || shipDrawingsUrl) && (
        <>
          <div className="mt-[20px] text-[12px] font-bold md:text-[14px]">
            비콘 위치 설정
          </div>
          <div className="mt-[5px] rounded bg-[#F3F2F8]">
            <div className="relative h-[92px] outline outline-1 md:h-[270px] md:w-[1100px]">
              <div
                style={{
                  ...wrapperStyles,
                  zIndex: 2,
                }}
              >
                <CanvasDots
                  width={isMobile ? 310 : 1100}
                  height={isMobile ? 92 : 270}
                  dots={dots.map((item) => ({
                    ...item,
                    x: item.location_x,
                    y: item.location_y,
                  }))}
                  onDotsChange={onDotsChange}
                />
              </div>
              <div style={wrapperStyles}>
                <Image
                  src={imgView()}
                  alt="선박 도면 미리보기"
                  layout="fill"
                  objectFit="fill"
                />
              </div>
            </div>
          </div>
          {dots.length !== 0 && (
            <div className="mb-[5px] mt-[10px]">선택 영역</div>
          )}
          <DotInputComponent dots={dots} setDots={setDots} />
        </>
      )}

      {(preview || shipDrawingsUrl) && (
        <>
          <div className="mt-[20px] text-[12px] font-bold md:text-[14px]">
            제한구역 설정
          </div>
          <div className="mt-[5px] bg-[#F3F2F8]">
            <div className="relative h-[92px] outline outline-1 md:h-[270px] md:w-[1100px]">
              <div
                style={{
                  ...wrapperStyles,
                  zIndex: 2,
                }}
              >
                <CanvasRect
                  width={isMobile ? 310 : 1100}
                  height={isMobile ? 92 : 270}
                  rects={rects.map((item) => ({
                    ...item,
                    x1: item.location_start_x,
                    x2: item.location_end_x,
                    y1: item.location_start_y,
                    y2: item.location_end_y,
                  }))}
                  onRectsChange={onRectsChange}
                />
              </div>
              <div style={wrapperStyles}>
                <Image
                  src={imgView()}
                  alt="선박 도면 미리보기"
                  layout="fill"
                  objectFit="fill"
                />
              </div>
            </div>
          </div>
          {rects.length !== 0 && (
            <div className="mb-[5px] mt-[10px]">선택 영역</div>
          )}
          <RectInputComponent rects={rects} setRects={setRects} />
        </>
      )}
    </div>
  )
}
