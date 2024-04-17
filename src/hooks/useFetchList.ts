import { useEffect, useState } from 'react'

interface ApiResponse<Data> {
  status: number
  data: Data
}

export const useFetch = <Data, Params>({
  apiFn,
  params,
  defVal,
}: {
  apiFn: (params: Params) => Promise<ApiResponse<Data> | undefined>
  params: Params
  defVal: any
}) => {
  const [data, setData] = useState<Data>(defVal)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)
      try {
        const res = await apiFn(params)
        if (res?.status === 200) {
          setData(res.data)
        } else {
          setError('An error occurred while fetching data')
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err))
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [apiFn, params]) // JSON.stringify 사용하여 깊은 비교 수행

  return { data, loading, error }
}
