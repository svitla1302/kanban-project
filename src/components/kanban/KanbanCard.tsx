'use client';

import { Pencil, Trash2 } from 'lucide-react';
import { Button } from '../ui/button';
import { ButtonGroup } from '../ui/button-group';
import { Card } from './DataObject';
import { CheckCheck } from 'lucide-react';

interface KanbanCardProps {
  card: Card;
  draggedCardId: string | null;
  onDragStart: (id: string, columnId: string) => void;
  onDrop: (
    draggedCardId: string,
    targetColumnId: string,
    targetCardId?: string,
  ) => void;
  onDelete: (id: string) => void;
  onEdit: (card: Card) => void;
  onDone: (id: string) => void;
}

export default function KanbanCard({
  card,
  draggedCardId,
  onDragStart,
  onDrop,
  onEdit,
  onDelete,
  onDone,
}: KanbanCardProps) {
  const showAction =
    card.column_id === 'todo' || card.column_id === 'inprogress';
  return (
    <div
      className="relative bg-card p-4 h-40 mb-2 rounded-3xl shadow-sm border flex flex-col"
      draggable
      onDragStart={() => {
        onDragStart(card.id, card.column_id);
      }}
      onDragOver={(e) => {
        e.preventDefault();
      }}
      onDrop={(e) => {
        e.stopPropagation();

        if (draggedCardId) {
          onDrop(draggedCardId, card.column_id, card.id);
        }
      }}
    >
      {showAction && (
        <Button
          size={'xs'}
          className="absolute top-2 left-2"
          onClick={() => onDone(card.id)}
        >
          <CheckCheck />
        </Button>
      )}

      <ButtonGroup orientation={'vertical'} className="absolute top-2 right-2">
        <Button size={'xs'} onClick={() => onEdit(card)}>
          <Pencil />
        </Button>
        <Button size={'xs'} onClick={() => onDelete(card.id)}>
          <Trash2 />
        </Button>
      </ButtonGroup>

      <div className='flex-1 mt-4 min-h-0 overflow-y-auto pr-2'>
        <p className="break-words">{card.text}</p>
      </div>
      

      <p className="text-muted-foreground bg-muted shrink-0 mt-2 text-center">{card.status}</p>
    </div>
  );
}
