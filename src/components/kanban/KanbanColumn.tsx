import KanbanCard from "./KanbanCard";

interface KanbanColumnProps {
  column: {
    id: string;
    text: string;
    status: string;
  };
  cards: {
    id: string;
    column_id: string;
    text: string;
    status: string;
    position: number;
  }[];
  draggedCardId: string | null;
  onDragStart: (id: string, columnId: string) => void;
  onDrop: (
    draggedCardId: string,
    targetColumnId: string,
    targetCardId?: string
  ) => void;
}

export default function KabanColumn({
  column,
  cards,
  draggedCardId,
  onDragStart,
  onDrop
}: KanbanColumnProps) {
  
  const columnCards = cards
    .filter((card) => card.column_id === column.id)
    .sort((a, b) => a.position - b.position);

  return (
    <div 
      className="bg-green-100 p-2 w-full mr-2 px-8 py-2 h-160 flex flex-col">
        <div>
          <p>{column.text}</p>
        </div>

        <div 
          className="mt-2 mb-2 p-2 bg-emerald-400 flex-1 overflow-auto" 
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
                />
              )
            )
          }
        </div>
      </div>
  )
}