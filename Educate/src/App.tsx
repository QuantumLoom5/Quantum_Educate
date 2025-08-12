import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import UniversityCourses from "@/pages/university-courses";
import SchoolCourses from "@/pages/school-courses";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/university" component={UniversityCourses} />
      <Route path="/school" component={SchoolCourses} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
