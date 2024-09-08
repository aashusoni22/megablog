import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  return post ? (
    <div className="py-12 bg-gray-50 min-h-screen">
      <Container>
        <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="relative">
            <img
              src={appwriteService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="w-full h-64 object-contain"
            />

            {isAuthor && (
              <div className="absolute right-4 top-4 flex space-x-2">
                <Link to={`/edit-post/${post.$id}`}>
                  <Button bgColor="bg-green-500" className="px-4 py-2">
                    Edit
                  </Button>
                </Link>
                <Button
                  bgColor="bg-red-500"
                  className="px-4 py-2"
                  onClick={deletePost}
                >
                  Delete
                </Button>
              </div>
            )}
          </div>
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              {post.title}
            </h1>
            <div className="prose max-w-none">{parse(post.content)}</div>
          </div>
        </div>
      </Container>
    </div>
  ) : (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-lg text-gray-600">Loading...</div>
    </div>
  );
}
