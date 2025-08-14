import Navigation from "../components/navigation";
import SchoolHero from "../components/school-hero";
import SchoolCourseCatalog from "../components/school-course-catalog";
import InstructorProfiles from "../components/instructor-profiles";
import Testimonials from "../components/testimonials";
import EnrollmentForm from "../components/enrollment-form";
import Footer from "../components/footer";

export default function SchoolCourses() {
  return (
    <div className="font-sans bg-slate-50 text-slate-800 dark:bg-slate-900 dark:text-slate-200">
      <Navigation />
      <SchoolHero />
      <SchoolCourseCatalog />
      <InstructorProfiles />
      <Testimonials />
      <EnrollmentForm targetLevel="school" />
      <Footer />
    </div>
  );
}