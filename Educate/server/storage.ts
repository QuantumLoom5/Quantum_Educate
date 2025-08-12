import { type User, type InsertUser, type Course, type InsertCourse, type Instructor, type InsertInstructor, type Testimonial, type InsertTestimonial, type Contact, type InsertContact, type Enrollment, type InsertEnrollment } from "../shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getCourses(): Promise<Course[]>;
  getCoursesByCategory(category: string): Promise<Course[]>;
  getCoursesByTargetLevel(targetLevel: string): Promise<Course[]>;
  createCourse(course: InsertCourse): Promise<Course>;
  
  getInstructors(): Promise<Instructor[]>;
  createInstructor(instructor: InsertInstructor): Promise<Instructor>;
  
  getTestimonials(): Promise<Testimonial[]>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
  
  createContact(contact: InsertContact): Promise<Contact>;
  getContacts(): Promise<Contact[]>;
  
  createEnrollment(enrollment: InsertEnrollment): Promise<Enrollment>;
  getEnrollments(): Promise<Enrollment[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private courses: Map<string, Course>;
  private instructors: Map<string, Instructor>;
  private testimonials: Map<string, Testimonial>;
  private contacts: Map<string, Contact>;
  private enrollments: Map<string, Enrollment>;

  constructor() {
    this.users = new Map();
    this.courses = new Map();
    this.instructors = new Map();
    this.testimonials = new Map();
    this.contacts = new Map();
    this.enrollments = new Map();
    
    // Initialize with some data
    this.initializeData();
  }

  private initializeData() {
    // Sample courses - University Level
    const universityCourses: Course[] = [
      {
        id: randomUUID(),
        title: "Advanced Data Structures & Algorithms",
        description: "Master complex algorithms and data structures for competitive programming and software engineering interviews.",
        category: "Programming",
        targetLevel: "university",
        duration: "16 weeks",
        price: "399.00",
        originalPrice: "549.00",
        rating: "4.9",
        studentsCount: 245,
        imageUrl: "https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
        isActive: true,
      },
      {
        id: randomUUID(),
        title: "Machine Learning & AI Engineering",
        description: "Build production-ready ML models using TensorFlow, PyTorch, and modern MLOps practices.",
        category: "Data Science",
        targetLevel: "university",
        duration: "20 weeks",
        price: "599.00",
        originalPrice: "799.00",
        rating: "4.8",
        studentsCount: 189,
        imageUrl: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
        isActive: true,
      },
      {
        id: randomUUID(),
        title: "Cybersecurity & Ethical Hacking",
        description: "Advanced penetration testing, network security, and vulnerability assessment techniques.",
        category: "Cybersecurity",
        targetLevel: "university",
        duration: "18 weeks",
        price: "699.00",
        originalPrice: "899.00",
        rating: "4.9",
        studentsCount: 156,
        imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
        isActive: true,
      }
    ];

    // Sample courses - School Level
    const schoolCourses: Course[] = [
      {
        id: randomUUID(),
        title: "Programming Basics with Scratch & Python",
        description: "Learn programming fundamentals through visual coding and simple Python projects.",
        category: "Programming",
        targetLevel: "school",
        duration: "8 weeks",
        price: "199.00",
        originalPrice: "299.00",
        rating: "4.8",
        studentsCount: 389,
        imageUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
        isActive: true,
      },
      {
        id: randomUUID(),
        title: "Web Design & Development for Teens",
        description: "Create your first website using HTML, CSS, and JavaScript with fun projects.",
        category: "Web Development",
        targetLevel: "school",
        duration: "10 weeks",
        price: "249.00",
        originalPrice: "349.00",
        rating: "4.7",
        studentsCount: 267,
        imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
        isActive: true,
      },
      {
        id: randomUUID(),
        title: "Digital Safety & Computer Literacy",
        description: "Essential computer skills, online safety, and digital citizenship for young learners.",
        category: "Digital Literacy",
        targetLevel: "school",
        duration: "6 weeks",
        price: "149.00",
        originalPrice: "199.00",
        rating: "4.9",
        studentsCount: 198,
        imageUrl: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
        isActive: true,
      }
    ];

    const sampleCourses = [...universityCourses, ...schoolCourses];

    // Sample instructors
    const sampleInstructors: Instructor[] = [
      {
        id: randomUUID(),
        name: "Dr. Michael Chen",
        title: "Senior Software Architect",
        experience: "15+ years at Google, Microsoft",
        bio: "Specialized in distributed systems and cloud architecture. Published researcher in machine learning.",
        imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=300",
        rating: "4.9",
        studentsCount: 1250,
        coursesCount: 8,
      },
      {
        id: randomUUID(),
        name: "Sarah Johnson",
        title: "Cybersecurity Expert",
        experience: "12+ years at Amazon, Tesla",
        bio: "Ethical hacking specialist and penetration testing expert. Former security consultant for Fortune 500 companies.",
        imageUrl: "https://images.unsplash.com/photo-1494790108755-2616b2e4bd45?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=300",
        rating: "4.8",
        studentsCount: 890,
        coursesCount: 5,
      },
      {
        id: randomUUID(),
        name: "David Rodriguez",
        title: "Data Science Lead",
        experience: "10+ years at Netflix, Uber",
        bio: "Machine learning engineer and data scientist. Expert in Python, TensorFlow, and big data technologies.",
        imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=300",
        rating: "4.9",
        studentsCount: 760,
        coursesCount: 6,
      }
    ];

    // Sample testimonials
    const sampleTestimonials: Testimonial[] = [
      {
        id: randomUUID(),
        name: "Alex Thompson",
        position: "Software Engineer at Meta",
        content: "TechEdu Academy completely transformed my career. Within 6 months of completing the Full-Stack program, I landed my dream job at Meta with a 150% salary increase.",
        imageUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100",
        rating: 5,
      },
      {
        id: randomUUID(),
        name: "Maria Garcia",
        position: "Data Scientist at Google",
        content: "The Machine Learning course was incredible. The hands-on projects and expert guidance helped me transition from marketing to data science at Google.",
        imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100",
        rating: 5,
      },
      {
        id: randomUUID(),
        name: "James Wilson",
        position: "Security Analyst at Microsoft",
        content: "The Cybersecurity program gave me the practical skills I needed. I'm now protecting critical infrastructure at Microsoft and loving every minute of it.",
        imageUrl: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100",
        rating: 5,
      }
    ];

    sampleCourses.forEach(course => this.courses.set(course.id, course));
    sampleInstructors.forEach(instructor => this.instructors.set(instructor.id, instructor));
    sampleTestimonials.forEach(testimonial => this.testimonials.set(testimonial.id, testimonial));
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getCourses(): Promise<Course[]> {
    return Array.from(this.courses.values()).filter(course => course.isActive);
  }

  async getCoursesByCategory(category: string): Promise<Course[]> {
    return Array.from(this.courses.values()).filter(
      course => course.isActive && course.category.toLowerCase() === category.toLowerCase()
    );
  }

  async getCoursesByTargetLevel(targetLevel: string): Promise<Course[]> {
    return Array.from(this.courses.values()).filter(
      course => course.isActive && course.targetLevel.toLowerCase() === targetLevel.toLowerCase()
    );
  }

  async createCourse(insertCourse: InsertCourse): Promise<Course> {
    const id = randomUUID();
    const course: Course = { 
      ...insertCourse, 
      id, 
      rating: "0",
      studentsCount: 0,
      isActive: true 
    };
    this.courses.set(id, course);
    return course;
  }

  async getInstructors(): Promise<Instructor[]> {
    return Array.from(this.instructors.values());
  }

  async createInstructor(insertInstructor: InsertInstructor): Promise<Instructor> {
    const id = randomUUID();
    const instructor: Instructor = { 
      ...insertInstructor, 
      id, 
      rating: "0",
      studentsCount: 0,
      coursesCount: 0 
    };
    this.instructors.set(id, instructor);
    return instructor;
  }

  async getTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values());
  }

  async createTestimonial(insertTestimonial: InsertTestimonial): Promise<Testimonial> {
    const id = randomUUID();
    const testimonial: Testimonial = { 
      ...insertTestimonial, 
      id, 
      rating: 5 
    };
    this.testimonials.set(id, testimonial);
    return testimonial;
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const id = randomUUID();
    const contact: Contact = { 
      ...insertContact, 
      id,
      isConfirmed: false,
      createdAt: new Date() 
    };
    this.contacts.set(id, contact);
    return contact;
  }

  async getContacts(): Promise<Contact[]> {
    return Array.from(this.contacts.values()).sort(
      (a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0)
    );
  }

  async createEnrollment(insertEnrollment: InsertEnrollment): Promise<Enrollment> {
    const id = randomUUID();
    const enrollment: Enrollment = { 
      ...insertEnrollment, 
      id,
      isConfirmed: false,
      createdAt: new Date() 
    };
    this.enrollments.set(id, enrollment);
    return enrollment;
  }

  async getEnrollments(): Promise<Enrollment[]> {
    return Array.from(this.enrollments.values()).sort(
      (a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0)
    );
  }
}

export const storage = new MemStorage();
