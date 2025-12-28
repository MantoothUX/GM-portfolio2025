import { ProjectData } from '../components/generated/ProjectShowcasePage';

export const projects: ProjectData[] = [
  {
    id: 'neon-dreams',
    title: 'Neon Dreams',
    keywords: ['Brand Identity', 'Digital Design', 'Art Direction'],
    about: 'A bold reimagining of urban nightlife culture through the lens of contemporary design. We crafted a complete visual identity that captures the electric energy of neon-lit streets and the pulse of modern city life. Every element was designed to evoke emotion and create an unforgettable brand experience.',
    credits: [
      { label: 'Client', value: 'Neon Dreams Studio' },
      { label: 'Creative Direction', value: 'Jane Smith' },
      { label: 'Design Lead', value: 'John Doe' },
      { label: 'Timeline', value: '8 Weeks' },
      { label: 'Year', value: '2024' }
    ],
    imageGroups: [
      {
        type: 'fullbleed',
        images: [{
          id: '1',
          url: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop',
          alt: 'Hero image'
        }]
      },
      {
        type: 'half',
        images: [
          {
            id: '2',
            url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964&auto=format&fit=crop',
            alt: 'Brand mockup 1'
          },
          {
            id: '3',
            url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop',
            alt: 'Brand mockup 2'
          }
        ]
      },
      {
        type: 'fullbleed',
        images: [{
          id: '4',
          url: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=2070&auto=format&fit=crop',
          alt: 'Full width showcase'
        }]
      },
      {
        type: 'carousel',
        images: [
          {
            id: '5',
            url: 'https://images.unsplash.com/photo-1555529733-0e670560f7e1?q=80&w=2070&auto=format&fit=crop',
            alt: 'Detail 1'
          },
          {
            id: '6',
            url: 'https://images.unsplash.com/photo-1515630278258-407f66498911?q=80&w=1996&auto=format&fit=crop',
            alt: 'Detail 2'
          },
          {
            id: '7',
            url: 'https://images.unsplash.com/photo-1534293655119-923eb461e719?q=80&w=1951&auto=format&fit=crop',
            alt: 'Detail 3'
          },
          {
            id: '8',
            url: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2070&auto=format&fit=crop',
            alt: 'Detail 4'
          }
        ]
      }
    ]
  },
  {
    id: 'retro-future',
    title: 'Retro Future',
    keywords: ['Web Design', 'UI/UX', 'Digital'],
    about: 'A fusion of nostalgic aesthetics with cutting-edge web technologies. This project explores how retro design elements can be reimagined for modern digital experiences, creating a unique visual language that bridges past and future.',
    credits: [
      { label: 'Client', value: 'Retro Future Inc' },
      { label: 'Creative Direction', value: 'Alex Johnson' },
      { label: 'Design Lead', value: 'Sarah Williams' },
      { label: 'Timeline', value: '12 Weeks' },
      { label: 'Year', value: '2024' }
    ],
    imageGroups: [
      {
        type: 'fullbleed',
        images: [{
          id: 'rf-1',
          url: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=2070&auto=format&fit=crop',
          alt: 'Retro Future hero'
        }]
      },
      {
        type: 'half',
        images: [
          {
            id: 'rf-2',
            url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop',
            alt: 'Web design 1'
          },
          {
            id: 'rf-3',
            url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964&auto=format&fit=crop',
            alt: 'Web design 2'
          }
        ]
      }
    ]
  },
  {
    id: 'cyber-pulse',
    title: 'Cyber Pulse',
    keywords: ['Motion Design', 'Animation', 'Brand Identity'],
    about: 'An electrifying motion design project that brings static brand elements to life. Through dynamic animations and fluid transitions, we created a visual identity that pulses with energy and captures the essence of digital innovation.',
    credits: [
      { label: 'Client', value: 'Cyber Pulse Media' },
      { label: 'Creative Direction', value: 'Mike Chen' },
      { label: 'Design Lead', value: 'Emma Davis' },
      { label: 'Timeline', value: '6 Weeks' },
      { label: 'Year', value: '2024' }
    ],
    imageGroups: [
      {
        type: 'fullbleed',
        images: [{
          id: 'cp-1',
          url: 'https://images.unsplash.com/photo-1515630278258-407f66498911?q=80&w=1996&auto=format&fit=crop',
          alt: 'Cyber Pulse hero'
        }]
      },
      {
        type: 'carousel',
        images: [
          {
            id: 'cp-2',
            url: 'https://images.unsplash.com/photo-1534293655119-923eb461e719?q=80&w=1951&auto=format&fit=crop',
            alt: 'Motion frame 1'
          },
          {
            id: 'cp-3',
            url: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2070&auto=format&fit=crop',
            alt: 'Motion frame 2'
          },
          {
            id: 'cp-4',
            url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2070&auto=format&fit=crop',
            alt: 'Motion frame 3'
          }
        ]
      }
    ]
  }
];

export const getProjectById = (id: string): ProjectData | undefined => {
  return projects.find(project => project.id === id);
};

export const getProjectIndex = (id: string): number => {
  return projects.findIndex(project => project.id === id);
};

