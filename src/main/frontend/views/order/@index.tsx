// Contains code for List of Inventory information's

import { ViewConfig } from '@vaadin/hilla-file-router/types.js';
import { AutoCrud } from '@vaadin/hilla-react-crud';
import { useEffect } from 'react';
import { useSignal } from '@vaadin/hilla-react-signals';
import { RecipeOrderCrudService } from 'Frontend/generated/endpoints';
import RecipeOrderModel from 'Frontend/generated/fortitude/culina/entity/order/RecipeOrderModel';
import { LocationService } from 'Frontend/generated/endpoints';

export const config: ViewConfig = {
  menu: { order: 4, icon: 'line-awesome/svg/luggage-cart-solid.svg' },
  title: 'Order',
  loginRequired: true,
};

export default function OrderListView() {
  const locations = useSignal<any>([]);

  useEffect(() => {
    LocationService.getAllLocations().then((data) => (locations.value = data));
  });

  return (
    <>
      <div className="p-l">
        <AutoCrud style={{ height: '600px' }} service={RecipeOrderCrudService} model={RecipeOrderModel} />
      </div>
    </>
  );
}
