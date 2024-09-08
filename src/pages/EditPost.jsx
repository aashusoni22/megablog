import React, { useEffect, useState } from "react";
import { Container, PostForm } from "../components/index";
import appwriteService from "../appwrite/config";
import { useNavigate, useParams } from "react-router-dom";

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

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg text-gray-600">Loading...</div>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg text-red-500">{error}</div>
      </div>
    );

  return post ? (
    <div className="py-12 bg-gray-50 min-h-screen">
      <Container>
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-4xl mx-auto">
          <h1 className="text-3xl font-extrabold text-gray-700 text-center mb-6">
            Edit Post
          </h1>
          <PostForm post={post} />
        </div>
      </Container>
    </div>
  ) : null;
}

export default EditPost;
