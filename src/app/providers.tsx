
'use client';

import { ProjectsProvider } from '@/components/projects/ProjectsContext';
import AppLayout from '@/components/sidebar/AppLayout';

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProjectsProvider>
      <AppLayout>{children}</AppLayout>
    </ProjectsProvider>
  );
}
