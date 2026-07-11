import React, { useState, useEffect, Suspense, lazy } from "react";
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
  Smartphone,
  LineChart,
  RefreshCw,
  CheckCircle,
  Mail,
  Linkedin,
  Twitter,
  Github,
  BookOpen,
  BarChart3,
  Rss,
  Building2,
  Briefcase
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import CursorGlow from "./components/CursorGlow";
import FloatingCTA from "./components/FloatingCTA";

// Page imports (statically loaded for instant page-to-page navigation and zero dynamic chunk compiler latency)
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

// Services subpage imports
import DedicatedTeam from "./pages/services/DedicatedTeam";
import CustomSoftware from "./pages/services/CustomSoftware";
import CtoService from "./pages/services/CtoService";
import ItConsulting from "./pages/services/ItConsulting";
import ServiceAcceleratorDetail from "./pages/services/ServiceAcceleratorDetail";

// Expertise subpage imports
import AiMl from "./pages/expertise/AiMl";
import BigData from "./pages/expertise/BigData";
import Reengineering from "./pages/expertise/Reengineering";
import WebMobile from "./pages/expertise/WebMobile";
import DevopsSecurity from "./pages/expertise/DevopsSecurity";
import SupportMaintenance from "./pages/expertise/SupportMaintenance";
import LowCode from "./pages/expertise/LowCode";
import QaAutomation from "./pages/expertise/QaAutomation";
import CloudNative from "./pages/expertise/CloudNative";
import GenerativeAi from "./pages/expertise/GenerativeAi";

// Resources subpage imports
import CaseStudies from "./pages/resources/CaseStudies";
import Blogs from "./pages/resources/Blogs";
import CaseStudyDetail from "./pages/resources/CaseStudyDetail";
import BlogDetail from "./pages/resources/BlogDetail";

import { products } from "./data/productsData";

// Solutions subpage imports
import Solutions from "./pages/solutions/Solutions";
import SolutionDetail from "./pages/solutions/SolutionDetail";
import { industries, functions } from "./data/solutionsData";

// Component imports
import { Footer } from "./components/Footer";
import logo from "./narc.png";

const THEME_STORAGE_KEY = "northarc-theme";

export default function App() {
  // Initialize from localStorage (an inline script in index.html pre-applies the
  // same key before React mounts, so this avoids a flash of the wrong theme).
  const [theme, setTheme] = useState<"dark" | "light">(() =>
    localStorage.getItem(THEME_STORAGE_KEY) === "light" ? "light" : "dark"
  );
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileExpertiseOpen, setMobileExpertiseOpen] = useState(false);
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false);
  const [mobileResourcesOpen, setMobileResourcesOpen] = useState(false);
  const [desktopMegaOpen, setDesktopMegaOpen] = useState<"services" | "expertise" | "solutions" | "resources" | null>(null);
  const megaMenuHoveredRef = React.useRef<"services" | "expertise" | "solutions" | "resources" | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollPercent, setScrollPercent] = useState(0);
  const scrollStateRef = React.useRef({ isScrolled: false, scrollPercent: 0, ticking: false });

  // Router base path
  const [currentPath, setCurrentPath] = useState<string>(window.location.pathname);

  // Listen to pathname & hash changes for page routing
  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);

      setMobileMenuOpen(false);
      setMobileServicesOpen(false);
      setMobileExpertiseOpen(false);
      setMobileSolutionsOpen(false);
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
    const updateScrollState = () => {
      scrollStateRef.current.ticking = false;

      const nextIsScrolled = window.scrollY > 20;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const nextScrollPercent =
        totalHeight > 0
          ? Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100))
          : 0;

      if (nextIsScrolled !== scrollStateRef.current.isScrolled) {
        scrollStateRef.current.isScrolled = nextIsScrolled;
        setIsScrolled(nextIsScrolled);
      }

      if (Math.abs(nextScrollPercent - scrollStateRef.current.scrollPercent) >= 1) {
        scrollStateRef.current.scrollPercent = nextScrollPercent;
        setScrollPercent(nextScrollPercent);
      }
    };

    const handleScroll = () => {
      if (scrollStateRef.current.ticking) return;
      scrollStateRef.current.ticking = true;
      requestAnimationFrame(updateScrollState);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateScrollState();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem(THEME_STORAGE_KEY, next);
  };

  const closeNavigationMenus = () => {
    setDesktopMegaOpen(null);
    setMobileMenuOpen(false);
    setMobileServicesOpen(false);
    setMobileExpertiseOpen(false);
    setMobileSolutionsOpen(false);
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
      case "/expertise/generative-ai":
        return <GenerativeAi />;
      case "/expertise/web-mobile":
        return <WebMobile />;
      case "/expertise/devops-security":
        return <DevopsSecurity />;
      case "/expertise/support-maintenance":
        return <SupportMaintenance />;
      case "/expertise/low-code":
        return <LowCode />;
      case "/expertise/qa-automation":
        return <QaAutomation />;
      case "/expertise/cloud-native":
        return <CloudNative />;
      case "/resources/case-studies":
        return <CaseStudies />;
      case "/resources/blogs":
        return <Blogs />;
      case "/solutions":
        return <Solutions />;
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
        if (currentPath.startsWith("/solutions/")) {
          const slug = currentPath.replace("/solutions/", "");
          return <SolutionDetail slug={slug} />;
        }
        if (currentPath.startsWith("/services/")) {
          const slug = currentPath.replace("/services/", "");
          if (products.some((p) => p.slug === slug)) {
            return <ServiceAcceleratorDetail slug={slug} />;
          }
        }
        return <NotFound />;
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

      {/* Global cursor glow effect (dark mode only) */}
      <CursorGlow />

      {/* Floating CTA */}
      <FloatingCTA />

      {/* Global Background Grid */}
      <div className={`fixed inset-0 pointer-events-none z-0 transition-opacity duration-500 ${theme === 'dark' ? 'opacity-30' : 'opacity-[0.14]'}`}>
        <div className="absolute inset-0 grid-bg-dark opacity-35"></div>
        {/* Optimized radial gradients instead of CSS blur filters */}
        <div 
          className="absolute top-[-10%] left-[-15%] w-[45vw] h-[45vw] rounded-full animate-float-slow"
          style={{ background: "radial-gradient(circle, rgba(29,117,255,0.08) 0%, rgba(77,166,255,0.04) 50%, transparent 70%)" }}
        />
        <div 
          className="absolute bottom-[-10%] right-[-15%] w-[50vw] h-[50vw] rounded-full animate-float-delay"
          style={{ background: "radial-gradient(circle, rgba(77,148,255,0.06) 0%, rgba(77,166,255,0.03) 50%, transparent 70%)" }}
        />
      </div>

      {/* Navigation Header */}
      <nav
        id="navbar"
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b ${
          isScrolled
            ? "bg-surface/90 backdrop-blur-xl border-border py-4 shadow-xl"
            : "bg-transparent border-transparent py-6"
        }`}
      >
        {/* Scroll Progress Bar */}
        <motion.div
          className="scroll-progress-bar"
          style={{ scaleX: scrollPercent / 100, width: "100%" }}
          aria-hidden="true"
        />
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
          <div className="hidden lg:flex items-center space-x-6">
            <a href="/" onClick={closeNavigationMenus} className={navLinkClass("/")}>
              Home
              {currentPath === "/" && (
                <motion.div layoutId="nav-underline" className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary" />
              )}
            </a>

            {/* SERVICES MEGA MENU */}
            {/* No `relative` here: the overlay below anchors to the fixed <nav>
                (nearest positioned ancestor), so `top-full` always hugs the nav's
                bottom edge regardless of its scrolled/unscrolled height. */}
            <div
              className="py-2"
              onMouseEnter={() => { setDesktopMegaOpen("services"); megaMenuHoveredRef.current = "services"; }}
              onMouseLeave={() => { megaMenuHoveredRef.current = null; setTimeout(() => { if (!megaMenuHoveredRef.current) setDesktopMegaOpen(null); }, 100); }}
            >
              <button
                className={navLinkClass("/services")}
                aria-haspopup="true"
                aria-expanded={desktopMegaOpen === "services"}
              >
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
                className={`absolute top-full left-0 w-full h-[300px] overflow-hidden bg-surface/95 backdrop-blur-2xl border-b border-border shadow-2xl transition-all duration-300 z-50 py-5 px-8 md:px-14 ${desktopMegaOpen === "services"
                    ? "opacity-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 translate-y-2 pointer-events-none"
                  }`}>
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-5 h-full">

                  {/* Left sidebar container */}
                  <div className="lg:col-span-2 border-r border-border/80 pr-5 flex flex-col justify-between text-left space-y-3">
                    <div className="space-y-2">
                      <span className="text-[10px] font-mono tracking-widest text-primary uppercase font-bold">Services</span>
                      <h3 className="text-base font-extrabold text-text-primary leading-snug">
                        Build AI with proven accelerators
                      </h3>
                      <p className="text-xs text-text-secondary font-light leading-relaxed">
                        Delivery services plus ready-to-customize AI systems.
                      </p>
                    </div>
                    <a
                      href="/contact"
                      onClick={closeNavigationMenus}
                      className="px-3.5 py-2 rounded-xl bg-primary hover:bg-primary/95 text-white font-bold text-[10px] uppercase tracking-wider inline-flex items-center justify-center space-x-2 w-fit transition-all"
                    >
                      <span>Book a meeting</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>

                  <div className="lg:col-span-10 grid grid-cols-1 lg:grid-cols-12 gap-5 text-left min-h-0">
                    <div className="lg:col-span-4 border-r border-border/50 pr-5">
                      <div className="mb-3 text-[10px] font-mono tracking-widest text-text-muted uppercase font-bold">Core services</div>
                      <a href="/services/full-cycle-development" onClick={closeNavigationMenus} className="group/card flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-semibold text-text-secondary hover:bg-surface-elevated/40 hover:text-primary transition-all">
                        <Layers className="w-4 h-4 text-primary" />
                        <span>AI Product Development</span>
                      </a>

                      <a href="/services/team-augmentation" onClick={closeNavigationMenus} className="group/card flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-semibold text-text-secondary hover:bg-surface-elevated/40 hover:text-primary transition-all">
                        <Users className="w-4 h-4 text-primary" />
                        <span>AI Team Augmentation</span>
                      </a>

                      <a href="/services/transformation-consulting" onClick={closeNavigationMenus} className="group/card flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-semibold text-text-secondary hover:bg-surface-elevated/40 hover:text-primary transition-all">
                        <TrendingUp className="w-4 h-4 text-primary" />
                        <span>Transformation Consulting</span>
                      </a>

                      <a href="/services/concept-design" onClick={closeNavigationMenus} className="group/card flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-semibold text-text-secondary hover:bg-surface-elevated/40 hover:text-primary transition-all">
                        <Brain className="w-4 h-4 text-primary" />
                        <span>Concept & Design</span>
                      </a>
                    </div>

                    <div className="lg:col-span-8 min-h-0">
                      <div className="flex items-center justify-between gap-4 mb-3">
                        <span className="text-[10px] font-mono tracking-widest text-text-muted uppercase font-bold">AI accelerators</span>
                        <span className="text-[10px] text-text-muted">Delivered through services</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-4 gap-y-1.5">
                        {products.map((p) => {
                          const Icon = p.icon;
                          return (
                            <a
                              key={p.slug}
                              href={`/services/${p.slug}`}
                              onClick={closeNavigationMenus}
                              className="group/product flex items-center gap-2.5 rounded-xl px-2.5 py-2 hover:bg-surface-elevated/40 transition-all"
                            >
                              <span
                                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg"
                                style={{ background: `${p.accentColor}18`, color: p.accentColor }}
                              >
                                <Icon className="h-3.5 w-3.5" style={{ color: p.accentColor }} />
                              </span>
                              <span className="min-w-0">
                                <span className="block truncate text-xs font-semibold text-text-secondary group-hover/product:text-primary transition-colors">{p.name}</span>
                                <span className="block truncate text-[10px] text-text-muted">{p.category}</span>
                              </span>
                            </a>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            {/* EXPERTISE MEGA MENU */}
            {/* No `relative` here: the overlay below anchors to the fixed <nav>
                (nearest positioned ancestor), so `top-full` always hugs the nav's
                bottom edge regardless of its scrolled/unscrolled height. */}
            <div
              className="py-2"
              onMouseEnter={() => { setDesktopMegaOpen("expertise"); megaMenuHoveredRef.current = "expertise"; }}
              onMouseLeave={() => { megaMenuHoveredRef.current = null; setTimeout(() => { if (!megaMenuHoveredRef.current) setDesktopMegaOpen(null); }, 100); }}
            >
              <button
                className={navLinkClass("/expertise")}
                aria-haspopup="true"
                aria-expanded={desktopMegaOpen === "expertise"}
              >
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
                className={`absolute top-full left-0 w-full h-[300px] overflow-hidden bg-surface/95 backdrop-blur-2xl border-b border-border shadow-2xl transition-all duration-300 z-50 py-6 px-8 md:px-14 ${desktopMegaOpen === "expertise"
                    ? "opacity-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 translate-y-2 pointer-events-none"
                  }`}>
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 h-full">

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
                        <span>AI & Machine Learning</span>
                      </a>
                      <a href="/expertise/generative-ai" onClick={closeNavigationMenus} className="flex items-center space-x-3 text-sm text-text-secondary hover:text-primary transition-colors font-medium py-1">
                        <Sparkles className="w-4.5 h-4.5 text-primary" />
                        <span>Generative AI & LLMs</span>
                      </a>
                      <a href="/expertise/big-data" onClick={closeNavigationMenus} className="flex items-center space-x-3 text-sm text-text-secondary hover:text-primary transition-colors font-medium py-1">
                        <LineChart className="w-4.5 h-4.5 text-primary" />
                        <span>Data Science & Big Data</span>
                      </a>
                      <a href="/expertise/reengineering" onClick={closeNavigationMenus} className="flex items-center space-x-3 text-sm text-text-secondary hover:text-primary transition-colors font-medium py-1">
                        <RefreshCw className="w-4.5 h-4.5 text-primary" />
                        <span>Modernization & Reengineering</span>
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
                    </div>

                    {/* Column 3 */}
                    <div className="flex flex-col space-y-4">
                      <a href="/expertise/low-code" onClick={closeNavigationMenus} className="flex items-center space-x-3 text-sm text-text-secondary hover:text-primary transition-colors font-medium py-1">
                        <Layers className="w-4.5 h-4.5 text-primary" />
                        <span>Low-code / No-code</span>
                      </a>
                      <a href="/expertise/qa-automation" onClick={closeNavigationMenus} className="flex items-center space-x-3 text-sm text-text-secondary hover:text-primary transition-colors font-medium py-1">
                        <CheckCircle className="w-4.5 h-4.5 text-primary" />
                        <span>QA & Test Automation</span>
                      </a>
                      <a href="/expertise/cloud-native" onClick={closeNavigationMenus} className="flex items-center space-x-3 text-sm text-text-secondary hover:text-primary transition-colors font-medium py-1">
                        <Layers className="w-4.5 h-4.5 text-primary" />
                        <span>Cloud-native Services</span>
                      </a>
                    </div>

                  </div>

                </div>
              </div>
            </div>

            {/* SOLUTIONS MEGA MENU */}
            {/* No `relative` here: the overlay below anchors to the fixed <nav>
                (nearest positioned ancestor), so `top-full` always hugs the nav's
                bottom edge regardless of its scrolled/unscrolled height. */}
            <div
              className="py-2"
              onMouseEnter={() => { setDesktopMegaOpen("solutions"); megaMenuHoveredRef.current = "solutions"; }}
              onMouseLeave={() => { megaMenuHoveredRef.current = null; setTimeout(() => { if (!megaMenuHoveredRef.current) setDesktopMegaOpen(null); }, 100); }}
            >
              <button
                className={navLinkClass("/solutions")}
                aria-haspopup="true"
                aria-expanded={desktopMegaOpen === "solutions"}
              >
                Solutions
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${desktopMegaOpen === "solutions" ? "rotate-180" : ""}`} />
                {currentPath.startsWith("/solutions") && (
                  <motion.div layoutId="nav-underline" className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary" />
                )}
              </button>

              {/* Full Width Mega Menu overlay */}
              <div
                onClick={closeNavigationMenus}
                onMouseEnter={() => { megaMenuHoveredRef.current = "solutions"; }}
                onMouseLeave={() => { megaMenuHoveredRef.current = null; }}
                className={`absolute top-full left-0 w-full h-[300px] overflow-hidden bg-surface/95 backdrop-blur-2xl border-b border-border shadow-2xl transition-all duration-300 z-50 py-6 px-8 md:px-14 ${desktopMegaOpen === "solutions"
                    ? "opacity-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 translate-y-2 pointer-events-none"
                  }`}>
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 h-full">

                  {/* Left sidebar container */}
                  <div className="lg:col-span-3 border-r border-border/80 pr-8 flex flex-col justify-between text-left space-y-6">
                    <div className="space-y-3">
                      <span className="text-[10px] font-mono tracking-widest text-primary uppercase font-bold">Solutions</span>
                      <h3 className="text-xl font-extrabold text-text-primary leading-snug">
                        AI mapped to your industry and business function
                      </h3>
                      <p className="text-xs text-text-secondary font-light leading-relaxed">
                        Outcome-focused solutions tailored to where you operate and what you need to move.
                      </p>
                    </div>
                    <a
                      href="/solutions"
                      onClick={closeNavigationMenus}
                      className="px-5 py-3 rounded-xl bg-primary hover:bg-primary/95 text-white font-bold text-xs uppercase tracking-wider inline-flex items-center justify-center space-x-2 w-fit transition-all"
                    >
                      <span>Explore solutions</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>

                  {/* Right, two columns: Industries and Business Functions */}
                  <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-2 gap-8 text-left">

                    {/* Industries */}
                    <div className="flex flex-col space-y-3">
                      <div className="flex items-center space-x-2 pb-1">
                        <Building2 className="w-4 h-4 text-primary" />
                        <span className="text-[10px] font-mono tracking-widest text-text-muted uppercase font-bold">By Industry</span>
                      </div>
                      {industries.map((s) => {
                        const Icon = s.icon;
                        return (
                          <a
                            key={s.slug}
                            href={`/solutions/${s.slug}`}
                            onClick={closeNavigationMenus}
                            className="flex items-center space-x-3 text-sm text-text-secondary hover:text-primary transition-colors font-medium py-1"
                          >
                            <Icon className="w-4.5 h-4.5 text-primary shrink-0" />
                            <span>{s.title}</span>
                          </a>
                        );
                      })}
                    </div>

                    {/* Business Functions */}
                    <div className="flex flex-col space-y-3">
                      <div className="flex items-center space-x-2 pb-1">
                        <Briefcase className="w-4 h-4 text-primary" />
                        <span className="text-[10px] font-mono tracking-widest text-text-muted uppercase font-bold">By Business Function</span>
                      </div>
                      {functions.map((s) => {
                        const Icon = s.icon;
                        return (
                          <a
                            key={s.slug}
                            href={`/solutions/${s.slug}`}
                            onClick={closeNavigationMenus}
                            className="flex items-center space-x-3 text-sm text-text-secondary hover:text-primary transition-colors font-medium py-1"
                          >
                            <Icon className="w-4.5 h-4.5 text-primary shrink-0" />
                            <span>{s.title}</span>
                          </a>
                        );
                      })}
                    </div>

                  </div>

                </div>
              </div>
            </div>

            {/* RESOURCES MEGA MENU */}
            {/* No `relative` here: the overlay below anchors to the fixed <nav>
                (nearest positioned ancestor), so `top-full` always hugs the nav's
                bottom edge regardless of its scrolled/unscrolled height. */}
            <div
              className="py-2"
              onMouseEnter={() => { setDesktopMegaOpen("resources"); megaMenuHoveredRef.current = "resources"; }}
              onMouseLeave={() => { megaMenuHoveredRef.current = null; setTimeout(() => { if (!megaMenuHoveredRef.current) setDesktopMegaOpen(null); }, 100); }}
            >
              <button
                className={navLinkClass("/resources")}
                aria-haspopup="true"
                aria-expanded={desktopMegaOpen === "resources"}
              >
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
                className={`absolute top-full left-0 w-full h-[300px] overflow-hidden bg-surface/95 backdrop-blur-2xl border-b border-border shadow-2xl transition-all duration-300 z-50 py-6 px-8 md:px-14 ${desktopMegaOpen === "resources"
                    ? "opacity-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 translate-y-2 pointer-events-none"
                  }`}>
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 h-full">

                  {/* Left sidebar */}
                  <div className="lg:col-span-3 border-r border-border/80 pr-8 flex flex-col justify-between text-left space-y-6">
                    <div className="space-y-3">
                      <span className="text-[10px] font-mono tracking-widest text-primary uppercase font-bold">Explore</span>
                      <h3 className="text-xl font-extrabold text-text-primary leading-snug">
                        Knowledge from the AI frontier
                      </h3>
                      <p className="text-xs text-text-secondary font-light leading-relaxed">
                        Practitioner insights, project deep-dives, and practical guides from our team.
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
                          Explore AI, ML and data projects our team has delivered, real problems, real measurable outcomes.
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-auto">
                        {["AI/ML", "Predictive", "GenAI", "Automation"].map(tag => (
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
                          Practical thinking on AI engineering, data science, and intelligent automation, written by the people who build it.
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-auto">
                        {["GenAI", "Analytics", "ML", "Automation"].map(tag => (
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
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={{
                hidden: { opacity: 0, height: 0 },
                visible: {
                  opacity: 1,
                  height: "auto",
                  transition: {
                    height: { duration: 0.2, ease: [0.22, 1, 0.36, 1] },
                    opacity: { duration: 0.14 },
                    staggerChildren: 0.015,
                    delayChildren: 0.01,
                  }
                },
                exit: {
                  opacity: 0,
                  height: 0,
                  transition: {
                    height: { duration: 0.16, ease: [0.22, 1, 0.36, 1] },
                    opacity: { duration: 0.12 },
                  }
                }
              }}
              className="lg:hidden w-full border-t border-border bg-surface/95 backdrop-blur-2xl absolute left-0 top-full overflow-hidden shadow-xl text-left"
            >
              <div className="px-6 py-8 space-y-4 flex flex-col max-h-[calc(100vh-5rem)] overflow-y-auto">
                <motion.a
                  variants={{
                    hidden: { opacity: 0, x: -8 },
                    visible: { opacity: 1, x: 0, transition: { duration: 0.16 } }
                  }}
                  href="/"
                  onClick={closeNavigationMenus}
                  className="text-base font-semibold text-text-secondary hover:text-primary py-1"
                >
                  Home
                </motion.a>

                {/* Mobile Services Collapsible */}
                <motion.div
                  variants={{
                    hidden: { opacity: 0, x: -8 },
                    visible: { opacity: 1, x: 0, transition: { duration: 0.16 } }
                  }}
                  className="space-y-1"
                >
                  <button
                    onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                    aria-haspopup="true"
                    aria-expanded={mobileServicesOpen}
                    className="w-full text-base font-semibold text-text-secondary hover:text-primary py-1 flex items-center justify-between"
                  >
                    <span>Services</span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileServicesOpen ? "rotate-180" : ""}`} />
                  </button>
                  {mobileServicesOpen && (
                    <div className="pl-4 flex flex-col space-y-3 pt-1 pb-2 border-l border-border/80">
                      <a href="/services/full-cycle-development" onClick={closeNavigationMenus} className="text-sm text-text-secondary hover:text-primary py-1">AI Product Development</a>
                      <a href="/services/team-augmentation" onClick={closeNavigationMenus} className="text-sm text-text-secondary hover:text-primary py-1">AI Team Augmentation</a>
                      <a href="/services/transformation-consulting" onClick={closeNavigationMenus} className="text-sm text-text-secondary hover:text-primary py-1">AI Transformation Consulting</a>
                      <a href="/services/concept-design" onClick={closeNavigationMenus} className="text-sm text-text-secondary hover:text-primary py-1">AI Product Concept & Design</a>
                      <div className="pt-2 mt-1 border-t border-border/70 flex flex-col space-y-2">
                        <span className="text-[10px] font-mono tracking-widest text-text-muted uppercase font-bold">AI accelerators</span>
                        {products.slice(0, 8).map((p) => (
                          <a key={p.slug} href={`/services/${p.slug}`} onClick={closeNavigationMenus} className="text-sm text-text-secondary hover:text-primary py-1 font-medium">{p.name}</a>
                        ))}
                        <a href="/services/full-cycle-development" onClick={closeNavigationMenus} className="text-sm text-primary hover:text-primary py-1 font-semibold">Explore AI product delivery</a>
                      </div>
                    </div>
                  )}
                </motion.div>

                {/* Mobile Expertise Collapsible */}
                <motion.div
                  variants={{
                    hidden: { opacity: 0, x: -8 },
                    visible: { opacity: 1, x: 0, transition: { duration: 0.16 } }
                  }}
                  className="space-y-1"
                >
                  <button
                    onClick={() => setMobileExpertiseOpen(!mobileExpertiseOpen)}
                    aria-haspopup="true"
                    aria-expanded={mobileExpertiseOpen}
                    className="w-full text-base font-semibold text-text-secondary hover:text-primary py-1 flex items-center justify-between"
                  >
                    <span>Expertise</span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileExpertiseOpen ? "rotate-180" : ""}`} />
                  </button>
                  {mobileExpertiseOpen && (
                    <div className="pl-4 flex flex-col space-y-2 pt-1 pb-2 border-l border-border/80">
                      <a href="/expertise/ai-ml" onClick={closeNavigationMenus} className="text-sm text-text-secondary hover:text-primary py-1 font-medium">AI & Machine Learning</a>
                      <a href="/expertise/generative-ai" onClick={closeNavigationMenus} className="text-sm text-text-secondary hover:text-primary py-1 font-medium">Generative AI & LLMs</a>
                      <a href="/expertise/big-data" onClick={closeNavigationMenus} className="text-sm text-text-secondary hover:text-primary py-1 font-medium">Data Science & Big Data</a>
                      <a href="/expertise/reengineering" onClick={closeNavigationMenus} className="text-sm text-text-secondary hover:text-primary py-1 font-medium">Modernization & Reengineering</a>
                      <a href="/expertise/web-mobile" onClick={closeNavigationMenus} className="text-sm text-text-secondary hover:text-primary py-1 font-medium">Web & Mobile Apps</a>
                      <a href="/expertise/devops-security" onClick={closeNavigationMenus} className="text-sm text-text-secondary hover:text-primary py-1 font-medium">DevOps & Security</a>
                      <a href="/expertise/support-maintenance" onClick={closeNavigationMenus} className="text-sm text-text-secondary hover:text-primary py-1 font-medium">Support & Maintenance</a>
                      <a href="/expertise/low-code" onClick={closeNavigationMenus} className="text-sm text-text-secondary hover:text-primary py-1 font-medium">Low-code / No-code</a>
                      <a href="/expertise/qa-automation" onClick={closeNavigationMenus} className="text-sm text-text-secondary hover:text-primary py-1 font-medium">QA & Test Automation</a>
                      <a href="/expertise/cloud-native" onClick={closeNavigationMenus} className="text-sm text-text-secondary hover:text-primary py-1 font-medium">Cloud-native Services</a>
                    </div>
                  )}
                </motion.div>

                {/* Mobile Solutions Collapsible */}
                <motion.div
                  variants={{
                    hidden: { opacity: 0, x: -8 },
                    visible: { opacity: 1, x: 0, transition: { duration: 0.16 } }
                  }}
                  className="space-y-1"
                >
                  <button
                    onClick={() => setMobileSolutionsOpen(!mobileSolutionsOpen)}
                    aria-haspopup="true"
                    aria-expanded={mobileSolutionsOpen}
                    className="w-full text-base font-semibold text-text-secondary hover:text-primary py-1 flex items-center justify-between"
                  >
                    <span>Solutions</span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileSolutionsOpen ? "rotate-180" : ""}`} />
                  </button>
                  {mobileSolutionsOpen && (
                    <div className="pl-4 flex flex-col space-y-3 pt-1 pb-2 border-l border-border/80">
                      <div className="flex flex-col space-y-2">
                        <span className="text-[10px] font-mono tracking-widest text-text-muted uppercase font-bold">By Industry</span>
                        {industries.map((s) => (
                          <a key={s.slug} href={`/solutions/${s.slug}`} onClick={closeNavigationMenus} className="text-sm text-text-secondary hover:text-primary py-1 font-medium">{s.title}</a>
                        ))}
                      </div>
                      <div className="flex flex-col space-y-2">
                        <span className="text-[10px] font-mono tracking-widest text-text-muted uppercase font-bold">By Business Function</span>
                        {functions.map((s) => (
                          <a key={s.slug} href={`/solutions/${s.slug}`} onClick={closeNavigationMenus} className="text-sm text-text-secondary hover:text-primary py-1 font-medium">{s.title}</a>
                        ))}
                      </div>
                      <a href="/solutions" onClick={closeNavigationMenus} className="text-sm text-primary hover:text-primary py-1 font-semibold">Explore all solutions</a>
                    </div>
                  )}
                </motion.div>

                {/* Mobile Resources Collapsible */}
                <motion.div
                  variants={{
                    hidden: { opacity: 0, x: -8 },
                    visible: { opacity: 1, x: 0, transition: { duration: 0.16 } }
                  }}
                  className="space-y-1"
                >
                  <button
                    onClick={() => setMobileResourcesOpen(!mobileResourcesOpen)}
                    aria-haspopup="true"
                    aria-expanded={mobileResourcesOpen}
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
                </motion.div>

                <motion.div
                  variants={{
                    hidden: { opacity: 0, x: -8 },
                    visible: { opacity: 1, x: 0, transition: { duration: 0.16 } }
                  }}
                  className="pt-4 border-t border-border"
                >
                  <a
                    href="/contact"
                    onClick={closeNavigationMenus}
                    className="w-full inline-flex items-center justify-center px-5 py-3 rounded-xl font-bold bg-primary text-white shadow-md"
                  >
                    Book Consultation
                  </a>
                </motion.div>
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
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
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
