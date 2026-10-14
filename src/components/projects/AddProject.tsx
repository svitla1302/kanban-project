'use client';

import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '../ui/dialog';
import { Field, FieldGroup } from '../ui/field';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Project } from './DataObject';
import { useTranslations } from 'next-intl';

interface AddProjectProps {
  onAddProject: (name: string, text: string) => Project;
}

export default function AddProject({ onAddProject }: AddProjectProps) {
  const [projectName, setProjectName] = useState('');
  const [projectText, setProjectText] = useState('');
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const t = useTranslations('AddProject');
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!projectName.trim()) {
      return;
    }
    const newProject = onAddProject(projectName, projectText);

    setOpen(false);
    setProjectName('');
    setProjectText('');

    navigate(`/projects/${newProject.id}`);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button className="mt-4 ml-2 h-12">
            <Plus />
            <h5>{t('addProjectButton')}</h5> 
          </Button>
        }
      />

      <DialogContent className="sm:max-w-sm">
        <form
          onSubmit={handleSubmit}
        >
          <DialogHeader>
            <DialogTitle>{t('dialogTitle')}</DialogTitle>
            <DialogDescription>{t('dialogDescription')}</DialogDescription>
          </DialogHeader>

          <FieldGroup>
            <Field>
              <Label htmlFor="project-name">{t('projectName')}</Label>
              <Input
                id="project-name"
                name="name"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
              />
            </Field>
            <Field>
              <Label htmlFor="project-text">{t('projectText')}</Label>
              <Input
                id="project-text"
                name="text"
                value={projectText}
                onChange={(e) => setProjectText(e.target.value)}
              />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose render={<Button variant="outline">{t('dialogFooter.close')}</Button>} />
            <Button type="submit">{t('dialogFooter.save')}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
