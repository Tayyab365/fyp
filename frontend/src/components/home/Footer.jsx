import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-[#E2E8F0]">
      {/* Main Footer */}
      <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-10">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-[#1E293B]">
            Shop<span className="text-[#2563EB]">Ease</span>
          </h2>
          <p className="mt-4 text-[#475569] text-sm leading-relaxed">
            Your one-stop shop for premium gaming gear and accessories.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-[#1E293B] mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-[#2563EB] text-[#475569]">Home</Link>
            </li>
            <li>
              <Link to="/shop" className="hover:text-[#2563EB] text-[#475569]">Shop</Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-[#2563EB] text-[#475569]">About</Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-[#2563EB] text-[#475569]">Contact</Link>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold text-[#1E293B] mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-[#F1F5F9] text-[#475569] hover:bg-[#2563EB] hover:text-white transition">
              <FaFacebookF size={16} />
            </a>
            <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-[#F1F5F9] text-[#475569] hover:bg-[#2563EB] hover:text-white transition">
              <FaInstagram size={16} />
            </a>
            <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-[#F1F5F9] text-[#475569] hover:bg-[#2563EB] hover:text-white transition">
              <FaTwitter size={16} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#E2E8F0] text-center py-4 text-[#475569] text-sm">
        © 2025 ShopEase. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
