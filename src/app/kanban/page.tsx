"use client";
import React, {useState} from "react";
import { cardsData, columnsData } from "./dataObject";
interface Props{}

export default function KanbanBoard(props: Props) {
  const [cards, setCards] = useState(cardsData);
  const [kanbans, setKanbans] = useState(columnsData);
  return (
    <>
      <div className="mt-8">
        <h1 className="text-4xl font-bold text-center text-4xl">
          Kanban Board
        </h1>
        <div className="mt-4 p-2 flex justify-between items-center">
          {
            kanbans.map((items) => (
              <div key={items.id} className="bg-lime-100 p-2 w-full mr-2 px-8 py-2 h-160">
                <p>{items.text}</p>
              </div>
            )
            )
          }
        </div>
      </div>
    </>
  );
}
