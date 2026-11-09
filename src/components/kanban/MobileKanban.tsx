'use client';

import { useState, useEffect } from 'react';
import type { Card } from './DataObject';
import { useTranslations } from 'next-intl';
import KanbanCard from './KanbanCard';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface MobileKanbanProps {
  columns: Array<{
    id: string;
    translationKey: string;
    status: string;
  }>;
  cards: Card[];
  onDelete: (id: string) => void;
  onEdit: (card: Card) => void;
  onDone: (id: string) => void;
}

type FilterValue = 'all' | string;

export default function MobileKanban({
  columns,
  cards,
  onEdit,
  onDelete,
  onDone,
}: MobileKanbanProps) {
  const t = useTranslations('KanbanCard');
  const [selectedColumnId, setSelectedColumnId] = useState<FilterValue>('all');
  const [isFilterLoaded, setIsFilterLoaded] = useState(false);

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    const savedFilter = localStorage.getItem('kanban-mobile-filter');

    const savedColumn = columns.find((column) => column.id === savedFilter);
    if (savedFilter === 'all') {
      setSelectedColumnId('all');
    } else if (savedColumn) {
      setSelectedColumnId(savedColumn.id);
    }

    setIsFilterLoaded(true);
  }, [columns]);
  /* eslint-enable react-hooks/set-state-in-effect */

  useEffect(() => {
    if (!isFilterLoaded) return;

    localStorage.setItem('kanban-mobile-filter', selectedColumnId);
  }, [selectedColumnId, isFilterLoaded]);

  const filteredCards = cards
    .filter(
      (card) =>
        selectedColumnId === 'all' || card.column_id === selectedColumnId,
    )
    .sort((a, b) => a.position - b.position);

  return (
    <div className="bg-card p-2 w-full mr-2 px-8 py-2 h-160 flex flex-col">
      <Select value={selectedColumnId} onValueChange={(value) => {
        if (value !== null) {
          setSelectedColumnId(value);
        }
      }}>
        <SelectTrigger className="w-full max-w-48">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectContent>
            <SelectItem value="all">{t('all')}</SelectItem>

            {columns.map((column) => (
              <SelectItem key={column.id} value={column.id}>
                {t(`columns.${column.translationKey}`)}
              </SelectItem>
            ))}
          </SelectContent>
        </SelectContent>
      </Select>

      <div className="flex-1 overflow-y-auto">
        {filteredCards.map((card) => (
          <KanbanCard
            key={card.id}
            card={card}
            onEdit={onEdit}
            onDelete={onDelete}
            onDone={onDone}
          />
        ))}
      </div>
    </div>
  );
}
