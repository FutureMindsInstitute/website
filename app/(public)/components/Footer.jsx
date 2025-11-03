'use client';

import React from "react";
//import logo from '../../../public/assets/agentx_logo_edited_0.jpeg';
import Link from 'next/link';

const Footer = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-primary-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 sm:py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-10">
            {/* Brand Section - Full width on mobile, 1/4 on desktop */}
            <div className="lg:col-span-1">
              <div className="flex flex-col space-y-4 justify-center items-center">
                {/* Logo and Brand */}
                <div className="flex items-center space-x-1">
                  <img
                    src="/assets/agentx_logo_edited_0.jpeg"
                    alt="Future Minds Institute Logo"
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl object-full flex-shrink-0"
                  />
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-secondary-light">
                      Future Minds Institute
                    </h3>
                    <p className="text-sm text-center text-accent-gold font-medium">
                      Transforming Education
                    </p>
                  </div>
                </div>

                <p className="text-muted-gray text-center text-sm leading-relaxed max-w-sm">
                  Powered by Women in Product India Leveraging India's largest
                  product community to accelerate your career{" "}
                </p>

                {/* Social Links - Properly centered */}
                <div className="flex space-x-3">
                  <a
                    href="#"
                    className="w-10 h-10 bg-slate-blue hover:bg-accent-gold rounded-lg flex items-center justify-center transition-all duration-300 group hover:scale-110"
                  >
                    <svg
                      className="w-5 h-5 text-secondary-light group-hover:text-white transition-colors duration-200"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                    </svg>
                  </a>
                  <a
                    href="https://www.linkedin.com/company/wip-india/"
                    className="w-10 h-10 bg-slate-blue hover:bg-accent-gold rounded-lg flex items-center justify-center transition-all duration-300 group hover:scale-110"
                  >
                    <svg
                      className="w-5 h-5 text-secondary-light group-hover:text-white transition-colors duration-200"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
            
                </div>
              </div>
            </div>

            <div className="lg:col-span-3 flex flex-col text-center justify-center items-center">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
                {/* Quick Links */}
                <div>
                  <h4 className="text-secondary-light font-semibold mb-2 sm:mb-2 text-base sm:text-lg">
                    Workshop
                  </h4>
                  <ul className="space-y-1">
                    <li>
                      <a
                        onClick={() => scrollToSection("about")}
                        className="text-muted-gray hover:text-secondary-light transition-all duration-300 text-sm sm:text-base block py-1 hover:translate-x-2 transform  hover:font-medium cursor-pointer"
                      >
                        About
                      </a>
                    </li>
                    <li>
                      <a
                        onClick={() => scrollToSection("courses")}
                        className="text-muted-gray hover:text-secondary-light transition-all duration-300 text-sm sm:text-base block py-1 hover:translate-x-2 transform transition-transform duration-200 hover:font-medium cursor-pointer"
                      >
                        Courses
                      </a>
                    </li>
                    <li>
                      <a
                        onClick={() => scrollToSection("benefits")}
                        className="text-muted-gray hover:text-secondary-light transition-all duration-300 text-sm sm:text-base block py-1 hover:translate-x-2 transform transition-transform duration-200 hover:font-medium cursor-pointer"
                      >
                        Benefits
                      </a>
                    </li>
                    <li>
                      <a
                        onClick={() => scrollToSection("educators")}
                        className="text-muted-gray hover:text-secondary-light transition-all duration-300 text-sm sm:text-base block py-1 hover:translate-x-2 transform transition-transform duration-200 hover:font-medium cursor-pointer"
                      >
                        Educators
                      </a>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-secondary-light font-semibold mb-2 sm:mb-2 text-base sm:text-lg">
                    Resources
                  </h4>
                  <ul className="space-y-1">
                    <li>
                      <a
                        href="#"
                        className="text-muted-gray hover:text-secondary-light transition-all duration-300 text-sm sm:text-base block py-1 hover:translate-x-2 transform hover:font-medium"
                      >
                        FAQ
                      </a>
                    </li>
                    <li>
                      <Link
                        href="/privacypolicy"
                        className="text-muted-gray hover:text-secondary-light transition-all duration-300 text-sm sm:text-base block py-1 hover:translate-x-2 transform  hover:font-medium"
                      >
                        Privacy Policy
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/refundpolicy"
                        className="text-muted-gray hover:text-secondary-light transition-all duration-300 text-sm sm:text-base block py-1 hover:translate-x-2 transform  hover:font-medium"
                      >
                        Refund Policy
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/tac"
                        className="text-muted-gray hover:text-secondary-light transition-all duration-300 text-sm sm:text-base block py-1 hover:translate-x-2 transform  hover:font-medium"
                      >
                        Terms and Condition
                      </Link>
                    </li>
                  </ul>
                </div>

                <div className="flex flex-col  items-center">
                  <h4 className="text-secondary-light font-semibold mb-2 sm:mb-3 text-base sm:text-lg">
                    Contact
                  </h4>
                  <ul className="space-y-2">
                    <li className="flex items-start text-muted-gray text-sm sm:text-base group">
                      <svg
                        className="w-4 h-4 mr-3 mt-1 flex-shrink-0 text-accent-gold group-hover:text-secondary-light transition-colors duration-200"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      <span className="break-words group-hover:text-secondary-light transition-colors duration-200">
                        hello@futuremindsinstitute.com
                      </span>
                    </li>
                    <li className="flex items-center text-muted-gray text-sm sm:text-base group">
                      <svg
                        className="w-4 h-4 mr-3 flex-shrink-0 text-accent-gold group-hover:text-secondary-light transition-colors duration-200"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                      <span className="group-hover:text-secondary-light transition-colors duration-200">
                        +91 98765 43210
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
