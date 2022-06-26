import { Navigate, Route, Routes } from 'react-router-dom';
import { QueryErrorResetBoundary } from 'react-query';
import { PagesOrderDetails } from './pages-order-details';

export function PagesV2Order() {
  return (
    <div className="flex flex-col overflow-auto flex-1">
      <QueryErrorResetBoundary>
        <Routes>
          <Route path="/" element={<Navigate to="./create" />} />
          <Route path="/:slug" element={<PagesOrderDetails />} />
        </Routes>
      </QueryErrorResetBoundary>
    </div>
  );
}

export default PagesV2Order;
