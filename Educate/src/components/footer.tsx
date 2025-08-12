import { GraduationCap, Twitter, Linkedin, Github, Youtube } from "lucide-react";

const footerLinks = {
  courses: [
    "Programming",
    "Web Development", 
    "Data Science",
    "Cybersecurity",
    "Cloud Computing"
  ],
  company: [
    "About Us",
    "Our Team",
    "Careers", 
    "Press",
    "Partners"
  ],
  support: [
    "Help Center",
    "Student Portal",
    "Community",
    "Contact",
    "Privacy Policy"
  ]
};

export default function Footer() {
  return (
    <footer className="bg-slate-800 text-white py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-violet-500 rounded-lg flex items-center justify-center">
                <GraduationCap className="text-white" size={20} />
              </div>
              <span className="text-xl font-bold">TechEdu Academy</span>
            </div>
            <p className="text-slate-300 mb-6">
              Empowering the next generation of tech professionals through expert-led
              education and hands-on learning.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors duration-200"
              >
                <Twitter size={16} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors duration-200"
              >
                <Linkedin size={16} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors duration-200"
              >
                <Github size={16} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors duration-200"
              >
                <Youtube size={16} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">Courses</h4>
            <ul className="space-y-3 text-slate-300">
              {footerLinks.courses.map((link) => (
                <li key={link}>
                  <a href="#" className="hover:text-white transition-colors duration-200">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">Company</h4>
            <ul className="space-y-3 text-slate-300">
              {footerLinks.company.map((link) => (
                <li key={link}>
                  <a href="#" className="hover:text-white transition-colors duration-200">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">Support</h4>
            <ul className="space-y-3 text-slate-300">
              {footerLinks.support.map((link) => (
                <li key={link}>
                  <a href="#" className="hover:text-white transition-colors duration-200">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-700 mt-12 pt-8 text-center text-slate-400">
          <p>&copy; 2024 TechEdu Academy. All rights reserved. Built with ❤️ for aspiring developers.</p>
        </div>
      </div>
    </footer>
  );
}
