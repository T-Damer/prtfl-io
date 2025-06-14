export default function Search({
  value,
  setValue,
}: {
  value: string
  setValue: (str: string) => void
}) {
  return (
    <search className="dark:border-white-pale focus-within:bg-selection z-10 border-b-2 border-black bg-black p-2 text-white transition-colors">
      <input
        role="search"
        className="w-full outline-none"
        placeholder="Search"
        value={value}
        onInput={(e) => setValue(e.currentTarget.value)}
      />
    </search>
  )
}
