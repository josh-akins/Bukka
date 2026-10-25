import MenuCard from "../components/menu/MenuCard";
import Container from "../components/SectionContainer";
import { featuredMenuItems } from "../data/menu";

export default function FeaturedPage() {
  return (
    <section className="bg-gray-50 py-10">
      <Container>
        <header className="mb-10">
          <h1 className="text-2xl font-bold text-emerald-950 md:text-4xl">
            Featured Meals
          </h1>
          <p className="mt-2 max-w-2xl text-gray-600">
            Explore our selection of featured dishes, made fresh with the
            flavors of home.
          </p>
        </header>

        {featuredMenuItems.length > 0 ? (
          <div className="grid w-full grid-cols-1 justify-items-center gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {featuredMenuItems.map((item) => (
              <MenuCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <p className="text-gray-600">There are no featured meals available.</p>
        )}
      </Container>
    </section>
  );
}
