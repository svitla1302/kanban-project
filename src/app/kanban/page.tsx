"use client";
import React, {useState} from "react";
import { cardsData, columnsData } from "./dataObject";
interface Props{}

export default function KanbanBoard(props: Props) {
  const [cards, setCards] = useState(cardsData);
  const [kanbans, setKanbans] = useState(columnsData);
  const [dragedElement, setDragedElement] = useState<{
    c_id: string;
    p_id: string
  }  | null>(null);

  function onDragCard(id: string, p_id: string) {
    setDragedElement({
      c_id: id,
      p_id,
    })
  }

  function onDropCard(
    draggedCardId: string,
    targetColumnId: string,
    targetCardId?: string
    ) {
      const draggedCard = cards.find((card) => card.id === draggedCardId);
      // const targetCard = cards.find((card) => card.id === targetCardId);
          
      if(!draggedCard) return;

      const updateCards = cards.filter((card) => card.id !== draggedCardId);
      const targetColumnCard = updateCards
        .filter((card) => card.column_id === targetColumnId)
        .sort((a, b) => a.position - b.position);

      let targetIndex = targetColumnCard.length;

      if (targetCardId) {
        const index = targetColumnCard.findIndex(
          (card) => card.id === targetCardId
        );

        if (index !==-1) {
          targetIndex = index;
        }
      }
      
      const targetColumn = columnsData.find(
        (column) => column.id === targetColumnId
      );
      

      const updateDraggedCard = {
        ...draggedCard,
        column_id: targetColumnId,
        status: targetColumn?.status  ?? draggedCard.status
      };

      targetColumnCard.splice(targetIndex, 0, updateDraggedCard);

      const cardsWithPosition = targetColumnCard.map((card, index) => ({
        ...card,
        position: index
      }));

      const otherCards = updateCards.filter(
        (card) => card.column_id !== targetColumnId
      );

      setCards([
        ...otherCards,
        ...cardsWithPosition,
      ]);

  }
  return (
    <>
      <div className="mt-8">
        <h1 className="text-4xl font-bold text-center text-4xl">
          Kanban Board
        </h1>
        <div className="mt-4 p-2 flex justify-between items-center">
          {
            kanbans.map((items) => (
              <div key={items.id} 
              className="bg-green-100 p-2 w-full mr-2 px-8 py-2 h-160 flex flex-col">
                <div>
                  <p>{items.text}</p>
                </div>
                <div className="mt-2 mb-2 p-2 bg-emerald-400 flex-1 overflow-auto" 
                  onDragOver={(e) => {
                    e.preventDefault();
                  }}
                  onDrop={() => {
                    if (dragedElement?.c_id) {
                      onDropCard(
                        dragedElement.c_id,
                        items.id
                      );
                    }
                  }}
                >
                  {
                    cards
                    .filter((c) => items.id===c.column_id)
                    .sort((a,b) => a.position - b.position)
                    .map((c) => 
                      (
                        <div key={c.id} 
                        className="bg-green-200 p-4 h-40 mb-2 rounded"
                        draggable
                        onDragStart={() => { onDragCard(c.id, c.column_id) }}
                        onDragOver={(e) => { e.preventDefault() }}
                        onDrop={(e) => {
                          e.stopPropagation();

                          if (dragedElement?.c_id) {
                            onDropCard(
                              dragedElement.c_id,
                              c.column_id,
                              c.id
                            )
                          }
                        }}>
                        
                          <p>{c.text}</p>
                          <p className="text-lime-50">{c.status}</p>
                        </div>
                      )
                    )
                  }
                </div>
              </div>
            )
            )
          }
        </div>
      </div>
    </>
  );
}
