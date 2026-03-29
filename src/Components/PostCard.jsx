import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { calcReadTime, truncate } from "../Utils/helpers";

export default function PostCard({ post }) {
  const readTime = calcReadTime(post.body);

  return (
    <Link to={`/blog/${post.id}`} className="group block">
      <article className="flex flex-col">
        {/* IMAGE */}
        <div className="relative overflow-hidden rounded-lg bg-[#f3f2ef] mb-4">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>

        {/* CONTENT */}
        <div className="px-1">

          {/* Title */}
          <h3
            className="text-[15px] leading-snug text-[#111] mb-2 
            transition-all duration-300 group-hover:translate-x-1"
          >
            {post.title}
          </h3>

          {/* Short description */}
          <p className="text-[13px] text-[#6b6b6b] leading-relaxed line-clamp-2 mb-3">
            {truncate(post.body, 90)}
          </p>

          {/* Read more */}
          <span className="text-[12px] flex items-center gap-1 text-[#111]">
            Read{" "}
            <ArrowRight
              size={12}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </span>
        </div>
      </article>
    </Link>
  );
}
