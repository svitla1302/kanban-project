import { faker } from '@faker-js/faker';
import { projectsData } from '../projects/DataObject';

faker.seed(123);

export const columnsData = [
  {
    id: 'todo',
    text: 'ToDo',
    status: 'todo'
  },
  {
    id: 'inprogress',
    text: 'InProgress',
    status: 'inprogress'
  },
  {
    id: 'done',
    text: 'Done',
    status: 'done'
  },
];

export interface Card {
  id: string;
  project_id: string;
  column_id: string;
  text: string;
  status: string;
  position: number;
}

export const cardsData = Array.from({ length: 10 }, (_, index) => {
  const column_id = faker.helpers.arrayElement(columnsData).id;
  return {
    id: faker.string.uuid(),
    project_id: faker.helpers.arrayElement(projectsData).id,
    position: index,
    column_id,
    text: faker.lorem.sentence(),
    status: column_id,
  }
  
});

