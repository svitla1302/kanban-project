import { Card } from "./DataObject";
import KanbanCard from "./KanbanCard";

interface KanbanColumnProps {
  column: {
    id: string;
    text: string;
    status: string;
  };
  cards: Card[];
  draggedCardId: string | null;
  onDragStart: (id: string, columnId: string) => void;
  onDrop: (
    draggedCardId: string,
    targetColumnId: string,
    targetCardId?: string
  ) => void;
  onDelete: (id: string) => void;
  onEdit: (card: Card) => void;
  onDone: (id: string) => void;
}

export default function KabanColumn({
  column,
  cards,
  draggedCardId,
  onDragStart,
  onDrop,
  onEdit,
  onDelete,
  onDone
}: KanbanColumnProps) {

  const columnCards = cards
    .filter((card) => card.column_id === column.id)
    .sort((a, b) => a.position - b.position);

  return (
    <div 
      className="bg-card p-2 w-full mr-2 px-8 py-2 h-160 flex flex-col">
        <div className="bg-muted font-bold text-center rounded-3xl shadow-sm border">
          <p className="text-xl text-chart-3 font-['Pacifico',_cursive]">{column.text}</p>
        </div>

        <div 
          className="mt-2 mb-2 p-2 bg-muted flex-1 overflow-auto rounded-xl shadow-sm border" 
          onDragOver={(e) => {
            e.preventDefault();
          }}
          onDrop={(e) => {
            e.stopPropagation(); 
            
            if (draggedCardId) {
              onDrop(
                draggedCardId,
                column.id
              );
            }
          }}
        >
          {
            columnCards.map((card) => 
              (
                <KanbanCard
                  key={card.id}
                  card={card}
                  draggedCardId={draggedCardId}
                  onDragStart={onDragStart}
                  onDrop={onDrop}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  onDone={onDone}
                />
              )
            )
          }
        </div>
      </div>
  )
}