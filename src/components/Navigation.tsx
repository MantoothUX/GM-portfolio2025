import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

interface NavigationProps {
  isScrolled?: boolean;
  isInProjectsSection?: boolean;
}

export function Navigation({ isScrolled = false, isInProjectsSection = false }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isWorkPage = location.pathname === '/work';
  const isAboutPage = location.pathname === '/about';

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 font-['Inter'] ${
        isScrolled ? 'py-4 bg-white/95 backdrop-blur-md border-b border-[#E5E5E5]' : 'py-6 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link
          to="/"
          onClick={handleLogoClick}
          className="text-xl font-medium tracking-[-0.02em] text-[#1A1A1A]"
        >
          Greta Mantooth
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 font-medium text-sm tracking-normal">
          <Link
            to="/work"
            className={`hover:text-[#1A1A1A] transition-colors ${
              isWorkPage || isInProjectsSection
                ? 'text-[#1A1A1A] underline decoration-1 underline-offset-4'
                : 'text-[#666666]'
            }`}
          >
            Work
          </Link>
          <Link
            to="/about"
            className={`hover:text-[#1A1A1A] transition-colors ${
              isAboutPage ? 'text-[#1A1A1A] underline decoration-1 underline-offset-4' : 'text-[#666666]'
            }`}
          >
            About
          </Link>
          <button className="bg-[#1A1A1A] text-white px-6 py-2 hover:bg-[#333333] transition-colors text-sm font-medium">
            Let's Talk
          </button>
        </div>

        {/* Mobile Nav Toggle */}
        <button className="md:hidden z-50" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
        </button>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-0 left-0 w-full h-screen bg-white flex flex-col items-center justify-center gap-8 z-40 md:hidden"
            >
              <Link
                to="/work"
                onClick={() => setIsOpen(false)}
                className="text-4xl font-medium hover:text-[#1A1A1A] transition-colors text-[#666666]"
              >
                Work
              </Link>
              <Link
                to="/about"
                onClick={() => setIsOpen(false)}
                className="text-4xl font-medium hover:text-[#1A1A1A] transition-colors text-[#666666]"
              >
                About
              </Link>
              <button className="text-4xl font-black hover:text-white transition-colors uppercase">
                Contact
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}

