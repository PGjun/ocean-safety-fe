import { ReactNode } from 'react'
import { Control } from 'react-hook-form'

type Dates = { start: Date; end: Date }

export interface DatePickerSingleProps {
  name?: string
  placeholder?: string
  field: { value: Date; onChange: (dates: Date) => void }
}

export interface DatePickerRangeProps {
  name?: string
  placeholder?: string
  field: { value: Dates; onChange: (dates: Dates) => void }
}

export interface DatePickerWrapperProps {
  name?: string
  label?: string
  children?: ReactNode
}

export interface DatePickerControllerProps {
  control: Control<any>
  name?: string
  label?: string
  placeholder?: string
}
