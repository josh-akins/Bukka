import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  SlidersHorizontal,
  UtensilsCrossed,
} from "lucide-react";
import MenuCard from "../components/menu/MenuCard";
import MenuFilters from "../components/menu/MenuFilters";
import SearchBar from "../components/SearchBar";
import Container from "../components/SectionContainer";
import { menuItems } from "../data/menu";
import { useSearchParams } from "react-router-dom";

const ALL_CATEGORY = "all";
const PRODUCTS_PER_PAGE = 12;
const availableMenuItems = menuItems.filter((item) => item.available === true);
const priceBounds = availableMenuItems.reduce(
  (bounds, item) => ({
    min: Math.min(bounds.min, item.price),
    max: Math.max(bounds.max, item.price),
  }),
  { min: Infinity, max: -Infinity },
);

const safePriceBounds = {
  min: Number.isFinite(priceBounds.min) ? priceBounds.min : 0,
  max: Number.isFinite(priceBounds.max) ? priceBounds.max : 0,
};

export default function MenuPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState(ALL_CATEGORY);
  const [minPrice, setMinPrice] = useState(String(safePriceBounds.min));
  const [maxPrice, setMaxPrice] = useState(String(safePriceBounds.max));
  const [featuredOnly, setFeaturedOnly] = useState(false);
  const [selectedDays, setSelectedDays] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const searchQuery = searchParams.get("search") ?? "";
  const normalizedQuery = searchQuery.trim().toLowerCase();
  const parsedMinPrice = minPrice === "" ? safePriceBounds.min : Number(minPrice);
  const parsedMaxPrice = maxPrice === "" ? safePriceBounds.max : Number(maxPrice);
  const priceRangeError =
    !Number.isFinite(parsedMinPrice) ||
    !Number.isFinite(parsedMaxPrice) ||
    parsedMinPrice > parsedMaxPrice;

  const filteredMenuItems = availableMenuItems.filter((item) => {
    const matchesSearch = normalizedQuery
      ? `${item.name} ${item.description}`.toLowerCase().includes(normalizedQuery)
      : true;
    const matchesCategory =
      selectedCategory === ALL_CATEGORY || item.category === selectedCategory;
    const matchesPrice =
      !priceRangeError &&
      item.price >= parsedMinPrice &&
      item.price <= parsedMaxPrice;
    const matchesFeatured = !featuredOnly || item.featured === true;
    const matchesDay =
      selectedDays.length === 0 ||
      !Array.isArray(item.availableDays) ||
      selectedDays.some((day) => item.availableDays.includes(day));

    return (
      matchesSearch &&
      matchesCategory &&
      matchesPrice &&
      matchesFeatured &&
      matchesDay
    );
  });

  const totalPages = Math.ceil(filteredMenuItems.length / PRODUCTS_PER_PAGE);
  const activePage =
    totalPages > 0 ? Math.min(currentPage, totalPages) : 1;
  const firstVisibleIndex = (activePage - 1) * PRODUCTS_PER_PAGE;
  const visibleMenuItems = filteredMenuItems.slice(
    firstVisibleIndex,
    firstVisibleIndex + PRODUCTS_PER_PAGE,
  );
  const rangeStart = filteredMenuItems.length > 0 ? firstVisibleIndex + 1 : 0;
  const rangeEnd = Math.min(
    firstVisibleIndex + PRODUCTS_PER_PAGE,
    filteredMenuItems.length,
  );
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);
  const hasPriceFilter =
    (minPrice !== "" && Number(minPrice) !== safePriceBounds.min) ||
    (maxPrice !== "" && Number(maxPrice) !== safePriceBounds.max);
  const hasActiveFilters =
    normalizedQuery.length > 0 ||
    selectedCategory !== ALL_CATEGORY ||
    hasPriceFilter ||
    priceRangeError ||
    featuredOnly ||
    selectedDays.length > 0;

  const resetPage = () => setCurrentPage(1);

  const handleSearchChange = (event) => {
    const nextQuery = event.target.value;

    setSearchParams(
      (currentParams) => {
        const nextParams = new URLSearchParams(currentParams);

        if (nextQuery.trim()) {
          nextParams.set("search", nextQuery);
        } else {
          nextParams.delete("search");
        }

        return nextParams;
      },
      { replace: true },
    );
    resetPage();
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    resetPage();
    setIsFiltersOpen(false);
  };

  const handleMinPriceChange = (event) => {
    setMinPrice(event.target.value);
    resetPage();
  };

  const handleMaxPriceChange = (event) => {
    setMaxPrice(event.target.value);
    resetPage();
  };

  const handleFeaturedChange = (event) => {
    setFeaturedOnly(event.target.checked);
    resetPage();
  };

  const handleDayToggle = (day) => {
    setSelectedDays((days) =>
      days.includes(day) ? days.filter((selectedDay) => selectedDay !== day) : [...days, day],
    );
    resetPage();
  };

  const clearFilters = () => {
    setSearchParams(
      (currentParams) => {
        const nextParams = new URLSearchParams(currentParams);
        nextParams.delete("search");
        return nextParams;
      },
      { replace: true },
    );
    setSelectedCategory(ALL_CATEGORY);
    setMinPrice(String(safePriceBounds.min));
    setMaxPrice(String(safePriceBounds.max));
    setFeaturedOnly(false);
    setSelectedDays([]);
    resetPage();
    setIsFiltersOpen(false);
  };

  return (
    <section className="bg-gray-50 py-10 md:py-14">
      <Container>
        <header className="mb-8 md:mb-10">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
            Explore Bukka
          </p>
          <h1 className="text-3xl font-bold text-emerald-950 md:text-5xl">
            Our Menu
          </h1>
          <p className="mt-3 max-w-2xl text-gray-600">
            Find familiar favorites and discover something new, all made with
            the flavors of home.
          </p>
        </header>

        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="w-full sm:max-w-xl">
            <label
              htmlFor="menu-search"
              className="mb-2 block text-sm font-semibold text-emerald-950"
            >
              Search meals
            </label>
            <SearchBar
              id="menu-search"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search by meal name or description..."
              ariaLabel="Search meals by name or description"
            />
          </div>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-200 px-4 py-2.5 text-sm font-semibold text-emerald-900 transition-colors hover:bg-emerald-50"
            >
              <RotateCcw className="h-4 w-4" aria-hidden="true" />
              Clear filters
            </button>
          )}
        </div>

        <div className="mb-6 lg:hidden">
          <button
            type="button"
            onClick={() => setIsFiltersOpen((isOpen) => !isOpen)}
            aria-expanded={isFiltersOpen}
            aria-controls="menu-filters"
            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-emerald-200 bg-white px-4 py-3 text-sm font-semibold text-emerald-950 shadow-sm transition-colors hover:bg-emerald-50"
          >
            <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
            {isFiltersOpen ? "Hide filters" : "Show filters"}
          </button>
        </div>

        <div className="grid items-start gap-8 lg:grid-cols-[minmax(15rem,17rem)_minmax(0,1fr)] xl:gap-10">
          <aside
            id="menu-filters"
            className={`${isFiltersOpen ? "block" : "hidden"} lg:block`}
          >
            <MenuFilters
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
              minPrice={minPrice}
              maxPrice={maxPrice}
              priceBounds={safePriceBounds}
              priceRangeError={priceRangeError}
              onMinPriceChange={handleMinPriceChange}
              onMaxPriceChange={handleMaxPriceChange}
              featuredOnly={featuredOnly}
              onFeaturedChange={handleFeaturedChange}
              selectedDays={selectedDays}
              onDayToggle={handleDayToggle}
            />
          </aside>

          <div className="min-w-0 flex flex-col gap-10">
            <div className="mb-6 flex items-center justify-between gap-4">
              <p className="text-sm text-gray-600" aria-live="polite">
                {filteredMenuItems.length > 0 ? (
                  <>
                    Showing{" "}
                    <span className="font-semibold text-gray-900">
                      {rangeStart}–{rangeEnd}
                    </span>{" "}
                    of {filteredMenuItems.length} matching meals
                  </>
                ) : (
                  "Showing 0 matching meals"
                )}
              </p>
            </div>

            {visibleMenuItems.length > 0 ? (
              <div className="grid w-full grid-cols-1 gap-6 space-y-10 sm:grid-cols-2 xl:grid-cols-3">
                {visibleMenuItems.map((item) => (
                  <MenuCard key={item.id} item={item} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center rounded-3xl border border-gray-100 bg-white px-6 py-14 text-center shadow-sm">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-800">
                  <UtensilsCrossed className="h-7 w-7" aria-hidden="true" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">
                  No meals match your filters
                </h2>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-gray-500">
                  Try adjusting your search, price range, or selected filters
                  to find something delicious.
                </p>
                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="mt-5 rounded-xl bg-[#083324] px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-colors hover:bg-[#0c4a35]"
                  >
                    View all available meals
                  </button>
                )}
              </div>
            )}

            {totalPages > 1 && (
              <nav
                className="mt-10 flex flex-wrap items-center justify-center gap-2"
                aria-label="Menu pagination"
              >
                <button
                  type="button"
                  onClick={() => setCurrentPage((page) => Math.max(page - 1, 1))}
                  disabled={activePage === 1}
                  aria-label="Go to previous page"
                  className="inline-flex h-10 items-center gap-1 rounded-full border border-gray-200 bg-white px-3 text-sm font-semibold text-gray-700 transition-colors hover:border-emerald-200 hover:text-emerald-900 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                  <span className="hidden sm:inline">Previous</span>
                </button>

                {pageNumbers.map((page) => (
                  <button
                    key={page}
                    type="button"
                    onClick={() => setCurrentPage(page)}
                    aria-current={activePage === page ? "page" : undefined}
                    aria-label={`Go to page ${page}`}
                    className={`h-10 min-w-10 rounded-full px-3 text-sm font-semibold transition-colors ${
                      activePage === page
                        ? "bg-[#083324] text-white"
                        : "border border-gray-200 bg-white text-gray-700 hover:border-emerald-200 hover:text-emerald-900"
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  type="button"
                  onClick={() =>
                    setCurrentPage((page) => Math.min(page + 1, totalPages))
                  }
                  disabled={activePage === totalPages}
                  aria-label="Go to next page"
                  className="inline-flex h-10 items-center gap-1 rounded-full border border-gray-200 bg-white px-3 text-sm font-semibold text-gray-700 transition-colors hover:border-emerald-200 hover:text-emerald-900 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <span className="hidden sm:inline">Next</span>
                  <ChevronRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </nav>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
