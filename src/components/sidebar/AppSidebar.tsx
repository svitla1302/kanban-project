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
  SidebarMenuSub,
} from '@/components/ui/sidebar';
import { Dot, FolderKanban, List } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { useState } from 'react';
import type { Project } from '../projects/DataObject';
import { useTranslations } from 'next-intl';
import LangSwitcher from '../LanguageSwitcher';

interface AppSidebarProps {
  projects: Project[];
}

export function AppSidebar({ projects }: AppSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations('AppSidebar');

  return (
    <Sidebar>
      <SidebarHeader className="bg-ring text-center text-accent rounded-xl shadow-lg ml-2 mt-4 mr-2">
        <h5 className="font-semibold">{t('title')}</h5>
      </SidebarHeader>

      <SidebarContent className="ml-2">
        <SidebarGroupLabel>{t('subtitle')}</SidebarGroupLabel>
        <SidebarMenu>
          <Collapsible open={isOpen} onOpenChange={setIsOpen}>
            <SidebarMenuItem>
              <div className="flex w-full items-center gap-1">
                <SidebarMenuButton
                  className="flex-1 border"
                  render={<Link href="/" />}
                >
                  <FolderKanban />
                  <span>{t('projectsMenuButton')}</span>
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
                  <SidebarMenuSub>
                    {projects.map((project) => (
                      <SidebarMenuSubItem key={project.id}>
                        <SidebarMenuSubButton
                          className="flex-1  rounded-none"
                          render={<Link href={`/projects/${project.id}`} />}
                          title={project.name}
                        >
                          <span className="truncate flex items-center gap-1 min-w-0">
                            <Dot className="shrink-0" />
                            <span className="truncate">
                              {project.name.length > 20
                                ? `${project.name.slice(0, 20)}...`
                                : project.name}
                            </span>
                          </span>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </div>
            </SidebarMenuItem>
          </Collapsible>
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter>
        <LangSwitcher caption={t('language')} />
      </SidebarFooter>
    </Sidebar>
  );
}
