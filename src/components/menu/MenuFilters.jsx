import { categories } from "../../data/menu";

const AVAILABLE_DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const formatNaira = (value) => `₦${Number(value).toLocaleString("en-NG")}`;

export default function MenuFilters({
  selectedCategory,
  onCategoryChange,
  minPrice,
  maxPrice,
  priceBounds,
  priceRangeError,
  onMinPriceChange,
  onMaxPriceChange,
  featuredOnly,
  onFeaturedChange,
  selectedDays,
  onDayToggle,
}) {
  return (
    <div className="rounded-3xl border border-emerald-100 bg-white p-5 shadow-sm">
      <div className="mb-5 border-b border-gray-100 pb-4">
        <h2 className="text-base md:text-xl font-bold text-emerald-950">
          Filter menu
        </h2>
      </div>

      <fieldset className="border-b border-gray-100 pb-5">
        <legend className="mb-3 text-sm font-semibold text-emerald-950">
          Categories
        </legend>
        <div className="flex flex-wrap gap-2 lg:flex-col">
          <button
            type="button"
            onClick={() => onCategoryChange("all")}
            aria-pressed={selectedCategory === "all"}
            className={`rounded-full px-4 py-2 text-left text-sm font-semibold transition-colors lg:w-full ${
              selectedCategory === "all"
                ? "bg-[#083324] text-white"
                : "border border-gray-200 bg-white text-gray-600 hover:border-emerald-200 hover:text-emerald-900"
            }`}
          >
            All categories
          </button>
          {categories.map((category) => {
            const isSelected = selectedCategory === category.id;

            return (
              <button
                key={category.id}
                type="button"
                onClick={() => onCategoryChange(category.id)}
                aria-pressed={isSelected}
                className={`rounded-full px-4 py-2 text-left text-sm font-semibold transition-colors lg:w-full ${
                  isSelected
                    ? "bg-[#083324] text-white"
                    : "border border-gray-200 bg-white text-gray-600 hover:border-emerald-200 hover:text-emerald-900"
                }`}
              >
                {category.name}
              </button>
            );
          })}
        </div>
      </fieldset>

      <fieldset className="border-b border-gray-100 py-5">
        <legend className="pt-3 text-sm font-semibold text-emerald-950">
          Price range
        </legend>
        <div className="grid grid-cols-2 gap-3">
          <label
            className="text-xs font-medium text-gray-600"
            htmlFor="min-price"
          >
            Minimum
            <span className="relative mt-1 block">
              <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-xs text-gray-400">
                ₦
              </span>
              <input
                id="min-price"
                type="number"
                min={priceBounds.min}
                max={priceBounds.max}
                step="100"
                value={minPrice}
                onChange={onMinPriceChange}
                aria-invalid={priceRangeError}
                className="w-full rounded-xl border border-gray-200 py-2 pl-7 pr-2 text-sm text-gray-900 outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
              />
            </span>
          </label>
          <label
            className="text-xs font-medium text-gray-600"
            htmlFor="max-price"
          >
            Maximum
            <span className="relative mt-1 block">
              <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-xs text-gray-400">
                ₦
              </span>
              <input
                id="max-price"
                type="number"
                min={priceBounds.min}
                max={priceBounds.max}
                step="100"
                value={maxPrice}
                onChange={onMaxPriceChange}
                aria-invalid={priceRangeError}
                className="w-full rounded-xl border border-gray-200 py-2 pl-7 pr-2 text-sm text-gray-900 outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
              />
            </span>
          </label>
        </div>
        <div className="mt-2 flex justify-between text-[11px] text-gray-400">
          <span>{formatNaira(priceBounds.min)}</span>
          <span>{formatNaira(priceBounds.max)}</span>
        </div>
        {priceRangeError && (
          <p className="mt-2 text-xs font-medium text-red-700" role="alert">
            Minimum price cannot exceed maximum price.
          </p>
        )}
      </fieldset>

      <fieldset className="border-b border-gray-100 py-5">
        <legend className="pt-3 text-sm font-semibold text-emerald-950">
          Meal type
        </legend>
        <label className="flex cursor-pointer items-center gap-3 text-sm text-gray-700">
          <input
            type="checkbox"
            checked={featuredOnly}
            onChange={onFeaturedChange}
            className="h-4 w-4 rounded border-gray-300 accent-emerald-900"
          />
          Featured meals only
        </label>
      </fieldset>

      <fieldset className="mt-3">
        <legend className="mb-3 text-sm font-semibold text-emerald-950">
          Available days
        </legend>
        <div className="grid grid-cols-2 gap-2">
          {AVAILABLE_DAYS.map((day) => (
            <label
              key={day}
              className="flex cursor-pointer items-center gap-2 text-sm text-gray-700"
            >
              <input
                type="checkbox"
                checked={selectedDays.includes(day)}
                onChange={() => onDayToggle(day)}
                className="h-4 w-4 rounded border-gray-300 accent-emerald-900"
              />
              {day}
            </label>
          ))}
        </div>
        <p className="mt-3 text-[11px] leading-relaxed text-gray-500">
          Specials match any selected day. Meals without a day schedule are
          treated as available every day.
        </p>
      </fieldset>
    </div>
  );
}
