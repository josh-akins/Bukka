import { useState, useRef, useEffect } from "react";
import MenuCard from "./menu/MenuCard";
import { Link } from "react-router-dom";
import Container from "./SectionContainer";
import { MoveRight, ChevronLeft, ChevronRight, UtensilsCrossed } from "lucide-react";
import { featuredMenuItems } from "../data/menu";

export default function FeaturedMeal() {
  const scrollRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 20);
    }
  };

  useEffect(() => {
    const currentRef = scrollRef.current;
    if (currentRef) {
      currentRef.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (currentRef) {
        currentRef.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.75;
      scrollRef.current.scrollTo({
        left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const items = featuredMenuItems.slice(0, 6);

  return (
    <section className="bg-gray-50 py-16 overflow-hidden">
      <Container>
        <div className="mb-8 flex w-full items-end justify-between px-4 sm:px-0">
          <div>
            <h2 className="text-sm md:text-lg lg:text-xl font-extrabold text-[#083324]">
              Featured Dishes 🔥
            </h2>
            <p className="max-w-64 text-wrap text-gray-600 text-xs md:text-sm  mt-1">
              Handpicked favorites loved by our community.
            </p>
          </div>

          <Link
            to="/featured"
            className="flex items-center gap-2 text-xs font-semibold text-emerald-800 hover:text-[#083324] md:text-base lg:text-lg transition-colors shrink-0"
          >
            See all
            <MoveRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </Container>

      <div className="relative max-w-7xl mx-auto px-0 sm:px-6 lg:px-8">
        
        {items.length > 0 && (
          <>
            <button
              onClick={() => scroll("left")}
              aria-label="Scroll left"
              className={`hidden md:flex absolute left-2 lg:left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full border border-gray-200 bg-white/90 backdrop-blur-md text-[#083324] hover:bg-emerald-50 hover:scale-105 transition-all duration-300 cursor-pointer shadow-lg ${
                showLeftArrow ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <button
              onClick={() => scroll("right")}
              aria-label="Scroll right"
              className="hidden md:flex absolute right-2 lg:right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full border border-gray-200 bg-white/90 backdrop-blur-md text-[#083324] hover:bg-emerald-50 hover:scale-105 transition-all duration-300 cursor-pointer shadow-lg"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </>
        )}

        <div 
          ref={scrollRef}
          className="w-full overflow-x-auto scrollbar-none px-4 sm:px-0 pb-8 pt-20 scroll-smooth snap-x snap-mandatory"
        >
          <div className="flex items-center gap-6 w-max">
            
            {items.length > 0 ? (
              items.map((item) => (
                <div key={item.id} className="w-[18rem] shrink-0 snap-start">
                  <MenuCard item={item} />
                </div>
              ))
            ) : (
              <div className="w-full min-w-75 sm:w-150 mx-auto py-12 flex flex-col items-center text-center bg-white border border-gray-100 rounded-3xl shadow-sm px-6">
                <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-800 flex items-center justify-center mb-3">
                  <UtensilsCrossed className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">No featured dishes right now</h3>
                <p className="text-xs text-gray-500 mb-5 max-w-xs">
                  We are updating our kitchen specials. Check back shortly or explore our full menu!
                </p>
                <Link
                  to="/menu"
                  className="px-6 py-2.5 bg-[#083324] text-white text-xs font-semibold rounded-xl hover:bg-[#0c4a35] transition-all shadow-md"
                >
                  Browse Full Menu
                </Link>
              </div>
            )}

          </div>
        </div>

      </div>
    </section>
  );
}