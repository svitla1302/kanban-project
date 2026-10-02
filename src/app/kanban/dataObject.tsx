import { faker } from '@faker-js/faker';

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

export const cardsData = Array.from({ length: 10 }, (_, index) => {
  const column_id = faker.helpers.arrayElement(columnsData).id;
  return {
    id: faker.string.uuid(),
    position: index,
    column_id,
    text: faker.lorem.sentence(),
    status: column_id,
  }
  
});

