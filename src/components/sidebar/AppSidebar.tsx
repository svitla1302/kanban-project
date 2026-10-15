import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarGroupLabel,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from '@/components/ui/sidebar';
import { Dot, FolderKanban, List } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { useState } from 'react';
import type { Project } from '../projects/DataObject';

interface AppSidebarProps {
  projects: Project[];
}

export function AppSidebar({ projects }: AppSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sidebar >
      <SidebarHeader className="bg-ring text-center text-accent rounded-xl shadow-lg ml-2">
        <h5 className="font-semibold">Your work</h5>
      </SidebarHeader>

      <SidebarContent className='ml-2'>
        <SidebarGroupLabel>Workspace</SidebarGroupLabel>
        <SidebarMenu>
          <Collapsible open={isOpen} onOpenChange={setIsOpen}>
            <SidebarMenuItem>
              <div className="flex w-full items-center gap-1">
                <SidebarMenuButton
                  className="flex-1 border"
                  render={<Link to="/" />}
                >
                  <FolderKanban />
                  <span>Projects</span>
                </SidebarMenuButton>

                <CollapsibleTrigger
                  render={
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-8 shrink-0"
                    >
                      <List />
                      <span className="sr-only">Toggle details</span>
                    </Button>
                  }
                />
              </div>

              <div className="max-h-40 overflow-y-auto">
                <CollapsibleContent>
                  {projects.map((project) => (
                    <SidebarMenuSubItem key={project.id}>
                      <SidebarMenuSubButton
                        className="flex-1  rounded-none"
                        render={<Link to={`/projects/${project.id}`} />}
                        title={project.name}
                      >
                        <span className="truncate flex items-center gap-1 min-w-0">
                          <Dot className="shrink-0" />
                          {project.name.length > 20
                            ? `${project.name.slice(0, 20)}...`
                            : project.name}
                        </span>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </CollapsibleContent>
              </div>
            </SidebarMenuItem>
          </Collapsible>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
