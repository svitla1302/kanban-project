'use client';

import { Pencil, Trash2 } from 'lucide-react';
import { Button } from '../ui/button';
import { ButtonGroup } from '../ui/button-group';
import { Project } from './DataObject';
import type { Card } from '../kanban/DataObject';
import { Link } from 'react-router-dom';
import { useTranslations } from 'next-intl';

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
  const t = useTranslations('ProjectCard');

  const taskCount = cards.filter(
    (card) => card.project_id === project.id,
  ).length;

  return (
    <div
      className={`relative w-full bg-card rounded-3xl overflow-hidden shadow-sm border ${viewMode === 'grid' ? 'h-50 flex flex-col' : 'min-h-20 flex flex-col sm:flex-row gap-3'}`}
    >
      <div
        className={`bg-primary min-w-0 px-4 py-3 ${viewMode === 'grid' ? 'w-full shrink-0' : 'w-full sm:w-1/4 sm:self-stretch sm:flex sm:items-stretch sm:gap-3'}`}
      >
        <ButtonGroup
          orientation={viewMode === 'grid' ? 'horizontal' : 'vertical'}
          className={
            viewMode === 'grid'
              ? 'absolute top-2 right-2'
              : 'shrink-0 self-stretch'
          }
        >
          <Button
            size="lg"
            className={viewMode === 'list' ? 'flex-1 rounded-none' : ''}
            onClick={() => onEdit(project)}
          >
            <Pencil />
          </Button>
          <Button
            size="lg"
            className={viewMode === 'list' ? 'flex-1 rounded-none' : ''}
            onClick={() => onDelete(project.id)}
          >
            <Trash2 />
          </Button>
        </ButtonGroup>

        <div className="min-w-0 flex-1 flex items-center">
          <h5
            className={`break-words text-secondary ${viewMode === 'grid' ? 'pr-16' : 'ml-6'}`}
          >
            {project.name}
          </h5>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4 min-h-0 min-w-0">
        <div className="min-h-0 flex-1 overflow-y-auto">
          <p className="break-words">{project.text}</p>
        </div>
      </div>

      <div
        className={`shrink-0 ${viewMode === 'grid' ? 'flex flex-col items-center gap-2 pt-2 pb-2' : 'mt-2 pr-2 flex items-center justify-between gap-3'}`}
      >
        <p className={`text-sm text-muted-foreground `}>
          {t('tasksCount', { count: taskCount })}
        </p>
        <Link
          to={`/projects/${project.id}`}
          className="bg-ring text-background text-center self-center w-fit rounded-3xl shadow-sm border px-3 py-2"
        >
          {t('openProject')}
        </Link>
      </div>
    </div>
  );
}
