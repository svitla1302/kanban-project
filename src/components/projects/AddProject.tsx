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
import {
  Select,
  SelectTrigger,
  SelectItem,
  SelectValue,
  SelectContent,
  SelectGroup,
} from '../ui/select';
import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Project } from './DataObject';

interface AddProjectProps {
  onAddProject: (name: string) => Project;
}

export default function AddProject({ onAddProject }: AddProjectProps) {
  const [projectName, setProjectName] = useState('');
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!projectName.trim()) {
      return;
    }
    const newProject = onAddProject(projectName);

    setOpen(false);
    setProjectName('');

    navigate(`/projects/${newProject.id}`);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button className="mt-4 ml-2">
            <Plus />
            Create new project
          </Button>
        }
      />

      <DialogContent className="sm:max-w-sm">
        <form
          onSubmit={handleSubmit}
        >
          <DialogHeader>
            <DialogTitle>Add project</DialogTitle>
            <DialogDescription>Create new project</DialogDescription>
          </DialogHeader>

          <FieldGroup>
            <Field>
              <Label htmlFor="project">Project name</Label>
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
