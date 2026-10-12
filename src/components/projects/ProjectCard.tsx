'use client';

import { Pencil, Trash2 } from 'lucide-react';
import { Button } from '../ui/button';
import { ButtonGroup } from '../ui/button-group';
import { Project } from './DataObject';
import type { Card } from '../kanban/DataObject';
import { Link } from 'react-router-dom';

type ViewMode = 'grid' | 'list';

interface ProjectCardProps {
  project: Project;
  cards: Card[];
  onDelete: (id: string) => void;
  onEdit: (project: Project) => void;
  viewMode: ViewMode;
}

export default function ProjectCard({
  project,
  cards,
  onEdit,
  onDelete,
  viewMode,
}: ProjectCardProps) {
  const taskCount = cards.filter(
    (card) => card.project_id === project.id,
  ).length;

  return (
    <div
      className={`relative w-full bg-card p-3 rounded-3xl shadow-sm border ${viewMode === 'grid' ? 'h-40 flex flex-col' : 'min-h-20 flex flex-col sm:flex-row sm:items-center gap-3'}`}
    >
      <div
        className={`min-w-0 ${viewMode === 'grid' ? 'flex-1 mt-4 ml-2 min-h-0 overflow-y-auto pr-12 mr-8' : 'flex-1 sm:ml-2'}`}
      >
        <p className="break-words">{project.name}</p>
      </div>
      <p
        className={`text-sm text-muted-foreground ${viewMode === 'grid' ? 'ml-4' : 'sm:whitespace-nowrap'}`}
      >
        {taskCount} tasks
      </p>

      <div
        className={`flex items-center gap-2 ${viewMode === 'grid' ? 'mt-auto self-center' : 'self-end sm:self-auto sm:ml-auto'}`}
      >
        <Link
          to={`/projects/${project.id}`}
          className="bg-ring text-background text-center self-center w-fit rounded-3xl shadow-sm border px-3 py-2"
        >
          Open project
        </Link>

        <ButtonGroup orientation={viewMode === 'grid' ? 'vertical' : 'horizontal'} className={viewMode === 'grid' ? 'absolute top-2 right-2' : 'shrink-0'}>
        <Button size={'xs'} onClick={() => onEdit(project)}>
          <Pencil />
        </Button>
        <Button size={'xs'} onClick={() => onDelete(project.id)}>
          <Trash2 />
        </Button>
      </ButtonGroup>
      </div>
    </div>
    // <div className="relative bg-card w-full p-2 h-40 mb-2 rounded-3xl shadow-sm border flex flex-col">
    //   <ButtonGroup orientation={'vertical'} className="absolute top-2 right-2">
    //     <Button size={'xs'} onClick={() => onEdit(project)}>
    //       <Pencil />
    //     </Button>
    //     <Button size={'xs'} onClick={() => onDelete(project.id)}>
    //       <Trash2 />
    //     </Button>
    //   </ButtonGroup>

    //   <div className="flex-1 mt-4 ml-2 min-h-0 overflow-y-auto pr-8">
    //     <p className="break-words">{project.name}</p>
    //   </div>
    //   <p className='ml-4 text-color-primary'> {taskCount} tasks</p>

    //   <Link to={`/projects/${project.id}`}
    //   className='bg-ring text-background text-center self-center w-fit rounded-3xl shadow-sm border px-3 py-2'>Open project</Link>
    // </div>
  );
}
