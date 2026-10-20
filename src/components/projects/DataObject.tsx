import { faker } from '@faker-js/faker';

faker.seed(123);

export interface Project {
  id: string;
  name: string;
  position: number;
  text: string;
}


export interface Project {
  id: string;
  name: string;
  position: number;
  text: string;
}

export const projectsData: Project[] = [
  {
    id: 'demo-portfolio',
    position: 0,
    name: 'Portfolio Website',
    text: 'Build and launch a personal portfolio website.',
  },
  {
    id: 'demo-learning',
    position: 1,
    name: 'React Learning',
    text: 'Practice React, TypeScript and frontend development.',
  },
  {
    id: 'demo-travel',
    position: 2,
    name: 'Trip Planning',
    text: 'Organize destinations, bookings and travel preparations.',
  },
];


