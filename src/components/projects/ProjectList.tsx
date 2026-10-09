'use client';

import { useState } from 'react';
import ProjectCard from './ProjectCard';
import { projectsData, type Project } from './DataObject';
import { cardsData } from '../kanban/DataObject';
import type { Card } from '../kanban/DataObject';
import EditProject from './EditProject';
import AddProject from './AddProject';

interface Props {}

export default function ProjectList() {
  const [cards, setCards] = useState<Card[]>(cardsData);
  const [projects, setProjects] = useState<Project[]>(projectsData);
  const [editingProject, setEdititngProject] = useState<Project | null>(null);
  const [editOpen, setEditOpen] = useState(false);

  function deleteProject(id: string) {
    setCards((prevCards) => prevCards.filter((card) => card.id !== id));
  }

  function handleEditProject(project: Project) {
    setEdititngProject(project);
    setEditOpen(true);
  }

  function editProject(id: string, name: string) {
    setProjects((prevProject) =>
      prevProject.map((project) => {
        if (project.id !== id) {
          return project;
        }

        return {
          ...project,
          name,
        };
      }),
    );
  }

  function addProject(name: string) {
    const newProject = {
      id: crypto.randomUUID(),
      name,
      position: projects.length,
    };

    setProjects((prevProjects) => [...prevProjects, newProject]);

    return newProject;
  }

  return (
    <>
      {editingProject && (
        <EditProject
          project={editingProject}
          open={editOpen}
          onOpenChange={setEditOpen}
          onEditProject={editProject}
        />
      )}
      <div className="mt-8">
        <h1 className="text-4xl text-ring font-bold text-center font-['Pacifico',_cursive]">
          Your projects
        </h1>
        <AddProject onAddProject={addProject} />
        <div className="mt-4 p-2 grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-4">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              cards={cards}
              onDelete={deleteProject}
              onEdit={handleEditProject}
            />
          ))}
        </div>
      </div>
    </>
  );
}
