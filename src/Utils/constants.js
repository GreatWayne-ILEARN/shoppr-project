export const API_BASE = 'https://dummyjson.com'

export const CATEGORIES = [
  { slug: 'all', label: 'All Products' },
  { slug: 'beauty', label: 'Beauty' },
  { slug: 'fragrances', label: 'Fragrances' },
  { slug: 'furniture', label: 'Furniture' },
  { slug: 'groceries', label: 'Groceries' },
  { slug: 'home-decoration', label: 'Home Decor' },
  { slug: 'kitchen-accessories', label: 'Kitchen' },
  { slug: 'laptops', label: 'Laptops' },
  { slug: 'mens-shirts', label: "Men's Shirts" },
  { slug: 'mens-shoes', label: "Men's Shoes" },
  { slug: 'mens-watches', label: "Men's Watches" },
  { slug: 'mobile-accessories', label: 'Mobile Accessories' },
  { slug: 'motorcycle', label: 'Motorcycles' },
  { slug: 'skin-care', label: 'Skin Care' },
  { slug: 'smartphones', label: 'Smartphones' },
  { slug: 'sports-accessories', label: 'Sports' },
  { slug: 'sunglasses', label: 'Sunglasses' },
  { slug: 'tablets', label: 'Tablets' },
  { slug: 'tops', label: 'Tops' },
  { slug: 'vehicle', label: 'Vehicles' },
  { slug: 'womens-bags', label: "Women's Bags" },
  { slug: 'womens-dresses', label: "Women's Dresses" },
  { slug: 'womens-jewellery', label: "Women's Jewellery" },
  { slug: 'womens-shoes', label: "Women's Shoes" },
  { slug: 'womens-watches', label: "Women's Watches" },
]

export const SORT_OPTIONS = [
  { value: 'default', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating-desc', label: 'Highest Rated' },
]

export const TICKER = [
  "New Arrivals",
  "Free Shipping $150+",
  "Secure Checkout",
  "Curated Style",
  "Easy Returns",
];


export const POST_IMAGES = [
  "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800",
  "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=800",
];

export const categoryImages = {
  laptops:
    "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
  fragrances:
    "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=400&q=80",
  groceries:
    "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80",
  "home-decor":
    "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=400&q=80",
  furniture:
    "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=400&q=80",
};


export const FREE_SHIPPING_THRESHOLD = 75
export const SHIPPING_COST = 9.99
export const TAX_RATE = 0.08
