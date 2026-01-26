import { useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { ProjectShowcasePage } from '../components/generated/ProjectShowcasePage';
import { getProjectById, getProjectIndex, projects } from '../data/projects';

export function ProjectPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  // Scroll to top when project page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!id) {
    navigate('/');
    return null;
  }

  const project = getProjectById(id);
  const currentIndex = getProjectIndex(id);

  if (!project) {
    navigate('/');
    return null;
  }

  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;

  const handleBack = () => {
    // Get the saved path from where user came from
    const savedPath = sessionStorage.getItem('scrollPath');
    
    if (savedPath === '/work') {
      // Navigate to work page
      navigate('/work');
    } else if (savedPath === '/') {
      // Navigate to home page with state to scroll to projects
      navigate('/', { state: { scrollToProjects: true } });
      // Use setTimeout to ensure navigation completes and component renders
      setTimeout(() => {
        const projectsSection = document.getElementById('projects');
        if (projectsSection) {
          projectsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 300);
    } else {
      // Default to work page if no saved path (e.g., direct link to project)
      navigate('/work');
    }
  };

  const handleNextProject = () => {
    if (nextProject) {
      navigate(`/project/${nextProject.id}`);
    }
  };

  const handlePrevProject = () => {
    if (prevProject) {
      navigate(`/project/${prevProject.id}`);
    }
  };

  return (
    <ProjectShowcasePage
      project={project}
      onBack={handleBack}
      onNextProject={nextProject ? handleNextProject : undefined}
      onPrevProject={prevProject ? handlePrevProject : undefined}
      nextProjectTitle={nextProject?.title}
      prevProjectTitle={prevProject?.title}
    />
  );
}

