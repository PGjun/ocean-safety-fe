export async function downloadFile(url: string, fileName: string) {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/' + url) // URL로부터 응답을 받음
    if (!response.ok) throw new Error('Network response was not ok.')
    const blob = await response.blob() // 응답 데이터를 Blob으로 변환
    const downloadUrl = window.URL.createObjectURL(blob) // Blob URL 생성
    const a = document.createElement('a')
    a.href = downloadUrl
    a.download = fileName || 'default-filename' // 파일 이름 설정
    document.body.appendChild(a)
    a.click() // 링크 클릭을 통한 다운로드
    document.body.removeChild(a)
    window.URL.revokeObjectURL(downloadUrl) // 사용된 Blob URL 정리
  } catch (error) {
    console.error('Download failed:', error)
  }
}
