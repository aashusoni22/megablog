import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import {
  Calendar,
  Clock,
  Share2,
  Bookmark,
  MoreHorizontal,
  Edit3,
  Trash2,
  ImageOff,
  Loader2,
} from "lucide-react";

export default function Post() {
  const [post, setPost] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);
  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    const fetchData = async () => {
      if (slug) {
        const post = await appwriteService.getPost(slug);
        if (post) {
          // Get the author's data
          try {
            const userData = await appwriteService.getCurrentUser();
            post.author = {
              name: userData.name,
            };
          } catch (error) {
            console.log("Error fetching user data:", error);
          }
          setPost(post);
        } else {
          navigate("/");
        }
      }
    };

    fetchData();
  }, [slug, navigate]);

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  const calculateReadingTime = (content) => {
    const plainText = content.replace(/<[^>]*>/g, "").trim();
    const wordsPerMinute = 200;
    const wordCount = plainText.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);
    return Math.max(1, readingTime);
  };

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-coral-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Article Header */}
      <header className="pt-8 pb-6 px-4">
        <Container>
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-6 text-white">{post.title}</h1>

            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full bg-coral-500 flex items-center justify-center">
                  <span className="text-lg font-medium text-white">
                    {(post.author?.name || "A")[0]}
                  </span>
                </div>
                <div>
                  <div className="font-medium text-white">
                    {post.author?.name || "Anonymous"} {/* Changed this line */}
                  </div>
                  <div className="flex items-center text-sm text-gray-400 space-x-4">
                    <span className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(post.$createdAt).toLocaleDateString()}
                    </span>
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />{" "}
                      {calculateReadingTime(post.content)} min read
                    </span>
                  </div>
                </div>
              </div>

              {/* Post Actions */}
              <div className="flex items-center space-x-2">
                {isAuthor ? (
                  <div className="relative">
                    <button
                      onClick={() => setIsMenuOpen(!isMenuOpen)}
                      className="p-2 hover:bg-gray-700 rounded-full transition-colors"
                    >
                      <MoreHorizontal className="w-5 h-5" />
                    </button>

                    {isMenuOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-[#232933] rounded-lg shadow-xl py-1 z-50">
                        <Link
                          to={`/edit-post/${post.$id}`}
                          className="flex items-center px-4 py-2 text-sm text-gray-200 hover:bg-gray-700"
                        >
                          <Edit3 className="w-4 h-4 mr-2" />
                          Edit Post
                        </Link>
                        <button
                          onClick={deletePost}
                          className="flex items-center w-full px-4 py-2 text-sm text-red-400 hover:bg-gray-700"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete Post
                        </button>
                      </div>
                    )}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </Container>
      </header>

      {/* Featured Image */}
      <div className="w-full py-6">
        <Container>
          <div className="flex justify-center">
            {!imageError ? (
              <img
                src={appwriteService.getFilePreview(post.featuredImage)}
                alt={post.title}
                className="w-96 h-96"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-full h-64 bg-[#2C333F] rounded-lg flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <ImageOff className="w-12 h-12 mx-auto mb-2" />
                  <p>Image not available</p>
                </div>
              </div>
            )}
          </div>
        </Container>
      </div>

      {/* Article Content */}
      <article className="py-12">
        <Container>
          <div className="max-w-3xl mx-auto">
            <div className="prose prose-lg prose-invert max-w-none">
              {parse(post.content)}
            </div>
          </div>
        </Container>
      </article>

      {/* Article Footer */}
      <footer className="py-8 border-t border-gray-800">
        <Container>
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-between">
              <button className="flex items-center space-x-2 text-gray-400 hover:text-coral-500 transition-colors">
                <Share2 className="w-5 h-5" />
                <span>Share this article</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-400 hover:text-coral-500 transition-colors">
                <Bookmark className="w-5 h-5" />
                <span>Save for later</span>
              </button>
            </div>
          </div>
        </Container>
      </footer>
    </div>
  );
}
