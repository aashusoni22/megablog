import React from "react";
import { Container, PostForm } from "../components/index";

function AddPost() {
  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <Container>
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-4xl mx-auto">
          <h1 className="text-3xl font-extrabold text-gray-700 text-center mb-6">
            Create New Post
          </h1>
          <PostForm />
        </div>
      </Container>
    </div>
  );
}

export default AddPost;
