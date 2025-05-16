import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Analysis from "@/pages/analysis";
import Database from "@/pages/database";
import Simulation from "@/pages/simulation";
import About from "@/pages/about";
import Sensor from "@/pages/sensor";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { useEffect } from "react";
import { ThemeProvider } from "@/components/ui/theme-provider";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/analysis" component={Analysis} />
      <Route path="/database" component={Database} />
      <Route path="/simulation" component={Simulation} />
      <Route path="/about" component={About} />
      <Route path="/sensor" component={Sensor} />
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  // Set the document direction based on current language
  useEffect(() => {
    // Default to RTL for Arabic
    document.documentElement.dir = "rtl";
    document.documentElement.lang = "ar";
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" attribute="class">
        <TooltipProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
              <Router />
            </main>
            <Footer />
          </div>
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
