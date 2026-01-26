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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300`}
      style={{ fontFamily: 'Public Sans' }}
    >
      <div className={`container mx-auto px-6 flex justify-between items-center transition-all duration-300 ${
        isScrolled ? 'py-4 bg-[#FDFCF8]' : 'py-6 bg-transparent'
      }`}>
        <Link
          to="/"
          onClick={handleLogoClick}
          className="text-xl font-bold text-[#000000]"
          style={{ fontFamily: 'Public Sans', fontWeight: 700 }}
        >
          Greta Mantooth
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 font-bold text-sm" style={{ fontFamily: 'Public Sans', fontWeight: 700 }}>
          <Link
            to="/work"
            className={`hover:text-[#3A5A8C] transition-colors ${
              isWorkPage || isInProjectsSection
                ? 'text-[#000000]'
                : 'text-[#000000]'
            }`}
          >
            Work
          </Link>
          <Link
            to="/about"
            className={`hover:text-[#3A5A8C] transition-colors ${
              isAboutPage ? 'text-[#000000]' : 'text-[#000000]'
            }`}
          >
            About
          </Link>
          <button className="bg-[#000000] text-white px-6 py-2 hover:bg-[#3A5A8C] transition-colors text-sm font-bold" style={{ fontFamily: 'Public Sans', fontWeight: 700 }}>
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
              className="absolute top-0 left-0 w-full h-screen bg-[#FDFCF8] flex flex-col items-center justify-center gap-8 z-40 md:hidden"
            >
              <Link
                to="/work"
                onClick={() => setIsOpen(false)}
                className="text-4xl font-bold hover:text-[#3A5A8C] transition-colors text-[#000000]"
                style={{ fontFamily: 'Public Sans', fontWeight: 700 }}
              >
                Work
              </Link>
              <Link
                to="/about"
                onClick={() => setIsOpen(false)}
                className="text-4xl font-bold hover:text-[#3A5A8C] transition-colors text-[#000000]"
                style={{ fontFamily: 'Public Sans', fontWeight: 700 }}
              >
                About
              </Link>
              <button className="text-4xl font-bold hover:text-[#3A5A8C] transition-colors uppercase text-[#000000]" style={{ fontFamily: 'Public Sans', fontWeight: 700 }}>
                Contact
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}

