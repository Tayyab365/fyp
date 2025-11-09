import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-black border-t border-[#E2E8F0] dark:border-[#2a2a3a] transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-10">
        <div>
          <h2 className="text-2xl font-bold text-[#1E293B] dark:text-white">
            Shop<span className="text-[#2563EB]">Ease</span>
          </h2>
          <p className="mt-4 text-[#475569] dark:text-[#b3b3b3] text-sm leading-relaxed">
            Your one-stop shop for premium gaming gear and accessories.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-[#1E293B] dark:text-white mb-4">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm font-medium">
            <li>
              <Link
                to="/"
                className="hover:text-[#2563EB] dark:hover:text-[#2563EB] text-[#475569] dark:text-[#b3b3b3]"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/shop"
                className="hover:text-[#2563EB] dark:hover:text-[#2563EB] text-[#475569] dark:text-[#b3b3b3]"
              >
                Shop
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="hover:text-[#2563EB] dark:hover:text-[#2563EB] text-[#475569] dark:text-[#b3b3b3]"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="hover:text-[#2563EB] dark:hover:text-[#2563EB] text-[#475569] dark:text-[#b3b3b3]"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-[#1E293B] dark:text-white mb-4">
            Follow Us
          </h3>
          <div className="flex space-x-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-[#1877F2] dark:bg-[#1a1a24] text-[#FFFFFF] dark:text-[#1877F2]"
            >
              <FaFacebookF size={16} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#515BD4] dark:bg-[#1a1a24] text-[#FFFFFF] dark:text-white"
            >
              <FaInstagram size={16} />
            </a>
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 font-bold flex items-center justify-center rounded-full bg-[#000000] dark:bg-[#1a1a24] text-[#FFFFFF] dark:text-white"
            >
              X
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-[#E2E8F0] dark:border-[#2a2a3a] text-center py-4 text-[#475569] dark:text-[#b3b3b3] text-sm">
        © 2025 ShopEase. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
