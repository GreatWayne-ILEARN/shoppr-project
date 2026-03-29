import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { X, ChevronDown, SlidersHorizontal, ChevronUp } from "lucide-react";
import { useFetch } from "../Hooks/useFetch";
import { API_BASE, CATEGORIES, SORT_OPTIONS } from "../Utils/constants";
import ProductCard from "../Components/ProductCard";
import { ProductSkeleton } from "../Components/Skeletons";
import { ErrorMessage, EmptyResults } from "../Components/States";

export default function ShopPage() {
  const [params, setParams] = useSearchParams();
  const [filtersOpen, setFiltersOpen] = useState(false);

  const q = params.get("q") || "";
  const cat = params.get("cat") || "all";
  const sort = params.get("sort") || "default";

  const { data, loading, error } = useFetch(`${API_BASE}/products?limit=100`);
  const products = data?.products ?? [];

  function setParam(key, val) {
    setParams((prev) => {
      const next = new URLSearchParams(prev);
      if (val && val !== "all" && val !== "default") next.set(key, val);
      else next.delete(key);
      return next;
    });
  }

  function clearSearch() {
    setParams((prev) => {
      const next = new URLSearchParams(prev);
      next.delete("q");
      return next;
    });
  }

  const filtered = useMemo(() => {
    let list = [...products];
    if (cat && cat !== "all") list = list.filter((p) => p.category === cat);
    if (q.trim()) {
      const term = q.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(term) ||
          (p.description ?? "").toLowerCase().includes(term),
      );
    }
    if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
    if (sort === "rating-desc")
      list.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
    return list;
  }, [products, cat, q, sort]);

  const activeCategory =
    CATEGORIES.find((c) => c.slug === cat) ?? CATEGORIES[0];

  // Shared category list — used in both sidebar and filter panel
  const CategoryList = () => (
    <ul className="space-y-0.5">
      {CATEGORIES.map((c) => {
        const isActive = cat === c.slug;
        return (
          <li key={c.slug} className="group-hover:*">
            <button
              onClick={() => {
                setParam("cat", c.slug);
                setFiltersOpen(false);
              }}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                isActive
                  ? "bg-neutral-900 text-white font-medium"
                  : "text-neutral-700 hover:bg-neutral-100"
              }`}
            >
              {c.label}
            </button>
          </li>
        );
      })}
    </ul>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <h1
        className="text-2xl font-semibold text-neutral-900 mb-1"
        style={{ letterSpacing: "-0.01em" }}
      >
        {activeCategory.label}
      </h1>

      <div className="flex gap-8">
        {/* ── Desktop Sidebar ── */}
        <aside className="hidden md:block w-56 shrink-0">
          <p className="text-[10px] font-semibold text-neutral-400 uppercase tracking-[0.15em] mb-3">
            Category
          </p>
          <CategoryList />
        </aside>

        {/* ── Main content ── */}
        <div className="flex-1 min-w-0">
          {/* Results for banner */}
          {q && (
            <div className="flex items-center gap-1.5 text-sm text-secondary-400 mb-1">
              Results for &ldquo;
              <span className="text-neutral-900 font-medium">{q}</span>&rdquo;
              <button
                onClick={clearSearch}
                className="ml-0.5 p-0.5 rounded hover:bg-neutral-100 transition-colors"
                aria-label="Clear search"
              >
                <X size={13} />
              </button>
            </div>
          )}

          {/* Count + Filters button + Sort row */}
          <div className="flex items-center gap-3 mt-4 mb-1">
            <p className="text-sm text-secondary-400 mr-auto">
              {!loading &&
                `${filtered.length} product${filtered.length !== 1 ? "s" : ""}`}
            </p>

            {/* Filters toggle — mobile only */}
            <button
              onClick={() => setFiltersOpen((o) => !o)}
              className="md:hidden flex items-center gap-1.5 px-3 py-2 rounded-lg border border-neutral-200 bg-white text-sm text-neutral-700 hover:bg-neutral-50 transition-colors"
            >
              <SlidersHorizontal size={14} />
              Filters
              {filtersOpen ? (
                <ChevronUp size={13} />
              ) : (
                <ChevronDown size={13} />
              )}
            </button>

            {/* Sort dropdown */}
            <div className="relative">
              <select
                value={sort}
                onChange={(e) => setParam("sort", e.target.value)}
                className="appearance-none pl-3 pr-8 py-2 rounded-lg border border-neutral-200 bg-white text-sm text-neutral-700 focus:outline-none focus:border-neutral-400 transition-colors cursor-pointer"
              >
                {SORT_OPTIONS.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={13}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none"
              />
            </div>
          </div>

          {/* ── Mobile filter panel ── */}
          {filtersOpen && (
            <div className="md:hidden rounded-xl border border-neutral-200 bg-neutral-50 p-4 mb-4">
              <p className="text-[10px] font-semibold text-neutral-400 uppercase tracking-[0.15em] mb-3">
                Category
              </p>
              <CategoryList />
            </div>
          )}

          {/* Grid */}
          {error && <ErrorMessage message={error} />}

          {!error && (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
              {loading ? (
                Array.from({ length: 12 }).map((_, i) => (
                  <ProductSkeleton key={i} />
                ))
              ) : filtered.length === 0 ? (
                <div className="col-span-full">
                  <EmptyResults query={q} />
                </div>
              ) : (
                filtered.map((p, i) => (
                  <div
                    key={p.id}
                    className="animate-fade-up"
                    style={{ animationDelay: `${Math.min(i, 12) * 40}ms` }}
                  >
                    <ProductCard product={p} />
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
