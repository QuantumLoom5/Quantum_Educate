import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Clock, Users, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Course } from "../../../shared/schema";

const categories = [
  { value: "all", label: "All Courses" },
  { value: "programming", label: "Programming" },
  { value: "web-dev", label: "Web Development" },
  { value: "data-science", label: "Data Science" },
  { value: "cybersecurity", label: "Cybersecurity" },
];

export default function CourseCatalog() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const { data: courses, isLoading } = useQuery({
    queryKey: ["/api/courses"],
  });

  const filteredCourses = courses?.filter((course: Course) => 
    selectedCategory === "all" || 
    course.category.toLowerCase().replace(/\s+/g, "-") === selectedCategory
  );

  const getCategoryColor = (category: string) => {
    const colors = {
      "Programming": "bg-blue-100 text-blue-800",
      "Web Development": "bg-violet-100 text-violet-800", 
      "Data Science": "bg-cyan-100 text-cyan-800",
      "Cybersecurity": "bg-emerald-100 text-emerald-800",
      "Cloud Computing": "bg-violet-100 text-violet-800",
    };
    return colors[category as keyof typeof colors] || "bg-slate-100 text-slate-800";
  };

  return (
    <section id="courses" className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-6">
            Featured Courses
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Choose from our comprehensive curriculum designed to prepare you for
            success in the tech industry.
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
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-slate-200 text-slate-700 hover:bg-blue-600 hover:text-white"
              }`}
            >
              {category.label}
            </Button>
          ))}
        </div>

        {/* Course Grid */}
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <div className="w-full h-48 bg-slate-200 animate-pulse" />
                <CardContent className="p-6">
                  <div className="h-4 bg-slate-200 rounded animate-pulse mb-4" />
                  <div className="h-6 bg-slate-200 rounded animate-pulse mb-2" />
                  <div className="h-16 bg-slate-200 rounded animate-pulse mb-4" />
                  <div className="h-4 bg-slate-200 rounded animate-pulse mb-6" />
                  <div className="flex justify-between items-center">
                    <div className="h-8 w-20 bg-slate-200 rounded animate-pulse" />
                    <div className="h-10 w-32 bg-slate-200 rounded animate-pulse" />
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
                className="overflow-hidden border border-slate-100 transform hover:-translate-y-2 transition-all duration-300 hover:shadow-2xl"
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
                      <span className="text-slate-600 text-sm">{course.rating}</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">
                    {course.title}
                  </h3>
                  <p className="text-slate-600 mb-4">{course.description}</p>
                  <div className="flex items-center justify-between text-sm text-slate-500 mb-6">
                    <span className="flex items-center">
                      <Clock size={16} className="mr-1" />
                      {course.duration}
                    </span>
                    <span className="flex items-center">
                      <Users size={16} className="mr-1" />
                      {course.studentsCount} students
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-slate-800">
                        ${course.price}
                      </span>
                      {course.originalPrice && (
                        <span className="text-slate-500 line-through ml-2">
                          ${course.originalPrice}
                        </span>
                      )}
                    </div>
                    <Button className="bg-blue-600 text-white hover:bg-blue-700">
                      Enroll Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Button
            variant="outline"
            className="px-8 py-4 rounded-xl font-semibold text-lg"
          >
            View All Courses →
          </Button>
        </div>
      </div>
    </section>
  );
}
