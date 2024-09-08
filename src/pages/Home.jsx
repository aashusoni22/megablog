import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

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

  return (
    <div className="relative w-full py-12 bg-gray-50">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-70 z-50">
          <div className="loader"></div>
        </div>
      )}
      {posts.length === 0 && !loading && (
        <div className="w-full py-16 mt-8 text-center">
          <Container>
            <div className="flex justify-center items-center">
              <div className="p-4 w-full max-w-md bg-white shadow-md rounded-lg">
                <h1 className="text-3xl font-bold text-gray-700 mb-4">
                  No Posts Available
                </h1>
                <p className="text-gray-500">Please login to read posts.</p>
              </div>
            </div>
          </Container>
        </div>
      )}
      {posts.length > 0 && (
        <>
          <h1 className="text-center text-3xl font-bold text-slate-700 mb-8">
            Blogs
          </h1>
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {posts.map((post) => (
                <div key={post.$id} className="p-4">
                  <PostCard {...post} />
                </div>
              ))}
            </div>
          </Container>
        </>
      )}
    </div>
  );
}

export default Home;
