// import { create } from 'zustand'

// interface DropdownStore {
//   activeDropdown: string
//   setActiveDropdown: (id: string) => void
// }

// // 드롭다운 스토어 생성
// const useDropdownStore = create<DropdownStore>((set) => ({
//   activeDropdown: '',
//   setActiveDropdown: (id) => set({ activeDropdown: id }),
// }))

// export default useDropdownStore

import { create } from 'zustand'

interface SelectedValue {
  value: string
  label: string
}

interface DropdownStore {
  activeDropdown: string
  setActiveDropdown: (id: string) => void
  selectedValues: Record<string, SelectedValue> // 선택된 값의 value와 label을 저장
  setSelectedValue: (dropdownId: string, selectedValue: SelectedValue) => void
}

const useDropdownStore = create<DropdownStore>((set) => ({
  activeDropdown: '',
  setActiveDropdown: (id) => set({ activeDropdown: id }),
  selectedValues: {},
  setSelectedValue: (dropdownId, selectedValue) =>
    set((state) => ({
      selectedValues: { ...state.selectedValues, [dropdownId]: selectedValue },
    })),
}))

export default useDropdownStore
