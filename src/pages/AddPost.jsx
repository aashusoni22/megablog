import React from "react";
import { Container, PostForm } from "../components/index";
import { PenLine } from "lucide-react";

function AddPost() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <Container>
        <div className="py-8 md:py-12 max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="max-w-2xl mx-auto text-center mb-10">
            <div className="inline-flex items-center justify-center p-2 bg-coral-50 dark:bg-coral-900/10 rounded-xl mb-4">
              <PenLine className="w-6 h-6 text-coral-500 dark:text-coral-400" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
              Create New Post
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Share your thoughts, ideas, and stories with the world. Your voice
              matters.
            </p>
          </div>

          {/* Post Form Container */}
          <div className="relative">
            {/* Form */}
            <div className="relative">
              <PostForm />
            </div>
          </div>

          {/* Help Text */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Need help? Check out our{" "}
              <a
                href="#"
                className="text-coral-600 hover:text-coral-500 dark:text-coral-400 dark:hover:text-coral-300 transition-colors"
              >
                posting guidelines
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
  );
}

export default AddPost;
