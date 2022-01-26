import { FallbackProps } from 'react-error-boundary';
import axios, { AxiosError } from 'axios';
import { WorkspaceRequestAccess } from '../workspace-request-access/workspace-request-access';
import { WorkspaceRequestAccessPending } from '../workspace-request-access-pending/workspace-request-access-pending';
import { Navigate } from 'react-router-dom';

export interface WorkspaceFallbackRendererProps extends FallbackProps {
  slug: string;
}

export function WorkspaceFallbackRenderer({
  slug,
  error,
  resetErrorBoundary,
}: WorkspaceFallbackRendererProps) {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;
    return axiosError.response?.status === 403 ? (
      <WorkspaceRequestAccess slug={slug} />
    ) : axiosError.response?.status === 302 ? (
      <WorkspaceRequestAccessPending />
    ) : (
      <Navigate to="/" />
    );
  }
  return <Navigate to="/" />;
}
