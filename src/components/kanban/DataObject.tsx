import { faker } from '@faker-js/faker';
import { projectsData } from '../projects/DataObject';

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

export const cardsData = Array.from({ length: 10 }, (_, index) => {
  const column_id = faker.helpers.arrayElement(columnsData).id;
  return {
    id: faker.string.uuid(),
    project_id: faker.helpers.arrayElement(projectsData).id,
    position: index,
    column_id,
    name: faker.lorem.sentence(),
    text: faker.lorem.sentence(),
    status: column_id,
  }
  
});

