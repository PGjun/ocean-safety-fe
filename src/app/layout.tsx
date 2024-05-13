import type { Metadata } from 'next'
import './globals.css'
import { pretendard } from '@/constants/fonts'
import { Header } from '@/components/Header'
import NextTopLoader from 'nextjs-toploader'
import { MainNavbar } from '@/components/MainNavbar'
import ModalWrapper from '@/components/modal/ModalWrapper'
import { LayoutProvider } from '@/components/LayoutProvider'
import SessionWrapper from '@/components/SessionWrapper'

export const metadata: Metadata = {
  title: '레오케어',
  description: '승선원 모니터링 서비스',
  keywords: [
    '오션세이프티',
    'OceanSafety',
    '승선원',
    '선박',
    '모니터링',
    '건강정보',
    '워치',
    '비콘',
    '제한구역',
    '레오케어',
    '제이디아이',
  ],
  icons: {
    icon: '/favicon.svg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={pretendard.className}>
        <NextTopLoader />
        <SessionWrapper>
          <div className="flex">
            <MainNavbar />
            <div className="flex-1">
              <Header />
              <ModalWrapper />
              <LayoutProvider>{children}</LayoutProvider>
            </div>
          </div>
        </SessionWrapper>
      </body>
    </html>
  )
}
