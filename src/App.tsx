import React, { useState, useEffect } from "react";
import {
  Sun,
  Moon,
  Menu,
  X,
  ArrowUp,
  Brain,
  Sparkles,
  ArrowRight,
  ChevronDown,
  Layers,
  Users,
  TrendingUp,
  Settings,
  ShieldCheck,
  Lock,
  Smartphone,
  Cpu,
  LineChart,
  RefreshCw,
  CheckCircle,
  Gamepad,
  Mail,
  Linkedin,
  Twitter,
  Github,
  BookOpen,
  BarChart3,
  Rss
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// Page imports
import Home from "./pages/Home";
import Contact from "./pages/Contact";

// Services subpage imports
import DedicatedTeam from "./pages/services/DedicatedTeam";
import CustomSoftware from "./pages/services/CustomSoftware";
import CtoService from "./pages/services/CtoService";
import ItConsulting from "./pages/services/ItConsulting";

// Expertise subpage imports
import AiMl from "./pages/expertise/AiMl";
import BigData from "./pages/expertise/BigData";
import Reengineering from "./pages/expertise/Reengineering";
import Iot from "./pages/expertise/Iot";
import WebMobile from "./pages/expertise/WebMobile";
import DevopsSecurity from "./pages/expertise/DevopsSecurity";
import SupportMaintenance from "./pages/expertise/SupportMaintenance";
import LowCode from "./pages/expertise/LowCode";
import Web3Blockchain from "./pages/expertise/Web3Blockchain";
import QaAutomation from "./pages/expertise/QaAutomation";
import CloudNative from "./pages/expertise/CloudNative";
import Gamification from "./pages/expertise/Gamification";

// Resources subpage imports
import CaseStudies from "./pages/resources/CaseStudies";
import Blogs from "./pages/resources/Blogs";
import CaseStudyDetail from "./pages/resources/CaseStudyDetail";
import BlogDetail from "./pages/resources/BlogDetail";

// Component imports
import { Footer } from "./components/Footer";
import logo from "./narc.png";

export default function App() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileExpertiseOpen, setMobileExpertiseOpen] = useState(false);
  const [mobileResourcesOpen, setMobileResourcesOpen] = useState(false);
  const [desktopMegaOpen, setDesktopMegaOpen] = useState<"services" | "expertise" | "resources" | null>(null);
  const megaMenuHoveredRef = React.useRef<"services" | "expertise" | "resources" | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollPercent, setScrollPercent] = useState(0);

  // Router base path
  const [currentPath, setCurrentPath] = useState<string>(window.location.pathname);

  // Listen to pathname & hash changes for page routing
  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);

      setMobileMenuOpen(false);
      setMobileServicesOpen(false);
      setMobileExpertiseOpen(false);
      setMobileResourcesOpen(false);
      setDesktopMegaOpen(null);

      // Handle scrolling to hash anchor if present
      const hash = window.location.hash;
      if (hash) {
        const anchorId = hash.substring(1);
        setTimeout(() => {
          const el = document.getElementById(anchorId);
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }, 150);
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };

    window.addEventListener("popstate", handleLocationChange);
    window.addEventListener("pushstate", handleLocationChange);
    window.addEventListener("replacestate", handleLocationChange);

    handleLocationChange();

    return () => {
      window.removeEventListener("popstate", handleLocationChange);
      window.removeEventListener("pushstate", handleLocationChange);
      window.removeEventListener("replacestate", handleLocationChange);
    };
  }, []);

  // Intercept all link clicks globally to allow path-based SPA routing
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a");
      if (!target) return;

      let href = target.getAttribute("href");
      if (!href || href === "#" || href === "") return;

      // Skip external links, mailto, tel, etc.
      if (
        href.startsWith("http") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        target.target === "_blank" ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      ) {
        return;
      }

      // Convert legacy hashes (e.g. #/expertise/ai-ml, #contact, /#contact) to clean paths
      let targetPath = href;
      if (targetPath.startsWith("#/")) {
        targetPath = targetPath.substring(1);
      } else if (targetPath.startsWith("/#")) {
        targetPath = "/" + targetPath.substring(1); // e.g. "/#solutions" -> "/#solutions"
      } else if (targetPath.startsWith("#")) {
        // If we are not on Home, prefix it with "/" so it goes to Home with anchor
        if (window.location.pathname !== "/") {
          targetPath = "/" + targetPath;
        }
      }

      // If it is an internal route or anchor link
      if (targetPath.startsWith("/") || targetPath.startsWith("#")) {
        e.preventDefault();

        // Push state to browser history
        window.history.pushState({}, "", targetPath);
        
        // Trigger the pushstate event so routing updates
        window.dispatchEvent(new Event("pushstate"));
      }
    };

    // Helper to monkey-patch pushState/replaceState so programmatic redirects also trigger state updates
    const originalPushState = window.history.pushState;
    window.history.pushState = function (...args) {
      originalPushState.apply(this, args);
      window.dispatchEvent(new Event("pushstate"));
    };

    const originalReplaceState = window.history.replaceState;
    window.history.replaceState = function (...args) {
      originalReplaceState.apply(this, args);
      window.dispatchEvent(new Event("replacestate"));
    };

    document.addEventListener("click", handleGlobalClick);
    return () => {
      document.removeEventListener("click", handleGlobalClick);
      window.history.pushState = originalPushState;
      window.history.replaceState = originalReplaceState;
    };
  }, []);

  // Theme manager
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "light") {
      root.classList.add("light-mode");
    } else {
      root.classList.remove("light-mode");
    }
  }, [theme]);

  // Scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const scrolled = (window.scrollY / totalHeight) * 100;
        setScrollPercent(Math.min(100, Math.max(0, scrolled)));
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const closeNavigationMenus = () => {
    setDesktopMegaOpen(null);
    setMobileMenuOpen(false);
    setMobileServicesOpen(false);
    setMobileExpertiseOpen(false);
    setMobileResourcesOpen(false);
  };

  const renderPage = () => {
    switch (currentPath) {
      case "/":
      case "":
        return <Home />;
      case "/contact":
        return <Contact />;
      case "/services/full-cycle-development":
        return <CustomSoftware />;
      case "/services/team-augmentation":
        return <DedicatedTeam />;
      case "/services/transformation-consulting":
        return <ItConsulting />;
      case "/services/concept-design":
        return <CtoService />;
      case "/expertise/ai-ml":
        return <AiMl />;
      case "/expertise/big-data":
        return <BigData />;
      case "/expertise/reengineering":
        return <Reengineering />;
      case "/expertise/iot":
        return <Iot />;
      case "/expertise/web-mobile":
        return <WebMobile />;
      case "/expertise/devops-security":
        return <DevopsSecurity />;
      case "/expertise/support-maintenance":
        return <SupportMaintenance />;
      case "/expertise/low-code":
        return <LowCode />;
      case "/expertise/web3-blockchain":
        return <Web3Blockchain />;
      case "/expertise/qa-automation":
        return <QaAutomation />;
      case "/expertise/cloud-native":
        return <CloudNative />;
      case "/expertise/gamification":
        return <Gamification />;
      case "/resources/case-studies":
        return <CaseStudies />;
      case "/resources/blogs":
        return <Blogs />;
      default:
        // Dynamic slug routing for detail pages
        if (currentPath.startsWith("/resources/case-studies/")) {
          const slug = currentPath.replace("/resources/case-studies/", "");
          return <CaseStudyDetail slug={slug} />;
        }
        if (currentPath.startsWith("/resources/blogs/")) {
          const slug = currentPath.replace("/resources/blogs/", "");
          return <BlogDetail slug={slug} />;
        }
        return <Home />;
    }
  };

  const isLinkActive = (path: string) => {
    return currentPath === path || currentPath.startsWith(path + "/");
  };

  const navLinkClass = (path: string) => {
    const isActive = isLinkActive(path);
    return `text-sm font-semibold tracking-wide transition-all duration-300 relative py-2 flex items-center gap-1 cursor-pointer ${isActive
        ? "text-primary font-bold"
        : "text-text-secondary hover:text-text-primary"
      }`;
  };

  return (
    <div className="min-h-screen bg-bg text-text-primary overflow-x-hidden transition-colors duration-300 flex flex-col justify-between">

      {/* Global Background Grid */}
      <div className={`fixed inset-0 pointer-events-none z-0 transition-opacity duration-500 ${theme === 'dark' ? 'opacity-30' : 'opacity-[0.14]'}`}>
        <div className="absolute inset-0 grid-bg-dark opacity-35"></div>
        <div className="absolute top-[-10%] left-[-15%] w-[45vw] h-[45vw] rounded-full bg-gradient-to-tr from-primary/10 to-secondary/15 blur-[120px] animate-float-slow"></div>
        <div className="absolute bottom-[-10%] right-[-15%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-br from-glow/10 to-secondary/10 blur-[130px] animate-float-delay"></div>
      </div>

      {/* Navigation Header */}
      <nav
        id="navbar"
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b ${isScrolled
            ? "bg-surface/90 backdrop-blur-xl border-border py-4 shadow-xl"
            : "bg-transparent border-transparent py-6"
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">

          {/* Logo */}
          <a href="/" className="flex items-center space-x-2 group">
            <img src={logo} alt="NorthArc Logo" className="w-10 h-10 object-contain shadow-lg shadow-primary/10 group-hover:scale-105 transition-transform duration-300 rounded-xl" />
            <div className="flex flex-col text-left">
              <span className="text-xl font-bold tracking-tight font-display text-text-primary group-hover:text-primary transition-colors duration-200">NorthArc</span>
              <span className="text-[9px] uppercase tracking-widest text-text-muted font-semibold">Connecting Intelligence</span>
            </div>
          </a>

          {/* Desktop Links with Tallium-Style Mega Menus */}
          <div className="hidden lg:flex items-center space-x-8">
            <a href="/" onClick={closeNavigationMenus} className={navLinkClass("/")}>
              Home
              {currentPath === "/" && (
                <motion.div layoutId="nav-underline" className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary" />
              )}
            </a>

            {/* SERVICES MEGA MENU */}
            <div
              className="relative py-2"
              onMouseEnter={() => { setDesktopMegaOpen("services"); megaMenuHoveredRef.current = "services"; }}
              onMouseLeave={() => { megaMenuHoveredRef.current = null; setTimeout(() => { if (!megaMenuHoveredRef.current) setDesktopMegaOpen(null); }, 100); }}
            >
              <button className={navLinkClass("/services")}>
                Services
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${desktopMegaOpen === "services" ? "rotate-180" : ""}`} />
                {currentPath.startsWith("/services") && (
                  <motion.div layoutId="nav-underline" className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary" />
                )}
              </button>

              {/* Full Width Mega Menu overlay */}
              <div
                onClick={closeNavigationMenus}
                onMouseEnter={() => { megaMenuHoveredRef.current = "services"; }}
                onMouseLeave={() => { megaMenuHoveredRef.current = null; }}
                className={`fixed top-[73px] left-0 w-screen bg-surface/95 backdrop-blur-2xl border-b border-border shadow-2xl transition-all duration-300 z-50 py-10 px-12 md:px-24 ${desktopMegaOpen === "services"
                    ? "opacity-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 translate-y-2 pointer-events-none"
                  }`}>
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">

                  {/* Left sidebar container */}
                  <div className="lg:col-span-3 border-r border-border/80 pr-8 flex flex-col justify-between text-left space-y-6">
                    <div className="space-y-3">
                      <span className="text-[10px] font-mono tracking-widest text-primary uppercase font-bold">Schedule a call</span>
                      <h3 className="text-xl font-extrabold text-text-primary leading-snug">
                        Tell us about your project idea and let us guide you
                      </h3>
                    </div>
                    <a
                      href="/contact"
                      onClick={closeNavigationMenus}
                      className="px-5 py-3 rounded-xl bg-primary hover:bg-primary/95 text-white font-bold text-xs uppercase tracking-wider inline-flex items-center justify-center space-x-2 w-fit transition-all"
                    >
                      <span>Book a meeting</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>

                  {/* Right grid cards */}
                  <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <a href="/services/full-cycle-development" onClick={closeNavigationMenus} className="p-6 rounded-2xl bg-surface/40 border border-border/80 hover:border-primary/50 hover:bg-surface-elevated/40 transition-all duration-300 text-left group/card flex flex-col justify-between h-56">
                      <div className="space-y-4">
                        <div className="p-3 rounded-xl bg-primary/10 text-primary w-fit group-hover/card:bg-primary group-hover/card:text-white transition-all">
                          <Layers className="w-5 h-5" />
                        </div>
                        <h4 className="text-base font-bold text-text-primary group-hover/card:text-primary transition-colors">Full-cycle Development</h4>
                      </div>
                      <p className="text-xs text-text-secondary leading-relaxed font-light">Custom web & mobile apps, API architectures, databases.</p>
                    </a>

                    <a href="/services/team-augmentation" onClick={closeNavigationMenus} className="p-6 rounded-2xl bg-surface/40 border border-border/80 hover:border-primary/50 hover:bg-surface-elevated/40 transition-all duration-300 text-left group/card flex flex-col justify-between h-56">
                      <div className="space-y-4">
                        <div className="p-3 rounded-xl bg-primary/10 text-primary w-fit group-hover/card:bg-primary group-hover/card:text-white transition-all">
                          <Users className="w-5 h-5" />
                        </div>
                        <h4 className="text-base font-bold text-text-primary group-hover/card:text-primary transition-colors">Software Team Augmentation</h4>
                      </div>
                      <p className="text-xs text-text-secondary leading-relaxed font-light">Full-time senior engineers, QA, PM, DevOps specialists.</p>
                    </a>

                    <a href="/services/transformation-consulting" onClick={closeNavigationMenus} className="p-6 rounded-2xl bg-surface/40 border border-border/80 hover:border-primary/50 hover:bg-surface-elevated/40 transition-all duration-300 text-left group/card flex flex-col justify-between h-56">
                      <div className="space-y-4">
                        <div className="p-3 rounded-xl bg-primary/10 text-primary w-fit group-hover/card:bg-primary group-hover/card:text-white transition-all">
                          <TrendingUp className="w-5 h-5" />
                        </div>
                        <h4 className="text-base font-bold text-text-primary group-hover/card:text-primary transition-colors">Digital Transformation</h4>
                      </div>
                      <p className="text-xs text-text-secondary leading-relaxed font-light">IT audits, legacy systems migrations, workflow automation.</p>
                    </a>

                    <a href="/services/concept-design" onClick={closeNavigationMenus} className="p-6 rounded-2xl bg-surface/40 border border-border/80 hover:border-primary/50 hover:bg-surface-elevated/40 transition-all duration-300 text-left group/card flex flex-col justify-between h-56">
                      <div className="space-y-4">
                        <div className="p-3 rounded-xl bg-primary/10 text-primary w-fit group-hover/card:bg-primary group-hover/card:text-white transition-all">
                          <Brain className="w-5 h-5" />
                        </div>
                        <h4 className="text-base font-bold text-text-primary group-hover/card:text-primary transition-colors">Product Concept & Design</h4>
                      </div>
                      <p className="text-xs text-text-secondary leading-relaxed font-light">Figma wireframes, prototyping, technical roadmaps.</p>
                    </a>
                  </div>

                </div>
              </div>
            </div>

            {/* EXPERTISE MEGA MENU */}
            <div
              className="relative py-2"
              onMouseEnter={() => { setDesktopMegaOpen("expertise"); megaMenuHoveredRef.current = "expertise"; }}
              onMouseLeave={() => { megaMenuHoveredRef.current = null; setTimeout(() => { if (!megaMenuHoveredRef.current) setDesktopMegaOpen(null); }, 100); }}
            >
              <button className={navLinkClass("/expertise")}>
                Expertise
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${desktopMegaOpen === "expertise" ? "rotate-180" : ""}`} />
                {currentPath.startsWith("/expertise") && (
                  <motion.div layoutId="nav-underline" className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary" />
                )}
              </button>

              {/* Full Width Mega Menu overlay */}
              <div
                onClick={closeNavigationMenus}
                onMouseEnter={() => { megaMenuHoveredRef.current = "expertise"; }}
                onMouseLeave={() => { megaMenuHoveredRef.current = null; }}
                className={`fixed top-[73px] left-0 w-screen bg-surface/95 backdrop-blur-2xl border-b border-border shadow-2xl transition-all duration-300 z-50 py-10 px-12 md:px-24 ${desktopMegaOpen === "expertise"
                    ? "opacity-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 translate-y-2 pointer-events-none"
                  }`}>
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">

                  {/* Left sidebar container */}
                  <div className="lg:col-span-3 border-r border-border/80 pr-8 flex flex-col justify-between text-left space-y-6">
                    <div className="space-y-3">
                      <span className="text-[10px] font-mono tracking-widest text-primary uppercase font-bold">Schedule a call</span>
                      <h3 className="text-xl font-extrabold text-text-primary leading-snug">
                        Tell us about your project idea and let us guide you
                      </h3>
                    </div>
                    <a
                      href="/contact"
                      onClick={closeNavigationMenus}
                      className="px-5 py-3 rounded-xl bg-primary hover:bg-primary/95 text-white font-bold text-xs uppercase tracking-wider inline-flex items-center justify-center space-x-2 w-fit transition-all"
                    >
                      <span>Book a meeting</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>

                  {/* Right 3-Column link layout */}
                  <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">

                    {/* Column 1 */}
                    <div className="flex flex-col space-y-4">
                      <a href="/expertise/ai-ml" onClick={closeNavigationMenus} className="flex items-center space-x-3 text-sm text-text-secondary hover:text-primary transition-colors font-medium py-1">
                        <Brain className="w-4.5 h-4.5 text-primary" />
                        <span>AI and Machine Learning</span>
                      </a>
                      <a href="/expertise/big-data" onClick={closeNavigationMenus} className="flex items-center space-x-3 text-sm text-text-secondary hover:text-primary transition-colors font-medium py-1">
                        <LineChart className="w-4.5 h-4.5 text-primary" />
                        <span>Big Data & Data Science</span>
                      </a>
                      <a href="/expertise/reengineering" onClick={closeNavigationMenus} className="flex items-center space-x-3 text-sm text-text-secondary hover:text-primary transition-colors font-medium py-1">
                        <RefreshCw className="w-4.5 h-4.5 text-primary" />
                        <span>Refinement & Reengineering</span>
                      </a>
                      <a href="/expertise/iot" onClick={closeNavigationMenus} className="flex items-center space-x-3 text-sm text-text-secondary hover:text-primary transition-colors font-medium py-1">
                        <Cpu className="w-4.5 h-4.5 text-primary" />
                        <span>IoT & Embedded</span>
                      </a>
                    </div>

                    {/* Column 2 */}
                    <div className="flex flex-col space-y-4">
                      <a href="/expertise/web-mobile" onClick={closeNavigationMenus} className="flex items-center space-x-3 text-sm text-text-secondary hover:text-primary transition-colors font-medium py-1">
                        <Smartphone className="w-4.5 h-4.5 text-primary" />
                        <span>Web & Mobile Apps</span>
                      </a>
                      <a href="/expertise/devops-security" onClick={closeNavigationMenus} className="flex items-center space-x-3 text-sm text-text-secondary hover:text-primary transition-colors font-medium py-1">
                        <ShieldCheck className="w-4.5 h-4.5 text-primary" />
                        <span>DevOps & Security</span>
                      </a>
                      <a href="/expertise/support-maintenance" onClick={closeNavigationMenus} className="flex items-center space-x-3 text-sm text-text-secondary hover:text-primary transition-colors font-medium py-1">
                        <Settings className="w-4.5 h-4.5 text-primary" />
                        <span>Support & Maintenance</span>
                      </a>
                      <a href="/expertise/low-code" onClick={closeNavigationMenus} className="flex items-center space-x-3 text-sm text-text-secondary hover:text-primary transition-colors font-medium py-1">
                        <Layers className="w-4.5 h-4.5 text-primary" />
                        <span>Low-code / No-code</span>
                      </a>
                    </div>

                    {/* Column 3 */}
                    <div className="flex flex-col space-y-4">
                      <a href="/expertise/web3-blockchain" onClick={closeNavigationMenus} className="flex items-center space-x-3 text-sm text-text-secondary hover:text-primary transition-colors font-medium py-1">
                        <Lock className="w-4.5 h-4.5 text-primary" />
                        <span>Web 3.0 & Blockchain</span>
                      </a>
                      <a href="/expertise/qa-automation" onClick={closeNavigationMenus} className="flex items-center space-x-3 text-sm text-text-secondary hover:text-primary transition-colors font-medium py-1">
                        <CheckCircle className="w-4.5 h-4.5 text-primary" />
                        <span>QA & Test Automation</span>
                      </a>
                      <a href="/expertise/cloud-native" onClick={closeNavigationMenus} className="flex items-center space-x-3 text-sm text-text-secondary hover:text-primary transition-colors font-medium py-1">
                        <Layers className="w-4.5 h-4.5 text-primary" />
                        <span>Cloud-native Services</span>
                      </a>
                      <a href="/expertise/gamification" onClick={closeNavigationMenus} className="flex items-center space-x-3 text-sm text-text-secondary hover:text-primary transition-colors font-medium py-1">
                        <Gamepad className="w-4.5 h-4.5 text-primary" />
                        <span>Gamification Mechanics</span>
                      </a>
                    </div>

                  </div>

                </div>
              </div>
            </div>

            {/* RESOURCES MEGA MENU */}
            <div
              className="relative py-2"
              onMouseEnter={() => { setDesktopMegaOpen("resources"); megaMenuHoveredRef.current = "resources"; }}
              onMouseLeave={() => { megaMenuHoveredRef.current = null; setTimeout(() => { if (!megaMenuHoveredRef.current) setDesktopMegaOpen(null); }, 100); }}
            >
              <button className={navLinkClass("/resources")}>
                Resources
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${desktopMegaOpen === "resources" ? "rotate-180" : ""}`} />
                {currentPath.startsWith("/resources") && (
                  <motion.div layoutId="nav-underline" className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary" />
                )}
              </button>

              {/* Resources Mega Menu overlay */}
              <div
                onClick={closeNavigationMenus}
                onMouseEnter={() => { megaMenuHoveredRef.current = "resources"; }}
                onMouseLeave={() => { megaMenuHoveredRef.current = null; }}
                className={`fixed top-[73px] left-0 w-screen bg-surface/95 backdrop-blur-2xl border-b border-border shadow-2xl transition-all duration-300 z-50 py-10 px-12 md:px-24 ${desktopMegaOpen === "resources"
                    ? "opacity-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 translate-y-2 pointer-events-none"
                  }`}>
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">

                  {/* Left sidebar */}
                  <div className="lg:col-span-3 border-r border-border/80 pr-8 flex flex-col justify-between text-left space-y-6">
                    <div className="space-y-3">
                      <span className="text-[10px] font-mono tracking-widest text-primary uppercase font-bold">Explore</span>
                      <h3 className="text-xl font-extrabold text-text-primary leading-snug">
                        Knowledge from the analytics frontier
                      </h3>
                      <p className="text-xs text-text-secondary font-light leading-relaxed">
                        Real client results, practitioner insights, and deep-dive guides.
                      </p>
                    </div>
                    <a
                      href="/contact"
                      onClick={closeNavigationMenus}
                      className="px-5 py-3 rounded-xl bg-primary hover:bg-primary/95 text-white font-bold text-xs uppercase tracking-wider inline-flex items-center justify-center space-x-2 w-fit transition-all"
                    >
                      <span>Get in touch</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>

                  {/* Right – two feature cards */}
                  <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Case Studies card */}
                    <a
                      href="/resources/case-studies"
                      onClick={closeNavigationMenus}
                      className="p-6 rounded-2xl bg-surface/40 border border-border/80 hover:border-primary/50 hover:bg-surface-elevated/40 transition-all duration-300 text-left group/card flex flex-col gap-4"
                    >
                      <div className="p-3 rounded-xl bg-primary/10 text-primary w-fit group-hover/card:bg-primary group-hover/card:text-white transition-all">
                        <BarChart3 className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-text-primary group-hover/card:text-primary transition-colors">Case Studies</h4>
                        <p className="text-xs text-text-secondary leading-relaxed font-light mt-1.5">
                          See how leading brands achieved measurable results with data-driven analytics strategies.
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-auto">
                        {["GA4", "BigQuery", "GTM", "Attribution"].map(tag => (
                          <span key={tag} className="text-[9px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full bg-surface-elevated border border-border text-text-muted">{tag}</span>
                        ))}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-primary opacity-0 group-hover/card:opacity-100 transition-opacity">
                        <span>Explore case studies</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </a>

                    {/* Blogs card */}
                    <a
                      href="/resources/blogs"
                      onClick={closeNavigationMenus}
                      className="p-6 rounded-2xl bg-surface/40 border border-border/80 hover:border-primary/50 hover:bg-surface-elevated/40 transition-all duration-300 text-left group/card flex flex-col gap-4"
                    >
                      <div className="p-3 rounded-xl bg-primary/10 text-primary w-fit group-hover/card:bg-primary group-hover/card:text-white transition-all">
                        <BookOpen className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-text-primary group-hover/card:text-primary transition-colors">Blog</h4>
                        <p className="text-xs text-text-secondary leading-relaxed font-light mt-1.5">
                          Deep dives on GA4, BigQuery, AI analytics, and measurement engineering for data teams.
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-auto">
                        {["Agentic AI", "Data Quality", "Analytics", "CRO"].map(tag => (
                          <span key={tag} className="text-[9px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full bg-surface-elevated border border-border text-text-muted">{tag}</span>
                        ))}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-primary opacity-0 group-hover/card:opacity-100 transition-opacity">
                        <span>Read articles</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </a>

                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Actions */}
          <div className="hidden lg:flex items-center space-x-5">
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl border border-border bg-surface hover:bg-surface-elevated text-text-secondary hover:text-text-primary transition-all duration-200"
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
            </button>

            <a
              href="/contact"
              onClick={closeNavigationMenus}
              className="px-5 py-2.5 rounded-xl text-sm font-bold bg-primary hover:bg-primary/95 text-white shadow-md shadow-primary/20 hover:shadow-lg transition-all duration-300 transform hover:translate-y-[-1px]"
            >
              Book Consultation
            </a>
          </div>

          {/* Mobile Hamburgers */}
          <div className="flex lg:hidden items-center space-x-3">
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl border border-border bg-surface text-text-secondary"
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl border border-border bg-surface text-text-primary"
              aria-label="Toggle Mobile Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden w-full border-t border-border bg-surface/95 backdrop-blur-2xl absolute left-0 top-full overflow-hidden shadow-xl text-left"
            >
              <div className="px-6 py-8 space-y-4 flex flex-col">
                <a href="/" onClick={closeNavigationMenus} className="text-base font-semibold text-text-secondary hover:text-primary py-1">Home</a>

                {/* Mobile Services Collapsible */}
                <div className="space-y-1">
                  <button
                    onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                    className="w-full text-base font-semibold text-text-secondary hover:text-primary py-1 flex items-center justify-between"
                  >
                    <span>Services</span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileServicesOpen ? "rotate-180" : ""}`} />
                  </button>
                  {mobileServicesOpen && (
                    <div className="pl-4 flex flex-col space-y-2 pt-1 pb-2 border-l border-border/80">
                      <a href="/services/full-cycle-development" onClick={closeNavigationMenus} className="text-sm text-text-secondary hover:text-primary py-1">Full-cycle Development</a>
                      <a href="/services/team-augmentation" onClick={closeNavigationMenus} className="text-sm text-text-secondary hover:text-primary py-1">Software Team Augmentation</a>
                      <a href="/services/transformation-consulting" onClick={closeNavigationMenus} className="text-sm text-text-secondary hover:text-primary py-1">Digital Transformation</a>
                      <a href="/services/concept-design" onClick={closeNavigationMenus} className="text-sm text-text-secondary hover:text-primary py-1">Product Concept & Design</a>
                    </div>
                  )}
                </div>

                {/* Mobile Expertise Collapsible */}
                <div className="space-y-1">
                  <button
                    onClick={() => setMobileExpertiseOpen(!mobileExpertiseOpen)}
                    className="w-full text-base font-semibold text-text-secondary hover:text-primary py-1 flex items-center justify-between"
                  >
                    <span>Expertise</span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileExpertiseOpen ? "rotate-180" : ""}`} />
                  </button>
                  {mobileExpertiseOpen && (
                    <div className="pl-4 flex flex-col space-y-2 pt-1 pb-2 border-l border-border/80">
                      <a href="/expertise/ai-ml" onClick={closeNavigationMenus} className="text-sm text-text-secondary hover:text-primary py-1 font-medium">AI and Machine Learning</a>
                      <a href="/expertise/big-data" onClick={closeNavigationMenus} className="text-sm text-text-secondary hover:text-primary py-1 font-medium">Big Data & Data Science</a>
                      <a href="/expertise/reengineering" onClick={closeNavigationMenus} className="text-sm text-text-secondary hover:text-primary py-1 font-medium">Refinement & Reengineering</a>
                      <a href="/expertise/iot" onClick={closeNavigationMenus} className="text-sm text-text-secondary hover:text-primary py-1 font-medium">IoT & Embedded</a>
                      <a href="/expertise/web-mobile" onClick={closeNavigationMenus} className="text-sm text-text-secondary hover:text-primary py-1 font-medium">Web & Mobile Apps</a>
                      <a href="/expertise/devops-security" onClick={closeNavigationMenus} className="text-sm text-text-secondary hover:text-primary py-1 font-medium">DevOps & Security</a>
                      <a href="/expertise/support-maintenance" onClick={closeNavigationMenus} className="text-sm text-text-secondary hover:text-primary py-1 font-medium">Support & Maintenance</a>
                      <a href="/expertise/low-code" onClick={closeNavigationMenus} className="text-sm text-text-secondary hover:text-primary py-1 font-medium">Low-code / No-code</a>
                      <a href="/expertise/web3-blockchain" onClick={closeNavigationMenus} className="text-sm text-text-secondary hover:text-primary py-1 font-medium">Web 3.0 & Blockchain</a>
                      <a href="/expertise/qa-automation" onClick={closeNavigationMenus} className="text-sm text-text-secondary hover:text-primary py-1 font-medium">QA & Test Automation</a>
                      <a href="/expertise/cloud-native" onClick={closeNavigationMenus} className="text-sm text-text-secondary hover:text-primary py-1 font-medium">Cloud-native Services</a>
                      <a href="/expertise/gamification" onClick={closeNavigationMenus} className="text-sm text-text-secondary hover:text-primary py-1 font-medium">Gamification Mechanics</a>
                    </div>
                  )}
                </div>

                {/* Mobile Resources Collapsible */}
                <div className="space-y-1">
                  <button
                    onClick={() => setMobileResourcesOpen(!mobileResourcesOpen)}
                    className="w-full text-base font-semibold text-text-secondary hover:text-primary py-1 flex items-center justify-between"
                  >
                    <span>Resources</span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileResourcesOpen ? "rotate-180" : ""}`} />
                  </button>
                  {mobileResourcesOpen && (
                    <div className="pl-4 flex flex-col space-y-2 pt-1 pb-2 border-l border-border/80">
                      <a href="/resources/case-studies" onClick={closeNavigationMenus} className="text-sm text-text-secondary hover:text-primary py-1 font-medium">Case Studies</a>
                      <a href="/resources/blogs" onClick={closeNavigationMenus} className="text-sm text-text-secondary hover:text-primary py-1 font-medium">Blog</a>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-border">
                  <a
                    href="/contact"
                    onClick={closeNavigationMenus}
                    className="w-full inline-flex items-center justify-center px-5 py-3 rounded-xl font-bold bg-primary text-white shadow-md"
                  >
                    Book Consultation
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main Page Content Block */}
      <main className="flex-grow z-10 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPath}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Shared site Footer */}
      <Footer />

      {/* Scroll percentage floating back-to-top button */}
      <AnimatePresence>
        {scrollPercent > 10 && (
          <motion.button
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-surface border border-border flex items-center justify-center shadow-2xl z-40 hover:border-primary/50 group transition-all"
            aria-label="Back to top"
          >
            <svg className="w-full h-full rotate-[-90deg] absolute inset-0">
              <circle
                cx="24"
                cy="24"
                r="19"
                className="stroke-border/40 fill-none"
                strokeWidth="2.5"
              />
              <circle
                cx="24"
                cy="24"
                r="19"
                className="stroke-primary fill-none transition-all duration-100"
                strokeWidth="2.5"
                strokeDasharray="120"
                strokeDashoffset={120 - (120 * scrollPercent) / 100}
              />
            </svg>
            <ArrowUp className="w-4.5 h-4.5 text-text-primary group-hover:text-primary transition-colors relative z-10" />
          </motion.button>
        )}
      </AnimatePresence>

    </div>
  );
}
