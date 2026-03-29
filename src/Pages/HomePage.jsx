import {
  ArrowRight,
  ShieldCheck,
  Truck,
  RefreshCw,
  Headphones,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useFetch } from "../Hooks/useFetch";
import {
  API_BASE,
  POST_IMAGES,
  TICKER,
  categoryImages,
} from "../Utils/constants";
import { useState, useRef, useEffect } from "react";
import { ProductSkeleton, PostSkeleton } from "../Components/Skeletons";
import ProductCard from "../Components/ProductCard.jsx";
import PostCard from "../Components/PostCard.jsx";

const HomePage = () => {
  const { data: prodData, loading: prodLoading } = useFetch(
    `${API_BASE}/products?limit=8`,
  );
  const { data: postData, loading: postLoading } = useFetch(
    `${API_BASE}/posts?limit=3`,
  );

  const featured = prodData?.products ?? [];
  const posts =
    postData?.posts?.map((post, i) => ({
      ...post,
      image: POST_IMAGES[i % POST_IMAGES.length],
    })) ?? [];

  const categories = [
    { slug: "laptops", large: true },
    { slug: "fragrances" },
    { slug: "groceries" },
    { slug: "home-decor" },
    { slug: "furniture" },
  ];

  return (
    <div>
      {/* // ── Hero ── */}
      <section
        className="relative overflow-hidden"
        style={{
          minHeight: "88vh",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className="absolute inset-0 z-0">
          <img
            alt=""
            className="w-full h-full object-cover"
            src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1600&auto=format&fit=crop&q=85"
          />

          {/* dark gradient overlays */}
          <div className="absolute inset-0 bg-linear-to-r from-secondary-900/90 via-secondary-900/50 to-transparent" />
          <div className="absolute inset-0 bg-linear-to-t from-secondary-900/60 via-transparent to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="animate-fade-up">
            <div className="inline-flex items-center gap-2 py-1.5 text-primary-400 text-xs uppercase tracking-[0.15em] mb-8">
              - New Season arrivals
            </div>
            <h1
              style={{
                fontSize: "clamp(3rem, 6vw, 5.5rem)",
                fontWeight: 600,
                lineHeight: 1.05,
                color: "#F8F6F3",
                letterSpacing: "-0.02em",
              }}
            >
              Dress the
              <br />
              <span style={{ color: "#D4AF70" }}>life</span>
              <br />
              you want.
            </h1>
            <p className="mt-6 text-secondary-400 text-lg leading-relaxed max-w-md">
              Curated fashion, footwear and electronics all in one place. Free
              shipping on orders over $150.
            </p>
            <div className="flex flex-wrap gap-4 mt-10">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-3xl font-medium transition-all text-secondary-800"
                style={{ background: "#D4AF70" }}
              >
                Explore Collection <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── TICKER ── */}
      <section className="  border-white/10 overflow-hidden">
        {/* ── Stats Bar (bottom) ── */}
        <div className="">
          <div className="max-w-7xl mx-auto bg-secondary-900 ">
            <div className="grid grid-cols-3 md:grid-cols-3 ">
              <StatBarItem target={194} suffix="+" label="Products" />
              <StatBarItem target={48000} suffix="+" label="Happy Customers" />
              <StatBarItem target={20} label="Categories" />
            </div>
          </div>
        </div>

        <div className="relative bg-secondary-900 border-t border-white/10 h-12 align-items-center flex overflow-hidden">
          {/* fade edges */}
          <div className="absolute left-0 top-0 h-full w-16 bg-linear-to-r from-secondary-900 to-transparent z-10" />
          <div className="absolute right-0 top-0 h-full w-16 bg-linear-to-l from-secondary-900 to-transparent z-10" />

          <div className="whitespace-nowrap flex animate-marquee">
            {[...TICKER, ...TICKER].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-6 px-8 py-3 text-xs tracking-widest uppercase text-tertiary-500"
              >
                <span className="text-primary-400">•</span>
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Category strip ── */}
      <section className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-12">
        <h3 className="text-tertiary-500 text-sm font-medium tracking-widest mb-1 uppercase">
          Shop By
        </h3>
        <h1 className="text-3xl font-semibold mb-8">Category.</h1>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map(({ slug, large }) => {
            const title = slug.replace(/-/g, " ");
            const image = categoryImages[slug];

            return (
              <Link
                key={slug}
                to={`/shop?cat=${slug}`}
                className={`relative group cursor-pointer rounded-xl overflow-hidden transition-shadow duration-300 ease-in-out
            ${large ? "lg:col-span-2 lg:row-span-2" : ""}
            hover:shadow-2xl`}
                aria-label={`Shop category ${title}`}
              >
                {/* Image zoom on hover */}
                <img
                  src={image}
                  alt={title}
                  className="w-full h-56 sm:h-48 md:h-56 lg:h-full object-cover
              transition-transform duration-700 ease-in-out group-hover:scale-110"
                  onError={(e) =>
                    (e.target.src =
                      "https://via.placeholder.com/600x400?text=No+Image")
                  }
                />

                {/* Gradient overlay */}
                <div
                  className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent opacity-70
            group-hover:opacity-90 transition-opacity duration-300"
                ></div>

                {/* Text always fixed at bottom */}
                <div className="absolute left-4 bottom-4 text-white z-10">
                  <p className="text-xs uppercase tracking-widest font-semibold mb-1">
                    COLLECTION
                  </p>
                  <h3 className="text-xl font-bold capitalize">{title}</h3>
                </div>

                {/* Arrow slides/fades in without moving the text */}
                <div
                  className="absolute bottom-4 right-4 z-10 bg-blue-600 rounded-full p-2 text-white shadow-lg
            opacity-0 group-hover:opacity-100
            translate-y-4 group-hover:translate-y-0
            transition-all duration-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ── Featured products ── */}
      <section className="max-w-7xl mx-auto px-4 py-16 bg-tertiary-100">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs text-tertiary-500 uppercase tracking-widest mb-1">
              Handpicked for you
            </p>
            <h2
              style={{
                fontSize: "2.2rem",
                fontWeight: 600,
                color: "#0F0F0F",
              }}
            >
              Featured Products
            </h2>
          </div>
          <Link
            to="/shop"
            className="hidden sm:flex items-center gap-1 text-sm text-primary-600 hover:gap-2 transition-all font-medium"
          >
            View all <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {prodLoading
            ? Array.from({ length: 8 }).map((_, i) => (
                <ProductSkeleton key={i} />
              ))
            : featured.map((p, i) => (
                <div
                  key={p.id}
                  className="animate-fade-up"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <ProductCard product={p} />
                </div>
              ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link
            to="/shop"
            className="inline-flex items-center gap-1 text-sm text-primary-600 font-medium"
          >
            View all products <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* ── Perks bar ── */}
      <section className="bg-white border-b border-tertiary-300">
        <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          {PERKS.map(({ Icon, title, desc }) => (
            <div key={title} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-tertiary-100 flex items-center justify-center shrink-0 border border-tertiary-300">
                <Icon size={18} color="#B8944A" />
              </div>
              <div>
                <p className="text-sm font-medium text-secondary-800">
                  {title}
                </p>
                <p className="text-xs text-tertiary-500">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="relative bg-black text-center py-24 px-5 overflow-hidden mb-5">
        {/* subtle pattern background */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#d4af37_1px,transparent_1px)] bg-size-[20px_20px]" />

        <div className="relative z-10 max-w-3xl mx-auto">
          {/* top label */}
          <p className="text-xs tracking-widest text-yellow-500 uppercase mb-4">
            Limited Time Offer
          </p>

          {/* heading */}
          <h1 className="text-4xl md:text-6xl font-bold leading-tight text-white">
            Free shipping on{" "}<br />
            <span className="bg-linear-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
              every order 
            </span>
            { " " }
            over $150
          </h1>

          {/* subtext */}
          <p className="mt-6 text-gray-400 text-sm md:text-base">
            No code needed. Just add to cart and watch the magic happen.
          </p>

          {/* button */}
          <button className="mt-8 inline-flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-black text-sm font-semibold px-6 py-3 rounded-full transition">
            SHOP NOW
            <span><ArrowRight / > </span>
          </button>
        </div>
      </section>

      {/* ── Blog previews ── */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs text-tertiary-500 uppercase tracking-widest mb-1">
              From our journal
            </p>
            <h2
              style={{
                fontFamily: "Cormorant Garamond",
                fontSize: "2.2rem",
                fontWeight: 600,
                color: "#0F0F0F",
              }}
            >
              Latest Posts
            </h2>
          </div>
          <Link
            to="/blog"
            className="hidden sm:flex items-center gap-1 text-sm text-primary-600 hover:gap-2 transition-all font-medium"
          >
            All posts <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {postLoading
            ? Array.from({ length: 3 }).map((_, i) => <PostSkeleton key={i} />)
            : posts.map((post, i) => (
                <div
                  key={post.id}
                  className="animate-fade-up"
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <PostCard post={post} />
                </div>
              ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;

// ── Perks data ────────────────────────────────────────────────────────────────
const PERKS = [
  { Icon: Truck, title: "Free Shipping", desc: "On orders over $75" },
  { Icon: RefreshCw, title: "Easy Returns", desc: "30-day return policy" },
  {
    Icon: ShieldCheck,
    title: "Secure Payments",
    desc: "Your data is protected",
  },
];

// ── Count-up hook ────────────────────────────────────────────────────────────
function useCountUp(target, duration = 1800) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  // Fire once when the card scrolls into view
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setStarted(true);
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Ease-out cubic animation
  useEffect(() => {
    if (!started) return;
    let startTime = null;
    const tick = (ts) => {
      if (!startTime) startTime = ts;
      const elapsed = ts - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [started, target, duration]);

  return { count, ref };
}

// ── Stat bar item (for bottom hero stats bar) ───────────────────────────────
function StatBarItem({ target, suffix = "", prefix = "", label }) {
  const { count, ref } = useCountUp(target);

  return (
    <div
      ref={ref}
      className="flex flex-col items-center justify-center py-6 border-r border-white/10 last:border-r-0"
      style={{
        background:
          "linear-gradient(to right, rgba(10,10,10,0.85), rgba(10,10,10,0.6))",
        backdropFilter: "blur(6px)",
      }}
    >
      <span
        style={{
          fontSize: "1.8rem",
          fontWeight: 800,
          color: "#FFFFFF",
        }}
      >
        {prefix}
        {count.toLocaleString()}
        {suffix}
      </span>

      <span className="text-xs text-tertiary-500 mt-1">{label}</span>
    </div>
  );
}
