import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { PROJECTS } from '../components/generated/BrandDesignStudio';
import { PROJECT_ID_MAP } from '../components/generated/BrandDesignStudio';
import { Navigation } from '../components/Navigation';

export function WorkPage() {
  const [isScrolled, setIsScrolled] = useState(false);

  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Handle scroll for nav styling
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

  return (
    <div className="min-h-screen bg-white">
      <Navigation isScrolled={isScrolled} />
      <div className="pt-24 pb-24">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-8"
          >
            <div>
              <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-4">
                All Work
              </h1>
              <div className="h-2 w-24 bg-fuchsia-600"></div>
            </div>
            <p className="max-w-md text-gray-600 font-medium text-lg">
              A complete collection of our projects from the last few years. We take pride in every pixel.
            </p>
          </motion.div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {PROJECTS.map((project, idx) => {
            const projectId = PROJECT_ID_MAP[project.title];
            return projectId ? (
              <Link key={project.id} to={`/project/${projectId}`}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="group cursor-pointer"
                >
                  <div className="relative overflow-hidden aspect-[4/3] mb-6 border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:-translate-x-1 transition-all duration-300">
                    <div
                      className={`absolute inset-0 ${project.color} opacity-20 group-hover:opacity-0 transition-opacity z-10`}
                    />
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
                    />
                    <div className="absolute bottom-0 left-0 bg-white border-t-2 border-r-2 border-black px-4 py-2 z-20">
                      <span className="font-mono text-sm uppercase tracking-wider font-bold">
                        {project.category}
                      </span>
                    </div>
                  </div>
                  <h4 className="text-3xl font-black uppercase tracking-tight group-hover:text-fuchsia-600 transition-colors">
                    {project.title}
                  </h4>
                  <div className="flex items-center gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity transform -translate-x-4 group-hover:translate-x-0 duration-300">
                    <span className="text-sm font-bold uppercase tracking-widest">View Case Study</span>
                    <ArrowRight size={16} />
                  </div>
                </motion.div>
              </Link>
            ) : (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden aspect-[4/3] mb-6 border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:-translate-x-1 transition-all duration-300">
                  <div
                    className={`absolute inset-0 ${project.color} opacity-20 group-hover:opacity-0 transition-opacity z-10`}
                  />
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
                  />
                  <div className="absolute bottom-0 left-0 bg-white border-t-2 border-r-2 border-black px-4 py-2 z-20">
                    <span className="font-mono text-sm uppercase tracking-wider font-bold">
                      {project.category}
                    </span>
                  </div>
                </div>
                <h4 className="text-3xl font-black uppercase tracking-tight group-hover:text-fuchsia-600 transition-colors">
                  {project.title}
                </h4>
                <div className="flex items-center gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity transform -translate-x-4 group-hover:translate-x-0 duration-300">
                  <span className="text-sm font-bold uppercase tracking-widest">View Case Study</span>
                  <ArrowRight size={16} />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
      </div>
    </div>
  );
}

