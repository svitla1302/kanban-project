'use client';

import KanbanBoard from '@/components/kanban/KanbanBoard';
import ProjectList from '@/components/projects/ProjectList';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppLayout from '@/components/sidebar/AppLayout';
import { ProjectsProvider } from '@/components/projects/ProjectsContext';

export default function App() {
  return (
    <BrowserRouter>
      <ProjectsProvider>
        <AppLayout>
          <Routes>
            <Route path="/" element={<ProjectList />} />

            <Route path="/projects/:projectId" element={<KanbanBoard />} />
          </Routes>
        </AppLayout>
      </ProjectsProvider>
    </BrowserRouter>
  );
}
