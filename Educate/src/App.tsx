import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "../src/components/ui/toaster";
import { TooltipProvider } from "../src/components/ui/tooltip";
import NotFound from "../src/pages/not-found";
import Home from "../src/pages/home";
import UniversityCourses from "../src/pages/university-courses";
import SchoolCourses from "../src/pages/school-courses";

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
