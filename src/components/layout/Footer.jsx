import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-800 mt-8 text-white py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Footer Content */}
        <div className="flex flex-wrap justify-between mb-8">
          {/* Logo Section */}
          <div className="w-full sm:w-1/4 mb-4 sm:mb-0">
            <Link to={"/"}>
              {" "}
              <h2 className="text-2xl font-semibold">Polytechub</h2>
            </Link>
            <p className="text-sm mt-2">
             Crypto World
            </p>
          </div>

          {/* Quick Links */}
          <div className="w-full sm:w-1/4 mb-4 sm:mb-0">
            <h3 className="font-semibold text-lg">Quick Links</h3>
            <ul className="mt-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white">
                  Home
                </Link>
              </li>
              
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-white">
                  Blog
                </Link>
              </li>
              <li>
                <a href="/contact" className="text-gray-400 hover:text-white">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="w-full sm:w-1/4 mb-4 sm:mb-0">
            <h3 className="font-semibold text-lg">Contact Us</h3>
            <ul className="mt-2">
              <li className="text-gray-400"> Noida, Indis</li>
              <li className="text-gray-400">polytechub@gmail.com</li>
              <li className="text-gray-400">+91 9608553167</li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="w-full sm:w-1/4">
            <h3 className="font-semibold text-lg">Follow Us</h3>
            <div className="flex mt-2">
              <a
                href="https://facebook.com"
                className="text-gray-400 hover:text-white mr-4"
              >
                <FaFacebook size={24} />
              </a>
              <a
                href="https://twitter.com"
                className="text-gray-400 hover:text-white mr-4"
              >
                <FaTwitter size={24} />
              </a>
              <a
                href="https://instagram.com"
                className="text-gray-400 hover:text-white mr-4"
              >
                <FaInstagram size={24} />
              </a>
              <a
                href="https://linkedin.com"
                className="text-gray-400 hover:text-white"
              >
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-700 pt-4 mt-4 text-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Polytechub.com  All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
