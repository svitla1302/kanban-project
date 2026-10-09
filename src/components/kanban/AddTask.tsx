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
import { columnsData } from './DataObject';
import { useState } from 'react';
import { Plus } from 'lucide-react';

interface AddTaskProps {
  onAddTask: (text: string, columnId: string) => void;
}

export default function AddTask({ onAddTask }: AddTaskProps) {
  const [selectedColumn, setSelectedColumn] = useState('');
  const [taskText, setTaskText] = useState('');
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button className='mt-4 ml-2'>
            <Plus />
            Add Task
          </Button>
        }
      />

      <DialogContent className="sm:max-w-sm">
        <form
          onSubmit={(e) => {
            e.preventDefault();

            if (!taskText.trim() || !selectedColumn) {
              return;
            }

            onAddTask(taskText, selectedColumn);
            setOpen(false);
            setTaskText('');
            setSelectedColumn('');
          }}
        >
          <DialogHeader>
            <DialogTitle>Add task</DialogTitle>
            <DialogDescription>Create new task</DialogDescription>
          </DialogHeader>

          <FieldGroup>
            <Field>
              <Label htmlFor="task">Task</Label>
              <Input
                id="task"
                name="name"
                value={taskText}
                onChange={(e) => setTaskText(e.target.value)}
              />
            </Field>
            <Field>
              <Select
                value={selectedColumn}
                onValueChange={(value) => setSelectedColumn(value ?? '')}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select column" />
                </SelectTrigger>

                <SelectContent>
                  <SelectGroup>
                    {columnsData.map((column) => (
                      <SelectItem key={column.id} value={column.id}>
                        {column.text}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
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
