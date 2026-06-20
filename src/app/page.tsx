"use client";

import { useState, useEffect, useRef } from "react";
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

/* ────────────────────────────── Data ────────────────────────────── */

const NAV_ITEMS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

const SKILLS = [
  { name: "TypeScript", icon: Code2, category: "Languages" },
  { name: "JavaScript", icon: Code2, category: "Languages" },
  { name: "Python", icon: Code2, category: "Languages" },
  { name: "Rust", icon: Code2, category: "Languages" },
  { name: "Go", icon: Code2, category: "Languages" },
  { name: "React", icon: Globe, category: "Frontend" },
  { name: "Next.js", icon: Globe, category: "Frontend" },
  { name: "Vue.js", icon: Globe, category: "Frontend" },
  { name: "Tailwind CSS", icon: Palette, category: "Frontend" },
  { name: "Node.js", icon: Server, category: "Backend" },
  { name: "PostgreSQL", icon: Database, category: "Backend" },
  { name: "GraphQL", icon: Database, category: "Backend" },
  { name: "Redis", icon: Database, category: "Backend" },
  { name: "React Native", icon: Smartphone, category: "Mobile" },
  { name: "Flutter", icon: Smartphone, category: "Mobile" },
  { name: "AWS", icon: Layers, category: "DevOps" },
  { name: "Docker", icon: Server, category: "DevOps" },
  { name: "Kubernetes", icon: GitBranch, category: "DevOps" },
  { name: "Git", icon: GitBranch, category: "DevOps" },
  { name: "CI/CD", icon: GitBranch, category: "DevOps" },
];

const SKILL_CATEGORIES = ["Languages", "Frontend", "Backend", "Mobile", "DevOps"];

const EXPERIENCES = [
  {
    title: "Senior Full-Stack Engineer",
    company: "TechForward Inc.",
    period: "2023 — Present",
    description:
      "Leading the development of a next-generation SaaS platform serving 50K+ users. Architected a microservices-based backend with event-driven patterns, reducing system latency by 40%. Mentoring a team of 5 junior developers and establishing code review practices that improved deployment success rate to 99.2%.",
    tech: ["Next.js", "TypeScript", "PostgreSQL", "AWS", "Kubernetes"],
  },
  {
    title: "Full-Stack Developer",
    company: "DataVista Labs",
    period: "2021 — 2023",
    description:
      "Built and maintained real-time data visualization dashboards used by enterprise clients across finance and healthcare sectors. Implemented WebSocket-based live data streaming capable of handling 10K+ concurrent connections. Reduced page load time by 60% through SSR optimization and intelligent caching strategies.",
    tech: ["React", "Node.js", "GraphQL", "Redis", "Docker"],
  },
  {
    title: "Frontend Developer",
    company: "CreativePixel Agency",
    period: "2019 — 2021",
    description:
      "Delivered pixel-perfect, responsive web applications for 20+ clients ranging from startups to Fortune 500 companies. Introduced component-driven development with Storybook, which reduced UI bugs by 35% and improved design-to-code handoff efficiency. Pioneered the adoption of TypeScript across all new projects.",
    tech: ["Vue.js", "TypeScript", "Tailwind CSS", "Storybook"],
  },
  {
    title: "Junior Developer",
    company: "CodeStart Studio",
    period: "2018 — 2019",
    description:
      "Developed responsive landing pages and interactive web features for small business clients. Gained foundational experience in modern JavaScript frameworks, version control workflows, and agile development methodologies. Contributed to open-source projects and built a personal project that gained 500+ GitHub stars.",
    tech: ["JavaScript", "React", "CSS", "Git"],
  },
];

const PROJECTS = [
  {
    title: "CloudSync Pro",
    description:
      "A real-time collaborative workspace platform with live cursors, document editing, and video conferencing. Built for distributed teams who need seamless async and sync collaboration in one unified interface.",
    tech: ["Next.js", "WebSocket", "PostgreSQL", "AWS"],
    image: "cloud",
    link: "#",
    github: "#",
  },
  {
    title: "DevMetrics",
    description:
      "Developer productivity analytics dashboard that aggregates data from GitHub, Jira, and CI/CD pipelines. Provides actionable insights on cycle time, deployment frequency, and team velocity through interactive visualizations.",
    tech: ["React", "Node.js", "GraphQL", "D3.js"],
    image: "metrics",
    link: "#",
    github: "#",
  },
  {
    title: "FinTrack AI",
    description:
      "AI-powered personal finance tracker with smart categorization, spending predictions, and natural language queries. Uses machine learning to provide personalized savings recommendations based on spending patterns.",
    tech: ["Python", "FastAPI", "React", "TensorFlow"],
    image: "finance",
    link: "#",
    github: "#",
  },
  {
    title: "PixelForge",
    description:
      "Browser-based design tool for creating UI mockups and prototypes with real-time multiplayer collaboration. Features an extensible plugin system and exports to Figma, Sketch, and CSS formats.",
    tech: ["Vue.js", "Canvas API", "WebRTC", "Rust WASM"],
    image: "design",
    link: "#",
    github: "#",
  },
];

const TESTIMONIALS = [
  {
    name: "Sarah Chen",
    role: "CTO, TechForward Inc.",
    content:
      "An exceptional engineer who consistently delivers beyond expectations. Their architectural decisions transformed our platform's performance, and their mentorship elevated our entire team's output. A rare combination of deep technical skill and clear communication.",
    avatar: "SC",
  },
  {
    name: "Marcus Rivera",
    role: "Product Lead, DataVista Labs",
    content:
      "One of the most reliable developers I've worked with. They have an incredible ability to translate complex business requirements into elegant, maintainable code. Our real-time dashboards wouldn't be where they are without their expertise.",
    avatar: "MR",
  },
  {
    name: "Emily Nakamura",
    role: "Design Director, CreativePixel",
    content:
      "A developer who truly understands design intent. Every pixel-perfect implementation they delivered matched our Figma specs flawlessly, and they proactively suggested UX improvements that our design team hadn't even considered.",
    avatar: "EN",
  },
];

/* ──────────────────────── Animation helpers ──────────────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
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
          className="text-lg font-bold tracking-tight hover:opacity-70 transition-opacity"
        >
          <span className="text-primary">&lt;</span>
          Alex.dev
          <span className="text-primary">/&gt;</span>
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Badge variant="secondary" className="mb-6 px-4 py-1.5 text-sm font-medium">
            <span className="mr-2 inline-block h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            Available for opportunities
          </Badge>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-6"
        >
          Hi, I&apos;m{" "}
          <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
            Alex Chen
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
          <span>San Francisco, CA</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-12"
        >
          <Button size="lg" onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}>
            <Mail className="mr-2 h-4 w-4" />
            Get in Touch
          </Button>
          <Button variant="outline" size="lg" asChild>
            <a href="#projects" onClick={(e) => { e.preventDefault(); document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" }); }}>
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
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <Github className="h-5 w-5" />
            </a>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Linkedin className="h-5 w-5" />
            </a>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <a href="mailto:alex@example.com" aria-label="Email">
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
          <p className="text-sm font-medium text-emerald-600 mb-2 tracking-wider uppercase">About</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            A bit about me
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-12 items-start">
          <motion.div variants={fadeUp} className="md:col-span-2 space-y-5">
            <p className="text-muted-foreground leading-relaxed text-lg">
              I&apos;m a full-stack engineer with 7+ years of experience building web applications that
              people actually enjoy using. My journey started with curiosity about how things work on the
              internet and evolved into a deep passion for crafting clean, maintainable, and performant code
              that solves real problems.
            </p>
            <p className="text-muted-foreground leading-relaxed text-lg">
              I thrive at the intersection of design and engineering — where pixel-perfect UIs meet robust,
              scalable architectures. Whether it&apos;s architecting a microservices backend, optimizing a
              database query that shaves 200ms off response time, or building a delightfully smooth animation,
              I care deeply about the details that make a product feel right.
            </p>
            <p className="text-muted-foreground leading-relaxed text-lg">
              When I&apos;m not coding, you&apos;ll find me contributing to open-source projects, writing
              technical articles on system design patterns, or experimenting with new frameworks before they
              hit the mainstream. I believe the best software is built by engineers who never stop learning.
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Years Experience", value: "7+" },
                { label: "Projects Shipped", value: "40+" },
                { label: "Open Source Contrib", value: "120+" },
                { label: "GitHub Stars", value: "2.5K" },
              ].map((stat) => (
                <Card key={stat.label} className="text-center">
                  <CardContent className="pt-6">
                    <p className="text-2xl font-bold text-emerald-600">{stat.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-3">
                  <Terminal className="h-5 w-5 text-emerald-600" />
                  <span className="text-sm font-medium">Quick Facts</span>
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>Based in San Francisco, CA</li>
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
          <p className="text-sm font-medium text-emerald-600 mb-2 tracking-wider uppercase">Skills</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Technologies I work with
          </h2>
          <p className="text-muted-foreground mt-3 max-w-2xl">
            I&apos;ve worked across the full stack, from crafting pixel-perfect interfaces to designing
            distributed backend systems. Here are the tools and technologies I use day-to-day.
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

        <motion.div variants={stagger} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {filtered.map((skill) => {
            const Icon = skill.icon;
            return (
              <motion.div key={skill.name} variants={fadeUp}>
                <Card className="group hover:border-emerald-300 hover:shadow-sm transition-all duration-200 cursor-default">
                  <CardContent className="flex items-center gap-3 pt-4 pb-4 px-4">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 group-hover:bg-emerald-100 transition-colors dark:bg-emerald-950 dark:group-hover:bg-emerald-900">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">{skill.name}</p>
                      <p className="text-xs text-muted-foreground">{skill.category}</p>
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
          <p className="text-sm font-medium text-emerald-600 mb-2 tracking-wider uppercase">Experience</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
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
                {/* Timeline dot */}
                <div className="absolute left-2.5 md:left-6.5 top-1.5 h-3 w-3 rounded-full border-2 border-emerald-500 bg-background" />

                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 mb-3">
                  <h3 className="text-lg font-semibold">{exp.title}</h3>
                  <span className="text-sm text-muted-foreground">
                    @ {exp.company}
                  </span>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <Briefcase className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{exp.period}</span>
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
          <div className="absolute left-2.5 md:left-6.5 top-1.5 h-3 w-3 rounded-full border-2 border-emerald-500 bg-background" />
          <div className="flex items-center gap-2 mb-2">
            <GraduationCap className="h-5 w-5 text-emerald-600" />
            <h3 className="text-lg font-semibold">Education</h3>
          </div>
          <p className="text-muted-foreground">
            B.S. Computer Science — University of California, Berkeley (2018)
          </p>
        </motion.div>
      </div>
    </Section>
  );
}

function ProjectsSection() {
  const PROJECT_COLORS = [
    "from-emerald-500/10 to-teal-500/10",
    "from-violet-500/10 to-purple-500/10",
    "from-amber-500/10 to-orange-500/10",
    "from-rose-500/10 to-pink-500/10",
  ];

  const PROJECT_ACCENTS = [
    "bg-emerald-500",
    "bg-violet-500",
    "bg-amber-500",
    "bg-rose-500",
  ];

  return (
    <Section id="projects" className="bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <motion.div variants={fadeUp} className="mb-12">
          <p className="text-sm font-medium text-emerald-600 mb-2 tracking-wider uppercase">Projects</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Selected work
          </h2>
          <p className="text-muted-foreground mt-3 max-w-2xl">
            A curated selection of projects that showcase my approach to solving complex problems
            with clean, thoughtful engineering.
          </p>
        </motion.div>

        <motion.div variants={stagger} className="grid md:grid-cols-2 gap-6">
          {PROJECTS.map((project, i) => (
            <motion.div key={project.title} variants={fadeUp}>
              <Card className="group overflow-hidden hover:shadow-md transition-all duration-300 h-full">
                {/* Project image placeholder */}
                <div
                  className={`h-48 bg-gradient-to-br ${PROJECT_COLORS[i]} flex items-center justify-center relative overflow-hidden`}
                >
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:20px_20px]" />
                  <div className={`w-12 h-12 rounded-xl ${PROJECT_ACCENTS[i]} flex items-center justify-center shadow-lg`}>
                    <Code2 className="h-6 w-6 text-white" />
                  </div>
                </div>

                <CardContent className="pt-6">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h3 className="text-lg font-semibold">{project.title}</h3>
                    <div className="flex gap-2 shrink-0">
                      <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                        <a href={project.github} aria-label="View source">
                          <Github className="h-4 w-4" />
                        </a>
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
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
                      <Badge key={t} variant="outline" className="text-xs font-normal">
                        {t}
                      </Badge>
                    ))}
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

function TestimonialsSection() {
  return (
    <Section id="testimonials">
      <div className="max-w-6xl mx-auto">
        <motion.div variants={fadeUp} className="mb-12">
          <p className="text-sm font-medium text-emerald-600 mb-2 tracking-wider uppercase">Testimonials</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            What people say
          </h2>
          <p className="text-muted-foreground mt-3 max-w-2xl">
            Kind words from colleagues and clients I&apos;ve had the pleasure of working with over the years.
          </p>
        </motion.div>

        <motion.div variants={stagger} className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((testimonial) => (
            <motion.div key={testimonial.name} variants={fadeUp}>
              <Card className="h-full hover:shadow-sm transition-shadow duration-200">
                <CardContent className="pt-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                    &ldquo;{testimonial.content}&rdquo;
                  </p>
                  <Separator className="mb-4" />
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-emerald-100 text-emerald-700 text-sm font-medium dark:bg-emerald-900 dark:text-emerald-300">
                        {testimonial.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{testimonial.name}</p>
                      <p className="text-xs text-muted-foreground">{testimonial.role}</p>
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <Section id="contact" className="bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <motion.div variants={fadeUp} className="mb-12">
          <p className="text-sm font-medium text-emerald-600 mb-2 tracking-wider uppercase">Contact</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Let&apos;s work together
          </h2>
          <p className="text-muted-foreground mt-3 max-w-2xl">
            I&apos;m always interested in hearing about new opportunities, collaborations, or just having a
            chat about technology. Drop me a message and I&apos;ll get back to you as soon as possible.
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
                      <Input id="name" placeholder="Your name" required />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email
                      </label>
                      <Input id="email" type="email" placeholder="you@example.com" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">
                      Subject
                    </label>
                    <Input id="subject" placeholder="What's this about?" required />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Message
                    </label>
                    <Textarea
                      id="message"
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
              <h3 className="text-lg font-semibold mb-4">Get in touch directly</h3>
              <div className="space-y-4">
                <a
                  href="mailto:alex@example.com"
                  className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors group"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 group-hover:bg-emerald-100 transition-colors dark:bg-emerald-950 dark:group-hover:bg-emerald-900">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Email</p>
                    <p className="text-sm">alex@example.com</p>
                  </div>
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors group"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 group-hover:bg-emerald-100 transition-colors dark:bg-emerald-950 dark:group-hover:bg-emerald-900">
                    <Github className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">GitHub</p>
                    <p className="text-sm">github.com/alexchen</p>
                  </div>
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors group"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 group-hover:bg-emerald-100 transition-colors dark:bg-emerald-950 dark:group-hover:bg-emerald-900">
                    <Linkedin className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">LinkedIn</p>
                    <p className="text-sm">linkedin.com/in/alexchen</p>
                  </div>
                </a>
              </div>
            </div>

            <Card>
              <CardContent className="pt-6">
                <h4 className="text-sm font-semibold mb-2">Current Status</h4>
                <div className="flex items-center gap-2 mb-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-sm text-muted-foreground">
                    Open to full-time & contract roles
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  I&apos;m particularly interested in roles involving system design, developer tools, and
                  high-performance web applications. Remote-friendly preferred but open to hybrid in SF Bay Area.
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
            <span className="font-medium text-foreground">&lt;Alex.dev/&gt;</span>{" "}
            &copy; {new Date().getFullYear()}
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <Github className="h-4 w-4" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Linkedin className="h-4 w-4" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
              <a href="mailto:alex@example.com" aria-label="Email">
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
          className="fixed bottom-6 right-6 z-40 h-10 w-10 rounded-full bg-emerald-600 text-white shadow-lg flex items-center justify-center hover:bg-emerald-700 transition-colors"
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
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
