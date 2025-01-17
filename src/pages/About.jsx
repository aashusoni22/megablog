import React from "react";
import { Container } from "../components";
import {
  Code2,
  Users,
  Sparkles,
  BookOpen,
  PenLine,
  Github,
} from "lucide-react";

function About() {
  // Features section data
  const features = [
    {
      icon: PenLine,
      title: "Easy Content Creation",
      description:
        "Write and publish your stories with our intuitive editor, supporting rich text and image uploads.",
    },
    {
      icon: Users,
      title: "Vibrant Community",
      description:
        "Join a community of passionate writers and readers sharing knowledge and experiences.",
    },
    {
      icon: Sparkles,
      title: "Modern Experience",
      description:
        "Enjoy a clean, modern interface designed for the best reading and writing experience.",
    },
    {
      icon: BookOpen,
      title: "Diverse Content",
      description:
        "Explore a wide range of topics from technology to lifestyle, written by diverse voices.",
    },
  ];

  // Team members data (you can modify this)
  const team = [
    {
      name: "John Doe",
      role: "Founder & Developer",
      image: "/api/placeholder/400/400", // Replace with actual image
    },
    {
      name: "Jane Smith",
      role: "Content Lead",
      image: "/api/placeholder/400/400", // Replace with actual image
    },
    // Add more team members as needed
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      {/* Hero Section */}
      <Container>
        <div className="py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            About MegaBlog
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A modern platform for writers and readers to share stories, ideas,
            and knowledge. Built with passion for creating meaningful
            connections through words.
          </p>
        </div>
      </Container>

      {/* Mission Section */}
      <div className="bg-white dark:bg-gray-800/50 backdrop-blur-xl border-y border-gray-200 dark:border-gray-700/50">
        <Container>
          <div className="py-16">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                We believe in the power of words to inspire, educate, and
                connect people. Our platform is built to empower writers and
                provide readers with high-quality content that matters.
              </p>
            </div>
          </div>
        </Container>
      </div>

      {/* Features Section */}
      <Container>
        <div className="py-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
            What Makes Us Different
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-6 bg-white dark:bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-200 dark:border-gray-700/50"
              >
                <feature.icon className="w-12 h-12 text-coral-500 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>

      {/* Technology Section */}
      <div className="bg-white dark:bg-gray-800/50 backdrop-blur-xl border-y border-gray-200 dark:border-gray-700/50">
        <Container>
          <div className="py-16">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Built with Modern Technology
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                Our platform is built using cutting-edge technology to provide
                the best possible experience for our users.
              </p>
              <div className="flex items-center justify-center gap-8">
                <Code2 className="w-8 h-8 text-coral-500" />
                <Github className="w-8 h-8 text-coral-500" />
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Team Section */}
      <Container>
        <div className="py-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
            Meet the Team
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="p-6 bg-white dark:bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-200 dark:border-gray-700/50 text-center"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4"
                />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                  {member.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {member.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>

      {/* Contact Section */}
      <div className="bg-white dark:bg-gray-800/50 backdrop-blur-xl border-y border-gray-200 dark:border-gray-700/50">
        <Container>
          <div className="py-16 text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Get in Touch
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
              Have questions or feedback? We'd love to hear from you.
            </p>
            <a
              href="mailto:contact@megablog.com"
              className="inline-flex items-center px-6 py-3 text-base font-medium text-white bg-gradient-to-r from-coral-500 to-coral-600 hover:from-coral-600 hover:to-coral-700 rounded-full transition-all duration-200"
            >
              Contact Us
            </a>
          </div>
        </Container>
      </div>
    </div>
  );
}

export default About;
