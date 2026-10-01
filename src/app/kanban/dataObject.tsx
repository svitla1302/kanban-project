import { faker } from '@faker-js/faker';

export const columnsData = [
  {
    id: 'todo',
    text: 'ToDo',
  },
  {
    id: 'inprogress',
    text: 'InProgress',
  },
  {
    id: 'done',
    text: 'Done',
  },
];

export const cardsData = Array.from({ length: 20 }, () => ({
  id: faker.string.uuid(),
  column_id: 'todo',
  text: faker.lorem.sentence(),
}));

