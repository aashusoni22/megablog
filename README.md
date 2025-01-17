# MegaBlog - Modern Blogging Platform

A feature-rich blogging platform built with React and Appwrite, designed for a seamless writing and reading experience.

## ✨ Features

- 🔐 Secure authentication system
- ✍️ Rich text editor for blog creation
- 🖼️ Image upload support
- 🌙 Dark mode
- 📱 Responsive design
- ✨ Featured posts section
- 📝 Post management (create, edit, delete)
- 👤 User profile management

## 🛠️ Tech Stack

- **Frontend:** React 18
- **Styling:** TailwindCSS
- **Backend:** Appwrite
- **State Management:** Redux Toolkit
- **Form Handling:** React Hook Form
- **Editor:** Rich Text Editor
- **Build Tool:** Vite

## 📁 Project Structure

```
APPWRITEBLOG/
├── node_modules/
├── src/
│   ├── appwrite/
│   │   ├── auth.js
│   │   └── config.js
│   ├── assets/
│   │   ├── about.png
│   │   ├── favicon.ico
│   │   └── logo.png
│   ├── components/
│   │   ├── container/
│   │   │   └── Container.jsx
│   │   ├── Footer/
│   │   │   └── Footer.jsx
│   │   ├── Header/
│   │   │   ├── Header.jsx
│   │   │   └── LogoutBtn.jsx
│   │   └── post-form/
│   │       ├── PostForm.jsx
│   │       ├── AuthLayout.jsx
│   │       ├── Button.jsx
│   │       ├── Input.jsx
│   │       ├── Login.jsx
│   │       ├── Logo.jsx
│   │       ├── PostCard.jsx
│   │       ├── RTE.jsx
│   │       ├── Select.jsx
│   │       └── Signup.jsx
│   ├── conf/
│   │   └── conf.js
│   ├── pages/
│   │   ├── About.jsx
│   │   ├── AddPost.jsx
│   │   ├── AllPosts.jsx
│   │   ├── EditPost.jsx
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── MyPosts.jsx
│   │   ├── Post.jsx
│   │   └── Signup.jsx
│   ├── store/
│   │   ├── authSlice.js
│   │   ├── postsSlice.js
│   │   └── store.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .env
├── .eslintrc.cjs
├── .gitignore
├── index.html
├── package-lock.json
├── package.json
├── postcss.config.js
├── README.md
├── tailwind.config.js
└── vite.config.js
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Appwrite instance

### Installation

1. Clone the repository
```bash
git clone https://github.com/aashusoni22/megablog.git
cd megablog
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
VITE_APPWRITE_URL=your_appwrite_endpoint
VITE_APPWRITE_PROJECT_ID=your_project_id
VITE_APPWRITE_DATABASE_ID=your_database_id
VITE_APPWRITE_COLLECTION_ID=your_collection_id
VITE_APPWRITE_BUCKET_ID=your_bucket_id
```

4. Start the development server
```bash
npm run dev
```

## 🔧 Configuration

### Appwrite Setup

1. Create a new project in Appwrite Console
2. Create a new database
3. Create collections for:
   - Users
   - Posts
4. Set up authentication methods
5. Create storage bucket for images

## 🤝 Contributing

1. Fork the project
2. Create your feature branch
```bash
git checkout -b feature/AmazingFeature
```
3. Commit your changes
```bash
git commit -m 'Add some AmazingFeature'
```
4. Push to the branch
```bash
git push origin feature/AmazingFeature
```
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📧 Contact

Aashu Soni - omsoni051@gmail.com

Project Link: [https://github.com/aashusoni22/megablog](https://github.com/aashusoni22/megablog)

## 🙏 Acknowledgments

- [Appwrite](https://appwrite.io/)
- [React](https://reactjs.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/)
