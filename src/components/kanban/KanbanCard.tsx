"use client";

interface KanbanCardProps {
  card: {
    id: string;
    column_id: string;
    text: string;
    status: string;
    position: number;
  };
  draggedCardId: string | null;
  onDragStart: (id: string, columnId: string) => void;
  onDrop: (
    draggedCardId: string,
    targetColumnId: string,
    targetCardId?: string
  ) => void;
}

export default function KanbanCard({
  card,
  draggedCardId,
  onDragStart,
  onDrop,
}: KanbanCardProps) {
  return (
    <div
      className="bg-green-200 p-4 h-40 mb-2 rounded"
      draggable
      onDragStart={() => { onDragStart(card.id, card.column_id) }}
      onDragOver={(e) => { e.preventDefault() }}
      onDrop={(e) => {
        e.stopPropagation();

        if (draggedCardId) {
          onDrop(
            draggedCardId,
            card.column_id,
            card.id
          )
        }
      }}>
      
        <p>{card.text}</p>
        <p className="text-lime-50">{card.status}</p>
      </div>
  )
}