import { Search } from "lucide-react";

export default function SearchBar({
  value,
  onChange,
  placeholder = "Search...",
}) {
  return (
    <div className="relative w-full max-w-md">
      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
        <Search className="w-5 h-5" />
      </div>

      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-2.5 text-xs md:text-sm lg:text-lg bg-white border border-gray-100  rounded-full text-gray-900 placeholder-gray focus:outline-none focus:ring-[#083324] focus:border-transparent transition-all shadow-sm"
      />
    </div>
  );
}