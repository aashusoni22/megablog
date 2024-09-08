import React from "react";
import { Link } from "react-router-dom";
import { Logo } from "../../components/index";

function Footer() {
  return (
    <section className="relative py-6 bg-white shadow-lg">
      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <div className="flex flex-wrap">
          <div className="w-full p-6 md:w-1/2 lg:w-5/12">
            <div className="flex h-full flex-col justify-between">
              <div className="mb-4 inline-flex items-center">
                <Logo width="80px" />
              </div>
              <div>
                <p className="text-sm text-gray-400">
                  &copy; Copyright 2023. All Rights Reserved by DevUI.
                </p>
              </div>
            </div>
          </div>

          {/* Company Section */}
          <div className="w-full p-6 md:w-1/2 lg:w-2/12">
            <div className="h-full">
              <h3 className="tracking-wider mb-6 text-sm font-semibold uppercase text-gray-500">
                Company
              </h3>
              <ul>
                <li className="mb-3">
                  <Link
                    className="text-base font-medium text-slate-700 hover:text-cyan-400 transition-colors"
                    to="/"
                  >
                    Features
                  </Link>
                </li>
                <li className="mb-3">
                  <Link
                    className="text-base font-medium text-slate-700 hover:text-cyan-400 transition-colors"
                    to="/"
                  >
                    Pricing
                  </Link>
                </li>
                <li className="mb-3">
                  <Link
                    className="text-base font-medium text-slate-700 hover:text-cyan-400 transition-colors"
                    to="/"
                  >
                    Affiliate Program
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-base font-medium text-slate-700 hover:text-cyan-400 transition-colors"
                    to="/"
                  >
                    Press Kit
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Support Section */}
          <div className="w-full p-6 md:w-1/2 lg:w-2/12">
            <div className="h-full">
              <h3 className="tracking-wider mb-6 text-sm font-semibold uppercase text-gray-500">
                Support
              </h3>
              <ul>
                <li className="mb-3">
                  <Link
                    className="text-base font-medium text-slate-700 hover:text-cyan-400 transition-colors"
                    to="/"
                  >
                    Account
                  </Link>
                </li>
                <li className="mb-3">
                  <Link
                    className="text-base font-medium text-slate-700 hover:text-cyan-400 transition-colors"
                    to="/"
                  >
                    Help
                  </Link>
                </li>
                <li className="mb-3">
                  <Link
                    className="text-base font-medium text-slate-700 hover:text-cyan-400 transition-colors"
                    to="/"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-base font-medium text-slate-700 hover:text-cyan-400 transition-colors"
                    to="/"
                  >
                    Customer Support
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Legals Section */}
          <div className="w-full p-6 md:w-1/2 lg:w-3/12">
            <div className="h-full">
              <h3 className="tracking-wider mb-6 text-sm font-semibold uppercase text-gray-500">
                Legals
              </h3>
              <ul>
                <li className="mb-3">
                  <Link
                    className="text-base font-medium text-slate-700 hover:text-cyan-400 transition-colors"
                    to="/"
                  >
                    Terms &amp; Conditions
                  </Link>
                </li>
                <li className="mb-3">
                  <Link
                    className="text-base font-medium text-slate-700 hover:text-cyan-400 transition-colors"
                    to="/"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-base font-medium text-slate-700 hover:text-cyan-400 transition-colors"
                    to="/"
                  >
                    Licensing
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Footer;
