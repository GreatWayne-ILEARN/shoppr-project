import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { truncate } from "../Utils/helpers";

export default function BlogCard({ post }) {
  return (
    <Link
      to={`/blog/${post.id}`}
      className="group block border rounded-lg overflow-hidden transition-shadow duration-300 hover:shadow-lg border-gray-200"
    >
      <article className="flex flex-col">
        {/* CONTENT */}
        <div className="p-3">
          {/* Title */}
          <h3
            className="text-[15px] leading-snug text-[#111] mb-2 
            transition-all duration-300 group-hover:translate-x-1"
          >
            {post.title}
          </h3>

          {/* Short description */}
          <p className="text-[13px] text-secondary-400 leading-relaxed line-clamp-2 mb-3">
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
