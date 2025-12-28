import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react';

// --- Type Definitions ---
export type ImageLayout = 'fullbleed' | 'half' | 'carousel';
export interface ImageItem {
  id: string;
  url: string;
  alt: string;
}
export interface ImageGroup {
  type: ImageLayout;
  images: ImageItem[];
}
export interface ProjectData {
  id: string;
  title: string;
  keywords: string[];
  about: string;
  credits: {
    label: string;
    value: string;
  }[];
  imageGroups: ImageGroup[];
}
export interface ProjectShowcasePageProps {
  project: ProjectData;
  onBack?: () => void;
  onNextProject?: () => void;
  onPrevProject?: () => void;
  nextProjectTitle?: string;
  prevProjectTitle?: string;
}

// --- Image Modal Component ---
const ImageModal = ({
  images,
  initialIndex,
  onClose,
  showPagination = true
}: {
  images: ImageItem[];
  initialIndex: number;
  onClose: () => void;
  showPagination?: boolean;
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [showControls, setShowControls] = useState(true);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const minSwipeDistance = 50;
  const canNavigate = showPagination && images.length > 1;
  
  const goToNext = () => {
    if (canNavigate) {
      setCurrentIndex(prev => (prev + 1) % images.length);
    }
  };
  const goToPrev = () => {
    if (canNavigate) {
      setCurrentIndex(prev => (prev - 1 + images.length) % images.length);
    }
  };
  const onTouchStart = (e: React.TouchEvent) => {
    if (!canNavigate) return;
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (!canNavigate) return;
    setTouchEnd(e.targetTouches[0].clientX);
  };
  const onTouchEnd = () => {
    if (!canNavigate || !touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) {
      goToNext();
    }
    if (isRightSwipe) {
      goToPrev();
    }
  };

  // Keyboard navigation (only for carousels)
  useEffect(() => {
    if (!canNavigate) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goToPrev();
      if (e.key === 'ArrowRight') goToNext();
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, canNavigate]);

  // Auto-hide controls
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const resetTimeout = () => {
      setShowControls(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => setShowControls(false), 3000);
    };
    resetTimeout();
    window.addEventListener('mousemove', resetTimeout);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener('mousemove', resetTimeout);
    };
  }, []);
  return <motion.div initial={{
    opacity: 0
  }} animate={{
    opacity: 1
  }} exit={{
    opacity: 0
  }} className="fixed inset-0 z-[100] bg-black flex items-center justify-center" onClick={onClose} onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
      {/* Close Button */}
      <AnimatePresence>
        {showControls && <motion.button initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} exit={{
        opacity: 0
      }} onClick={onClose} className="absolute top-6 right-6 z-10 w-12 h-12 bg-white hover:bg-fuchsia-500 text-black hover:text-white flex items-center justify-center transition-colors shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)]">
            <X size={24} />
          </motion.button>}
      </AnimatePresence>

      {/* Previous Button */}
      <AnimatePresence>
        {showControls && canNavigate && <motion.button initial={{
        opacity: 0,
        x: -20
      }} animate={{
        opacity: 1,
        x: 0
      }} exit={{
        opacity: 0,
        x: -20
      }} onClick={e => {
        e.stopPropagation();
        goToPrev();
      }} className="absolute left-6 z-10 w-12 h-12 bg-white hover:bg-cyan-400 text-black flex items-center justify-center transition-colors shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)]">
            <ChevronLeft size={24} />
          </motion.button>}
      </AnimatePresence>

      {/* Next Button */}
      <AnimatePresence>
        {showControls && canNavigate && <motion.button initial={{
        opacity: 0,
        x: 20
      }} animate={{
        opacity: 1,
        x: 0
      }} exit={{
        opacity: 0,
        x: 20
      }} onClick={e => {
        e.stopPropagation();
        goToNext();
      }} className="absolute right-6 z-10 w-12 h-12 bg-white hover:bg-cyan-400 text-black flex items-center justify-center transition-colors shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)]">
            <ChevronRight size={24} />
          </motion.button>}
      </AnimatePresence>

      {/* Image Display */}
      <AnimatePresence mode="wait">
        <motion.img key={currentIndex} initial={{
        opacity: 0,
        scale: 0.95
      }} animate={{
        opacity: 1,
        scale: 1
      }} exit={{
        opacity: 0,
        scale: 0.95
      }} transition={{
        duration: 0.3
      }} src={images[currentIndex].url} alt={images[currentIndex].alt} className="max-w-[90vw] max-h-[90vh] object-contain" onClick={e => e.stopPropagation()} />
      </AnimatePresence>

      {/* Image Counter */}
      <AnimatePresence>
        {showControls && canNavigate && <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} exit={{
        opacity: 0,
        y: 20
      }} className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-white px-6 py-3 font-mono font-bold text-sm">
            {currentIndex + 1} / {images.length}
          </motion.div>}
      </AnimatePresence>
    </motion.div>;
};

// --- Image Gallery Components ---
const FullBleedImage = ({
  image
}: {
  image: ImageItem;
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  
  return <>
      <motion.div 
        initial={{
          opacity: 0,
          y: 30
        }} 
        whileInView={{
          opacity: 1,
          y: 0
        }} 
        viewport={{
          once: true
        }} 
        transition={{
          duration: 0.6
        }} 
        className="w-full h-[60vh] md:h-[80vh] relative overflow-hidden border-y-4 border-black cursor-pointer"
        onClick={() => setModalOpen(true)}
      >
        <img src={image.url} alt={image.alt} className="w-full h-full object-cover hover:opacity-90 transition-opacity" />
      </motion.div>
      
      <AnimatePresence>
        {modalOpen && (
          <ImageModal 
            images={[image]} 
            initialIndex={0} 
            onClose={() => setModalOpen(false)} 
            showPagination={false}
          />
        )}
      </AnimatePresence>
    </>;
};
const HalfGridImages = ({
  images
}: {
  images: ImageItem[];
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null);
  
  const openModal = (image: ImageItem) => {
    setSelectedImage(image);
    setModalOpen(true);
  };
  
  return <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
        {images.map((image, idx) => (
          <motion.div 
            key={image.id} 
            initial={{
              opacity: 0,
              y: 30
            }} 
            whileInView={{
              opacity: 1,
              y: 0
            }} 
            viewport={{
              once: true
            }} 
            transition={{
              duration: 0.6,
              delay: idx * 0.1
            }} 
            className="w-full h-[50vh] md:h-[70vh] relative overflow-hidden border-2 border-black cursor-pointer"
            onClick={() => openModal(image)}
          >
            <img 
              src={image.url} 
              alt={image.alt} 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" 
            />
          </motion.div>
        ))}
      </div>
      
      <AnimatePresence>
        {modalOpen && selectedImage && (
          <ImageModal 
            images={[selectedImage]} 
            initialIndex={0} 
            onClose={() => setModalOpen(false)} 
            showPagination={false}
          />
        )}
      </AnimatePresence>
    </>;
};
const CarouselImages = ({
  images
}: {
  images: ImageItem[];
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const openModal = (index: number) => {
    setSelectedIndex(index);
    setModalOpen(true);
  };
  return <>
      <div className="py-12 md:py-16 px-6 md:px-12 bg-gray-50">
        <motion.div initial={{
        opacity: 0,
        y: 30
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.6
      }} className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {images.map((image, idx) => <motion.button key={image.id} initial={{
            opacity: 0,
            scale: 0.9
          }} whileInView={{
            opacity: 1,
            scale: 1
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.4,
            delay: idx * 0.05
          }} onClick={() => openModal(idx)} className="group relative aspect-square overflow-hidden border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:-translate-x-1 transition-all">
                <img src={image.url} alt={image.alt} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-fuchsia-500 opacity-0 group-hover:opacity-20 transition-opacity" />
              </motion.button>)}
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {modalOpen && <ImageModal images={images} initialIndex={selectedIndex} onClose={() => setModalOpen(false)} showPagination={true} />}
      </AnimatePresence>
    </>;
};

// --- Main Component ---
export const ProjectShowcasePage = ({
  project,
  onBack,
  onNextProject,
  onPrevProject,
  nextProjectTitle,
  prevProjectTitle
}: ProjectShowcasePageProps) => {
  const [stickyHeader, setStickyHeader] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setStickyHeader(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return <div className="min-h-screen bg-white selection:bg-fuchsia-300 selection:text-fuchsia-900">
      {/* Sticky Header */}
      <motion.header initial={false} animate={{
      backgroundColor: stickyHeader ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0)',
      borderBottomWidth: stickyHeader ? '2px' : '0px'
    }} className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-black transition-all">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <button onClick={onBack} className="flex items-center gap-2 font-bold text-sm uppercase tracking-widest hover:text-fuchsia-600 transition-colors group">
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span>Back</span>
          </button>
          <AnimatePresence>
            {stickyHeader && <motion.h2 initial={{
            opacity: 0,
            y: -10
          }} animate={{
            opacity: 1,
            y: 0
          }} exit={{
            opacity: 0,
            y: -10
          }} className="text-xl md:text-2xl font-black uppercase tracking-tighter">
                {project.title}
              </motion.h2>}
          </AnimatePresence>
          <div className="w-20" /> {/* Spacer for centering */}
        </div>
      </motion.header>

      {/* Hero Section */}
      <div className="pt-24 pb-12 md:pt-32 md:pb-20 px-6 md:px-12 bg-gradient-to-br from-cyan-400 via-fuchsia-500 to-yellow-400">
        <div className="container mx-auto max-w-5xl">
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8
        }} className="space-y-8">
            {/* Keywords */}
            <div className="flex flex-wrap gap-3">
              {project.keywords.map((keyword, idx) => <motion.span key={idx} initial={{
              opacity: 0,
              scale: 0.8
            }} animate={{
              opacity: 1,
              scale: 1
            }} transition={{
              delay: idx * 0.1
            }} className="px-4 py-2 bg-white text-black font-mono font-bold text-xs uppercase tracking-widest border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                  {keyword}
                </motion.span>)}
            </div>

            {/* Title */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase leading-none tracking-tighter text-white drop-shadow-[6px_6px_0px_rgba(0,0,0,1)]">
              {project.title}
            </h1>
          </motion.div>
        </div>
      </div>

      {/* About & Credits Section */}
      <div className="py-16 md:py-24 px-6 md:px-12 bg-white">
        <div className="container mx-auto max-w-5xl grid md:grid-cols-2 gap-12 md:gap-16">
          {/* About */}
          <motion.div initial={{
          opacity: 0,
          x: -30
        }} whileInView={{
          opacity: 1,
          x: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6
        }} className="space-y-6">
            <div className="space-y-2">
              <div className="h-1 w-16 bg-fuchsia-500" />
              <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tight">About</h3>
            </div>
            <p className="text-lg md:text-xl font-medium text-gray-800 leading-relaxed">
              {project.about}
            </p>
          </motion.div>

          {/* Credits */}
          <motion.div initial={{
          opacity: 0,
          x: 30
        }} whileInView={{
          opacity: 1,
          x: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6,
          delay: 0.1
        }} className="space-y-6">
            <div className="space-y-2">
              <div className="h-1 w-16 bg-cyan-400" />
              <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tight">Credits</h3>
            </div>
            <div className="space-y-4">
              {project.credits.map((credit, idx) => <div key={idx} className="flex flex-col md:flex-row md:gap-4">
                  <div className="font-mono font-bold text-sm uppercase tracking-widest text-gray-500 md:w-32">
                    {credit.label}
                  </div>
                  <div className="font-medium text-lg text-gray-800">
                    {credit.value}
                  </div>
                </div>)}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="space-y-0">
        {project.imageGroups.map((group, idx) => <div key={idx}>
            {group.type === 'fullbleed' && group.images.length > 0 && <FullBleedImage image={group.images[0]} />}
            {group.type === 'half' && <HalfGridImages images={group.images} />}
            {group.type === 'carousel' && <CarouselImages images={group.images} />}
          </div>)}
      </div>

      {/* Navigation to Next/Previous Project */}
      {(onNextProject || onPrevProject) && <div className="py-20 px-6 md:px-12 bg-black text-white">
          <div className="container mx-auto max-w-5xl">
            <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight mb-12 text-center">
              More Projects
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              {onPrevProject && prevProjectTitle && <motion.button onClick={onPrevProject} whileHover={{
            scale: 1.02
          }} whileTap={{
            scale: 0.98
          }} className="group p-8 bg-white text-black border-2 border-white hover:bg-cyan-400 transition-colors text-left shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)]">
                  <div className="flex items-center gap-2 mb-4 font-mono text-xs uppercase tracking-widest text-gray-500 group-hover:text-black">
                    <ChevronLeft size={16} />
                    <span>Previous</span>
                  </div>
                  <h4 className="text-2xl md:text-3xl font-black uppercase tracking-tight">
                    {prevProjectTitle}
                  </h4>
                </motion.button>}
              {onNextProject && nextProjectTitle && <motion.button onClick={onNextProject} whileHover={{
            scale: 1.02
          }} whileTap={{
            scale: 0.98
          }} className="group p-8 bg-white text-black border-2 border-white hover:bg-fuchsia-500 hover:text-white transition-colors text-right shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)]">
                  <div className="flex items-center justify-end gap-2 mb-4 font-mono text-xs uppercase tracking-widest text-gray-500 group-hover:text-white">
                    <span>Next</span>
                    <ChevronRight size={16} />
                  </div>
                  <h4 className="text-2xl md:text-3xl font-black uppercase tracking-tight">
                    {nextProjectTitle}
                  </h4>
                </motion.button>}
            </div>
          </div>
        </div>}

      {/* Footer CTA */}
      <div className="py-24 px-6 bg-yellow-400">
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.6
      }} className="container mx-auto max-w-3xl text-center space-y-8">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-black">
            Like What You See?
          </h2>
          <p className="text-xl font-bold text-black">
            Let's create something amazing together.
          </p>
          <button className="px-12 py-5 bg-black text-white font-bold text-lg uppercase tracking-widest hover:bg-fuchsia-600 transition-all shadow-[8px_8px_0px_0px_rgba(0,0,0,0.3)] active:shadow-none active:translate-x-2 active:translate-y-2">
            Start A Project
          </button>
        </motion.div>
      </div>
    </div>;
};

