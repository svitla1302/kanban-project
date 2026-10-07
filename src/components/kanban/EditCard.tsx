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
import { columnsData } from './DataObject';
import { useState, useEffect } from 'react';
import type { Card } from './DataObject';

interface EditCardProps {
  card: Card;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEditCard: (id: string, text: string, columnId: string) => void;
}

export default function EditCard({
  card,
  open,
  onOpenChange,
  onEditCard,
}: EditCardProps) {
  console.log('editing card:', card);
  const [selectedColumn, setSelectedColumn] = useState(card.column_id);
  const [taskText, setTaskText] = useState(card.text);

  useEffect(() => {
    setTaskText(card.text);
    setSelectedColumn(card.column_id);
  }, [card]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <form
          onSubmit={(e) => {
            e.preventDefault();

            if (!taskText.trim() || !selectedColumn) {
              return;
            }

            onEditCard(card.id, taskText, selectedColumn);
            onOpenChange(false);
          }}
        >
          <DialogHeader>
            <DialogTitle>Edit task</DialogTitle>
            <DialogDescription>Make changes to your task</DialogDescription>
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
