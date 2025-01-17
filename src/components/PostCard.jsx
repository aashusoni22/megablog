import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  MoreHorizontal,
  Edit3,
  Trash2,
  ImageOff,
} from "lucide-react";
import appwriteService from "../appwrite/config";

function PostCard({ $id, title, featuredImage, showManageButton = false }) {
  const [showMenu, setShowMenu] = useState(false);
  const [imageError, setImageError] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        const status = await appwriteService.deletePost($id);
        if (status) {
          window.location.reload(); // Refresh to show updated list
        }
      } catch (error) {
        console.error("Error deleting post:", error);
        alert("Failed to delete post");
      }
    }
  };

  return (
    <div className="relative group flex flex-col w-full h-full bg-white dark:bg-gray-800/50 backdrop-blur-xl rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700/50 hover:border-gray-200 dark:hover:border-gray-600/50 transition-all duration-300">
      {/* Image Section */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100 dark:bg-gray-800">
        {!imageError ? (
          <img
            src={appwriteService.getFilePreview(featuredImage)}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800">
            <ImageOff className="w-8 h-8 text-gray-400" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent" />
      </div>

      {/* Content Section */}
      <div className="flex flex-col flex-grow p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 line-clamp-2">
          {title}
        </h2>

        <div className="mt-auto flex items-center justify-between">
          <Link
            to={`/post/${$id}`}
            className="inline-flex items-center text-coral-500 dark:text-coral-400 text-sm font-medium hover:text-coral-600 dark:hover:text-coral-300"
          >
            Read article
            <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>

          {showManageButton && (
            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700/50 rounded-full transition-colors"
              >
                <MoreHorizontal className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </button>

              {showMenu && (
                <div className="absolute z-50 right-0 -top-[5.7rem] mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 py-1">
                  <Link
                    to={`/edit-post/${$id}`}
                    className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700/50"
                  >
                    <Edit3 className="w-4 h-4 mr-2" />
                    Edit Post
                  </Link>
                  <button
                    onClick={handleDelete}
                    className="flex items-center w-full px-4 py-2 text-sm text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700/50"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete Post
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PostCard;
