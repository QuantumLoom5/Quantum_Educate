import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Clock, Users, Star, Calendar, Video } from "lucide-react";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import type { Course } from "../../shared/schema";

const categories = [
  { value: "all", label: "All Courses" },
  { value: "programming", label: "Programming" },
  { value: "data-science", label: "Data Science" },
  { value: "cybersecurity", label: "Cybersecurity" },
];

export default function UniversityCourseCatalog() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const { data: courses, isLoading } = useQuery({
    queryKey: ["/api/courses/level/university"],
  });

  const filteredCourses = courses?.filter((course: Course) => 
    selectedCategory === "all" || 
    course.category.toLowerCase().replace(/\s+/g, "-") === selectedCategory
  );

  const getCategoryColor = (category: string) => {
    const colors = {
      "Programming": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      "Data Science": "bg-violet-100 text-violet-800 dark:bg-violet-900 dark:text-violet-200", 
      "Cybersecurity": "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200",
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
            University-Level Courses
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Advanced courses designed for Computer Science and IT majors. All classes 
            conducted live via Zoom with industry experts.
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
                  ? "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600"
                  : "bg-slate-200 text-slate-700 hover:bg-blue-600 hover:text-white dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-blue-600"
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
                      {course.studentsCount} enrolled
                    </span>
                  </div>

                  {/* Live Class Indicator */}
                  <div className="flex items-center justify-center bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 py-2 px-4 rounded-lg mb-6">
                    <Video size={16} className="mr-2" />
                    <span className="text-sm font-medium">Live Zoom Classes</span>
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
                      className="bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600"
                      onClick={() => handleEnrollClick(course.id, course.title)}
                    >
                      Enroll Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <div className="bg-blue-50 dark:bg-slate-700 rounded-xl p-6 max-w-2xl mx-auto">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">
              Ready to Start Your Advanced Learning Journey?
            </h3>
            <p className="text-slate-600 dark:text-slate-300 mb-4">
              All university courses include live instruction, career guidance, and industry certifications.
            </p>
            <Button
              variant="outline"
              className="px-8 py-3 rounded-xl font-semibold"
              onClick={() => document.getElementById('enrollment')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View Enrollment Form →
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}