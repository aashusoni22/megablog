import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import parse from "html-react-parser";
import { Loader2, TrendingUp, ChevronRight, Sparkles } from "lucide-react";

// Utility function to strip HTML tags and get plain text
const stripHtml = (html) => {
  const tmp = document.createElement("div");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
};

// Utility function to create excerpt
const createExcerpt = (content, length = 150) => {
  const plainText = stripHtml(content);
  return plainText.length > length
    ? plainText.slice(0, length) + "..."
    : plainText;
};

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    setLoading(true);
    appwriteService
      .getPosts()
      .then((posts) => {
        if (posts) {
          setPosts(posts.documents);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  // Get featured posts (first 3 posts)
  const featuredPosts = posts.slice(0, 3);
  // Get remaining posts
  const regularPosts = posts.slice(3);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-coral-500 animate-spin" />
      </div>
    );
  }

  const EmptyState = () => (
    <div className="min-h-[82.5vh] flex flex-col items-center justify-center text-center px-4">
      <div className="max-w-lg">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Start Your Writing Journey
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          {authStatus
            ? "Be the first to share your story with our community."
            : "Join our community to start reading and writing amazing stories."}
        </p>
        <Link
          to={authStatus ? "/add-post" : "/login"}
          className="inline-flex items-center px-6 py-3 text-lg font-medium text-white bg-gradient-to-r from-coral-500 to-coral-600 hover:from-coral-600 hover:to-coral-700 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          {authStatus ? "Create Your First Post" : "Get Started"}
          <ChevronRight className="ml-2 w-5 h-5" />
        </Link>
      </div>
    </div>
  );

  if (posts.length === 0) {
    return (
      <div className="bg-gray-50 dark:bg-gray-900">
        <Container>
          <EmptyState />
        </Container>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Hero Section with Featured Post */}
      {featuredPosts.length > 0 && (
        <div className="relative bg-gray-900 text-white">
          <div className="absolute inset-0">
            <div className="absolute inset-0" />
            {featuredPosts[0]?.featuredImage && (
              <img
                src={appwriteService.getFilePreview(
                  featuredPosts[0].featuredImage
                )}
                alt={featuredPosts[0].title}
                className="w-full h-full object-cover opacity-50"
              />
            )}
          </div>

          <Container>
            <div className="relative pt-16 pb-32 sm:pt-24 sm:pb-40">
              <div className="max-w-2xl">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-coral-500 text-white mb-4">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Featured Post
                </span>
                <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
                  {featuredPosts[0]?.title}
                </h1>
                <p className="text-lg text-gray-300 mb-6">
                  {createExcerpt(featuredPosts[0]?.content || "")}
                </p>
                <Link
                  to={`/post/${featuredPosts[0]?.$id}`}
                  className="inline-flex items-center px-6 py-3 text-base font-medium text-white bg-coral-500 hover:bg-coral-600 rounded-full transition-all duration-300"
                >
                  Read More
                  <ChevronRight className="ml-2 w-5 h-5" />
                </Link>
              </div>
            </div>
          </Container>
        </div>
      )}

      {/* Recent Posts Grid */}
      <Container>
        <div className="py-12">
          {/* Featured Posts Grid */}
          {featuredPosts.length > 1 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Featured Stories
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredPosts.slice(1).map((post) => (
                  <div key={post.$id} className="flex">
                    <PostCard {...post} featured />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Latest Posts */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Latest Stories
              </h2>
              {authStatus && (
                <Link
                  to="/add-post"
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-coral-500 to-coral-600 hover:from-coral-600 hover:to-coral-700 rounded-full transition-all duration-300"
                >
                  Write a Story
                  <ChevronRight className="ml-2 w-4 h-4" />
                </Link>
              )}
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularPosts.map((post) => (
                <div key={post.$id} className="flex">
                  <PostCard {...post} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="py-12 border-t dark:border-gray-800">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Never miss a story
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
              Get the best stories delivered to your inbox weekly.
            </p>
            <form className="flex gap-2 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-coral-500 dark:focus:ring-coral-400"
              />
              <button
                type="submit"
                className="px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-coral-500 to-coral-600 hover:from-coral-600 hover:to-coral-700 rounded-full transition-all duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Home;
