import { ArrowLeft, CheckCircle2, Clock3, Plus, XCircle } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import Container from "../components/SectionContainer";
import { categories, menuItems } from "../data/menu";

const FALLBACK_IMAGE = "/images/smokeyJollofWithTurkey.png";

export default function MealDetailsPage() {
  const { id } = useParams();
  const meal = menuItems.find((item) => item.id === id);

  if (!meal) {
    return (
      <section className="bg-gray-50 py-16 md:py-24">
        <Container>
          <div className="mx-auto max-w-xl rounded-3xl border border-gray-100 bg-white px-6 py-14 text-center shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
              404
            </p>
            <h1 className="mt-3 text-3xl font-bold text-emerald-950">
              Meal not found
            </h1>
            <p className="mt-3 text-gray-600">
              We couldn&apos;t find that meal. It may have been removed from the
              menu or the link may be incorrect.
            </p>
            <Link
              to="/menu"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#083324] px-5 py-3 text-sm font-semibold text-white shadow-md transition-colors hover:bg-[#0c4a35]"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back to Menu
            </Link>
          </div>
        </Container>
      </section>
    );
  }

  const categoryName =
    categories.find((category) => category.id === meal.category)?.name ??
    meal.category;
  const isAvailable = meal.available === true;

  return (
    <section className="bg-gray-50 py-8 sm:py-10 md:py-14">
      <Container>
        <Link
          to="/menu"
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-emerald-800 transition-colors hover:text-[#083324]"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to Menu
        </Link>

        <article className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm sm:rounded-3xl">
          <div className="grid items-center gap-7 p-4 sm:gap-8 sm:p-8 md:grid-cols-2 md:gap-12 md:p-12">
            <div className="flex aspect-square min-w-0 items-center justify-center overflow-hidden rounded-2xl bg-emerald-50/60 p-4 sm:rounded-3xl sm:p-10">
              <img
                src={meal.image}
                alt={meal.name}
                onError={(event) => {
                  event.currentTarget.onerror = null;
                  event.currentTarget.src = FALLBACK_IMAGE;
                }}
                className="max-h-full max-w-full object-contain"
              />
            </div>

            <div className="min-w-0">
              <div className="mb-5 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-emerald-800">
                  {categoryName}
                </span>
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                    isAvailable
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {isAvailable ? (
                    <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                  ) : (
                    <XCircle className="h-3.5 w-3.5" aria-hidden="true" />
                  )}
                  {isAvailable ? "Available to order" : "Currently unavailable"}
                </span>
              </div>

              <h1 className="text-2xl font-bold leading-tight text-emerald-950 md:text-4xl">
                {meal.name}
              </h1>
              <p className="mt-5 text-base leading-relaxed text-gray-600">
                {meal.description}
              </p>

              {Array.isArray(meal.availableDays) &&
                meal.availableDays.length > 0 && (
                  <p className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-gray-600">
                    <Clock3 className="h-4 w-4 text-emerald-700" aria-hidden="true" />
                    Scheduled for: {meal.availableDays.join(", ")}
                  </p>
                )}

              <div className="mt-7 flex flex-col items-start gap-4 border-t border-gray-100 pt-5 sm:mt-8 sm:flex-row sm:items-center sm:justify-between sm:gap-5 sm:pt-6">
                <p className="whitespace-nowrap text-3xl font-extrabold text-gray-900 no-underline decoration-0">
                  ₦{meal.price.toLocaleString("en-NG")}
                </p>

                {isAvailable ? (
                  <button
                    type="button"
                    className="inline-flex h-11 w-full shrink-0 items-center justify-center gap-2 rounded-full bg-[#083324] px-6 text-sm font-semibold text-white shadow-md transition-colors hover:bg-[#0c4a35] sm:w-auto"
                  >
                    Order
                    <Plus className="h-4 w-4" aria-hidden="true" />
                  </button>
                ) : (
                  <span className="rounded-full bg-gray-100 px-5 py-3 text-sm font-semibold text-gray-500">
                    Ordering unavailable
                  </span>
                )}
              </div>
            </div>
          </div>
        </article>
      </Container>
    </section>
  );
}
