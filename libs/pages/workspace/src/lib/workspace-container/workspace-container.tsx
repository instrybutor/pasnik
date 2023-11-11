import { Outlet } from 'react-router-dom';
import { WorkspaceHeader } from '../workspace-header/workspace-header';
import { WorkspaceAbilityProvider } from '@pasnik/features/workspaces';
import { useSlug } from '@pasnik/shared/utils';

export function WorkspaceContainer() {
  const slug = useSlug();

  return (
    <WorkspaceAbilityProvider slug={slug}>
      <header className="bg-white shadow">
        <WorkspaceHeader />
      </header>

      <main className="flex-grow flex-1">
        <div className="mt-8 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>
    </WorkspaceAbilityProvider>
  );
}
