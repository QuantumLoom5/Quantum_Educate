import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import LevelSelection from "@/components/level-selection";
import CourseCatalog from "@/components/course-catalog";
import InstructorProfiles from "@/components/instructor-profiles";
import Testimonials from "@/components/testimonials";
import PricingSection from "@/components/pricing-section";
import ContactForm from "@/components/contact-form";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="font-sans bg-slate-50 text-slate-800 dark:bg-slate-900 dark:text-slate-200">
      <Navigation />
      <HeroSection />
      <LevelSelection />
      <CourseCatalog />
      <InstructorProfiles />
      <Testimonials />
      <PricingSection />
      <ContactForm />
      <Footer />
    </div>
  );
}
