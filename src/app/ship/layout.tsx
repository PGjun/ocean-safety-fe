export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <div className="m-auto h-screen w-[1360px]">{children}</div>
}
