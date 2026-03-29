import {
  ArrowRight,
  ShieldCheck,
  Truck,
  RefreshCw,
  Headphones,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { API_BASE, POST_IMAGES, TICKER } from "../Utils/constants";
import { useState, useRef, useEffect } from "react";

const HomePage = () => {
  const { data: prodData } = useFetch(`${API_BASE}/products?limit=8`);
  const { data: postData } = useFetch(`${API_BASE}/posts?limit=3`);

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
            <div className="inline-flex items-center gap-2 px-4 py-1.5 text-primary-400 text-xs uppercase tracking-[0.15em] mb-8">
              - New Season arrivals
            </div>
            <h1
              style={{
                fontFamily: "Cormorant Garamond",
                fontSize: "clamp(3rem, 6vw, 5.5rem)",
                fontWeight: 600,
                lineHeight: 1.05,
                color: "#F8F6F3",
                letterSpacing: "-0.02em",
              }}
            >
              Dress the
              <br />
              <em style={{ color: "#D4AF70", fontStyle: "italic" }}>life</em>
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

        <div className="relative bg-secondary-900 border-t border-white/10 h-12 mt-16 align-items-center flex overflow-hidden">
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


    </div>
  );
};

export default HomePage;

// ── Perks data ────────────────────────────────────────────────────────────────
const PERKS  = [
  { Icon: Truck,       title: 'Free Shipping',   desc: 'On orders over $75'        },
  { Icon: RefreshCw,   title: 'Easy Returns',    desc: '30-day return policy'       },
  { Icon: ShieldCheck, title: 'Secure Payments', desc: 'Your data is protected'     },
  { Icon: Headphones,  title: '24/7 Support',    desc: "We're always here for you"  },
]


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
