import { Suspense } from 'react';
import { WorkspaceContainer } from './workspace-container/workspace-container';
import { WorkspaceSuspenseContainer } from './workspace-suspense-container/workspace-suspense-container';
import { useNavigate, useParams } from 'react-router-dom';
import { useWorkspace } from '@pasnik/features/workspaces';

/* eslint-disable-next-line */
export interface PagesWorkspaceProps {}

export function PagesWorkspace(props: PagesWorkspaceProps) {
  const { slug } = useParams<'slug'>();
  const navigate = useNavigate();
  useWorkspace(slug!, (error) => {
    if (error.response?.status === 404) {
      navigate('/');
    }
  });
  return (
    <div className="flex flex-col overflow-auto flex-1">
      <Suspense fallback={<WorkspaceSuspenseContainer />}>
        <WorkspaceContainer />
      </Suspense>
    </div>
  );
}

export default PagesWorkspace;
