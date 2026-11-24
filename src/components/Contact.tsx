import React, { useState } from 'react';
import { useScrollReveal, LetterRevealHeading } from '../lib/motion';
import { 
  Send, 
  CheckCircle, 
  Copy, 
  Check, 
  MapPin, 
  FileText,
  ArrowUpRight,
  AlertCircle
} from 'lucide-react';
import { Linkedin, Github, Twitter } from './Icons';
import confetti from 'canvas-confetti';
import { PERSONAL_INFO } from '../data/portfolioData';
import { trackEvent } from '../lib/analytics';

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
  _hp_company: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export const Contact: React.FC = () => {
  const { ref: sectionRef, isRevealed, prefersReducedMotion } = useScrollReveal<HTMLElement>({
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px',
    once: true,
  });
  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    subject: '',
    message: '',
    _hp_company: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const validate = (): boolean => {
    const errs: FormErrors = {};
    if (!formData.name.trim()) errs.name = 'Please provide your name.';
    if (!formData.email.trim()) {
      errs.email = 'Please provide your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please enter a valid email address.';
    }
    if (!formData.subject.trim()) errs.subject = 'Please add a subject.';
    if (!formData.message.trim()) {
      errs.message = 'Please include a brief message.';
    } else if (formData.message.trim().length < 10) {
      errs.message = 'Please provide at least 10 characters.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setServerError(null);

    try {
      let response: Response;
      try {
        response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            full_name: formData.name.trim(),
            email: formData.email.trim(),
            subject: formData.subject.trim(),
            message: formData.message.trim(),
            _hp_company: formData._hp_company.trim() || undefined,
          }),
        });
      } catch {
        throw new Error('Unable to reach the server. Please verify your connection or try again shortly.');
      }

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        if (response.status === 409) {
          throw new Error('An identical message was recently submitted. Please wait a few minutes before resubmitting.');
        } else if (response.status === 429) {
          throw new Error('Too many requests. Please wait a moment before sending another message.');
        } else {
          throw new Error(data.detail || 'Unable to deliver message right now. Please try again shortly.');
        }
      }

      setIsSubmitted(true);
      trackEvent('contact_submit', 'Direct Inquiry Form');

      try {
        confetti({
          particleCount: 45,
          spread: 55,
          origin: { y: 0.8 },
          colors: ['#E6A995', '#F2C4B5', '#2B1E30']
        });
      } catch {
        // decorative
      }

      setFormData({ name: '', email: '', subject: '', message: '', _hp_company: '' });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Something went wrong. Please try again.';
      setServerError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section 
      id="contact" 
      ref={sectionRef}
      className="py-20 sm:py-28 lg:py-32 relative bg-transparent border-t border-[#403044]/60 overflow-hidden scroll-mt-20 sm:scroll-mt-24 lg:scroll-mt-28"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div 
          className="mb-14 sm:mb-20 text-center max-w-4xl mx-auto transition-all duration-700"
          style={
            prefersReducedMotion
              ? undefined
              : {
                  opacity: isRevealed ? 1 : 0,
                  transform: isRevealed ? 'translateY(0)' : 'translateY(24px)',
                  transition: 'opacity 700ms cubic-bezier(0.16, 1, 0.3, 1), transform 700ms cubic-bezier(0.16, 1, 0.3, 1)',
                }
          }
        >
          <span className="text-[11px] uppercase tracking-[0.26em] font-sans font-medium text-[#E6A995] mb-3 block">
            GET IN TOUCH
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[52px] text-[#F7EFF4] font-bold tracking-tight mb-4 leading-tight">
            <LetterRevealHeading
              text="Let's Create Something Meaningful"
              isRevealed={isRevealed}
              accentChar="."
              prefersReducedMotion={prefersReducedMotion}
            />
          </h2>
          <p className="text-sm sm:text-base font-sans text-[#B3A2AE] font-normal">
            Have an idea, project or opportunity? Let's connect.
          </p>
        </div>

        {/* 2-Column Minimal Layout */}
        <div 
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start"
          style={
            prefersReducedMotion
              ? undefined
              : {
                  opacity: isRevealed ? 1 : 0,
                  transform: isRevealed ? 'translateY(0)' : 'translateY(28px)',
                  transition: 'opacity 800ms cubic-bezier(0.16, 1, 0.3, 1) 150ms, transform 800ms cubic-bezier(0.16, 1, 0.3, 1) 150ms',
                }
          }
        >
          
          {/* Left Column: Direct Info & Resume Card */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick Contact Details */}
            <div className="p-7 rounded-2xl bg-[#2B1E30]/70 border border-[#403044] space-y-4">
              <span className="text-[11px] font-sans uppercase tracking-wider text-[#E6A995] block mb-2">
                Direct Channels
              </span>

              {/* Email */}
              <div className="flex items-center justify-between pb-3 border-b border-[#403044]/60">
                <div>
                  <span className="text-[11px] font-mono text-[#8E7D8A] block">Email</span>
                  <a
                    href={`mailto:${PERSONAL_INFO.email}`}
                    className="text-sm font-sans text-[#F7EFF4] hover:text-[#E6A995] transition-colors"
                  >
                    {PERSONAL_INFO.email}
                  </a>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="p-2 rounded-lg bg-[#211725] hover:bg-[#37283E] text-[#B3A2AE] hover:text-[#E6A995] border border-[#403044] transition-colors"
                  title="Copy email to clipboard"
                  aria-label="Copy email"
                >
                  {copied ? <Check className="w-4 h-4 text-[#E6A995]" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Location */}
              <div className="flex items-center gap-3 pt-1">
                <div className="w-8 h-8 rounded-full bg-[#211725] border border-[#403044] flex items-center justify-center text-[#E6A995]">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-[#8E7D8A] block">Location</span>
                  <span className="text-xs sm:text-sm font-sans text-[#F7EFF4]">
                    {PERSONAL_INFO.location}
                  </span>
                </div>
              </div>
            </div>

            {/* Dedicated Resume Card (Section 10) */}
            <div className="p-5 min-[380px]:p-7 rounded-2xl bg-[#2B1E30]/70 border border-[#403044] flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-sans uppercase tracking-wider text-[#E6A995] block mb-1">
                  Curriculum Vitae
                </span>
                <h3 className="font-serif text-xl text-[#F7EFF4] font-semibold tracking-tight mb-2">
                  Verified Resume
                </h3>
                <p className="text-xs font-sans text-[#B3A2AE] leading-relaxed mb-5">
                  View the latest verified PDF covering academic history, technical proficiencies, and project architecture.
                </p>
              </div>

              <a
                href={PERSONAL_INFO.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('resume_download', 'Contact Section Card')}
                className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-full bg-[#E6A995] text-[#160F19] font-sans font-semibold text-xs hover:bg-[#D9907B] transition-all shadow-md min-h-[44px]"
              >
                <FileText className="w-4 h-4" />
                <span>View Resume</span>
              </a>
            </div>

          </div>

          {/* Right Column: Minimal Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-5 min-[380px]:p-7 sm:p-9 rounded-2xl bg-[#2B1E30] border border-[#403044]">
              <span className="text-[11px] font-sans uppercase tracking-wider text-[#E6A995] block mb-2">
                Send an Inquiry
              </span>
              <h3 className="font-serif text-2xl text-[#F7EFF4] font-semibold tracking-tight mb-6">
                Start a Conversation
              </h3>

              {isSubmitted ? (
                <div className="p-6 rounded-xl bg-[#211725] border border-[#403044] text-center space-y-3">
                  <div className="w-10 h-10 rounded-full bg-[#E6A995]/20 text-[#E6A995] flex items-center justify-center mx-auto">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                  <h4 className="font-serif text-xl text-[#F7EFF4]">Message Dispatched</h4>
                  <p className="text-xs font-sans text-[#B3A2AE] leading-relaxed">
                    Thank you for reaching out. I have received your note and will reply promptly.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="mt-3 px-4 py-1.5 rounded-full bg-[#2B1E30] border border-[#403044] text-xs font-sans text-[#E6A995] hover:border-[#E6A995]"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Invisible Spam Honeypot Field */}
                  <div className="hidden" aria-hidden="true" style={{ display: 'none' }}>
                    <label htmlFor="_hp_company">Company</label>
                    <input
                      id="_hp_company"
                      type="text"
                      name="_hp_company"
                      value={formData._hp_company}
                      onChange={(e) => setFormData({ ...formData, _hp_company: e.target.value })}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  {/* Submission Error Banner */}
                  {serverError && (
                    <div className="p-3.5 rounded-xl bg-[#211725] border border-[#E6A995]/50 flex items-start gap-2.5 text-xs text-[#E6A995]">
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>{serverError}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div>
                      <label className="block text-xs font-sans text-[#B3A2AE] mb-1.5">
                        Your Name
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Enter your full name"
                        className="w-full px-4 py-2.5 rounded-xl bg-[#211725] border border-[#403044] focus:border-[#E6A995] focus:outline-none text-xs font-sans text-[#F7EFF4] placeholder-[#8E7D8A] transition-colors"
                      />
                      {errors.name && (
                        <span className="text-[10px] text-[#E6A995] mt-1 block">{errors.name}</span>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-sans text-[#B3A2AE] mb-1.5">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="you@example.com"
                        className="w-full px-4 py-2.5 rounded-xl bg-[#211725] border border-[#403044] focus:border-[#E6A995] focus:outline-none text-xs font-sans text-[#F7EFF4] placeholder-[#8E7D8A] transition-colors"
                      />
                      {errors.email && (
                        <span className="text-[10px] text-[#E6A995] mt-1 block">{errors.email}</span>
                      )}
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-xs font-sans text-[#B3A2AE] mb-1.5">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="e.g. Internship Inquiry / Web Development Project"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#211725] border border-[#403044] focus:border-[#E6A995] focus:outline-none text-xs font-sans text-[#F7EFF4] placeholder-[#8E7D8A] transition-colors"
                    />
                    {errors.subject && (
                      <span className="text-[10px] text-[#E6A995] mt-1 block">{errors.subject}</span>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-sans text-[#B3A2AE] mb-1.5">
                      Message
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Share project context, technical scope or timeline..."
                      className="w-full px-4 py-2.5 rounded-xl bg-[#211725] border border-[#403044] focus:border-[#E6A995] focus:outline-none text-xs font-sans text-[#F7EFF4] placeholder-[#8E7D8A] transition-colors resize-none"
                    />
                    {errors.message && (
                      <span className="text-[10px] text-[#E6A995] mt-1 block">{errors.message}</span>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-full bg-[#E6A995] text-[#160F19] font-sans font-semibold text-xs hover:bg-[#D9907B] transition-all shadow-md disabled:opacity-50 min-h-[44px]"
                  >
                    {isSubmitting ? (
                      <span className="inline-block w-4 h-4 border-2 border-[#160F19] border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

        {/* Social Profiles: LET'S CONNECT */}
        <div 
          className="mt-14 sm:mt-16 pt-12 sm:pt-14 border-t border-[#403044]/60 transition-all duration-700"
          style={
            prefersReducedMotion
              ? undefined
              : {
                  opacity: isRevealed ? 1 : 0,
                  transform: isRevealed ? 'translateY(0)' : 'translateY(24px)',
                  transition: 'opacity 800ms cubic-bezier(0.16, 1, 0.3, 1) 300ms, transform 800ms cubic-bezier(0.16, 1, 0.3, 1) 300ms',
                }
          }
        >
          <div className="mb-8 text-center sm:text-left">
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#E6A995] block mb-1.5 font-medium">
              LET'S CONNECT
            </span>
            <p className="text-xs sm:text-sm font-sans text-[#B3A2AE]">
              Find me across the web.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {/* 1. GitHub Card */}
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 sm:p-5 rounded-2xl bg-[#211725] border border-[#403044] hover:border-[#E6A995]/60 hover:-translate-y-1 hover:shadow-[0_0_20px_-3px_rgba(230,169,149,0.35)] transition-all duration-300 group"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#160F19] border border-[#403044] group-hover:border-[#E6A995]/60 flex items-center justify-center text-[#B3A2AE] group-hover:text-[#E6A995] transition-colors shrink-0">
                  <Github className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="min-w-0">
                  <span className="font-serif text-base sm:text-lg text-[#F7EFF4] group-hover:text-[#E6A995] transition-colors block font-semibold tracking-tight truncate">
                    GitHub
                  </span>
                  <span className="text-xs font-sans text-[#B3A2AE] block truncate">
                    Explore my projects
                  </span>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-[#8E7D8A] group-hover:text-[#E6A995] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 ml-3" />
            </a>

            {/* 2. LinkedIn Card */}
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 sm:p-5 rounded-2xl bg-[#211725] border border-[#403044] hover:border-[#E6A995]/60 hover:-translate-y-1 hover:shadow-[0_0_20px_-3px_rgba(230,169,149,0.35)] transition-all duration-300 group"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#160F19] border border-[#403044] group-hover:border-[#E6A995]/60 flex items-center justify-center text-[#B3A2AE] group-hover:text-[#E6A995] transition-colors shrink-0">
                  <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="min-w-0">
                  <span className="font-serif text-base sm:text-lg text-[#F7EFF4] group-hover:text-[#E6A995] transition-colors block font-semibold tracking-tight truncate">
                    LinkedIn
                  </span>
                  <span className="text-xs font-sans text-[#B3A2AE] block truncate">
                    Connect professionally
                  </span>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-[#8E7D8A] group-hover:text-[#E6A995] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 ml-3" />
            </a>

            {/* 3. X Card */}
            <a
              href={PERSONAL_INFO.x}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 sm:p-5 rounded-2xl bg-[#211725] border border-[#403044] hover:border-[#E6A995]/60 hover:-translate-y-1 hover:shadow-[0_0_20px_-3px_rgba(230,169,149,0.35)] transition-all duration-300 group"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#160F19] border border-[#403044] group-hover:border-[#E6A995]/60 flex items-center justify-center text-[#B3A2AE] group-hover:text-[#E6A995] transition-colors shrink-0">
                  <Twitter className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="min-w-0">
                  <span className="font-serif text-base sm:text-lg text-[#F7EFF4] group-hover:text-[#E6A995] transition-colors block font-semibold tracking-tight truncate">
                    X
                  </span>
                  <span className="text-xs font-sans text-[#B3A2AE] block truncate">
                    Follow my updates
                  </span>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-[#8E7D8A] group-hover:text-[#E6A995] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 ml-3" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
