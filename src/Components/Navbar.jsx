import { NavLink, Link, useNavigate } from "react-router-dom";
import { ShoppingBag, Menu, X, Search } from "lucide-react";
import { useState } from "react";
import { useCart } from "../Context/CartContext";

const links = [
  // { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/blog", label: "Blog" },
  // { to: "/cart", label: "Cart" },
];

export default function Navbar() {
  const { itemCount } = useCart();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  const navClass = ({ isActive }) =>
    `text-sm font-medium transition-colors ${isActive ? "text-[#B8944A]" : "text-[#4A4A4A] hover:text-[#0F0F0F]"}`;

  function handleSearch(e) {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    navigate(`/shop?q=${encodeURIComponent(q)}`);
    setQuery("");
    setSearchOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 bg-tertiary-100/95 backdrop-blur-sm border-b border-tertiary-300">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-12">
          {/* Logo */}
          <Link to="/" className="flex items-center ">
            <span
              style={{
                fontSize: "1.6rem",
                fontWeight: 600,
                color: "#0A0A0A",
                letterSpacing: "-0.02em",
              }}
            >
              Shoppr
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <NavLink key={l.to} to={l.to} end={l.to === "/"}>
                {({ isActive }) => (
                  <div className="relative group cursor-pointer">
                    <span
                      className={`text-sm font-medium transition-colors duration-300 ${
                        isActive
                          ? "text-secondary-800"
                          : "text-secondary-500 group-hover:text-secondary-800"
                      }`}
                    >
                      {l.label}
                    </span>
                    <span className="absolute left-0 -bottom-1 w-full h-px bg-transparent" />
                    <span
                      className={`absolute left-0 -bottom-1 w-full h-0.5 bg-black origin-left transition-transform duration-500 ease-out ${
                        isActive
                          ? "scale-x-100"
                          : "scale-x-0 group-hover:scale-x-100"
                      }`}
                    />
                  </div>
                )}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Right icons */}
        <div className="flex items-center gap-2">
          {/* Search toggle */}
          <button
            onClick={() => setSearchOpen((s) => !s)}
            className="p-2 rounded-xl hover:bg-tertiary-300 transition-colors"
            aria-label="Search"
          >
            {searchOpen ? (
              <X size={20} color="#0F0F0F" />
            ) : (
              <Search size={20} color="#0F0F0F" />
            )}
          </button>

          {/* Cart */}
          <Link
            to="/cart"
            className="relative p-2 rounded-xl hover:bg-tertiary-300 transition-colors"
          >
            <ShoppingBag size={20} color="#0F0F0F" />
            {itemCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full bg-secondary-800 text-tertiary-100 text-[10px] flex items-center justify-center font-semibold">
                {itemCount > 99 ? "99+" : itemCount}
              </span>
            )}
          </Link>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-xl hover:bg-tertiary-300"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Search bar dropdown */}
      {searchOpen && (
        <div className="border-t border-tertiary-300 bg-tertiary-100 px-4 py-3">
          <form onSubmit={handleSearch} className="max-w-xl mx-auto flex gap-2">
            <div className="relative flex-1">
              <Search
                size={15}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-tertiary-500"
              />
              <input
                autoFocus
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-tertiary-300 bg-white text-sm placeholder-tertiary-500 focus:outline-none focus:border-primary-400 transition-colors"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-secondary-800 text-tertiary-100 text-sm font-medium hover:bg-primary-600 transition-colors"
            >
              Search
            </button>
          </form>
        </div>
      )}

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-tertiary-300 bg-tertiary-100 px-4 py-4 flex flex-col gap-4">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={navClass}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </NavLink>
          ))}
          {/* Mobile search */}
          <form onSubmit={handleSearch} className="flex gap-2 pt-1">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products..."
              className="flex-1 px-3 py-2 rounded-xl border border-tertiary-300 bg-white text-sm placeholder-tertiary-500 focus:outline-none focus:border-primary-400 transition-colors"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-secondary-800 text-tertiary-100 text-sm font-medium"
            >
              Go
            </button>
          </form>
        </div>
      )}
    </header>
  );
}
