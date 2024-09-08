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
    <div className="py-12 bg-gray-100 min-h-screen">
      <Container>
        <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="relative p-3">
            <img
              src={appwriteService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="w-full h-80 object-contain rounded-t-lg"
            />

            {isAuthor && (
              <div className="absolute right-4 top-4 flex space-x-3">
                <Link to={`/edit-post/${post.$id}`}>
                  <Button className=" hover:bg-cyan-600 text-white px-4 py-2 rounded-md shadow-md">
                    <i className="fa-regular fa-pen-to-square"></i>
                  </Button>
                </Link>
                <Button
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md shadow-md"
                  onClick={deletePost}
                >
                  <i className="fa-solid fa-trash"></i>
                </Button>
              </div>
            )}
          </div>
          <div className="p-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              {post.title}
            </h1>
            <div className="prose prose-lg max-w-none text-gray-700 leading-8">
              {parse(post.content)}
            </div>
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
