import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, Instagram, Twitter, Linkedin, Mail, ChevronDown, Zap } from 'lucide-react';
import { Navigation } from '../Navigation';

// --- Type Definitions ---
type Project = {
  id: number;
  title: string;
  category: string;
  image: string;
  color: string;
};

// --- Data & Constants ---
// Map project titles to route IDs for navigation
export const PROJECT_ID_MAP: Record<string, string> = {
  'Neon Dreams': 'neon-dreams',
  'Retro Future': 'retro-future',
  'Cyber Pulse': 'cyber-pulse',
  'Vaporwave Cafe': 'vaporwave-cafe',
  'Glitch Art Festival': 'glitch-art-festival',
  'Analog Soul': 'analog-soul'
};

export const PROJECTS: Project[] = [{
  id: 1,
  title: 'Neon Dreams',
  category: 'Brand Identity',
  image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop',
  color: 'bg-fuchsia-500'
}, {
  id: 2,
  title: 'Retro Future',
  category: 'Web Design',
  image: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=2070&auto=format&fit=crop',
  color: 'bg-cyan-500'
}, {
  id: 3,
  title: 'Vaporwave Cafe',
  category: 'Packaging',
  image: 'https://images.unsplash.com/photo-1555529733-0e670560f7e1?q=80&w=2070&auto=format&fit=crop',
  color: 'bg-yellow-400'
}, {
  id: 4,
  title: 'Cyber Pulse',
  category: 'Motion Design',
  image: 'https://images.unsplash.com/photo-1515630278258-407f66498911?q=80&w=1996&auto=format&fit=crop',
  color: 'bg-indigo-600'
}, {
  id: 5,
  title: 'Glitch Art Festival',
  category: 'Event Branding',
  image: 'https://images.unsplash.com/photo-1534293655119-923eb461e719?q=80&w=1951&auto=format&fit=crop',
  color: 'bg-emerald-400'
}, {
  id: 6,
  title: 'Analog Soul',
  category: 'Photography',
  image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2070&auto=format&fit=crop',
  color: 'bg-orange-500'
}];

// --- Helper Components ---

const StackingCard = ({
  children,
  className,
  index
}: {
  children: React.ReactNode;
  className?: string;
  index: number;
}) => {
  return <div className={`sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden ${className}`} style={{
    zIndex: index + 10
  }}>
      {children}
    </div>;
};
const Footer = () => <footer className="bg-black text-white py-20 px-6 relative z-50">
    <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
      <div className="space-y-6">
        <h3 className="text-3xl font-medium tracking-[-0.02em]" style={{ fontFamily: 'Inter' }}>
          Greta Mantooth
        </h3>
        <p className="text-[#666666] max-w-xs font-light" style={{ fontFamily: 'Inter', lineHeight: '1.6' }}>
          Brand designer crafting thoughtful visual identities and digital experiences.
        </p>
      </div>
      
      <div>
        <h4 className="font-medium text-lg mb-6 tracking-normal text-[#1A1A1A]" style={{ fontFamily: 'Inter' }}>Contact</h4>
        <ul className="space-y-4 text-[#666666] font-light" style={{ fontFamily: 'Inter' }}>
          <li className="flex items-center gap-2 hover:text-[#1A1A1A] cursor-pointer transition-colors"><Mail size={18} /> hello@gretamantooth.com</li>
          <li className="hover:text-[#1A1A1A] cursor-pointer transition-colors">Available for projects</li>
        </ul>
      </div>

      <div>
        <h4 className="font-medium text-lg mb-6 tracking-normal text-[#1A1A1A]" style={{ fontFamily: 'Inter' }}>Socials</h4>
        <div className="flex gap-4">
          <a href="#" className="w-10 h-10 bg-white border border-[#E5E5E5] rounded-full flex items-center justify-center hover:bg-[#1A1A1A] hover:text-white hover:border-[#1A1A1A] transition-all text-[#666666]">
            <Instagram size={20} />
          </a>
          <a href="#" className="w-10 h-10 bg-white border border-[#E5E5E5] rounded-full flex items-center justify-center hover:bg-[#1A1A1A] hover:text-white hover:border-[#1A1A1A] transition-all text-[#666666]">
            <Twitter size={20} />
          </a>
          <a href="#" className="w-10 h-10 bg-white border border-[#E5E5E5] rounded-full flex items-center justify-center hover:bg-[#1A1A1A] hover:text-white hover:border-[#1A1A1A] transition-all text-[#666666]">
            <Linkedin size={20} />
          </a>
        </div>
      </div>

      <div>
        <h4 className="font-medium text-lg mb-6 tracking-normal text-[#1A1A1A]" style={{ fontFamily: 'Inter' }}>Newsletter</h4>
        <div className="flex flex-col gap-4">
          <input type="email" placeholder="Your email" className="bg-white border border-[#E5E5E5] p-4 text-[#1A1A1A] placeholder:text-[#999999] focus:ring-2 focus:ring-[#1A1A1A] focus:border-[#1A1A1A] outline-none" style={{ fontFamily: 'Inter' }} />
          <button className="bg-[#1A1A1A] text-white font-medium py-4 hover:bg-[#333333] transition-colors text-sm" style={{ fontFamily: 'Inter' }}>
            Subscribe
          </button>
        </div>
      </div>
    </div>
    <div className="container mx-auto mt-20 pt-8 border-t border-[#E5E5E5] text-center text-[#999999] text-sm font-light" style={{ fontFamily: 'Inter' }}>
      © {new Date().getFullYear()} Greta Mantooth. All rights reserved.
    </div>
  </footer>;

// --- Main Page Views ---

const HomeView = ({
  projectsRef
}: {
  projectsRef: React.RefObject<HTMLDivElement | null>;
}) => {
  return <div className="w-full bg-[#F7F7F7]">
      {/* Section 1: Introduction - White/Light Gray */}
      <StackingCard index={1} className="bg-white text-[#1A1A1A]">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <motion.div initial={{
          opacity: 0,
          x: -50
        }} whileInView={{
          opacity: 1,
          x: 0
        }} transition={{
          duration: 0.8
        }} className="space-y-6">
            <h1 className="text-6xl md:text-8xl font-medium leading-tight tracking-[-0.02em] text-[#1A1A1A]" style={{ fontFamily: 'Inter' }}>
              I Build <br />
              <span className="text-[#1A1A1A]">Brands</span> <br />
              That Resonate.
            </h1>
            <p className="text-xl md:text-2xl font-light max-w-md text-[#666666]" style={{ fontFamily: 'Inter', lineHeight: '1.6' }}>
              Brand designer crafting thoughtful visual identities and digital experiences.
            </p>
            <motion.div animate={{
            y: [0, 10, 0]
          }} transition={{
            repeat: Infinity,
            duration: 2
          }} className="pt-12">
              <ChevronDown size={48} className="opacity-50" />
            </motion.div>
          </motion.div>
          <motion.div initial={{
          opacity: 0,
          scale: 0.95
        }} whileInView={{
          opacity: 1,
          scale: 1
        }} transition={{
          duration: 0.8,
          delay: 0.2
        }} className="hidden md:flex justify-center">
            <div className="w-96 h-96 bg-[#F7F7F7] p-4 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
              <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964&auto=format&fit=crop" alt="Abstract Art" className="w-full h-full object-cover hover:opacity-90 transition-opacity duration-500" />
            </div>
          </motion.div>
        </div>
      </StackingCard>

      {/* Section 2: Strategy - Neutral Gray */}
      <StackingCard index={2} className="bg-[#F7F7F7] text-[#1A1A1A]">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <motion.div initial={{
          opacity: 0,
          scale: 0.95
        }} whileInView={{
          opacity: 1,
          scale: 1
        }} transition={{
          duration: 0.8
        }} className="hidden md:flex justify-center order-2 md:order-1">
            <div className="relative">
              <div className="relative bg-[#F7F7F7] p-4 w-80 h-96 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
                 <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop" alt="Strategy" className="w-full h-full object-cover hover:opacity-90 transition-opacity duration-500" />
              </div>
            </div>
          </motion.div>
          <motion.div initial={{
          opacity: 0,
          x: 50
        }} whileInView={{
          opacity: 1,
          x: 0
        }} transition={{
          duration: 0.8
        }} className="space-y-6 order-1 md:order-2">
            <div className="flex items-center gap-3 mb-4">
              <Zap className="w-8 h-8 text-yellow-300" />
              <span className="font-mono text-yellow-300 tracking-widest uppercase">Strategy First</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-black leading-tight tracking-tighter uppercase">
              Chaos <br />
              <span className="text-yellow-300 italic">Controlled.</span>
            </h2>
            <p className="text-lg md:text-xl font-medium max-w-md">
              I don't just make things pretty. I engineer brand systems that scale, adapt, and resonate with audiences.
            </p>
            <button className="flex items-center gap-2 font-bold uppercase tracking-widest text-sm border-b-2 border-white pb-1 hover:text-yellow-300 hover:border-yellow-300 transition-colors">
              See Our Process <ArrowRight size={16} />
            </button>
          </motion.div>
        </div>
      </StackingCard>

      {/* Section 3: Design - White */}
      <StackingCard index={3} className="bg-white text-[#1A1A1A]">
        <div className="container mx-auto px-6 text-center">
          <motion.div initial={{
          opacity: 0,
          y: 50
        }} whileInView={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8
        }} className="max-w-4xl mx-auto space-y-8">
            <h2 className="text-5xl md:text-8xl font-medium leading-none tracking-[-0.02em] text-[#1A1A1A]" style={{ fontFamily: 'Inter' }}>
              Design <br />Without <span className="text-[#1A1A1A] bg-[#F7F7F7] px-4 inline-block">Limits</span>
            </h2>
            <p className="text-xl md:text-2xl font-light max-w-2xl mx-auto pt-8 text-[#666666]" style={{ fontFamily: 'Inter', lineHeight: '1.6' }}>
              From pixels to print, I create visual languages that speak louder than words.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-8">
              {['Identity', 'Web', 'Motion', 'Print', 'Social'].map(item => <span key={item} className="px-6 py-3 border border-[#E5E5E5] rounded-full font-medium tracking-normal hover:bg-[#1A1A1A] hover:text-white hover:border-[#1A1A1A] transition-colors cursor-default text-[#666666]" style={{ fontFamily: 'Inter' }}>
                  {item}
                </span>)}
            </div>
          </motion.div>
        </div>
      </StackingCard>

      {/* Projects Grid - Spans below the sticky cards */}
      <div ref={projectsRef} id="projects" className="relative z-40 bg-white min-h-screen">
        <div className="py-24 px-6 md:px-12">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
              <div className="text-left">
                <h3 className="text-6xl font-medium tracking-[-0.02em] mb-4 text-[#1A1A1A]" style={{ fontFamily: 'Inter' }}>Selected<br />Work</h3>
                <div className="h-1 w-24 bg-[#E5B54F]"></div>
              </div>
              <p className="max-w-md text-[#666666] font-light text-left md:text-right" style={{ fontFamily: 'Inter', lineHeight: '1.6' }}>
                A curated selection of my favorite projects from the last few years. I take pride in every pixel.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              {PROJECTS.slice(0, 4).map((project, idx) => {
                const projectId = PROJECT_ID_MAP[project.title];
                return projectId ? (
                  <Link key={project.id} to={`/project/${projectId}`}>
                    <motion.div initial={{
                    opacity: 0,
                    y: 50
                  }} whileInView={{
                    opacity: 1,
                    y: 0
                  }} transition={{
                    duration: 0.5,
                    delay: idx * 0.1
                  }} viewport={{
                    once: true
                  }} className="group cursor-pointer">
                        <div className="relative overflow-hidden aspect-[4/3] mb-6 border border-[#E5E5E5] shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-300">
                          <img src={project.image} alt={project.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-in-out" />
                          <div className="absolute bottom-0 left-0 bg-white border-t border-r border-[#E5E5E5] px-4 py-2 z-20">
                            <span className="text-xs tracking-normal font-medium text-[#666666]" style={{ fontFamily: 'Inter' }}>{project.category}</span>
                          </div>
                        </div>
                        <h4 className="text-3xl font-medium tracking-[-0.02em] group-hover:text-[#1A1A1A] transition-colors text-[#1A1A1A]" style={{ fontFamily: 'Inter' }}>{project.title}</h4>
                      </motion.div>
                  </Link>
                ) : (
                  <motion.div key={project.id} initial={{
                  opacity: 0,
                  y: 50
                }} whileInView={{
                  opacity: 1,
                  y: 0
                }} transition={{
                  duration: 0.5,
                  delay: idx * 0.1
                }} viewport={{
                  once: true
                }} className="group cursor-pointer">
                      <div className="relative overflow-hidden aspect-[4/3] mb-6 border border-[#E5E5E5] shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-300">
                        <img src={project.image} alt={project.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-in-out" />
                        <div className="absolute bottom-0 left-0 bg-white border-t border-r border-[#E5E5E5] px-4 py-2 z-20">
                          <span className="text-xs tracking-normal font-medium text-[#666666]" style={{ fontFamily: 'Inter' }}>{project.category}</span>
                        </div>
                      </div>
                      <h4 className="text-3xl font-medium tracking-[-0.02em] group-hover:text-[#1A1A1A] transition-colors text-[#1A1A1A]" style={{ fontFamily: 'Inter' }}>{project.title}</h4>
                    </motion.div>
                );
              })}
            </div>
            
            <div className="mt-24 text-center">
              <Link to="/work">
                <button className="px-12 py-5 bg-[#1A1A1A] text-white font-medium text-lg tracking-normal hover:bg-[#333333] transition-colors" style={{ fontFamily: 'Inter' }}>
                  View All Projects
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>;
};

// @component: BrandDesignStudio
export const BrandDesignStudio = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isInProjectsSection, setIsInProjectsSection] = useState(false);
  const [homeViewKey, setHomeViewKey] = useState(0);
  const projectsRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  // Force reset when navigating to home from another route
  useEffect(() => {
    if (location.pathname === '/') {
      // Check if we should scroll to projects section
      const shouldScrollToProjects = (location.state as { scrollToProjects?: boolean })?.scrollToProjects;
      
      // Force HomeView to remount by changing key
      setHomeViewKey(prev => prev + 1);
      
      if (shouldScrollToProjects) {
        // Scroll to projects section after component renders
        setTimeout(() => {
          const projectsSection = document.getElementById('projects');
          if (projectsSection) {
            projectsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 400);
      } else {
        // Otherwise scroll to top
        setTimeout(() => {
          window.scrollTo(0, 0);
        }, 0);
      }
    }
  }, [location.pathname, location.state]);

  // Handle Scroll for Nav Styling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Detect when projects section is visible
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsInProjectsSection(entry.isIntersecting);
    }, {
      threshold: 0.3,
      // Trigger when 30% of the section is visible
      rootMargin: '-100px 0px 0px 0px' // Account for fixed nav
    });
    if (projectsRef.current) {
      observer.observe(projectsRef.current);
    }
    return () => {
      if (projectsRef.current) {
        observer.unobserve(projectsRef.current);
      }
    };
  }, []);

  // @return
  return <div className="font-sans antialiased bg-gray-50 min-h-screen selection:bg-fuchsia-300 selection:text-fuchsia-900">
      <Navigation isScrolled={isScrolled} isInProjectsSection={isInProjectsSection} />

      <main>
        <HomeView key={`home-${homeViewKey}`} projectsRef={projectsRef} />
      </main>

      <Footer />
    </div>;
};