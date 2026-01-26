import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout, HomePage, ProjectsPage, ProjectDetailPage } from './components/Page1';
import { Agentation } from 'agentation';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/project/:id" element={<ProjectDetailPage />} />
        </Routes>
      </Layout>
      {import.meta.env.DEV && <Agentation />}
    </BrowserRouter>
  );
}

export default App;
