import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema, insertEnrollmentSchema } from "../shared/schema";
// import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all courses
  app.get("/api/courses", async (_req, res) => {
    try {
      const courses = await storage.getCourses();
      res.json(courses);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch courses" });
    }
  });

  // Get courses by category
  app.get("/api/courses/category/:category", async (req, res) => {
    try {
      const { category } = req.params;
      const courses = await storage.getCoursesByCategory(category);
      res.json(courses);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch courses by category" });
    }
  });

  // Get courses by target level (university/school)
  app.get("/api/courses/level/:targetLevel", async (req, res) => {
    try {
      const { targetLevel } = req.params;
      const courses = await storage.getCoursesByTargetLevel(targetLevel);
      res.json(courses);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch courses by target level" });
    }
  });

  // Get all instructors
  app.get("/api/instructors", async (_req, res) => {
    try {
      const instructors = await storage.getInstructors();
      res.json(instructors);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch instructors" });
    }
  });

  // Get all testimonials
  app.get("/api/testimonials", async (_req, res) => {
    try {
      const testimonials = await storage.getTestimonials();
      res.json(testimonials);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch testimonials" });
    }
  });

  // Create contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const result = insertContactSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ 
          error: "Invalid contact data",
          details: result.error.issues
        });
      }

      const contact = await storage.createContact(result.data);
      res.status(201).json({ 
        message: "Contact form submitted successfully",
        id: contact.id 
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to submit contact form" });
    }
  });

  // Get all contacts (admin endpoint)
  app.get("/api/contacts", async (_req, res) => {
    try {
      const contacts = await storage.getContacts();
      res.json(contacts);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch contacts" });
    }
  });

  // Create enrollment (class registration)
  app.post("/api/enrollment", async (req, res) => {
    try {
      const result = insertEnrollmentSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ 
          error: "Invalid enrollment data",
          details: result.error.issues
        });
      }

      const enrollment = await storage.createEnrollment(result.data);
      res.status(201).json({ 
        message: "Class enrollment submitted successfully! You will receive a confirmation email with Zoom details within 24 hours.",
        id: enrollment.id,
        enrollmentDetails: {
          courseName: result.data.courseId,
          preferredSchedule: result.data.preferredSchedule,
          targetLevel: result.data.targetLevel
        }
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to submit enrollment" });
    }
  });

  // Get all enrollments (admin endpoint)
  app.get("/api/enrollments", async (_req, res) => {
    try {
      const enrollments = await storage.getEnrollments();
      res.json(enrollments);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch enrollments" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
