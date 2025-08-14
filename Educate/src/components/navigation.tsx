import { useState, useEffect } from "react";
import { useIsMobile } from "../hooks/use-mobile";
import { Link, useLocation } from "wouter";
import { GraduationCap, Menu, X } from "lucide-react";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [location] = useLocation();
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm"
          : "bg-white/95 backdrop-blur-md border-b border-slate-200"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-violet-500 rounded-lg flex items-center justify-center">
              <GraduationCap className="text-white" size={20} />
            </div>
            <span className="text-xl font-bold text-slate-800 dark:text-white">TechEdu Academy</span>
          </Link>

          {/* Desktop Navigation */}
          {!isMobile && (
            <div className="flex items-center space-x-8">
              <Link 
                href="/"
                className={`transition-colors duration-200 font-medium ${
                  location === "/" 
                    ? "text-blue-600 dark:text-blue-400" 
                    : "text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400"
                }`}
              >
                Home
              </Link>
              <Link 
                href="/university"
                className={`transition-colors duration-200 font-medium ${
                  location === "/university" 
                    ? "text-blue-600 dark:text-blue-400" 
                    : "text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400"
                }`}
              >
                University
              </Link>
              <Link 
                href="/school"
                className={`transition-colors duration-200 font-medium ${
                  location === "/school" 
                    ? "text-emerald-600 dark:text-emerald-400" 
                    : "text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400"
                }`}
              >
                School
              </Link>
              <button
                onClick={() => scrollToSection("instructors")}
                className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 font-medium"
              >
                Instructors
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl dark:bg-blue-700 dark:hover:bg-blue-600"
              >
                Contact Us
              </button>
            </div>
          )}

          {/* Mobile Menu Button */}
          {isMobile && (
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2"
            >
              {isMenuOpen ? (
                <X className="text-slate-600" size={24} />
              ) : (
                <Menu className="text-slate-600" size={24} />
              )}
            </button>
          )}
        </div>

        {/* Mobile Navigation */}
        {isMobile && isMenuOpen && (
          <div className="bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700">
            <div className="px-4 py-4 space-y-3">
              <Link
                href="/"
                onClick={() => setIsMenuOpen(false)}
                className={`block w-full text-left py-2 transition-colors duration-200 font-medium ${
                  location === "/" 
                    ? "text-blue-600 dark:text-blue-400" 
                    : "text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400"
                }`}
              >
                Home
              </Link>
              <Link
                href="/university"
                onClick={() => setIsMenuOpen(false)}
                className={`block w-full text-left py-2 transition-colors duration-200 font-medium ${
                  location === "/university" 
                    ? "text-blue-600 dark:text-blue-400" 
                    : "text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400"
                }`}
              >
                University Courses
              </Link>
              <Link
                href="/school"
                onClick={() => setIsMenuOpen(false)}
                className={`block w-full text-left py-2 transition-colors duration-200 font-medium ${
                  location === "/school" 
                    ? "text-emerald-600 dark:text-emerald-400" 
                    : "text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400"
                }`}
              >
                School Courses
              </Link>
              <button
                onClick={() => scrollToSection("instructors")}
                className="block w-full text-left text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 font-medium py-2"
              >
                Instructors
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="block w-full bg-blue-600 text-white px-6 py-2 rounded-lg text-center font-medium dark:bg-blue-700"
              >
                Contact Us
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
