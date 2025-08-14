import Navigation from "../components/navigation";
import UniversityHero from "../components/university-hero";
import UniversityCourseCatalog from "../components/university-course-catalog";
import InstructorProfiles from "../components/instructor-profiles";
import Testimonials from "../components/testimonials";
import EnrollmentForm from "../components/enrollment-form";
import Footer from "../components/footer";

export default function UniversityCourses() {
  return (
    <div className="font-sans bg-slate-50 text-slate-800 dark:bg-slate-900 dark:text-slate-200">
      <Navigation />
      <UniversityHero />
      <UniversityCourseCatalog />
      <InstructorProfiles />
      <Testimonials />
      <EnrollmentForm targetLevel="university" />
      <Footer />
    </div>
  );
}