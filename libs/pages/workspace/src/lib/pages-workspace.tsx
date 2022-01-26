import { Suspense } from 'react';
import { WorkspaceSuspenseContainer } from './workspace-suspense-container/workspace-suspense-container';
import { WorkspaceContainer } from './workspace-container/workspace-container';
import { QueryErrorResetBoundary } from 'react-query';
import { ErrorBoundary } from 'react-error-boundary';
import { WorkspaceFallbackRenderer } from './workspace-fallback-renderer/workspace-fallback-renderer';
import { Navigate, useParams } from 'react-router-dom';

/* eslint-disable-next-line */
export interface PagesWorkspaceProps {}

export function PagesWorkspace(props: PagesWorkspaceProps) {
  const { slug } = useParams<'slug'>();
  if (!slug) {
    return <Navigate to="/" />;
  }
  return (
    <div className="flex flex-col overflow-auto flex-1">
      <Suspense fallback={<WorkspaceSuspenseContainer />}>
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
      </Suspense>
    </div>
  );
}

export default PagesWorkspace;
