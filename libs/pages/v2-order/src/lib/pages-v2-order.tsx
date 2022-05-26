import { Navigate, Route, Routes } from 'react-router-dom';
import { QueryErrorResetBoundary } from 'react-query';
import { PagesOrderDetails } from './pages-order-details';
import { PagesOrderEdit } from './pages-order-edit';

export function PagesV2Order() {
  return (
    <div className="flex flex-col overflow-auto flex-1">
      <QueryErrorResetBoundary>
        <Routes>
          <Route path="/" element={<Navigate to="./create" />} />
          <Route path="/:slug" element={<PagesOrderDetails />} />
          <Route path="/:slug/edit" element={<PagesOrderEdit />} />
        </Routes>
      </QueryErrorResetBoundary>
    </div>
  );
}

export default PagesV2Order;
