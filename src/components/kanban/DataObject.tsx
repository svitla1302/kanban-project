import { faker } from '@faker-js/faker';

faker.seed(123);

export const columnsData = [
  {
    id: 'todo',
    translationKey: 'todo',
    status: 'todo'
  },
  {
    id: 'inprogress',
    translationKey: 'inprogress',
    status: 'inprogress'
  },
  {
    id: 'done',
    translationKey: 'done',
    status: 'done'
  },
];

export interface Card {
  id: string;
  project_id: string;
  column_id: string;
  name: string;
  text: string;
  status: string;
  position: number;
}


export const cardsData: Card[] = [
  {
    id: 'demo-task-1',
    project_id: 'demo-portfolio',
    column_id: 'todo',
    position: 0,
    name: 'Design portfolio layout',
    text: 'Prepare the main page structure and responsive layout.',
    status: 'todo',
  },
  {
    id: 'demo-task-2',
    project_id: 'demo-portfolio',
    column_id: 'inprogress',
    position: 0,
    name: 'Build project cards',
    text: 'Create reusable cards for portfolio projects.',
    status: 'inprogress',
  },
  {
    id: 'demo-task-3',
    project_id: 'demo-portfolio',
    column_id: 'done',
    position: 0,
    name: 'Set up Next.js',
    text: 'Initialize the app and configure the project structure.',
    status: 'done',
  },
  {
    id: 'demo-task-4',
    project_id: 'demo-learning',
    column_id: 'todo',
    position: 0,
    name: 'Practice TypeScript',
    text: 'Review interfaces, types and generics.',
    status: 'todo',
  },
  {
    id: 'demo-task-5',
    project_id: 'demo-learning',
    column_id: 'inprogress',
    position: 0,
    name: 'Learn React hooks',
    text: 'Practice useState and useEffect.',
    status: 'inprogress',
  },
  {
    id: 'demo-task-6',
    project_id: 'demo-travel',
    column_id: 'todo',
    position: 0,
    name: 'Choose destinations',
    text: 'Compare places to visit and travel options.',
    status: 'todo',
  },
];
