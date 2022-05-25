import { Route, Routes } from 'react-router-dom';
import { PageOrderCreate } from './page-order-create/page-order-create';
import { PageOrder } from './page-order/page-order';
import { PageOrderEdit } from './page-order-edit/page-order-edit';

export type PagesOrderProps = 'slug';

export function PagesOrder() {
  return (
    <Routes>
      <Route path="create" element={<PageOrderCreate />} />
      <Route path=":slug" element={<PageOrder />} />
      <Route path=":slug/edit" element={<PageOrderEdit />} />
    </Routes>
  );
}

export default PagesOrder;
