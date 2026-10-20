'use client';

import { useEffect, useState } from 'react';
import ProjectCard from './ProjectCard';
import { projectsData, type Project } from './DataObject';
import type { Card } from '../kanban/DataObject';
import EditProject from './EditProject';
import AddProject from './AddProject';
import { useProjects } from './ProjectsContext';
import { Button } from '../ui/button';
import { LayoutGrid, List } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function ProjectList() {
  const { projects, setProjects, cards, setCards } = useProjects();
  const [editingProject, setEdititngProject] = useState<Project | null>(null);
  const [editOpen, setEditOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isViewModeLoaded, setIsViewModeLoaded] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const t = useTranslations('ProjectsList');

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    const savedViewMode = localStorage.getItem('kanban-projects-view-mode');

    if (savedViewMode === 'grid' || savedViewMode === 'list') {
      setViewMode(savedViewMode);
    }

    setIsViewModeLoaded(true);
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  useEffect(() => {
    if (!isViewModeLoaded) return;

    localStorage.setItem('kanban-projects-view-mode', viewMode);
  }, [viewMode, isViewModeLoaded]);

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    try {
      const savedProjects = localStorage.getItem('kanban-projects');

      if (savedProjects !== null) {
        setProjects(JSON.parse(savedProjects));
      } else {
        setProjects(projectsData);
      }
    } catch {
      setProjects([]);
    }

    setIsLoaded(true);
  }, [setProjects]);

  /* eslint-enable react-hooks/set-state-in-effect */

  useEffect(() => {
    if (!isLoaded) return;

    localStorage.setItem('kanban-projects', JSON.stringify(projects));
  }, [projects, isLoaded]);

  function deleteProject(id: string) {
    setProjects((prevProjects) =>
      prevProjects.filter((project) => project.id !== id),
    );
    setCards((prevCards) => prevCards.filter((card) => card.project_id !== id));

    try {
      const savedCards = localStorage.getItem('kanban-cards');

      if (savedCards) {
        const cardsFromStorage: Card[] = JSON.parse(savedCards);
        const updateCards = cardsFromStorage.filter(
          (card) => card.project_id !== id,
        );

        localStorage.setItem('kanban-cards', JSON.stringify(updateCards));
      }
    } catch (error) {
      console.error('Failed to update saved cards:', error);
    }
  }

  function handleEditProject(project: Project) {
    setEdititngProject(project);
    setEditOpen(true);
  }

  function editProject(id: string, name: string, text: string) {
    setProjects((prevProject) =>
      prevProject.map((project) => {
        if (project.id !== id) {
          return project;
        }

        return {
          ...project,
          name,
          text,
        };
      }),
    );
  }

  function addProject(name: string, text: string) {
    const newProject = {
      id: crypto.randomUUID(),
      name,
      text,
      position: projects.length,
    };

    setProjects((prevProjects) => [...prevProjects, newProject]);

    return newProject;
  }

  return (
    <>
      {editingProject && (
        <EditProject
          key={editingProject.id}
          project={editingProject}
          open={editOpen}
          onOpenChange={setEditOpen}
          onEditProject={editProject}
        />
      )}
      <div className="mt-2">
        <h1 className="text-4xl text-ring font-bold text-center font-heading">
          {t('header')}
        </h1>

        <div className="mt-4 flex px-2 items-center justify-between gap-2">
          <AddProject onAddProject={addProject} />

          <div className="flex items-center gap-1">
            <Button
              variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
              size="icon"
              onClick={() => setViewMode('grid')}
              aria-label="Grid view"
              aria-pressed={viewMode === 'grid'}
            >
              <LayoutGrid />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'secondary' : 'ghost'}
              size="icon"
              onClick={() => setViewMode('list')}
              aria-label="List view"
              aria-pressed={viewMode === 'list'}
            >
              <List />
            </Button>
          </div>
        </div>

        <div
          className={
            viewMode === 'grid'
              ? 'mt-8 ml-4 grid grid-cols-[repeat(auto-fit,minmax(280px,320px))] gap-4'
              : 'mt-8 ml-4 flex flex-col gap-2'
          }
        >
          {projects.length === 0 ? (
            <p className="col-span-full py-12 text-center text-muted-foreground">
              {t('firstProject')}
            </p>
          ) : (
            projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                cards={cards}
                onDelete={deleteProject}
                onEdit={handleEditProject}
                viewMode={viewMode}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
}
