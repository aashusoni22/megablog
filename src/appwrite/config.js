import conf from "../conf/conf.js";
import { Client, ID, Databases, Storage, Query, Account } from "appwrite";
import authService from "./auth.js";

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  //create new post and store it in database
  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      const currentUser = await authService.getCurrentUser();
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage: featuredImage || "default-image-id",
          status,
          userId,
          author: currentUser.name,
        }
      );
    } catch (error) {
      console.log("Appwrite service :: createPost :: error", error);
      throw error;
    }
  }

  //update existing post
  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      console.log("Appwrite service :: updatePost :: error", error);
    }
  }

  //delete post
  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log("Appwrite service :: deletePost :: error", error);
      return false;
    }
  }

  //get post
  async getPost(slug) {
    try {
      const post = await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );

      if (post && post.userId) {
        try {
          // Create a new Account instance to get user data
          const users = new Account(this.client);
          const authorData = await users.get(post.userId);

          if (authorData) {
            post.author = {
              name: authorData.name,
            };
          }
        } catch (error) {
          console.log("Error fetching author data:", error);
          post.author = { name: "Anonymous" };
        }
      }
      return post;
    } catch (error) {
      console.log("Appwrite service :: getPost :: error", error);
      return false;
    }
  }

  //get all posts
  async getPosts(queries = [Query.equal("status", "Active")]) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries
      );
    } catch (error) {
      console.log("Appwrite service :: getPosts :: error", error);
      return false;
    }
  }

  //file upload services
  async uploadFile(file) {
    try {
      console.log("Uploading file:", file.name, "Size:", file.size);

      if (!file) {
        throw new Error("No file provided");
      }

      const uploadedFile = await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      );

      console.log("File uploaded successfully:", uploadedFile);
      return uploadedFile;
    } catch (error) {
      console.error("Appwrite service :: uploadFile :: error", error);
      throw new Error("Failed to upload image: " + error.message);
    }
  }

  //delete file
  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.log("Appwrite service :: uploadFile :: error", error);
      return false;
    }
  }

  //preview file
  getFilePreview(fileId) {
    try {
      if (!fileId || fileId === "default-image-id") {
        console.log("getFilePreview: Invalid fileId:", fileId);
        return null;
      }

      console.log("getFilePreview: Getting preview for file:", fileId);
      console.log("getFilePreview: Using bucket:", conf.appwriteBucketId);

      const url = this.bucket.getFilePreview(conf.appwriteBucketId, fileId);

      console.log("getFilePreview: Generated URL:", url);
      return url;
    } catch (error) {
      console.error("Appwrite service :: getFilePreview :: error", error);
      return null;
    }
  }
}

const service = new Service();

export default service;
