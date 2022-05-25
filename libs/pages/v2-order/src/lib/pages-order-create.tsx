import { OrderSection } from './order-section/order-section';
import { FormField, Input } from '@pasnik/components';

export function PagesOrderCreate() {
  return (
    <OrderSection
      title="Utwórz zamówienie"
      subTitle={
        <>
          Let’s get started by filling in the information below to create your
          new project.
        </>
      }
      className="max-w-lg mx-auto pt-10 pb-12 px-4 lg:pb-16"
    >
      <form>
        <div className="space-y-6">
          <FormField error={false} errorMessage={'welp'}>
            <Input type="text" />
          </FormField>
          <div>
            <label
              htmlFor="url"
              className="block text-sm font-medium text-gray-700"
            >
              URL
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="url"
                id="url"
                className="block w-full shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>
        </div>
      </form>
    </OrderSection>
  );
}
