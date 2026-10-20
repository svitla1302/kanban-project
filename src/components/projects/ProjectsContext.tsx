'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
} from 'react';
import { projectsData, type Project } from './DataObject';

import { cardsData, type Card } from '../kanban/DataObject';

interface ProjectsContextType {
  projects: Project[];
  setProjects: Dispatch<SetStateAction<Project[]>>;
  cards: Card[];
  setCards: Dispatch<SetStateAction<Card[]>>;
}

const ProjectsContext = createContext<ProjectsContextType | null>(null);

export function ProjectsProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<Project[]>(projectsData);
  const [cards, setCards] = useState<Card[]>([]);
  const [isCardsLoaded, setIsCardsLoaded] = useState(false);

  /* eslint-disable react-hooks/set-state-in-effect */
useEffect(() => {
  try {
    const savedCards = localStorage.getItem('kanban-cards');

    if (savedCards !== null) {
      setCards(JSON.parse(savedCards));
    } else {
      setCards(cardsData);
    }
  } catch {
    setCards([]);
  }

  setIsCardsLoaded(true);
}, []);
/* eslint-enable react-hooks/set-state-in-effect */

useEffect(() => {
  if (!isCardsLoaded) return;

  localStorage.setItem('kanban-cards', JSON.stringify(cards));
}, [cards, isCardsLoaded]);


  return (
    <ProjectsContext.Provider
      value={{ projects, setProjects, cards, setCards }}
    >
      {children}
    </ProjectsContext.Provider>
  );
}

export function useProjects() {
  const context = useContext(ProjectsContext);

  if (!context) {
    throw new Error('useProjects must be used within ProjectsProvider');
  }

  return context;
}
