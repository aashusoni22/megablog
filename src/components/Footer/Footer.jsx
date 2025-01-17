import React from "react";
import { Link } from "react-router-dom";
import { Logo } from "../../components/index";
import { Github, Twitter, Heart, Linkedin } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Logo and Brand */}
          <div className="flex items-center gap-2">
            <Logo width="30px" />
            <span className="text-lg font-semibold bg-gradient-to-r from-coral-400 to-coral-500 bg-clip-text text-transparent">
              MegaBlog
            </span>
          </div>

          {/* Center Links */}
          <div className="flex items-center gap-6">
            <Link
              to="/about"
              className="text-sm text-gray-400 hover:text-coral-400 transition-colors"
            >
              About
            </Link>
            <Link
              to="/privacy"
              className="text-sm text-gray-400 hover:text-coral-400 transition-colors"
            >
              Privacy
            </Link>
            <Link
              to="/terms"
              className="text-sm text-gray-400 hover:text-coral-400 transition-colors"
            >
              Terms
            </Link>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/aashusoni22"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-coral-400 transition-colors"
              aria-label="GitHub"
            >
              <Github size={18} />
            </a>
            <a
              href="https://www.linkedin.com/in/aashutosh-soni-225a12177"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-coral-400 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={18} />
            </a>
            <span className="text-sm text-gray-500 ml-4 flex items-center gap-1">
              <Heart size={12} className="text-coral-500" fill="currentColor" />
              2024
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
