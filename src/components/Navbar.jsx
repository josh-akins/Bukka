import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import { ShoppingCartIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const normalizedQuery = searchQuery.trim();

    navigate(
      normalizedQuery
        ? `/menu?search=${encodeURIComponent(normalizedQuery)}`
        : "/menu",
    );
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 transition-transform duration-300 ease-in-out ${
        isScrolled ? "-translate-y-1" : "translate-y-0"
      }`}
    >
      <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex items-center gap-2 py-1.5 md:bg-white md:px-3.5 md:rounded-full cursor-pointer">
            <img src="/images/secondarylogo.png" alt="logo" width={40} />
            <span className="hidden md:block text-3xl text-emerald-950 font-sans font-bold">
              bukka
            </span>
          </div>
        </Link>
        <div className="hidden md:flex items-center space-x-6">
          <form
            onSubmit={handleSearchSubmit}
            aria-label="Search the menu"
            className="w-full max-w-md"
          >
            <SearchBar
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search dishes..."
              ariaLabel="Search dishes"
            />
          </form>
          <div className="hidden md:flex text-xs md:text-sm lg:text-lg font-medium font-sans items-center space-x-6">
            <Link
              to="/menu"
              className="text-gray-600 hover:text-[#083324] transition-colors"
            >
              Menu
            </Link>
            <a
              href="#"
              className="text-gray-600 hover:text-[#083324] transition-colors"
            >
              Reviews
            </a>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="flex text-xs md:text-sm lg:text-lg items-center text-emerald-800 border border-emerald-800 px-4 py-2 rounded-full cursor-pointer hover:bg-emerald-800 hover:text-white transition-all duration-200">
            Get Started
          </button>
          <ShoppingCartIcon className="w-5 h-5 text-emerald-500 shrink-0" />
        </div>
      </div>
    </nav>
  );
}
