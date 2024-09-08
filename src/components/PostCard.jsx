import React from "react";
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";

function PostCard({ $id, title, featuredImage }) {
  return (
    <Link
      to={`/post/${$id}`}
      className="block transition-transform duration-300 transform hover:scale-105"
    >
      <div className="w-full min-h-64 flex flex-col justify-between bg-slate-800 text-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div className="w-full mb-4">
          <img
            src={appwriteService.getFilePreview(featuredImage)}
            alt={title}
            className="w-full h-48 object-contain rounded-t-xl"
          />
        </div>
        <div className="p-4">
          <h2 className="text-xl font-semibold truncate">{title}</h2>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;
