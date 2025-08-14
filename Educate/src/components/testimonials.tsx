import { useQuery } from "@tanstack/react-query";
import { Star } from "lucide-react";
import { Card, CardContent } from "../components/ui/card";
import type { Testimonial } from "../../shared/schema";

export default function Testimonials() {
  const { data: testimonials, isLoading } = useQuery({
    queryKey: ["/api/testimonials"],
  });

  const gradientClasses = [
    "bg-gradient-to-br from-blue-50 to-violet-50",
    "bg-gradient-to-br from-violet-50 to-cyan-50", 
    "bg-gradient-to-br from-cyan-50 to-blue-50"
  ];

  return (
    <section id="testimonials" className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-6">
            Success Stories
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Hear from our graduates who have transformed their careers through our
            programs.
          </p>
        </div>

        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className={`p-8 ${gradientClasses[i]}`}>
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-slate-200 animate-pulse" />
                  <div className="ml-4">
                    <div className="h-5 w-32 bg-slate-200 rounded animate-pulse mb-2" />
                    <div className="h-4 w-40 bg-slate-200 rounded animate-pulse" />
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-4 h-4 bg-slate-200 rounded animate-pulse mr-1" />
                  ))}
                </div>
                <div className="space-y-2">
                  <div className="h-4 bg-slate-200 rounded animate-pulse" />
                  <div className="h-4 bg-slate-200 rounded animate-pulse" />
                  <div className="h-4 bg-slate-200 rounded animate-pulse w-3/4" />
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials?.map((testimonial: Testimonial, index: number) => (
              <Card
                key={testimonial.id}
                className={`p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${gradientClasses[index % gradientClasses.length]}`}
              >
                <CardContent className="p-0">
                  <div className="flex items-center mb-6">
                    <img
                      src={testimonial.imageUrl || ""}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover border-3 border-white"
                    />
                    <div className="ml-4">
                      <h4 className="font-bold text-slate-800">{testimonial.name}</h4>
                      <p className="text-sm text-slate-600">{testimonial.position}</p>
                    </div>
                  </div>
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={16} className="text-yellow-500 fill-current" />
                    ))}
                  </div>
                  <p className="text-slate-700 italic">"{testimonial.content}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Career Stats */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-violet-600 rounded-3xl p-12 text-white">
          <h3 className="text-3xl font-bold text-center mb-12">
            Our Graduate Success Metrics
          </h3>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">94%</div>
              <div className="text-blue-100">Job Placement Rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">165%</div>
              <div className="text-blue-100">Average Salary Increase</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">3.2</div>
              <div className="text-blue-100">Months to Get Hired</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-blue-100">Partner Companies</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
