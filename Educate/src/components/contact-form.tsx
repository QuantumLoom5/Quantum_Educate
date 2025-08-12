import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { MapPin, Phone, Mail, Send } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { insertContactSchema } from "../../shared/schema";

const courseOptions = [
  "University Programming",
  "University Data Science", 
  "University Cybersecurity",
  "School Programming Basics",
  "School Web Design",
  "School Digital Literacy",
  "General Inquiry"
];

const faqs = [
  {
    question: "Do you offer payment plans?",
    answer: "Yes! We offer flexible payment options including monthly installments and income-share agreements."
  },
  {
    question: "What if I have no coding experience?", 
    answer: "Our beginner-friendly courses start from the basics. No prior experience required!"
  },
  {
    question: "Do you provide job placement assistance?",
    answer: "Yes, we have partnerships with 500+ companies and provide resume review, interview prep, and job placement support."
  }
];

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(insertContactSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      courseInterest: "",
      targetLevel: "university", // default to university
      preferredSchedule: "",
      message: ""
    }
  });

  const contactMutation = useMutation({
    mutationFn: (data: any) => apiRequest("POST", "/api/contact", data),
    onSuccess: () => {
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you within 24 hours.",
      });
      form.reset();
      setIsSubmitting(false);
    },
    onError: (error: any) => {
      toast({
        title: "Failed to send message",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    },
  });

  const onSubmit = (data: any) => {
    setIsSubmitting(true);
    contactMutation.mutate(data);
  };

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-6">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300">
              Get in touch with our education consultants to learn about our live online classes 
              for University and School students.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">Send us a message</h3>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-700 font-medium">First Name</FormLabel>
                          <Input 
                            placeholder="John" 
                            className="px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
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
                          <FormLabel className="text-slate-700 font-medium">Last Name</FormLabel>
                          <Input 
                            placeholder="Doe" 
                            className="px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            {...field} 
                          />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-700 font-medium">Email Address</FormLabel>
                        <Input 
                          type="email" 
                          placeholder="john@example.com" 
                          className="px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
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
                        <FormLabel className="text-slate-700 font-medium">Phone Number</FormLabel>
                        <Input 
                          type="tel" 
                          placeholder="+1 (555) 123-4567" 
                          className="px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                          {...field} 
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="targetLevel"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-700 dark:text-slate-300 font-medium">Student Level</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectTrigger className="px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200">
                            <SelectValue placeholder="Select student level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="university">University Student</SelectItem>
                            <SelectItem value="school">School Student</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="courseInterest"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-700 dark:text-slate-300 font-medium">Course Interest</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectTrigger className="px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200">
                            <SelectValue placeholder="Select a course category" />
                          </SelectTrigger>
                          <SelectContent>
                            {courseOptions.map((course) => (
                              <SelectItem key={course} value={course}>
                                {course}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="preferredSchedule"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-700 dark:text-slate-300 font-medium">Preferred Class Schedule</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectTrigger className="px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200">
                            <SelectValue placeholder="When would you like to attend classes?" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="weekday-morning">Weekday Mornings (9:00 AM - 12:00 PM)</SelectItem>
                            <SelectItem value="weekday-afternoon">Weekday Afternoons (2:00 PM - 5:00 PM)</SelectItem>
                            <SelectItem value="weekend-morning">Weekend Mornings (10:00 AM - 1:00 PM)</SelectItem>
                            <SelectItem value="weekend-afternoon">Weekend Afternoons (3:00 PM - 6:00 PM)</SelectItem>
                            <SelectItem value="flexible">Flexible - Contact me to arrange</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-700 font-medium">Message</FormLabel>
                        <Textarea 
                          placeholder="Tell us about your learning goals and background..."
                          className="px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 h-32 resize-none"
                          {...field} 
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"} 
                    <Send size={16} className="ml-2" />
                  </Button>
                </form>
              </Form>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-slate-800 mb-6">Get in Touch</h3>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="text-blue-600" size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800 mb-1">Visit Our Campus</h4>
                      <p className="text-slate-600">123 Tech Street, Innovation District<br />San Francisco, CA 94105</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-violet-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="text-violet-600" size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800 mb-1">Call Us</h4>
                      <p className="text-slate-600">+1 (555) 123-TECH<br />Mon-Fri 8AM-6PM PST</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="text-cyan-600" size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800 mb-1">Email Us</h4>
                      <p className="text-slate-600">admissions@techeduacademy.com<br />support@techeduacademy.com</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* FAQ */}
              <div>
                <h3 className="text-2xl font-bold text-slate-800 mb-6">Frequently Asked Questions</h3>
                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <div key={index} className="border border-slate-200 rounded-lg p-4">
                      <h4 className="font-semibold text-slate-800 mb-2">{faq.question}</h4>
                      <p className="text-slate-600 text-sm">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
