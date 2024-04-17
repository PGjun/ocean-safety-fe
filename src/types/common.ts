import { SearchParams } from '@/components/common/Pagination'
import { UserEmergencyData } from '@/services/api/user'
import { ReactNode } from 'react'
import { Control } from 'react-hook-form'

export interface SearchField {
  [key: string]: string | any
  name: string
  label: string
  placeholder?: string
  component: ({
    control,
    value,
    name,
  }: {
    control: Control
    value?: string | object | undefined
    name: string
  }) => ReactNode
  width: number
}

export type SearchFields = SearchField[]

export interface PageProps<T> {
  params: {}
  searchParams: T
}
