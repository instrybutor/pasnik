import { Navigate, Route, Routes } from 'react-router-dom';
import { QueryErrorResetBoundary } from 'react-query';
import { PagesOrderDetails } from './pages-order-details';

export function PagesOrder() {
  return (
    <QueryErrorResetBoundary>
      <Routes>
        <Route path="/" element={<Navigate to="./create" />} />
        <Route path="/:slug" element={<PagesOrderDetails />} />
      </Routes>
    </QueryErrorResetBoundary>
  );
}
