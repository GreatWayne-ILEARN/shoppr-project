import { Link } from "react-router-dom";
// import { formatPrice } from "../Utils/helpers";

export default function ProductCard({ product }) {
  return (
    <Link to={`/shop/${product.id}`} className="group block">
      <div className="relative  transition-transform duration-300">

        <div className="bg-tertiary-50 rounded-2xl">

          {/* Bottom base line */}
          {/* <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#d6d3d1]" /> */}

          {/* Animated hover line */}
          <span
            className=" absolute bottom-0 left-0 w-full h-0.5 bg-black 
          origin-left scale-x-0 transition-transform duration-500 ease-out 
          group-hover:scale-x-100"
          />

          {/* Image */}
          <div className="flex items-center justify-center h-full mb-5">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="max-h-full object-contain transition-transform duration-500 group-hover:scale-107 "
            />
          </div>
        </div>

        {/* Category */}
        <p className="text-[11px] text-neutral-400 lowercase mb-1">
          {product.category}
        </p>

        {/* Title */}
        <h3 className="text-[14px] text-[#111] mb-2 leading-snug">
          {product.title}
        </h3>

        {/* Price + Rating */}
        <div className="flex items-center justify-between text-[13px]">
          <span className="font-medium text-black">
            {formatPrice(product.price)}
          </span>

          <div className="flex items-center gap-1 text-rating-500">
            ⭐ <span className="text-[#111] text-[12px]">{product.rating}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
