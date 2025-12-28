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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'py-4 bg-white/90 backdrop-blur-md border-b border-black' : 'py-6 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link
          to="/"
          onClick={handleLogoClick}
          className="text-2xl font-black tracking-tighter uppercase italic flex items-center gap-2"
        >
          <span className="bg-black text-white px-2 py-1 transform -skew-x-12">Pixel</span>
          <span className="text-black">Perfect</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 font-bold text-sm tracking-wider">
          <Link
            to="/work"
            className={`hover:text-fuchsia-600 transition-colors ${
              isWorkPage || isInProjectsSection
                ? 'text-fuchsia-600 underline decoration-2 underline-offset-4'
                : 'text-black'
            }`}
          >
            Work
          </Link>
          <Link
            to="/about"
            className={`hover:text-cyan-600 transition-colors ${
              isAboutPage ? 'text-cyan-600 underline decoration-2 underline-offset-4' : 'text-black'
            }`}
          >
            About Us
          </Link>
          <button className="bg-black text-white px-6 py-2 hover:bg-fuchsia-600 hover:scale-105 transition-all active:scale-95 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]">
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
              className="absolute top-0 left-0 w-full h-screen bg-yellow-300 flex flex-col items-center justify-center gap-8 z-40 md:hidden"
            >
              <Link
                to="/work"
                onClick={() => setIsOpen(false)}
                className="text-4xl font-black hover:text-white transition-colors"
              >
                Work
              </Link>
              <Link
                to="/about"
                onClick={() => setIsOpen(false)}
                className="text-4xl font-black hover:text-white transition-colors uppercase"
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

