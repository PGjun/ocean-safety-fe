import { useState } from 'react'

export const useDropDown = () => {
  const [openDropBox, setOpenDropBox] = useState(false)
  return { openDropBox, setOpenDropBox }
}
