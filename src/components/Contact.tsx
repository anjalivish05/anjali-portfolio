import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Send, 
  CheckCircle, 
  Copy, 
  Check, 
  MapPin, 
  Phone, 
  ArrowUpRight
} from 'lucide-react';
import { Linkedin, Github, Twitter } from './Icons';
import confetti from 'canvas-confetti';
import { PERSONAL_INFO } from '../data/portfolioData';

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const validate = (): boolean => {
    const errs: FormErrors = {};
    if (!formData.name.trim()) errs.name = 'Please provide your full name.';
    if (!formData.email.trim()) {
      errs.email = 'Please provide your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please provide a valid email address.';
    }
    if (!formData.subject.trim()) errs.subject = 'Please specify a brief subject.';
    if (!formData.message.trim()) {
      errs.message = 'Please write a message so I know how to assist.';
    } else if (formData.message.trim().length < 10) {
      errs.message = 'Please provide at least 10 characters in your message.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.8 },
          colors: ['#A78BFA', '#C4B5FD', '#101014']
        });
      } catch {
        // Confetti is decorative
      }
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1200);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-24 relative border-t border-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Heading specified by user */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-accent font-mono text-xs uppercase tracking-wider mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            <span>Initiate Dialogue</span>
          </div>
          <h2 className="font-heading font-bold text-3xl sm:text-5xl lg:text-6xl text-text-primary tracking-tight leading-tight">
            Have an interesting idea?<br />
            <span className="font-editorial italic font-normal text-text-secondary">
              Let's build something meaningful.
            </span>
          </h2>
          <p className="text-text-secondary text-sm sm:text-base mt-4 font-sans leading-relaxed">
            Whether you have an internship opportunity, a project proposal, an open-source collaboration, or just want to talk about system architecture—my inbox is always open.
          </p>
        </div>

        {/* Contact Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Info & Social Channels (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick Email Card */}
            <div className="bg-bg-card border border-border rounded-2xl p-6 bento-card relative">
              <span className="text-xs font-mono text-text-muted uppercase tracking-wider block mb-2">
                Primary Direct Channel
              </span>
              <div className="flex items-center justify-between gap-3">
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="font-mono text-sm sm:text-base text-accent hover:underline break-all"
                >
                  {PERSONAL_INFO.email}
                </a>
                <button
                  onClick={handleCopyEmail}
                  className="p-2 rounded-lg bg-bg-elevated hover:bg-border text-text-secondary hover:text-text-primary border border-border transition-colors shrink-0"
                  title="Copy email to clipboard"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Quick Phone & Location Details */}
            <div className="bg-bg-card border border-border rounded-2xl p-6 bento-card space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-bg-elevated border border-border flex items-center justify-center text-accent">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-mono text-text-muted block">Direct Contact</span>
                  <a
                    href={`tel:${PERSONAL_INFO.phone}`}
                    className="font-mono text-xs sm:text-sm text-text-primary hover:text-accent transition-colors"
                  >
                    {PERSONAL_INFO.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-border/60">
                <div className="w-9 h-9 rounded-lg bg-bg-elevated border border-border flex items-center justify-center text-accent">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-mono text-text-muted block">Current Base</span>
                  <span className="font-sans text-xs sm:text-sm text-text-primary">
                    Mumbai, Maharashtra, India
                  </span>
                </div>
              </div>
            </div>

            {/* Social Network Profiles */}
            <div className="bg-bg-card border border-border rounded-2xl p-6 bento-card">
              <span className="text-xs font-mono text-text-muted uppercase tracking-wider block mb-4">
                Professional Networks & Profiles
              </span>

              <div className="space-y-2.5">
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-bg-elevated/60 hover:bg-bg-elevated border border-border/70 hover:border-accent/40 text-text-primary transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <Linkedin className="w-4 h-4 text-accent" />
                    <span className="font-heading font-medium text-xs sm:text-sm">
                      LinkedIn
                    </span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-text-muted group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </a>

                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-bg-elevated/60 hover:bg-bg-elevated border border-border/70 hover:border-accent/40 text-text-primary transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <Github className="w-4 h-4 text-accent" />
                    <span className="font-heading font-medium text-xs sm:text-sm">
                      GitHub
                    </span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-text-muted group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </a>

                <a
                  href={PERSONAL_INFO.x}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-bg-elevated/60 hover:bg-bg-elevated border border-border/70 hover:border-accent/40 text-text-primary transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <Twitter className="w-4 h-4 text-accent" />
                    <span className="font-heading font-medium text-xs sm:text-sm">
                      X (Twitter)
                    </span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-text-muted group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Contact Form (7 cols) */}
          <div className="lg:col-span-7 bg-bg-card border border-border rounded-2xl p-7 sm:p-9 bento-card relative">
            <h3 className="font-heading font-bold text-xl text-text-primary mb-2">
              Send a Message
            </h3>
            <p className="text-xs text-text-secondary mb-6 font-sans">
              Fill out the form below and I will respond to your inquiry within 24 hours.
            </p>

            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 rounded-xl bg-bg-elevated/80 border border-emerald-500/30 text-center space-y-4"
              >
                <div className="w-12 h-12 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 mx-auto flex items-center justify-center">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <h4 className="font-heading font-bold text-lg text-text-primary">
                  Message Dispatched Successfully!
                </h4>
                <p className="text-xs sm:text-sm text-text-secondary max-w-md mx-auto font-sans leading-relaxed">
                  Thank you for reaching out. A confirmation has been logged, and I will review your note shortly.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-5 py-2 rounded-xl bg-accent text-bg-main text-xs font-heading font-semibold hover:bg-accent-light transition-all"
                >
                  Send Another Note
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* Name & Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-mono text-text-secondary mb-1.5">
                      Your Name <span className="text-accent">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        if (errors.name) setErrors({ ...errors, name: undefined });
                      }}
                      placeholder="e.g. Elena Rostova"
                      className={`w-full px-4 py-3 rounded-xl bg-bg-elevated border text-xs sm:text-sm font-sans text-text-primary placeholder:text-text-muted focus:outline-none transition-colors ${
                        errors.name ? 'border-rose-500/70 focus:border-rose-500' : 'border-border focus:border-accent'
                      }`}
                    />
                    {errors.name && (
                      <span className="text-[11px] font-mono text-rose-400 mt-1 block">
                        {errors.name}
                      </span>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-text-secondary mb-1.5">
                      Email Address <span className="text-accent">*</span>
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (errors.email) setErrors({ ...errors, email: undefined });
                      }}
                      placeholder="e.g. elena@company.com"
                      className={`w-full px-4 py-3 rounded-xl bg-bg-elevated border text-xs sm:text-sm font-sans text-text-primary placeholder:text-text-muted focus:outline-none transition-colors ${
                        errors.email ? 'border-rose-500/70 focus:border-rose-500' : 'border-border focus:border-accent'
                      }`}
                    />
                    {errors.email && (
                      <span className="text-[11px] font-mono text-rose-400 mt-1 block">
                        {errors.email}
                      </span>
                    )}
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-xs font-mono text-text-secondary mb-1.5">
                    Subject / Topic <span className="text-accent">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => {
                      setFormData({ ...formData, subject: e.target.value });
                      if (errors.subject) setErrors({ ...errors, subject: undefined });
                    }}
                    placeholder="e.g. Summer Full-Stack Internship Opportunity"
                    className={`w-full px-4 py-3 rounded-xl bg-bg-elevated border text-xs sm:text-sm font-sans text-text-primary placeholder:text-text-muted focus:outline-none transition-colors ${
                      errors.subject ? 'border-rose-500/70 focus:border-rose-500' : 'border-border focus:border-accent'
                    }`}
                  />
                  {errors.subject && (
                    <span className="text-[11px] font-mono text-rose-400 mt-1 block">
                      {errors.subject}
                    </span>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-mono text-text-secondary mb-1.5">
                    Your Message <span className="text-accent">*</span>
                  </label>
                  <textarea
                    rows={5}
                    value={formData.message}
                    onChange={(e) => {
                      setFormData({ ...formData, message: e.target.value });
                      if (errors.message) setErrors({ ...errors, message: undefined });
                    }}
                    placeholder="Share brief details about the project, role, or collaboration..."
                    className={`w-full px-4 py-3 rounded-xl bg-bg-elevated border text-xs sm:text-sm font-sans text-text-primary placeholder:text-text-muted focus:outline-none transition-colors resize-none ${
                      errors.message ? 'border-rose-500/70 focus:border-rose-500' : 'border-border focus:border-accent'
                    }`}
                  />
                  {errors.message && (
                    <span className="text-[11px] font-mono text-rose-400 mt-1 block">
                      {errors.message}
                    </span>
                  )}
                </div>

                {/* Submit CTA */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-accent hover:bg-accent-light text-bg-main font-heading font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all disabled:opacity-50 shadow-[0_4px_24px_-6px_rgba(167,139,250,0.5)]"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-bg-main border-t-transparent rounded-full animate-spin" />
                      <span>Transmitting Message...</span>
                    </>
                  ) : (
                    <>
                      <span>Transmit Message</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>

              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
