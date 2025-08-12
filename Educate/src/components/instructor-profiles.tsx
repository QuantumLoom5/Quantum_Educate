import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import type { Instructor } from "@shared/schema";

export default function InstructorProfiles() {
  const { data: instructors, isLoading } = useQuery({
    queryKey: ["/api/instructors"],
  });

  return (
    <section id="instructors" className="py-24 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-6">
            Meet Our Expert Instructors
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Learn from industry professionals with decades of experience at leading
            tech companies.
          </p>
        </div>

        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="p-8 text-center">
                <div className="w-24 h-24 rounded-full mx-auto mb-6 bg-slate-200 animate-pulse" />
                <div className="h-6 bg-slate-200 rounded animate-pulse mb-2" />
                <div className="h-4 bg-slate-200 rounded animate-pulse mb-3" />
                <div className="h-4 bg-slate-200 rounded animate-pulse mb-4" />
                <div className="h-16 bg-slate-200 rounded animate-pulse mb-6" />
                <div className="flex justify-center space-x-4">
                  <div className="text-center">
                    <div className="h-8 w-16 bg-slate-200 rounded animate-pulse mb-2" />
                    <div className="h-3 w-12 bg-slate-200 rounded animate-pulse" />
                  </div>
                  <div className="text-center">
                    <div className="h-8 w-16 bg-slate-200 rounded animate-pulse mb-2" />
                    <div className="h-3 w-12 bg-slate-200 rounded animate-pulse" />
                  </div>
                  <div className="text-center">
                    <div className="h-8 w-16 bg-slate-200 rounded animate-pulse mb-2" />
                    <div className="h-3 w-12 bg-slate-200 rounded animate-pulse" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {instructors?.map((instructor: Instructor) => (
              <Card
                key={instructor.id}
                className="p-8 text-center transform hover:-translate-y-1 transition-all duration-300 hover:shadow-2xl"
              >
                <img
                  src={instructor.imageUrl || ""}
                  alt={instructor.name}
                  className="w-24 h-24 rounded-full mx-auto mb-6 object-cover border-4 border-blue-100"
                />
                <h3 className="text-xl font-bold text-slate-800 mb-2">
                  {instructor.name}
                </h3>
                <p className="text-blue-600 font-medium mb-3">{instructor.title}</p>
                <p className="text-slate-600 mb-4">{instructor.experience}</p>
                <p className="text-sm text-slate-500 mb-6">{instructor.bio}</p>
                <div className="flex justify-center space-x-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {instructor.studentsCount.toLocaleString()}
                    </div>
                    <div className="text-xs text-slate-500">Students</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-violet-600">
                      {instructor.rating}
                    </div>
                    <div className="text-xs text-slate-500">Rating</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-cyan-600">
                      {instructor.coursesCount}
                    </div>
                    <div className="text-xs text-slate-500">Courses</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
