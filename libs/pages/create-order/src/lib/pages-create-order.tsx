import CreateOrderHeader from './create-order-header/create-order-header';
import CreateOrderForm from './create-order-form/create-order-form';

/* eslint-disable-next-line */
export interface PagesCreateOrderProps {}

export function PagesCreateOrder(props: PagesCreateOrderProps) {
  return (
    <>
      <header className="bg-white shadow">
        <CreateOrderHeader />
      </header>
      <main className="flex-grow flex-1">
        <div className="mt-8">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <div className="border-b border-gray-200">
                <CreateOrderForm />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default PagesCreateOrder;
