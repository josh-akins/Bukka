import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { categories } from "../../data/menu";

export default function MenuCard({ item }) {
  const categoryName =
    categories.find((category) => category.id === item.category)?.name ??
    item.category;

  return (
    // Restored pt-20 to give space for the floating image at the top
    <article className="group relative flex w-full max-w-sm flex-col items-center rounded-t-[3rem] rounded-b-[2.5rem] border border-gray-100 bg-white/80 px-6 pb-6 pt-20 text-center shadow-xl backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
      <Link
        to={`/menu/${item.id}`}
        aria-label={`View ${item.name}`}
        className="flex w-full flex-col items-center"
      >
        {/* Restored -mt-32 to make the image float and pop out of the top of the card */}
        <div className="-mt-32 mb-3 flex h-48 w-48 items-center justify-center drop-shadow-2xl">
          <img
            src={item.image}
            alt={item.name}
            onError={(event) => {
              event.currentTarget.onerror = null;
              event.currentTarget.src = "/images/smokeyJollofWithTurkey.png";
            }}
            className="h-full w-full object-contain transition-transform duration-500 ease-out group-hover:scale-110 group-hover:-rotate-3"
          />
        </div>

        <div className="mb-2 mt-1 flex flex-wrap items-center justify-center gap-2">
          <span className="inline-block rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-emerald-800">
            {categoryName}
          </span>
        </div>

        <h2 className="mb-1 line-clamp-1 text-base font-bold leading-snug text-gray-900">
          {item.name}
        </h2>
        <p className="mb-6 line-clamp-2 px-1 text-xs leading-relaxed text-gray-500">
          {item.description}
        </p>
      </Link>

      <div className="mt-auto flex w-full items-center justify-between border-t border-gray-100/60 pt-2">
        <span className="text-lg font-extrabold text-gray-900">
          ₦{item.price.toLocaleString()}
        </span>
        <button
          type="button"
          className="flex h-9 items-center justify-center gap-1.5 rounded-full bg-[#083324] px-4 text-white shadow-md transition-all duration-200 hover:bg-[#0c4a35] active:scale-95 cursor-pointer"
        >
          <span className="text-xs font-semibold">Order</span>
          <Plus className="h-4 w-4" />
        </button>
      </div>
    </article>
  );
}