import { Controller } from 'react-hook-form'

export const SearchController = ({
  control,
  name,
  label,
  placeholder,
  value,
}: any) => (
  <Controller
    control={control}
    name={name}
    render={({ field }) => {
      return (
        <label
          htmlFor={name}
          className="flex flex-col rounded border border-[#DEE2E6] bg-white px-[1rem] py-[0.7rem]"
        >
          <div className="text-[14px] font-bold md:text-[12px]">{label}</div>
          <input
            id={name}
            type="text"
            defaultValue={value}
            value={field.value}
            onChange={(e) => field.onChange(e.target.value)}
            className="w-full bg-white text-[18px] outline-none placeholder:text-[#C4C4C4] md:text-[14px]"
            placeholder={placeholder}
          />
        </label>
      )
    }}
  />
)
