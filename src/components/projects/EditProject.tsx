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
import {
  Select,
  SelectTrigger,
  SelectItem,
  SelectValue,
  SelectContent,
  SelectGroup,
} from '../ui/select';
import { useState, useEffect } from 'react';
import type { Project } from './DataObject';


interface EditProjectProps {
  project: Project;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEditProject: (id: string, name: string) => void;
}

export default function EditProject({
  project,
  open,
  onOpenChange,
  onEditProject,
}: EditProjectProps) {
  const [projectName, setProjectName] = useState(project.name);

  useEffect(() => {
    setProjectName(project.name);
  }, [project]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <form
          onSubmit={(e) => {
            e.preventDefault();

            if (!projectName.trim()) {
              return;
            }

            onEditProject(project.id, projectName);
            onOpenChange(false);
          }}
        >
          <DialogHeader>
            <DialogTitle>Edit project</DialogTitle>
            <DialogDescription>Make changes to your project</DialogDescription>
          </DialogHeader>

          <FieldGroup>
            <Field>
              <Label htmlFor="project">project</Label>
              <Input
                id="project"
                name="name"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
              />
            </Field>
            
          </FieldGroup>
          <DialogFooter>
            <DialogClose render={<Button variant="outline">Cancel</Button>} />
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
