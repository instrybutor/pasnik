import { Navigate, useParams } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { OrderContainer } from './order-container/order-container';

export function PagesOrderDetails() {
  const { slug } = useParams<'slug'>();

  if (!slug) {
    return <Navigate to="/" />;
  }

  return (
    <ErrorBoundary fallbackRender={() => <Navigate to="/" />}>
      <OrderContainer slug={slug} />
    </ErrorBoundary>
  );
}
