# Kanban Project

A responsive Kanban task management app built with Next.js, React, and TypeScript.

**[Live Demo](https://kanban-project-svitla1.vercel.app/)**

## Features

- **Project management** — create, edit, and delete projects.
- **Task management** — create, edit, and delete task cards.
- **Drag and drop** — move tasks between Kanban columns.
- **Persistent storage** — save projects, tasks, and view preferences in the browser using `localStorage`.
- **Internationalization** — switch between Ukrainian and English.
- **Responsive interface** — adapt the layout to different screen sizes.
- **Grid and list views** — choose how to display projects.

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- Base UI
- next-intl
- ESLint

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/svitla1302/kanban-project.git
   ```

2. Navigate to the project directory:

   ```bash
   cd kanban-project
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Data Storage

The application uses browser `localStorage` to persist projects, task cards, and project view preferences. Data is stored locally in the current browser.

## Deployment

The application is deployed on Vercel:

**https://kanban-project-svitla1.vercel.app/**

## Author

Developed as a personal frontend portfolio project.