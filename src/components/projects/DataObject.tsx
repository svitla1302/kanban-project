import { faker } from '@faker-js/faker';

faker.seed(123);

export interface Project {
  id: string;
  name: string;
  position: number;
}

export const projectsData: Project[] = Array.from({ length: 5 }, (_, index) => {
  return {
    id: faker.string.uuid(),
    position: index,
    name: faker.lorem.sentence(),
  }
  
});

