import { WorkspaceSuspenseContainer } from './workspace-suspense-container/workspace-suspense-container';
import { WorkspaceContainer } from './workspace-container/workspace-container';
import { QueryErrorResetBoundary } from 'react-query';
import { ErrorBoundary } from 'react-error-boundary';
import { WorkspaceFallbackRenderer } from './workspace-fallback-renderer/workspace-fallback-renderer';
import { useSlug } from '@pasnik/shared/utils';
import { QueryBoundary } from '@pasnik/components';

/* eslint-disable-next-line */
export interface PagesWorkspaceProps {}

export function PagesWorkspace(props: PagesWorkspaceProps) {
  const slug = useSlug();
  return (
    <div className="flex flex-col overflow-auto flex-1">
      <QueryBoundary fallback={<WorkspaceSuspenseContainer />}>
        <QueryErrorResetBoundary>
          {({ reset }) => (
            <ErrorBoundary
              onReset={reset}
              fallbackRender={(params) => (
                <WorkspaceFallbackRenderer slug={slug} {...params} />
              )}
            >
              <WorkspaceContainer />
            </ErrorBoundary>
          )}
        </QueryErrorResetBoundary>
      </QueryBoundary>
    </div>
  );
}

export default PagesWorkspace;
