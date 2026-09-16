"use client";

import { useState, useEffect, useRef } from "react";
import { Space_Grotesk } from "next/font/google";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  ArrowDown,
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  MapPin,
  Code2,
  Briefcase,
  GraduationCap,
  Star,
  Send,
  ChevronUp,
  Menu,
  X,
  Terminal,
  Globe,
  Database,
  Smartphone,
  Palette,
  Server,
  GitBranch,
  Layers,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

/* ─────────────────────────── Type system ─────────────────────────── */
/* One display face for headings, system sans for body. Swap the weight
   list if you don't need all three. */
const heading = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

/* ────────────────────────────── Data ────────────────────────────── */

const NAV_ITEMS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const SKILLS = [
  // Languages
  { name: "PHP", icon: Code2, category: "Languages" },
  { name: "JavaScript", icon: Code2, category: "Languages" },
  { name: "TypeScript", icon: Code2, category: "Languages" },
  { name: "Dart", icon: Code2, category: "Languages" },

  // Frontend
  { name: "Vue.js", icon: Globe, category: "Frontend" },
  { name: "Next.js", icon: Globe, category: "Frontend" },
  { name: "React", icon: Globe, category: "Frontend" },
  { name: "Tailwind CSS", icon: Palette, category: "Frontend" },
  { name: "HTML5", icon: Globe, category: "Frontend" },
  { name: "CSS3", icon: Palette, category: "Frontend" },

  // Backend
  { name: "Laravel", icon: Server, category: "Backend" },
  { name: "REST API", icon: Server, category: "Backend" },
  { name: "MySQL", icon: Database, category: "Backend" },
  { name: "PostgreSQL", icon: Database, category: "Backend" },

  // Mobile
  { name: "Flutter", icon: Smartphone, category: "Mobile" },

  // Tools & DevOps
  { name: "Git", icon: GitBranch, category: "DevOps" },
  { name: "Docker", icon: Server, category: "DevOps" },
  { name: "Linux", icon: Layers, category: "DevOps" },
  { name: "CI/CD", icon: GitBranch, category: "DevOps" },
];

const SKILL_CATEGORIES = [
  "Languages",
  "Frontend",
  "Backend",
  "Mobile",
  "DevOps",
];

const STATS = [
  { label: "Years experience", value: "2+" },
  { label: "Projects shipped", value: "4+" },
  { label: "Open source contrib.", value: "120+" },
  { label: "GitHub stars", value: "1K" },
];

const EXPERIENCES = [
  {
    title: "Full-Stack Developer",
    company: "Calmette Hospital",
    period: "2026 — Present",
    description:
      "Working as a Full-Stack Developer responsible for developing and maintaining internal healthcare management systems and web applications. Building scalable solutions using Laravel, Vue.js, Next.js, and Flutter while collaborating with cross-functional teams to improve operational efficiency and user experience.",
    tech: ["Laravel", "Vue.js", "Next.js", "Flutter", "MySQL"],
  },
  {
    title: "Full-Stack Developer",
    company: "CamCyber Digital Tech Team",
    period: "2024 — 2026",
    description:
      "Developed and maintained multiple web and mobile applications for government and enterprise projects. Contributed to both frontend and backend development, designed RESTful APIs, optimized database performance, and delivered production-ready solutions using modern development practices.",
    tech: ["Laravel", "Vue.js", "Next.js", "Flutter", "PostgreSQL"],
  },
];

const PROJECTS = [
  {
    title: "HRM (Human Resource Management)",
    description:
      "A comprehensive Human Resource Management system designed to streamline employee management, attendance tracking, leave requests, payroll processing, and organizational workflows. Contributed to both frontend and backend development while ensuring a smooth user experience and scalable architecture.",
    tech: ["Laravel", "Vue.js", "MySQL", "REST API"],
    icon: Briefcase,
    accent: "cyan",
    image: "/projects/hrm.png",
    link: "#",
    github: "#",
  },
  {
    title: "CCN Mobile",
    description:
      "A cross-platform mobile application developed to provide users with seamless access to digital services and real-time information. Focused on performance optimization, responsive UI implementation, and API integration for a reliable mobile experience.",
    tech: ["Flutter", "Laravel", "REST API"],
    icon: Smartphone,
    accent: "violet",
    image: "/projects/ccn-mobile.png",
    link: "#",
    github: "#",
  },
  {
    title: "Pintel (POS System)",
    description:
      "A Point of Sale system built to help businesses manage sales transactions, inventory, customer records, and reporting. Developed key modules for transaction processing, inventory management, and dashboard analytics to improve business operations.",
    tech: ["Laravel", "Vue.js", "MySQL"],
    icon: Database,
    accent: "amber",
    image: "/projects/pintel.png",
    link: "#",
    github: "#",
  },
  {
    title: "News Mobile",
    description:
      "A mobile news application that delivers the latest articles and updates through an intuitive and user-friendly interface. Implemented content management integration, category filtering, push notifications, and responsive mobile experiences.",
    tech: ["Flutter", "Laravel", "API Integration"],
    icon: Globe,
    accent: "rose",
    image: "/projects/news-mobile.png",
    link: "#",
    github: "#",
  },
];

const ACCENT_STYLES: Record<
  string,
  { tile: string; icon: string; ring: string }
> = {
  cyan: {
    tile: "from-cyan-500/10 to-blue-500/10",
    icon: "bg-cyan-600",
    ring: "group-hover:border-cyan-300",
  },
  violet: {
    tile: "from-violet-500/10 to-purple-500/10",
    icon: "bg-violet-600",
    ring: "group-hover:border-violet-300",
  },
  amber: {
    tile: "from-amber-500/10 to-orange-500/10",
    icon: "bg-amber-600",
    ring: "group-hover:border-amber-300",
  },
  rose: {
    tile: "from-rose-500/10 to-pink-500/10",
    icon: "bg-rose-600",
    ring: "group-hover:border-rose-300",
  },
};

/* Kept for later use — re-enable the <TestimonialsSection /> in Home()
   and add "Testimonials" back into NAV_ITEMS if you want this live. */
const TESTIMONIALS = [
  {
    name: "Sarah Chen",
    role: "CTO, TechForward Inc.",
    content:
      "An exceptional engineer who consistently delivers beyond expectations. Their architectural decisions transformed our platform's performance, and their mentorship elevated our entire team's output.",
    avatar: "SC",
  },
  {
    name: "Marcus Rivera",
    role: "Product Lead, DataVista Labs",
    content:
      "One of the most reliable developers I've worked with. They have an incredible ability to translate complex business requirements into elegant, maintainable code.",
    avatar: "MR",
  },
  {
    name: "Emily Nakamura",
    role: "Design Director, CreativePixel",
    content:
      "A developer who truly understands design intent. Every pixel-perfect implementation matched our specs flawlessly, and they proactively suggested UX improvements.",
    avatar: "EN",
  },
];

/* ──────────────────────── Animation helpers ──────────────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
};

function Section({
  children,
  id,
  className = "",
}: {
  children: React.ReactNode;
  id?: string;
  className?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.section
      ref={ref}
      id={id}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={stagger}
      className={`px-6 py-20 md:px-12 lg:px-24 ${className}`}
    >
      {children}
    </motion.section>
  );
}

/* Small structural marker used above each section heading — a rule and
   a label, standing in for a numbered step only where content is one. */
function Eyebrow({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <span className="h-px w-8 bg-cyan-600" aria-hidden="true" />
      <span className="text-sm font-medium text-cyan-700">{label}</span>
    </div>
  );
}

/* ──────────────────────────── Components ──────────────────────────── */

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-lg border-b border-border/50 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className={`${heading.className} text-lg font-semibold tracking-tight hover:opacity-70 transition-opacity`}
        >
          <span className="text-cyan-600">&lt;</span>
          Phat.dev
          <span className="text-cyan-600">/&gt;</span>
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.href}
              onClick={() => handleClick(item.href)}
              className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-accent"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 hover:bg-accent rounded-md"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/95 backdrop-blur-lg border-b border-border/50 overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleClick(item.href)}
                  className="px-3 py-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-accent text-left"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:60px_60px] dark:bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)]" />

      <div className="relative max-w-4xl mx-auto text-center">
        {/* Profile photo — replace /profile.jpg in /public with your own headshot */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-6 flex justify-center"
        >
          <Avatar className="h-70 w-70 ring-4 ring-cyan-100 dark:ring-cyan-950 shadow-sm">
            <AvatarImage src="/profile.jpg" alt="Sophat Roeun" />
            <AvatarFallback className="bg-cyan-600 text-white text-xl font-semibold">
              SR
            </AvatarFallback>
          </Avatar>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Badge
            variant="secondary"
            className="mb-6 px-4 py-1.5 text-sm font-medium"
          >
            <span className="mr-2 inline-block h-2 w-2 rounded-full bg-cyan-500 animate-pulse" />
            Available for opportunities
          </Badge>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className={`${heading.className} text-4xl sm:text-5xl md:text-7xl font-semibold tracking-tight mb-6`}
        >
          Hi, I&apos;m{" "}
          <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
            Sophat Roeun
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-4"
        >
          Full-Stack Engineer crafting performant, elegant digital experiences.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-8"
        >
          <MapPin size={14} />
          <span>Phnom Penh, Cambodia</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-12"
        >
          <Button
            size="lg"
            onClick={() =>
              document
                .querySelector("#contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            <Mail className="mr-2 h-4 w-4" />
            Get in Touch
          </Button>
          <Button variant="outline" size="lg" asChild>
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                document
                  .querySelector("#projects")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <Code2 className="mr-2 h-4 w-4" />
              View Projects
            </a>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex items-center justify-center gap-4"
        >
          <Button variant="ghost" size="icon" asChild>
            <a
              href="https://github.com/SopattRouen"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <a
              href="https://www.linkedin.com/in/sophat-roeun-289788336"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <a href="mailto:sophatroeun148@gmail.com" aria-label="Email">
              <Mail className="h-5 w-5" />
            </a>
          </Button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown className="h-5 w-5 text-muted-foreground" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <Section id="about">
      <div className="max-w-6xl mx-auto">
        <motion.div variants={fadeUp} className="mb-12">
          <Eyebrow label="About" />
          <h2 className={`${heading.className} text-3xl md:text-4xl font-semibold tracking-tight`}>
            A bit about me
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-12 items-start">
          <motion.div variants={fadeUp} className="md:col-span-2 space-y-5">
            <p className="text-muted-foreground leading-relaxed text-lg">
              I&apos;m a Full-Stack Developer with 2+ years of professional
              experience building modern web and mobile applications.
              Currently, I work as a Full-Stack Developer, transforming ideas
              into scalable, user-friendly solutions using Laravel, Vue.js,
              Next.js, and Flutter. I enjoy creating applications that are not
              only functional but also deliver a seamless experience for
              users.
            </p>

            <p className="text-muted-foreground leading-relaxed text-lg">
              My experience covers both frontend and backend development,
              allowing me to build complete products from concept to
              deployment. Whether it&apos;s developing secure APIs with
              Laravel, crafting responsive interfaces with Vue.js and Next.js,
              or building cross-platform mobile applications with Flutter, I
              focus on writing clean, maintainable, and high-performance code
              that solves real-world problems.
            </p>

            <p className="text-muted-foreground leading-relaxed text-lg">
              Currently, I am managing and contributing to four active
              projects, which has strengthened my ability to handle complex
              requirements, collaborate effectively, and deliver quality
              solutions on time. I&apos;m passionate about continuous
              learning, exploring emerging technologies, and improving my
              skills to build better software and create meaningful digital
              experiences.
            </p>

            {/* Stats — a plain row instead of a grid of boxed cards */}
            <div className="flex flex-wrap gap-x-8 gap-y-4 pt-4">
              {STATS.map((stat, i) => (
                <div
                  key={stat.label}
                  className={i > 0 ? "pl-8 border-l border-border" : ""}
                >
                  <p className={`${heading.className} text-2xl font-semibold text-cyan-700`}>
                    {stat.value}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={fadeUp}>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-3">
                  <Terminal className="h-5 w-5 text-cyan-600" />
                  <span className="text-sm font-medium">Quick facts</span>
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>Based in Phnom Penh, Cambodia</li>
                  <li>Open to remote & hybrid roles</li>
                  <li>Conference speaker (3 events)</li>
                  <li>Open-source maintainer</li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}

function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const filtered = activeCategory
    ? SKILLS.filter((s) => s.category === activeCategory)
    : SKILLS;

  return (
    <Section id="skills" className="bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <motion.div variants={fadeUp} className="mb-12">
          <Eyebrow label="Skills" />
          <h2 className={`${heading.className} text-3xl md:text-4xl font-semibold tracking-tight`}>
            Technologies I work with
          </h2>
          <p className="text-muted-foreground mt-3 max-w-2xl">
            I&apos;ve worked across the full stack, from crafting pixel-perfect
            interfaces to designing distributed backend systems. Here are the
            tools and technologies I use day-to-day.
          </p>
        </motion.div>

        <motion.div variants={fadeUp} className="flex flex-wrap gap-2 mb-10">
          <Badge
            variant={activeCategory === null ? "default" : "outline"}
            className="cursor-pointer text-sm px-4 py-1.5"
            onClick={() => setActiveCategory(null)}
          >
            All
          </Badge>
          {SKILL_CATEGORIES.map((cat) => (
            <Badge
              key={cat}
              variant={activeCategory === cat ? "default" : "outline"}
              className="cursor-pointer text-sm px-4 py-1.5"
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </Badge>
          ))}
        </motion.div>

        <motion.div
          variants={stagger}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3"
        >
          {filtered.map((skill) => {
            const Icon = skill.icon;
            return (
              <motion.div key={skill.name} variants={fadeUp}>
                <Card className="group hover:border-cyan-300 transition-colors duration-200 cursor-default">
                  <CardContent className="flex items-center gap-3 pt-4 pb-4 px-4">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-cyan-50 text-cyan-600 group-hover:bg-cyan-100 transition-colors dark:bg-cyan-950 dark:group-hover:bg-cyan-900">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">
                        {skill.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {skill.category}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </Section>
  );
}

function ExperienceSection() {
  return (
    <Section id="experience">
      <div className="max-w-6xl mx-auto">
        <motion.div variants={fadeUp} className="mb-12">
          <Eyebrow label="Experience" />
          <h2 className={`${heading.className} text-3xl md:text-4xl font-semibold tracking-tight`}>
            Where I&apos;ve worked
          </h2>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-border" />

          <div className="space-y-12">
            {EXPERIENCES.map((exp, i) => (
              <motion.div
                key={exp.company}
                variants={fadeUp}
                className="relative pl-12 md:pl-20"
              >
                {/* Timeline dot — centered on the line above via an arbitrary
                    offset (Tailwind's default spacing scale has no 6.5 step) */}
                <div className="absolute left-2.5 md:left-[26px] top-1.5 h-3 w-3 rounded-full border-2 border-cyan-500 bg-background" />

                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 mb-3">
                  <h3 className={`${heading.className} text-lg font-semibold`}>
                    {exp.title}
                  </h3>
                  <span className="text-sm text-muted-foreground">
                    @ {exp.company}
                  </span>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <Briefcase className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {exp.period}
                  </span>
                </div>

                <p className="text-muted-foreground leading-relaxed mb-4">
                  {exp.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {exp.tech.map((t) => (
                    <Badge key={t} variant="secondary" className="text-xs">
                      {t}
                    </Badge>
                  ))}
                </div>

                {i < EXPERIENCES.length - 1 && (
                  <Separator className="mt-12 bg-transparent" />
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Education */}
        <motion.div variants={fadeUp} className="mt-16 pl-12 md:pl-20 relative">
          <div className="absolute left-2.5 md:left-[26px] top-1.5 h-3 w-3 rounded-full border-2 border-cyan-500 bg-background" />
          <div className="flex items-center gap-2 mb-2">
            <GraduationCap className="h-5 w-5 text-cyan-600" />
            <h3 className={`${heading.className} text-lg font-semibold`}>
              Education
            </h3>
          </div>

          <h4 className="font-medium">
            Bachelor&apos;s Degree in Information Technology
          </h4>

          <p className="text-muted-foreground">
            Royal University of Phnom Penh (RUPP)
          </p>

          <p className="text-sm text-muted-foreground mt-2">
            Focused on software development, database systems, networking, and
            modern web technologies while building practical projects and
            strengthening problem-solving skills.
          </p>
        </motion.div>
      </div>
    </Section>
  );
}

function ProjectsSection() {
  return (
    <Section id="projects" className="bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <motion.div variants={fadeUp} className="mb-12">
          <Eyebrow label="Projects" />
          <h2 className={`${heading.className} text-3xl md:text-4xl font-semibold tracking-tight`}>
            Selected work
          </h2>
          <p className="text-muted-foreground mt-3 max-w-2xl">
            A curated selection of projects that showcase my approach to
            solving complex problems with clean, thoughtful engineering.
          </p>
        </motion.div>

        <motion.div variants={stagger} className="grid md:grid-cols-2 gap-6">
          {PROJECTS.map((project) => {
            const Icon = project.icon;
            const accent = ACCENT_STYLES[project.accent];
            return (
              <motion.div key={project.title} variants={fadeUp}>
                <Card
                  className={`group overflow-hidden border transition-colors duration-200 h-full ${accent.ring}`}
                >
                  {/* Project image — swap this block for a real screenshot:
                      <img src={project.image} alt={project.title} className="h-48 w-full object-cover" /> */}
                  <div
                    className={`h-48 bg-gradient-to-br ${accent.tile} flex items-center justify-center`}
                  >
                    <div
                      className={`w-12 h-12 rounded-xl ${accent.icon} flex items-center justify-center shadow-sm`}
                    >
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                  </div>

                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <h3 className={`${heading.className} text-lg font-semibold`}>
                        {project.title}
                      </h3>
                      <div className="flex gap-2 shrink-0">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          asChild
                        >
                          <a href={project.github} aria-label="View source">
                            <Github className="h-4 w-4" />
                          </a>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          asChild
                        >
                          <a href={project.link} aria-label="View live">
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </Button>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5">
                      {project.tech.map((t) => (
                        <Badge
                          key={t}
                          variant="outline"
                          className="text-xs font-normal"
                        >
                          {t}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </Section>
  );
}

function TestimonialsSection() {
  return (
    <Section id="testimonials">
      <div className="max-w-6xl mx-auto">
        <motion.div variants={fadeUp} className="mb-12">
          <Eyebrow label="Testimonials" />
          <h2 className={`${heading.className} text-3xl md:text-4xl font-semibold tracking-tight`}>
            What people say
          </h2>
          <p className="text-muted-foreground mt-3 max-w-2xl">
            Kind words from colleagues and clients I&apos;ve had the pleasure
            of working with over the years.
          </p>
        </motion.div>

        <motion.div variants={stagger} className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((testimonial) => (
            <motion.div key={testimonial.name} variants={fadeUp}>
              <Card className="h-full">
                <CardContent className="pt-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                    &ldquo;{testimonial.content}&rdquo;
                  </p>
                  <Separator className="mb-4" />
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-cyan-100 text-cyan-700 text-sm font-medium dark:bg-cyan-900 dark:text-cyan-300">
                        {testimonial.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{testimonial.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Section>
  );
}

function ContactSection() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    const res = await fetch("https://formspree.io/f/xjgqboqa", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      setSubmitted(true);
      form.reset();
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  return (
    <Section id="contact" className="bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <motion.div variants={fadeUp} className="mb-12">
          <Eyebrow label="Contact" />
          <h2 className={`${heading.className} text-3xl md:text-4xl font-semibold tracking-tight`}>
            Let&apos;s work together
          </h2>
          <p className="text-muted-foreground mt-3 max-w-2xl">
            I&apos;m always interested in hearing about new opportunities,
            collaborations, or just having a chat about technology. Drop me a
            message and I&apos;ll get back to you as soon as possible.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div variants={fadeUp}>
            <Card>
              <CardContent className="pt-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        Name
                      </label>
                      <Input id="name" name="name" placeholder="Your name" required />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="you@example.com"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">
                      Subject
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      placeholder="What's this about?"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell me about your project or opportunity..."
                      rows={5}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={submitted}>
                    {submitted ? (
                      "Message Sent!"
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={fadeUp} className="space-y-6">
            <div>
              <h3 className={`${heading.className} text-lg font-semibold mb-4`}>
                Get in touch directly
              </h3>
              <div className="space-y-4">
                <a
                  href="mailto:sophatroeun148@gmail.com"
                  className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors group"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-50 text-cyan-600 group-hover:bg-cyan-100 transition-colors dark:bg-cyan-950 dark:group-hover:bg-cyan-900">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Email</p>
                    <p className="text-sm">sophatroeun148@gmail.com</p>
                  </div>
                </a>
                <a
                  href="https://github.com/SopattRouen"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors group"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-50 text-cyan-600 group-hover:bg-cyan-100 transition-colors dark:bg-cyan-950 dark:group-hover:bg-cyan-900">
                    <Github className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      GitHub
                    </p>
                    <p className="text-sm">github.com/SopattRouen</p>
                  </div>
                </a>
                <a
                  href="https://www.linkedin.com/in/sophat-roeun-289788336"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors group"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-50 text-cyan-600 group-hover:bg-cyan-100 transition-colors dark:bg-cyan-950 dark:group-hover:bg-cyan-900">
                    <Linkedin className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      LinkedIn
                    </p>
                    <p className="text-sm">linkedin.com/in/sophat-roeun</p>
                  </div>
                </a>
              </div>
            </div>

            <Card>
              <CardContent className="pt-6">
                <h4 className="text-sm font-semibold mb-2">Current Status</h4>
                <div className="flex items-center gap-2 mb-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-cyan-500 animate-pulse" />
                  <span className="text-sm text-muted-foreground">
                    Open to full-time & contract roles
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  I&apos;m particularly interested in roles involving system
                  design, developer tools, and high-performance web
                  applications. Remote-friendly preferred, and open to hybrid
                  roles based in Phnom Penh.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}

function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="mx-auto max-w-6xl px-6 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-muted-foreground">
            <span className={`${heading.className} font-medium text-foreground`}>
              &lt;Phat.dev/&gt;
            </span>{" "}
            &copy; {new Date().getFullYear()}
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
              <a
                href="https://github.com/SopattRouen"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <Github className="h-4 w-4" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
              <a
                href="https://www.linkedin.com/in/sophat-roeun-289788336"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
              <a href="mailto:sophatroeun148@gmail.com" aria-label="Email">
                <Mail className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}

function ScrollToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-40 h-10 w-10 rounded-full bg-cyan-600 text-white shadow-lg flex items-center justify-center hover:bg-cyan-700 transition-colors"
          aria-label="Scroll to top"
        >
          <ChevronUp className="h-5 w-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

/* ──────────────────────────── Page ──────────────────────────── */

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        {/* <TestimonialsSection /> */}
        <ContactSection />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}