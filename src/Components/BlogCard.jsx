import React from "react";
import { Link } from "react-router-dom";

export default function BlogCard({ post }) {
  const excerpt = post.body.length > 120 ? post.body.slice(0, 120) + "..." : post.body;
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="text-xl font-bold mb-2">{post.title}</h3>
      <p className="text-neutral-600 mb-4">{excerpt}</p>
      <Link to={`/blog/${post.id}`} className="text-primary-500 hover:underline">
        Read more →
      </Link>
    </div>
  );
}


