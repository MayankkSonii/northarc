import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowRight,
  MapPin,
  Mail,
  Phone,
  Clock,
  Check,
  Send
} from "lucide-react";
import { SERVICES } from "../data";
import { useSEO, SITE_URL, SITE_NAME } from "../lib/seo";

export default function Contact() {
  useSEO({
    title: "Contact Us - Book an AI Consultation",
    description:
      "Book an AI consulting and automation consultation with NorthArc in Ahmedabad. Our solutions desk responds within 24 business hours to map your roadmap.",
    path: "/contact",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        name: "Contact NorthArc",
        url: `${SITE_URL}/contact`,
        description:
          "Book an AI consulting and intelligent automation consultation with NorthArc. Based in Ahmedabad, responding within 24 business hours.",
      },
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: SITE_NAME,
        url: SITE_URL,
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "sales",
          email: "solutions@northarc.in",
          telephone: "+91-88499-69336",
          areaServed: "IN",
        },
      },
    ],
  });

  const [formData, setFormData] = useState({
    fullName: "",
    businessEmail: "",
    companyName: "",
    phoneNumber: "",
    serviceInterest: "",
    projectRequirements: "",
    website: "" // honeypot, real users never fill this; server rejects non-empty
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors(prev => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};

    if (!formData.fullName.trim()) errors.fullName = "Full Name is required";
    if (!formData.businessEmail.trim()) {
      errors.businessEmail = "Business Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.businessEmail)) {
      errors.businessEmail = "Please enter a valid email address";
    }
    if (!formData.companyName.trim()) errors.companyName = "Company Name is required";
    if (!formData.serviceInterest) errors.serviceInterest = "Please select a service";

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    fetch('/api/inquiry', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        name: formData.fullName,
        email: formData.businessEmail,
        company: formData.companyName,
        phone: formData.phoneNumber,
        service: formData.serviceInterest,
        requirement: formData.projectRequirements,
        website: formData.website,
      }),
    })
      .then(async (res) => {
        const data = await res.json().catch(() => ({}));
        if (res.ok) {
          setIsSubmitting(false);
          setFormSubmitted(true);
          setFormData({
            fullName: "",
            businessEmail: "",
            companyName: "",
            phoneNumber: "",
            serviceInterest: "",
            projectRequirements: "",
            website: ""
          });
        } else {
          const errorMsg = data.error || (data.errors && data.errors.map((e: any) => e.message).join(', ')) || "Submission failed. Please try again.";
          throw new Error(errorMsg);
        }
      })
      .catch((err) => {
        setIsSubmitting(false);
        setSubmitError(err.message || "An unexpected error occurred. Please try again.");
      });
  };

  return (
    <div className="bg-bg min-h-screen text-text-primary relative overflow-hidden font-sans pt-24">
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-15%] w-[45vw] h-[45vw] rounded-full bg-gradient-to-tr from-primary/10 to-secondary/15 blur-[120px] animate-float-slow"></div>
        <div className="absolute bottom-[-10%] right-[-15%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-br from-glow/10 to-secondary/10 blur-[130px] animate-float-delay"></div>
      </div>

      <section className="section-padding bg-surface/30 border-t border-border relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 text-left">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

            {/* Left Info Column */}
            <div className="lg:col-span-5 space-y-10 lg:sticky lg:top-32">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="space-y-4"
              >
                <span className="text-xs font-bold uppercase tracking-widest text-primary font-mono block">RESERVE CONSULTATION</span>
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight font-display text-text-primary leading-[1.1]">
                  Book a Consultation
                </h2>
                <p className="text-base text-text-secondary font-light leading-relaxed">
                  Partner with specialized systems engineers to audit your data bottlenecks and deploy robust, high-yielding architectures.
                </p>
              </motion.div>

              <div className="space-y-6 pt-4">
                {[
                  { icon: MapPin, title: "Headquarters", content: "Ahmedabad, Gujarat", accent: "text-primary" },
                  { icon: Mail, title: "Solutions Desk", content: <a href="mailto:solutions@northarc.in" className="text-primary hover:underline">solutions@northarc.in</a>, accent: "text-secondary" },
                  { icon: Phone, title: "Direct Line", content: <a href="tel:+918849969336" className="hover:text-text-primary transition-colors">+91 88499 69336</a>, accent: "text-glow" },
                  { icon: Clock, title: "Guaranteed Response", content: "Within 24 business hours", accent: "text-text-muted" }
                ].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: idx * 0.1 }}
                      className="flex items-start space-x-4 group"
                    >
                      <div className={`p-3.5 rounded-2xl bg-surface border border-border ${item.accent} shadow-md group-hover:scale-[1.05] transition-all duration-300 shrink-0`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="pt-1">
                        <h4 className="text-sm font-bold text-text-primary">{item.title}</h4>
                        <p className="text-sm text-text-secondary mt-0.5 font-light">{item.content}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Right Contact Form Column */}
            <div className="lg:col-span-7">
              <div className="rounded-3xl bg-surface border border-border p-8 lg:p-10 relative overflow-hidden shadow-xl">
                <div className="absolute inset-0 grid-bg opacity-20"></div>

                <AnimatePresence mode="wait">
                  {formSubmitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center py-12 space-y-6 relative z-10"
                    >
                      <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 text-primary flex items-center justify-center mx-auto shadow-lg">
                        <Check className="w-8 h-8" />
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-2xl font-bold font-display tracking-tight text-text-primary">
                          Consultation Requested
                        </h3>
                        <p className="text-sm text-text-secondary font-light max-w-md mx-auto leading-relaxed">
                          Thank you for reaching out to NorthArc. Our specialized solutions desk will review your requirements and respond within 24 business hours.
                        </p>
                      </div>

                      <button
                        onClick={() => setFormSubmitted(false)}
                        className="px-6 py-3 rounded-xl bg-primary hover:bg-primary/90 text-text-primary font-semibold text-sm transition-all"
                      >
                        Submit Another Consultation
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      onSubmit={handleFormSubmit}
                      className="space-y-6 relative z-10"
                    >
                      {/*
                        Honeypot anti-spam field. Kept off-screen (not display:none, which
                        many bots detect) and out of the tab/accessibility tree. Real users
                        never see or fill it; the server rejects submissions where it is
                        non-empty.
                      */}
                      <input
                        type="text"
                        id="website"
                        name="website"
                        value={formData.website}
                        onChange={handleInputChange}
                        tabIndex={-1}
                        autoComplete="off"
                        aria-hidden="true"
                        style={{
                          position: "absolute",
                          left: "-9999px",
                          top: "auto",
                          width: "1px",
                          height: "1px",
                          overflow: "hidden"
                        }}
                      />

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label htmlFor="fullName" className="text-xs font-bold uppercase tracking-wider text-text-muted block text-left">
                            Full Name *
                          </label>
                          <input
                            id="fullName"
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            placeholder="John Doe"
                            className={`w-full bg-surface-elevated/45 border-b border-border hover:border-primary/50 focus:border-primary px-1.5 py-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none transition-colors ${
                              formErrors.fullName ? "border-red-500" : ""
                            }`}
                          />
                          {formErrors.fullName && (
                            <p className="text-xs text-red-500 font-medium text-left">{formErrors.fullName}</p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <label htmlFor="businessEmail" className="text-xs font-bold uppercase tracking-wider text-text-muted block text-left">
                            Business Email *
                          </label>
                          <input
                            id="businessEmail"
                            type="email"
                            name="businessEmail"
                            value={formData.businessEmail}
                            onChange={handleInputChange}
                            placeholder="john@company.com"
                            className={`w-full bg-surface-elevated/45 border-b border-border hover:border-primary/50 focus:border-primary px-1.5 py-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none transition-colors ${
                              formErrors.businessEmail ? "border-red-500" : ""
                            }`}
                          />
                          {formErrors.businessEmail && (
                            <p className="text-xs text-red-500 font-medium text-left">{formErrors.businessEmail}</p>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label htmlFor="companyName" className="text-xs font-bold uppercase tracking-wider text-text-muted block text-left">
                            Company Name *
                          </label>
                          <input
                            id="companyName"
                            type="text"
                            name="companyName"
                            value={formData.companyName}
                            onChange={handleInputChange}
                            placeholder="Acme Corp"
                            className={`w-full bg-surface-elevated/45 border-b border-border hover:border-primary/50 focus:border-primary px-1.5 py-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none transition-colors ${
                              formErrors.companyName ? "border-red-500" : ""
                            }`}
                          />
                          {formErrors.companyName && (
                            <p className="text-xs text-red-500 font-medium text-left">{formErrors.companyName}</p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <label htmlFor="phoneNumber" className="text-xs font-bold uppercase tracking-wider text-text-muted block text-left">
                            Phone Number
                          </label>
                          <input
                            id="phoneNumber"
                            type="tel"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleInputChange}
                            placeholder="+91 1234567890"
                            className="w-full bg-surface-elevated/45 border-b border-border hover:border-primary/50 focus:border-primary px-1.5 py-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none transition-colors"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="serviceInterest" className="text-xs font-bold uppercase tracking-wider text-text-muted block text-left">
                          Service Interest *
                        </label>
                        <select
                          id="serviceInterest"
                          name="serviceInterest"
                          value={formData.serviceInterest}
                          onChange={handleInputChange}
                          className={`w-full bg-surface-elevated/45 border-b border-border hover:border-primary/50 focus:border-primary px-1.5 py-3 text-sm text-text-primary focus:outline-none transition-colors ${
                            formErrors.serviceInterest ? "border-red-500" : ""
                          }`}
                        >
                          <option value="">Select Service Area</option>
                          {SERVICES.map((s, i) => (
                            <option key={i} value={s.title}>{s.title}</option>
                          ))}
                        </select>
                        {formErrors.serviceInterest && (
                          <p className="text-xs text-red-500 font-medium text-left">{formErrors.serviceInterest}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="projectRequirements" className="text-xs font-bold uppercase tracking-wider text-text-muted block text-left">
                          Project Requirements
                        </label>
                        <textarea
                          id="projectRequirements"
                          name="projectRequirements"
                          value={formData.projectRequirements}
                          onChange={handleInputChange}
                          rows={4}
                          placeholder="Tell us about your pipeline bottlenecks, available model data, or targeted automation metrics..."
                          className="w-full bg-surface-elevated/45 border-b border-border hover:border-primary/50 focus:border-primary px-1.5 py-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none transition-colors resize-none text-left"
                        ></textarea>
                      </div>

                      {submitError && (
                        <p className="text-sm text-red-500 font-medium text-left">{submitError}</p>
                      )}

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-4 rounded-full font-bold bg-primary hover:bg-transparent border border-primary text-text-primary hover:text-primary transition-all duration-300 flex items-center justify-center space-x-2.5 text-base disabled:opacity-75 disabled:cursor-not-allowed cursor-pointer"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin"></div>
                            <span>Sending request...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5" />
                            <span>Book a Consultation</span>
                          </>
                        )}
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>

              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
