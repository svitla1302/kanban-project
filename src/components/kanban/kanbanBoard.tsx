'use client';
import React, { useEffect, useState, useRef } from 'react';
import { cardsData, columnsData } from '../../components/kanban/dataObject';
import KabanColumn from './KanbanColumn';
import AddTask from './addTask';

interface Props {}

export default function KanbanBoard(props: Props) {
  const [cards, setCards] = useState(cardsData);
  const [kanbans, setKanbans] = useState(columnsData);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const savedCards = localStorage.getItem('kanban-cards');

      if (savedCards) {
        setCards(JSON.parse(savedCards));
      }
    } catch {
      localStorage.removeItem('kanban-cards');
    }

    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoaded) {
      return;
    }
    localStorage.setItem('kanban-cards', JSON.stringify(cards));
  }, [cards]);

  const [dragedElement, setDragedElement] = useState<{
    c_id: string;
    p_id: string;
  } | null>(null);

  function onDragCard(id: string, p_id: string) {
    setDragedElement({
      c_id: id,
      p_id,
    });
  }

  function onDropCard(
    draggedCardId: string,
    targetColumnId: string,
    targetCardId?: string,
  ) {
    const draggedCard = cards.find((card) => card.id === draggedCardId);

    if (!draggedCard) return;

    const updateCards = cards.filter((card) => card.id !== draggedCardId);
    const targetColumnCard = updateCards
      .filter((card) => card.column_id === targetColumnId)
      .sort((a, b) => a.position - b.position);

    let targetIndex = targetColumnCard.length;

    if (targetCardId) {
      const index = targetColumnCard.findIndex(
        (card) => card.id === targetCardId,
      );

      if (index !== -1) {
        targetIndex = index;
      }
    }

    const targetColumn = columnsData.find(
      (column) => column.id === targetColumnId,
    );

    const updateDraggedCard = {
      ...draggedCard,
      column_id: targetColumnId,
      status: targetColumn?.status ?? draggedCard.status,
    };

    targetColumnCard.splice(targetIndex, 0, updateDraggedCard);

    const cardsWithPosition = targetColumnCard.map((card, index) => ({
      ...card,
      position: index,
    }));

    const otherCards = updateCards.filter(
      (card) => card.column_id !== targetColumnId,
    );

    setCards([...otherCards, ...cardsWithPosition]);
  }

  function addTask(text: string, columnId: string) {
    const column = kanbans.find((column) => column.id === columnId);

    if (!column) return;

    const columnCards = cards.filter((card) => card.column_id === columnId);
    const maxPosition = columnCards.length
      ? Math.max(...columnCards.map((card) => card.position))
      : -1;

    const newCard = {
      id: crypto.randomUUID(),
      position: maxPosition + 1,
      column_id: columnId,
      text,
      status: column.status,
    };

    setCards((prevCards) => [...prevCards, newCard]);
  }
  return (
    <>
      <AddTask onAddTask={addTask} />
      <div className="mt-8">
        <h1 className="text-4xl font-bold text-center text-4xl">
          Kanban Board
        </h1>
        <div className="mt-4 p-2 flex justify-between items-center">
          {kanbans.map((column) => (
            <KabanColumn
              key={column.id}
              column={column}
              cards={cards}
              draggedCardId={dragedElement?.c_id ?? null}
              onDragStart={onDragCard}
              onDrop={onDropCard}
            />
          ))}
        </div>
      </div>
    </>
  );
}
