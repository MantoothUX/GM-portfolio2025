import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Container, Theme } from './settings/types';
import { BrandDesignStudio } from './components/generated/BrandDesignStudio';
import { ProjectPage } from './pages/ProjectPage';
import { WorkPage } from './pages/WorkPage';
import { ScrollRestoration } from './components/ScrollRestoration';

let theme: Theme = 'light';
// only use 'centered' container for standalone components, never for full page apps or websites.
let container: Container = 'none';

function App() {
  function setTheme(theme: Theme) {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  setTheme(theme);

  return (
    <BrowserRouter>
      <ScrollRestoration />
      <Routes>
        <Route path="/" element={<BrandDesignStudio />} />
        <Route path="/work" element={<WorkPage />} />
        <Route path="/project/:id" element={<ProjectPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;