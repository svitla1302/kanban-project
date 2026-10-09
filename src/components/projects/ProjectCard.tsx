'use client';

import { Pencil, Trash2 } from 'lucide-react';
import { Button } from '../ui/button';
import { ButtonGroup } from '../ui/button-group';
import { Project } from './DataObject';
import type { Card } from '../kanban/DataObject';
import { Link } from 'react-router-dom';

interface ProjectCardProps {
  project: Project;
  cards: Card[];
  onDelete: (id: string) => void;
  onEdit: (card: Project) => void;
}

export default function ProjectCard({
  project,
  cards,
  onEdit,
  onDelete,
}: ProjectCardProps) {
  const taskCount = cards.filter(
    (card) => card.project_id === project.id,
  ).length;

  return (
    <div className="relative bg-card w-full p-2 h-40 mb-2 rounded-3xl shadow-sm border flex flex-col">
      <ButtonGroup orientation={'vertical'} className="absolute top-2 right-2">
        <Button size={'xs'} onClick={() => onEdit(project)}>
          <Pencil />
        </Button>
        <Button size={'xs'} onClick={() => onDelete(project.id)}>
          <Trash2 />
        </Button>
      </ButtonGroup>

      <div className="flex-1 mt-4 ml-2 min-h-0 overflow-y-auto pr-8">
        <p className="break-words">{project.name}</p>
        <p> {taskCount} tasks</p>
      </div>

      <Link to={`/projects/${project.id}`}
      className='bg-ring text-background text-center self-center w-fit rounded-3xl shadow-sm border px-3 py-2'>Open project</Link>
    </div>
  );
}
