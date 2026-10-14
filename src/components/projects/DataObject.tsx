import { faker } from '@faker-js/faker';

faker.seed(123);

export interface Project {
  id: string;
  name: string;
  position: number;
  text: string;
}

export const projectsData: Project[] = Array.from({ length: 20 }, (_, index) => {
  return {
    id: faker.string.uuid(),
    position: index,
    name: faker.lorem.sentence(2),
    text: faker.lorem.sentence(),
  }
  
});

