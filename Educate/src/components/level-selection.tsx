import { GraduationCap, BookOpen, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";

export default function LevelSelection() {
  return (
    <section id="level-selection" className="py-24 bg-white dark:bg-slate-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-800 dark:text-white mb-6">
            Choose Your Learning Path
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            We offer specialized online IT courses tailored for University and School students.
            Select your level to explore courses designed for your academic needs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* University Level */}
          <Link href="/university">
            <Card className="group cursor-pointer transform hover:-translate-y-2 transition-all duration-300 hover:shadow-2xl border-2 hover:border-blue-500 dark:hover:border-blue-400">
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-violet-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <GraduationCap className="text-white" size={32} />
                </div>
                
                <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">
                  University Students
                </h3>
                
                <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                  Advanced courses in Data Structures, Machine Learning, Cybersecurity, 
                  and more. Perfect for Computer Science and IT majors looking to excel 
                  in their studies and prepare for industry careers.
                </p>
                
                <div className="space-y-2 mb-6 text-left">
                  <div className="flex items-center text-slate-600 dark:text-slate-300">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    Advanced algorithms and data structures
                  </div>
                  <div className="flex items-center text-slate-600 dark:text-slate-300">
                    <div className="w-2 h-2 bg-violet-500 rounded-full mr-3"></div>
                    Industry-standard tools and practices
                  </div>
                  <div className="flex items-center text-slate-600 dark:text-slate-300">
                    <div className="w-2 h-2 bg-cyan-500 rounded-full mr-3"></div>
                    Interview preparation and career guidance
                  </div>
                </div>
                
                <div className="bg-blue-50 dark:bg-slate-700 rounded-lg p-4 mb-6">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">$399-699</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">per course</div>
                </div>
                
                <div className="flex items-center justify-center text-blue-600 dark:text-blue-400 font-semibold group-hover:translate-x-2 transition-transform duration-300">
                  Explore University Courses
                  <ArrowRight size={18} className="ml-2" />
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* School Level */}
          <Link href="/school">
            <Card className="group cursor-pointer transform hover:-translate-y-2 transition-all duration-300 hover:shadow-2xl border-2 hover:border-emerald-500 dark:hover:border-emerald-400">
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <BookOpen className="text-white" size={32} />
                </div>
                
                <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">
                  School Students
                </h3>
                
                <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                  Fun and engaging introduction to programming, web design, and digital 
                  literacy. Perfect for high school students who want to explore 
                  technology and build foundational skills.
                </p>
                
                <div className="space-y-2 mb-6 text-left">
                  <div className="flex items-center text-slate-600 dark:text-slate-300">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></div>
                    Visual programming with Scratch
                  </div>
                  <div className="flex items-center text-slate-600 dark:text-slate-300">
                    <div className="w-2 h-2 bg-cyan-500 rounded-full mr-3"></div>
                    Web design basics and creative projects
                  </div>
                  <div className="flex items-center text-slate-600 dark:text-slate-300">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    Digital safety and responsible computing
                  </div>
                </div>
                
                <div className="bg-emerald-50 dark:bg-slate-700 rounded-lg p-4 mb-6">
                  <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">$149-249</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">per course</div>
                </div>
                
                <div className="flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-semibold group-hover:translate-x-2 transition-transform duration-300">
                  Explore School Courses
                  <ArrowRight size={18} className="ml-2" />
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
        
        <div className="text-center mt-12">
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            All courses are conducted live online through Zoom with expert instructors
          </p>
          <div className="flex justify-center items-center space-x-8 text-slate-500 dark:text-slate-400">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2 animate-pulse"></div>
              <span>Live Interactive Sessions</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
              <span>Small Class Sizes</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
              <span>Flexible Scheduling</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}