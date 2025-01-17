import React, { useEffect, useState } from "react";
import { Container, PostForm } from "../components/index";
import appwriteService from "../appwrite/config";
import { useNavigate, useParams } from "react-router-dom";
import { Loader2, Edit3, Home } from "lucide-react";

function EditPost() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      if (slug) {
        try {
          const result = await appwriteService.getPost(slug);
          if (result) {
            setPost(result);
          } else {
            setError("Post not found");
          }
        } catch (error) {
          setError("Failed to fetch post");
        } finally {
          setLoading(false);
        }
      } else {
        navigate("/");
      }
    };

    fetchPost();
  }, [navigate, slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="bg-white dark:bg-gray-800/90 px-6 py-4 rounded-xl shadow-xl flex items-center gap-3">
          <Loader2 className="w-5 h-5 animate-spin text-coral-500" />
          <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
            Loading your post...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="bg-white dark:bg-gray-800/90 px-6 py-4 rounded-xl shadow-xl text-center">
          <p className="text-sm font-medium text-red-500 dark:text-red-400 mb-3">
            {error}
          </p>
          <button
            onClick={() => navigate(-1)}
            className="text-sm text-coral-600 hover:text-coral-500 dark:text-coral-400 dark:hover:text-coral-300 transition-colors"
          >
            Go back
          </button>
        </div>
      </div>
    );
  }

  return post ? (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <Container>
        <div className="py-8 md:py-12 max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="max-w-2xl mx-auto text-center mb-10">
            <div className="inline-flex items-center justify-center p-2 bg-coral-50 dark:bg-coral-900/10 rounded-xl mb-4">
              <Edit3 className="w-6 h-6 text-coral-500 dark:text-coral-400" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
              Edit Your Post
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Refine your story and make it even better. Every edit brings you
              closer to perfection.
            </p>
          </div>

          {/* Post Form Container */}
          <div className="relative">
            {/* Form */}
            <div className="relative">
              <PostForm post={post} />
            </div>
          </div>

          {/* Help Text */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Need help with editing? Check our{" "}
              <a
                href="#"
                className="text-coral-600 hover:text-coral-500 dark:text-coral-400 dark:hover:text-coral-300 transition-colors"
              >
                editing guidelines
              </a>{" "}
              or{" "}
              <a
                href="#"
                className="text-coral-600 hover:text-coral-500 dark:text-coral-400 dark:hover:text-coral-300 transition-colors"
              >
                contact support
              </a>
            </p>
          </div>
        </div>
      </Container>
    </div>
  ) : null;
}

export default EditPost;
