import QrScanner from '@/app/test/QrScanner'

export default function crewAdd() {
  return (
    <div className="mt-[32px] flex items-center justify-center">
      <div className="w-[310px] md:mx-[40px] md:min-w-[1100px]">
        <div className="text-[26px] font-bold">승선원 추가</div>
        <div className="mt-[15px] flex h-[580px] items-center justify-center bg-[#F3F5FF]">
          <div className="flex flex-col items-center gap-[30px] text-center">
            {/* <div className="h-[190px] w-[190px] border-[6px] border-[#2262C6] bg-white"></div> */}
            <div className="max-w-[190px]">
              <QrScanner />
            </div>
            <div className="max-w-[270px] text-[18px] font-bold leading-[21.6qpx] text-[#2262C6] md:max-w-[340px]">
              {`웨어러블 정보를 입력하기 위해 갤럭시
               워치로 QR코드를 인식해주세요.`}
            </div>
          </div>
        </div>
        <div className="mt-[10px] flex justify-end">
          <button className="rounded border border-[#888888] px-[28px] py-[10px] text-[14px] font-bold md:text-[18px]">
            건너뛰기
          </button>
        </div>
      </div>
    </div>
  )
}
