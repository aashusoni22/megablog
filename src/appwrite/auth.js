import conf from "../conf/conf.js";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    console.log("Creating account with:", email, password, name);
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      if (error.code === 409) {
        // 409 Conflict Error (Email already exists)
        throw new Error("A user with this email already exists.");
      } else {
        console.log("Appwrite service :: createAccount :: error", error);
        throw error; // Re-throw the error for the UI to handle
      }
    }
  }

  //login user
  async login({ email, password }) {
    try {
      const currentUser = await this.getCurrentUser(); // Check for active session

      if (currentUser) {
        console.log("User is already logged in:", currentUser);
        return currentUser; // Use existing session
      }

      // If no session exists, create a new one
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      if (error.message.includes("session is active")) {
        console.log(
          "Session already active. Logging out and logging in again."
        );
        await this.logout(); // Log out the current session
        return await this.account.createEmailPasswordSession(email, password); // Try logging in again
      } else {
        console.log("Appwrite service :: login :: error", error);
        throw error; // Re-throw the error for further handling
      }
    }
  }

  //check if the user is logged in or not
  async getCurrentUser() {
    try {
      const user = await this.account.get();
      return user;
    } catch (error) {
      // If the error indicates that the user is a guest (not logged in)
      if (error.code === 401) {
        console.log(
          "User is not logged in or does not have an active session."
        );
      } else {
        console.log("Appwrite service :: getCurrentUser :: error", error);
      }
      return null; // Return null if no user is logged in
    }
  }

  //logout user
  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log("Appwrite service :: logout :: error", error);
    }
  }
}

const authService = new AuthService();

export default authService;
