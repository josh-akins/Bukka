import HeroSection from "../components/Hero";
import FeaturedMeal from "../components/FeaturedMeal";
// import Container from "../components/SectionContainer";

export default function HomePage() {
  return (
    <div>
        <HeroSection/>
        <FeaturedMeal />
      {/* <h2 className="text-3xl font-bold text-[#083324] mb-4">
        Welcome to Bukka
      </h2>
      <p className="text-gray-600 mb-8">This is the Homepage</p> */}
    </div>
  );
}
