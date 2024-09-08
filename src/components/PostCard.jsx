import React from "react";
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";

function PostCard({ $id, title, featuredImage }) {
  return (
    <Link
      to={`/post/${$id}`}
      className="block transform transition duration-300 hover:scale-105"
    >
      <div className="w-full min-h-72 flex flex-col justify-between bg-white text-gray-900 rounded-lg overflow-hidden shadow-md hover:shadow-2xl transition-shadow duration-300 border border-transparent hover:border-gray-300">
        <div className="relative w-full overflow-hidden rounded-t-lg">
          <img
            src={appwriteService.getFilePreview(featuredImage)}
            alt={title}
            className="w-full h-56 object-cover transition-transform duration-500 hover:scale-110"
          />
        </div>
        <div className="p-6 flex flex-col items-start">
          <h2
            title={title}
            className="text-xl font-bold text-gray-800 mb-2 truncate w-full"
          >
            {title}
          </h2>
          <span className="text-sm text-gray-500">Read more</span>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;
