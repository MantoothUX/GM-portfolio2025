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
    // Navigate back - scroll restoration is handled by ScrollRestoration component
    navigate(-1);
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

