'use client';

import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '../ui/dialog';
import { Field, FieldGroup } from '../ui/field';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { useState} from 'react';
import type { Project } from './DataObject';
import { useTranslations } from 'next-intl';


interface EditProjectProps {
  project: Project;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEditProject: (id: string, name: string, text: string) => void;
}

export default function EditProject({
  project,
  open,
  onOpenChange,
  onEditProject,
}: EditProjectProps) {
  const [projectName, setProjectName] = useState(project.name);
  const [projectText, setProjectText] = useState(project.text);

  const t = useTranslations('EditProject');


  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <form
          onSubmit={(e) => {
            e.preventDefault();

            if (!projectName.trim()) {
              return;
            }

            onEditProject(project.id, projectName, projectText);
            onOpenChange(false);
          }}
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
