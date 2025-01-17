import React, { useEffect, useState } from "react";
import { Container, PostCard } from "../components";
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Query } from "appwrite";
import {
  Loader2,
  PlusCircle,
  BookOpen,
  AlertCircle,
  Search,
  CheckCircle2,
  XCircle,
} from "lucide-react";

// Status Badge Component
const StatusBadge = ({ status }) => {
  const isActive = status === "Active";
  return (
    <div
      className={`absolute top-4 right-4 z-50 flex items-center gap-1.5 px-3 py-1 rounded-full font-medium text-sm ${
        isActive ? "bg-green-500/50 text-white" : "bg-red-500/50 text-white"
      }`}
    >
      {isActive ? (
        <CheckCircle2 className="w-4 h-4" />
      ) : (
        <XCircle className="w-4 h-4" />
      )}
      {status}
    </div>
  );
};

// Modified PostCard wrapper to include status
const PostCardWithStatus = (post) => {
  return (
    <div className="relative w-full">
      <StatusBadge status={post.status} />
      <PostCard {...post} showManageButton={true} />
    </div>
  );
};

function MyPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        if (userData?.$id) {
          const result = await appwriteService.getPosts([
            Query.equal("userId", userData.$id),
          ]);
          if (result) {
            setPosts(result.documents);
          }
        }
      } catch (error) {
        setError("Failed to fetch your posts");
      } finally {
        setLoading(false);
      }
    };

    fetchUserPosts();
  }, [userData]);

  // Filter posts based on search query
  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-10 h-10 text-coral-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">
            Loading your posts...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
        <div className="text-center max-w-md mx-auto">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Oops! Something went wrong
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center px-4 py-2 rounded-lg bg-coral-500 text-white hover:bg-coral-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-8 pb-16">
      <Container>
        {/* Header Section */}
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            My Posts
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Manage and track all your published content
          </p>

          {/* Action Buttons */}
          <div className="flex justify-center gap-4 mb-8">
            <Link
              to="/add-post"
              className="inline-flex items-center px-6 py-3 rounded-xl bg-coral-500 text-white hover:bg-coral-600 transition-colors"
            >
              <PlusCircle className="w-5 h-5 mr-2" />
              Create New Post
            </Link>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-xl mx-auto">
            <input
              type="text"
              placeholder="Search your posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 pl-12 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-coral-500 dark:focus:ring-coral-400 focus:border-transparent transition-shadow"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
        </div>

        {/* Posts Grid */}
        {filteredPosts.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No posts yet
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {searchQuery
                ? "No posts match your search"
                : "Start writing and sharing your stories"}
            </p>
            <Link
              to="/add-post"
              className="inline-flex items-center px-6 py-3 rounded-xl bg-coral-500 text-white hover:bg-coral-600 transition-colors"
            >
              <PlusCircle className="w-5 h-5 mr-2" />
              Write Your First Post
            </Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <div key={post.$id} className="flex">
                  <PostCardWithStatus {...post} />
                </div>
              ))}
            </div>

            {/* Post Count */}
            <div className="mt-8 text-center text-gray-600 dark:text-gray-400">
              You have published {filteredPosts.length}{" "}
              {filteredPosts.length === 1 ? "post" : "posts"}
            </div>
          </>
        )}
      </Container>

      {/* Background Decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-coral-500 rounded-full mix-blend-multiply filter blur-3xl opacity-5" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-coral-500 rounded-full mix-blend-multiply filter blur-3xl opacity-5" />
      </div>
    </div>
  );
}

export default MyPosts;
