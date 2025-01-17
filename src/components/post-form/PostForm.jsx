import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import appwriteService from "../../appwrite/config";
import { Button, Input, Select, RTE } from "../index";
import { ImagePlus, Loader2, X } from "lucide-react";

function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.$id || "",
        content: post?.content || "",
        status: post?.status || "active",
        featuredImage: post?.featuredImage || "",
      },
    });

  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(
    post?.featuredImage
      ? appwriteService.getFilePreview(post.featuredImage)
      : null
  );
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const submit = async (data) => {
    setLoading(true);
    try {
      let fileId = null;

      // Handle image upload
      const file = data.image?.[0];
      if (file) {
        console.log("Uploading file:", file);
        const uploadedFile = await appwriteService.uploadFile(file);
        if (uploadedFile) {
          fileId = uploadedFile.$id;
          console.log("File uploaded successfully. File ID:", fileId);
        }
      }

      if (!post) {
        // Creating new post
        if (!fileId && !data.featuredImage) {
          throw new Error("Please upload an image");
        }

        const dbPost = await appwriteService.createPost({
          ...data,
          userId: userData.$id,
          featuredImage: fileId || data.featuredImage,
        });

        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      } else {
        // Updating existing post
        const dbPost = await appwriteService.updatePost(post.$id, {
          ...data,
          featuredImage: fileId || data.featuredImage || post.featuredImage,
        });

        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    } catch (error) {
      console.error("Error submitting post:", error);
      alert(error.message); // Show error to user
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Update form value
      setValue("image", [file]);

      // Show preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-")
        .slice(0, 36);
    return "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-8">
      {loading && (
        <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800/90 px-6 py-4 rounded-lg shadow-xl flex items-center gap-3">
            <Loader2 className="w-5 h-5 animate-spin text-coral-500" />
            <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
              {post ? "Updating post..." : "Creating your post..."}
            </p>
          </div>
        </div>
      )}

      {/* Main Content Section */}
      <div className="bg-white dark:bg-gray-800/50 backdrop-blur-xl rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700/50 overflow-hidden">
        <div className="p-8">
          {/* Title Input */}
          <div className="mb-8">
            <Input
              label="Title"
              placeholder="Enter your post title"
              {...register("title", { required: true })}
            />
          </div>

          {/* Slug Input */}
          <div className="mb-8">
            <Input
              label="URL Slug"
              placeholder="post-url-slug"
              className="font-mono text-sm bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700"
              {...register("slug", { required: true })}
              onInput={(e) => {
                setValue("slug", slugTransform(e.currentTarget.value), {
                  shouldValidate: true,
                });
              }}
            />
          </div>

          {/* Rich Text Editor */}
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <RTE
              name="content"
              control={control}
              defaultValue={getValues("content")}
              className="min-h-[300px]"
            />
          </div>
        </div>
      </div>

      {/* Sidebar Settings */}
      <div className="bg-white dark:bg-gray-800/50 backdrop-blur-xl rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700/50 overflow-hidden">
        <div className="p-8">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            Post Settings
          </h3>

          {/* Featured Image Upload */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Featured Image
            </label>
            <div className="relative rounded-xl overflow-hidden group">
              {previewImage ? (
                <div className="relative aspect-video">
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setPreviewImage(null);
                      setValue("image", null);
                      setValue("featuredImage", null);
                    }}
                    className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <label className="relative block cursor-pointer group">
                  <div className="h-48 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800/30 hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-colors p-8">
                    <div className="h-full flex flex-col items-center justify-center space-y-3">
                      <div className="shrink-0 rounded-full p-3 bg-gray-100 dark:bg-gray-800/70 group-hover:bg-coral-50 dark:group-hover:bg-coral-900/20 transition-colors">
                        <ImagePlus className="w-6 h-6 text-gray-500 dark:text-gray-400 group-hover:text-coral-500 dark:group-hover:text-coral-400" />
                      </div>
                      <div className="text-center">
                        <span className="text-coral-500 dark:text-coral-400">
                          Upload an image
                        </span>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </div>
                    </div>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image")}
                    onChange={handleImageChange}
                  />
                </label>
              )}
            </div>
          </div>

          {/* Status Select */}
          <div className="mb-8">
            <Select
              label="Post Status"
              options={["Active", "Inactive"]}
              defaultValue="Active"
              {...register("status", { required: true })}
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={loading}
            className={`w-full py-2.5 ${
              loading
                ? "bg-gray-100 dark:bg-gray-800 text-gray-400"
                : "bg-gradient-to-r from-coral-500 to-coral-600 hover:from-coral-600 hover:to-coral-700 text-white"
            } rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 focus:ring-2 focus:ring-coral-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900`}
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            {post ? "Update Post" : "Publish Post"}
          </Button>
        </div>
      </div>
    </form>
  );
}

export default PostForm;
