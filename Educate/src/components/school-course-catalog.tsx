import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Clock, Users, Star, Heart, Video } from "lucide-react";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import type { Course } from "../../shared/schema";

const categories = [
  { value: "all", label: "All Courses" },
  { value: "programming", label: "Programming" },
  { value: "web-development", label: "Web Design" },
  { value: "digital-literacy", label: "Digital Skills" },
];

export default function SchoolCourseCatalog() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const { data: courses, isLoading } = useQuery({
    queryKey: ["/api/courses/level/school"],
  });

  const filteredCourses = courses?.filter((course: Course) => 
    selectedCategory === "all" || 
    course.category.toLowerCase().replace(/\s+/g, "-") === selectedCategory
  );

  const getCategoryColor = (category: string) => {
    const colors = {
      "Programming": "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200",
      "Web Development": "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200", 
      "Digital Literacy": "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
    };
    return colors[category as keyof typeof colors] || "bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-200";
  };

  const handleEnrollClick = (courseId: string, courseTitle: string) => {
    // Scroll to enrollment form and populate course selection
    const enrollmentSection = document.getElementById('enrollment');
    if (enrollmentSection) {
      enrollmentSection.scrollIntoView({ behavior: 'smooth' });
      // Trigger course selection in enrollment form
      setTimeout(() => {
        const event = new CustomEvent('selectCourse', { detail: { courseId, courseTitle } });
        document.dispatchEvent(event);
      }, 500);
    }
  };

  return (
    <section id="courses" className="py-24 bg-white dark:bg-slate-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-800 dark:text-white mb-6">
            Fun Tech Courses for Students
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Engaging and age-appropriate courses designed for school students. 
            Learn through interactive projects and creative challenges in live Zoom classes.
          </p>
        </div>

        {/* Course Categories */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <Button
              key={category.value}
              onClick={() => setSelectedCategory(category.value)}
              variant={selectedCategory === category.value ? "default" : "outline"}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                selectedCategory === category.value
                  ? "bg-emerald-600 text-white hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-600"
                  : "bg-slate-200 text-slate-700 hover:bg-emerald-600 hover:text-white dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-emerald-600"
              }`}
            >
              {category.label}
            </Button>
          ))}
        </div>

        {/* Course Grid */}
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="overflow-hidden dark:bg-slate-700">
                <div className="w-full h-48 bg-slate-200 dark:bg-slate-600 animate-pulse" />
                <CardContent className="p-6">
                  <div className="h-4 bg-slate-200 dark:bg-slate-600 rounded animate-pulse mb-4" />
                  <div className="h-6 bg-slate-200 dark:bg-slate-600 rounded animate-pulse mb-2" />
                  <div className="h-16 bg-slate-200 dark:bg-slate-600 rounded animate-pulse mb-4" />
                  <div className="h-4 bg-slate-200 dark:bg-slate-600 rounded animate-pulse mb-6" />
                  <div className="flex justify-between items-center">
                    <div className="h-8 w-20 bg-slate-200 dark:bg-slate-600 rounded animate-pulse" />
                    <div className="h-10 w-32 bg-slate-200 dark:bg-slate-600 rounded animate-pulse" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses?.map((course: Course) => (
              <Card
                key={course.id}
                className="overflow-hidden border border-slate-100 dark:border-slate-700 dark:bg-slate-700 transform hover:-translate-y-2 transition-all duration-300 hover:shadow-2xl"
              >
                <img
                  src={course.imageUrl || ""}
                  alt={course.title}
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Badge className={getCategoryColor(course.category)}>
                      {course.category}
                    </Badge>
                    <div className="flex items-center text-yellow-500">
                      <Star size={16} className="mr-1 fill-current" />
                      <span className="text-slate-600 dark:text-slate-300 text-sm">{course.rating}</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
                    {course.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 mb-4">{course.description}</p>
                  
                  {/* Course Info */}
                  <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400 mb-4">
                    <span className="flex items-center">
                      <Clock size={16} className="mr-1" />
                      {course.duration}
                    </span>
                    <span className="flex items-center">
                      <Users size={16} className="mr-1" />
                      {course.studentsCount} students
                    </span>
                  </div>

                  {/* Student-Friendly Features */}
                  <div className="flex items-center justify-center bg-gradient-to-r from-emerald-50 to-cyan-50 dark:from-emerald-900/20 dark:to-cyan-900/20 text-emerald-700 dark:text-emerald-300 py-2 px-4 rounded-lg mb-6">
                    <Heart size={16} className="mr-2 text-pink-500" />
                    <span className="text-sm font-medium">Fun & Interactive</span>
                    <Video size={16} className="ml-2" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-slate-800 dark:text-white">
                        ${course.price}
                      </span>
                      {course.originalPrice && (
                        <span className="text-slate-500 dark:text-slate-400 line-through ml-2">
                          ${course.originalPrice}
                        </span>
                      )}
                    </div>
                    <Button 
                      className="bg-emerald-600 text-white hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-600"
                      onClick={() => handleEnrollClick(course.id, course.title)}
                    >
                      Join Class
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-emerald-50 to-cyan-50 dark:from-slate-700 dark:to-slate-600 rounded-xl p-6 max-w-2xl mx-auto">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">
              Ready to Start Your Tech Adventure? 🚀
            </h3>
            <p className="text-slate-600 dark:text-slate-300 mb-4">
              All school courses are designed to be fun, safe, and educational with parental support.
            </p>
            <Button
              variant="outline"
              className="px-8 py-3 rounded-xl font-semibold border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white dark:border-emerald-400 dark:text-emerald-400"
              onClick={() => document.getElementById('enrollment')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Register for Classes →
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}