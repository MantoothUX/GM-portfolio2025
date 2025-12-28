import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Palette, Monitor, Layers } from 'lucide-react';
import { Navigation } from '../components/Navigation';

const PRICING_PLANS = [
  {
    name: 'Startup',
    price: '$2,500',
    features: ['Logo Design', 'Brand Guidelines', 'Business Card Design', 'Social Media Kit'],
    color: 'bg-yellow-300',
    textColor: 'text-black'
  },
  {
    name: 'Growth',
    price: '$5,000',
    features: ['Everything in Startup', 'Web Design (5 pages)', 'SEO Basic Setup', 'Email Template'],
    color: 'bg-fuchsia-500',
    textColor: 'text-white'
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    features: ['Full Brand Strategy', 'Custom Web Application', 'Motion Graphics', 'Priority Support'],
    color: 'bg-cyan-500',
    textColor: 'text-black'
  }
];

export function AboutPage() {
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
    <div className="min-h-screen bg-gray-50">
      <Navigation isScrolled={isScrolled} />
      <div className="pt-24 pb-24">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="mb-20 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-8"
            >
              About <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-600 to-yellow-500">Us</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl max-w-3xl mx-auto font-bold text-gray-800"
            >
              We are a collective of digital craftsmen, brand strategists, and creative technologists obsessed with quality.
            </motion.p>
          </div>

          {/* What We Do */}
          <div className="grid md:grid-cols-3 gap-8 mb-24">
            {[
              {
                icon: <Palette size={40} />,
                title: 'Brand Identity',
                desc: 'Logos, color systems, and visual languages that stand the test of time.',
                color: 'bg-cyan-100 border-cyan-500'
              },
              {
                icon: <Monitor size={40} />,
                title: 'Digital Design',
                desc: 'Websites, apps, and interfaces that feel as good as they look.',
                color: 'bg-fuchsia-100 border-fuchsia-500'
              },
              {
                icon: <Layers size={40} />,
                title: 'Strategy',
                desc: 'Market positioning and brand architecture to help you scale.',
                color: 'bg-yellow-100 border-yellow-500'
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className={`p-8 border-2 ${item.color.split(' ')[1]} ${item.color.split(' ')[0]} rounded-lg hover:-translate-y-2 transition-transform duration-300`}
              >
                <div className="mb-6 p-4 bg-white border-2 border-black inline-block rounded-full shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-black uppercase mb-4">{item.title}</h3>
                <p className="text-gray-700 font-medium leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Pricing */}
          <div className="mb-24">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-4">Simple Pricing</h2>
              <p className="text-gray-600">No hidden fees. No surprises. Just great work.</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8 items-start">
              {PRICING_PLANS.map((plan, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`relative border-2 border-black p-8 ${plan.color} ${plan.textColor} shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]`}
                >
                  {i === 1 && (
                    <div className="absolute top-0 right-0 bg-black text-white text-xs font-bold px-3 py-1 uppercase tracking-widest transform translate-x-2 -translate-y-4">
                      Most Popular
                    </div>
                  )}
                  <h3 className="text-2xl font-black uppercase mb-2">{plan.name}</h3>
                  <div className="text-4xl font-black mb-8">{plan.price}</div>
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 font-medium">
                        <div className="w-2 h-2 bg-current rounded-full" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button className="w-full py-4 bg-black text-white font-bold uppercase tracking-widest hover:opacity-80 transition-opacity">
                    Choose Plan
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

