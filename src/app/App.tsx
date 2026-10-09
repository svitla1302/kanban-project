'use client'

import KanbanBoard from "@/components/kanban/KanbanBoard"
import ProjectList from "@/components/projects/ProjectList"
import { BrowserRouter, Route, Routes } from "react-router-dom"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProjectList />}/>

        <Route path="/projects/:projectId" element={<KanbanBoard />} />
      </Routes>
    </BrowserRouter>
  )
}