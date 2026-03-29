import { Outlet, Link } from "react-router-dom";
import Navbar from "./Navbar.jsx";


export default function Layout() {
  return (
    <>
      <div className="bg-secondary-900 text-white text-xs text-center py-3 tracking-wide font-medium">
        Free shipping on orders over $150 &nbsp;·&nbsp; Easy 30-day returns
      </div>
      <div
        className="min-h-screen flex flex-col"
        style={{ background: "var(--cream-100)" }}
      >
        <Navbar />
        <main className="flex-1">
          <Outlet />
        </main>
        <footer className="border-t border-tertiary-300 bg-tertiary-100 text-tertiary-500 mt-16">
          <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-5 gap-10">
            {/* Brand column */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <span
                  style={{
                    fontFamily: "DM Sans, sans-serif",
                    fontSize: "1.5rem",
                    fontWeight: 600,
                    color: "#0a0a0a",
                  }}
                >
                  Shoppr
                </span>
              </div>
              <p className="text-sm leading-relaxed text-neutral-600 max-w-xs">
                Fashion, electronics and lifestyle — delivered to your door.
              </p>
            </div>

            {/* Shop */}
            <div>
              <h4 className="text-secondary-900 text-xs font-semibold mb-5 uppercase tracking-widest">
                Shop
              </h4>
              <ul className="space-y-2.5 text-sm">
                {[
                  { label: "All Products", to: "/shop" },
                  { label: "Men", to: "/shop?cat=mens-shirts" },
                  { label: "Women", to: "/shop?cat=womens-dresses" },
                  { label: "Kids", to: "/shop" },
                  { label: "Electronics", to: "/shop?cat=smartphones" },
                  { label: "Footwear", to: "/shop?cat=mens-shoes" },
                ].map(({ label, to }) => (
                  <li key={label}>
                    <Link
                      to={to}
                      className="hover:text-neutral-700  text-neutral-600 hover:underline transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Help */}
            <div>
              <h4 className="text-secondary-900 text-xs font-semibold mb-5 uppercase tracking-widest">
                Help
              </h4>
              <ul className="space-y-2.5 text-sm">
                {["Returns", "Shipping info", "Size guide", "Contact us"].map(
                  (item) => (
                    <li key={item}>
                      <a
                        href="#"
                        className="hover:text-neutral-700  text-neutral-600 hover:underline transition-colors"
                      >
                        {item}
                      </a>
                    </li>
                  ),
                )}
              </ul>
            </div>

            {/* Journal + Company */}
            <div className="space-y-8">
              <div>
                <h4 className="text-secondary-900 text-xs font-semibold mb-5 uppercase tracking-widest">
                  Journal
                </h4>
                <ul className="space-y-2.5 text-sm">
                  <li>
                    <Link
                      to="/blog"
                      className="hover:text-neutral-700  text-neutral-600 hover:underline transition-colors"
                    >
                      All Posts
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-secondary-900 text-xs font-semibold mb-5 uppercase tracking-widest">
                  Company
                </h4>
                <ul className="space-y-2.5 text-sm">
                  {["About", "Careers", "Privacy Policy"].map((item) => (
                    <li key={item}>
                      <a
                        href="#"
                        className="hover:text-neutral-700  text-neutral-600 hover:underline transition-colors"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="border-t border-neutral-200 px-4 py-4 max-w-7xl mx-auto text-xs text-secondary-500 flex justify-center flex-wrap gap-2 items-center">
            <span>© 2026 Shoppr. All rights reserved.</span>
          </div>
        </footer>
      </div>
    </>
  );
}
