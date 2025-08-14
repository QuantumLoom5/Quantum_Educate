import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Calendar, Clock, User, Mail, Phone, School, GraduationCap, Send, CheckCircle } from "lucide-react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "../components/ui/form";
import { useToast } from "../hooks/use-toast";
import { apiRequest } from "../lib/queryClient";
import { insertEnrollmentSchema } from "../../shared/schema";

interface EnrollmentFormProps {
  targetLevel: "university" | "school";
}

const scheduleOptions = [
  "Weekday Mornings (9:00 AM - 12:00 PM)",
  "Weekday Afternoons (2:00 PM - 5:00 PM)", 
  "Weekend Mornings (10:00 AM - 1:00 PM)",
  "Weekend Afternoons (3:00 PM - 6:00 PM)",
  "Flexible - Contact me to arrange"
];

export default function EnrollmentForm({ targetLevel }: EnrollmentFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState("");
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(insertEnrollmentSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      courseId: "",
      targetLevel,
      institution: "",
      grade: "",
      yearOfStudy: "",
      preferredSchedule: "",
      hasZoomAccess: true,
      emergencyContact: "",
      specialRequirements: ""
    }
  });

  // Listen for course selection events from course cards
  useEffect(() => {
    const handleCourseSelection = (event: any) => {
      const { courseId, courseTitle } = event.detail;
      setSelectedCourse(courseTitle);
      form.setValue("courseId", courseId);
    };

    document.addEventListener('selectCourse', handleCourseSelection);
    return () => document.removeEventListener('selectCourse', handleCourseSelection);
  }, [form]);

  const enrollmentMutation = useMutation({
    mutationFn: (data: any) => apiRequest("POST", "/api/enrollment", data),
    onSuccess: (response: any) => {
      toast({
        title: "🎉 Enrollment Successful!",
        description: response.message,
      });
      form.reset();
      setIsSubmitting(false);
      setSelectedCourse("");
    },
    onError: (error: any) => {
      toast({
        title: "Enrollment Failed",
        description: error.message || "Please try again or contact support.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    },
  });

  const onSubmit = (data: any) => {
    setIsSubmitting(true);
    enrollmentMutation.mutate(data);
  };

  const isUniversity = targetLevel === "university";

  return (
    <section id="enrollment" className={`py-24 ${isUniversity ? 'bg-slate-50' : 'bg-emerald-50'} dark:bg-slate-900`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 ${
              isUniversity 
                ? 'bg-gradient-to-r from-blue-500 to-violet-500' 
                : 'bg-gradient-to-r from-emerald-500 to-cyan-500'
            }`}>
              {isUniversity ? <GraduationCap className="text-white" size={32} /> : <School className="text-white" size={32} />}
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-800 dark:text-white mb-6">
              {isUniversity ? "University Class Enrollment" : "School Class Registration"}
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300">
              {isUniversity 
                ? "Ready to advance your Computer Science skills? Register for our live Zoom classes and get confirmation via email within 24 hours."
                : "Join our fun and interactive tech classes! Register now and receive Zoom class details via email within 24 hours."
              }
            </p>
          </div>

          <Card className={`rounded-2xl p-8 border-2 ${
            isUniversity 
              ? 'border-blue-100 bg-white dark:border-blue-800 dark:bg-slate-800' 
              : 'border-emerald-100 bg-white dark:border-emerald-800 dark:bg-slate-800'
          }`}>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                
                {/* Personal Information */}
                <div className="space-y-6">
                  <h3 className={`text-2xl font-bold mb-6 flex items-center ${
                    isUniversity ? 'text-blue-800 dark:text-blue-300' : 'text-emerald-800 dark:text-emerald-300'
                  }`}>
                    <User className="mr-3" size={24} />
                    Personal Information
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-700 dark:text-slate-300 font-medium">First Name *</FormLabel>
                          <Input 
                            placeholder="John" 
                            className={`px-4 py-3 rounded-lg border-2 focus:ring-2 focus:border-transparent transition-all duration-200 ${
                              isUniversity 
                                ? 'border-slate-200 focus:ring-blue-500 dark:border-slate-600' 
                                : 'border-slate-200 focus:ring-emerald-500 dark:border-slate-600'
                            }`}
                            {...field} 
                          />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-700 dark:text-slate-300 font-medium">Last Name *</FormLabel>
                          <Input 
                            placeholder="Doe" 
                            className={`px-4 py-3 rounded-lg border-2 focus:ring-2 focus:border-transparent transition-all duration-200 ${
                              isUniversity 
                                ? 'border-slate-200 focus:ring-blue-500 dark:border-slate-600' 
                                : 'border-slate-200 focus:ring-emerald-500 dark:border-slate-600'
                            }`}
                            {...field} 
                          />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-700 dark:text-slate-300 font-medium flex items-center">
                            <Mail className="mr-2" size={16} />
                            Email Address *
                          </FormLabel>
                          <Input 
                            type="email" 
                            placeholder="john@example.com" 
                            className={`px-4 py-3 rounded-lg border-2 focus:ring-2 focus:border-transparent transition-all duration-200 ${
                              isUniversity 
                                ? 'border-slate-200 focus:ring-blue-500 dark:border-slate-600' 
                                : 'border-slate-200 focus:ring-emerald-500 dark:border-slate-600'
                            }`}
                            {...field} 
                          />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-700 dark:text-slate-300 font-medium flex items-center">
                            <Phone className="mr-2" size={16} />
                            Phone Number *
                          </FormLabel>
                          <Input 
                            type="tel" 
                            placeholder="+1 (555) 123-4567" 
                            className={`px-4 py-3 rounded-lg border-2 focus:ring-2 focus:border-transparent transition-all duration-200 ${
                              isUniversity 
                                ? 'border-slate-200 focus:ring-blue-500 dark:border-slate-600' 
                                : 'border-slate-200 focus:ring-emerald-500 dark:border-slate-600'
                            }`}
                            {...field} 
                          />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Academic Information */}
                <div className="space-y-6">
                  <h3 className={`text-2xl font-bold mb-6 flex items-center ${
                    isUniversity ? 'text-blue-800 dark:text-blue-300' : 'text-emerald-800 dark:text-emerald-300'
                  }`}>
                    {isUniversity ? <GraduationCap className="mr-3" size={24} /> : <School className="mr-3" size={24} />}
                    Academic Information
                  </h3>

                  <FormField
                    control={form.control}
                    name="institution"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-700 dark:text-slate-300 font-medium">
                          {isUniversity ? "University/College Name" : "School Name"}
                        </FormLabel>
                        <Input 
                          placeholder={isUniversity ? "Stanford University" : "Central High School"} 
                          className={`px-4 py-3 rounded-lg border-2 focus:ring-2 focus:border-transparent transition-all duration-200 ${
                            isUniversity 
                              ? 'border-slate-200 focus:ring-blue-500 dark:border-slate-600' 
                              : 'border-slate-200 focus:ring-emerald-500 dark:border-slate-600'
                          }`}
                          {...field} 
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {isUniversity ? (
                    <FormField
                      control={form.control}
                      name="yearOfStudy"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-700 dark:text-slate-300 font-medium">Year of Study</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <SelectTrigger className={`px-4 py-3 rounded-lg border-2 focus:ring-2 focus:border-transparent transition-all duration-200 ${
                              isUniversity 
                                ? 'border-slate-200 focus:ring-blue-500 dark:border-slate-600' 
                                : 'border-slate-200 focus:ring-emerald-500 dark:border-slate-600'
                            }`}>
                              <SelectValue placeholder="Select your year" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="freshman">Freshman (1st Year)</SelectItem>
                              <SelectItem value="sophomore">Sophomore (2nd Year)</SelectItem>
                              <SelectItem value="junior">Junior (3rd Year)</SelectItem>
                              <SelectItem value="senior">Senior (4th Year)</SelectItem>
                              <SelectItem value="graduate">Graduate Student</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ) : (
                    <FormField
                      control={form.control}
                      name="grade"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-700 dark:text-slate-300 font-medium">Grade Level</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <SelectTrigger className={`px-4 py-3 rounded-lg border-2 focus:ring-2 focus:border-transparent transition-all duration-200 ${
                              isUniversity 
                                ? 'border-slate-200 focus:ring-blue-500 dark:border-slate-600' 
                                : 'border-slate-200 focus:ring-emerald-500 dark:border-slate-600'
                            }`}>
                              <SelectValue placeholder="Select your grade" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="9th">9th Grade</SelectItem>
                              <SelectItem value="10th">10th Grade</SelectItem>
                              <SelectItem value="11th">11th Grade</SelectItem>
                              <SelectItem value="12th">12th Grade</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </div>

                {/* Course Selection */}
                <div className="space-y-6">
                  <h3 className={`text-2xl font-bold mb-6 flex items-center ${
                    isUniversity ? 'text-blue-800 dark:text-blue-300' : 'text-emerald-800 dark:text-emerald-300'
                  }`}>
                    <Calendar className="mr-3" size={24} />
                    Course & Schedule
                  </h3>

                  <FormField
                    control={form.control}
                    name="courseId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-700 dark:text-slate-300 font-medium">Selected Course *</FormLabel>
                        {selectedCourse ? (
                          <div className={`p-4 rounded-lg border-2 ${
                            isUniversity 
                              ? 'bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/20 dark:border-blue-700 dark:text-blue-300' 
                              : 'bg-emerald-50 border-emerald-200 text-emerald-800 dark:bg-emerald-900/20 dark:border-emerald-700 dark:text-emerald-300'
                          }`}>
                            <div className="flex items-center">
                              <CheckCircle size={20} className="mr-2" />
                              <span className="font-medium">{selectedCourse}</span>
                            </div>
                            <p className="text-sm mt-1 opacity-75">
                              Course selected! You can change this by clicking "Enroll Now" on a different course above.
                            </p>
                          </div>
                        ) : (
                          <div className="p-4 rounded-lg border-2 border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700">
                            <p className="text-slate-600 dark:text-slate-300">
                              Please select a course by clicking "Enroll Now" or "{isUniversity ? 'Enroll Now' : 'Join Class'}" on any course above.
                            </p>
                          </div>
                        )}
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="preferredSchedule"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-700 dark:text-slate-300 font-medium flex items-center">
                          <Clock className="mr-2" size={16} />
                          Preferred Class Schedule *
                        </FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectTrigger className={`px-4 py-3 rounded-lg border-2 focus:ring-2 focus:border-transparent transition-all duration-200 ${
                            isUniversity 
                              ? 'border-slate-200 focus:ring-blue-500 dark:border-slate-600' 
                              : 'border-slate-200 focus:ring-emerald-500 dark:border-slate-600'
                          }`}>
                            <SelectValue placeholder="Select your preferred time" />
                          </SelectTrigger>
                          <SelectContent>
                            {scheduleOptions.map((option) => (
                              <SelectItem key={option} value={option}>
                                {option}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Emergency Contact for School Students */}
                {!isUniversity && (
                  <FormField
                    control={form.control}
                    name="emergencyContact"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-700 dark:text-slate-300 font-medium">Parent/Guardian Contact</FormLabel>
                        <Input 
                          placeholder="Parent name and phone number" 
                          className="px-4 py-3 rounded-lg border-2 border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 dark:border-slate-600"
                          {...field} 
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                {/* Special Requirements */}
                <FormField
                  control={form.control}
                  name="specialRequirements"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-700 dark:text-slate-300 font-medium">Special Requirements or Questions</FormLabel>
                      <Textarea 
                        placeholder="Any accessibility needs, technical questions, or other requirements..."
                        className={`px-4 py-3 rounded-lg border-2 focus:ring-2 focus:border-transparent transition-all duration-200 h-32 resize-none ${
                          isUniversity 
                            ? 'border-slate-200 focus:ring-blue-500 dark:border-slate-600' 
                            : 'border-slate-200 focus:ring-emerald-500 dark:border-slate-600'
                        }`}
                        {...field} 
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Submit Button */}
                <div className="pt-6">
                  <Button 
                    type="submit" 
                    disabled={isSubmitting || !form.watch('courseId')}
                    className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl ${
                      isUniversity
                        ? 'bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-300'
                        : 'bg-emerald-600 text-white hover:bg-emerald-700 disabled:bg-emerald-300'
                    }`}
                  >
                    {isSubmitting ? (
                      "Submitting Enrollment..."
                    ) : !form.watch('courseId') ? (
                      "Please Select a Course First"
                    ) : (
                      <>
                        Complete Enrollment
                        <Send size={20} className="ml-2" />
                      </>
                    )}
                  </Button>
                  
                  <div className="mt-4 text-center">
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      🔒 Your information is secure. You'll receive a confirmation email with Zoom class details within 24 hours.
                    </p>
                  </div>
                </div>
              </form>
            </Form>
          </Card>
        </div>
      </div>
    </section>
  );
}