import { ReactNode } from 'react'

export interface SearchField {
  [key: string]: string | any
  name: string
  label: string
  placeholder?: string
  component: (props: any) => ReactNode
  width: number
}

export type SearchFields = SearchField[]

export interface PageProps<T> {
  params: {}
  searchParams: T
}
