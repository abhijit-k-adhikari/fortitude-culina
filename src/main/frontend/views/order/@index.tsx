// Contains code for List of Inventory information's

import { ViewConfig } from '@vaadin/hilla-file-router/types.js';
import { AutoCrud } from '@vaadin/hilla-react-crud';
import { useEffect } from 'react';
import { useSignal } from '@vaadin/hilla-react-signals';
import { RecipeOrderCrudService } from 'Frontend/generated/endpoints';
import RecipeOrderModel from 'Frontend/generated/fortitude/culina/entity/order/RecipeOrderModel';
import { LocationService, RecipeService, OrderStageService, UserService } from 'Frontend/generated/endpoints';
import RecipeOrder from 'Frontend/generated/fortitude/culina/entity/order/RecipeOrder';
import { ComboBox } from '@vaadin/react-components';

export const config: ViewConfig = {
  menu: { order: 4, icon: 'line-awesome/svg/luggage-cart-solid.svg' },
  title: 'Order',
  loginRequired: true,
};

export default function OrderListView() {
  const recipes = useSignal<any>([]);
  const locations = useSignal<any>([]);
  const staffs = useSignal<any>([]);
  const orderStages = useSignal<any>([]);

  useEffect(() => {
    RecipeService.getAllRecipe().then((data) => (recipes.value = data));
    LocationService.getAllLocations().then((data) => (locations.value = data));
    UserService.getAllUsers().then((data) => (staffs.value = data));
    OrderStageService.getAllOrders().then((data) => (orderStages.value = data));
  });

  const statusRenderer = ({ item: recipeOrder }: { item: RecipeOrder }) => (
    <span {...{ theme: `badge ${recipeOrder.orderStage === 'Completed' ? 'success' : 'info'}` }}>
      {recipeOrder.orderStage}
    </span>
  );

  return (
    <>
      <div className="p-l">
        <AutoCrud
          style={{ height: '600px' }}
          service={RecipeOrderCrudService}
          model={RecipeOrderModel}
          gridProps={{
            columnReorderingAllowed: true,
            visibleColumns: [
              'recipe',
              'location',
              'staff',
              'orderStage',
              'numberOfOrderPlaced',
              'customerName',
              'customerPhoneNumber',
              'customerEmailId',
              'customerAddress',
            ],
            columnOptions: {
              recipe: { header: 'Recipe', resizable: true },
              location: { header: 'Location', resizable: true },
              staff: { header: 'Staff', resizable: true },
              orderStage: { header: 'Order Stage', renderer: statusRenderer },
              numberOfOrderPlaced: { header: 'No. Of Order Placed', resizable: true },
              customerName: { header: 'Customer Name', resizable: true },
              customerPhoneNumber: { header: 'Customer Phone Number', resizable: true },
              customerEmailId: { header: 'Customer Email Id', resizable: true },
              customerAddress: { header: 'Customer Address', resizable: true },
            },
          }}
          formProps={{
            visibleFields: [
              'recipe',
              'location',
              'staff',
              'orderStage',
              'numberOfOrderPlaced',
              'customerName',
              'customerPhoneNumber',
              'customerEmailId',
              'customerAddress',
            ],
            fieldOptions: {
              recipe: {
                renderer: ({ field }) => (
                  <ComboBox
                    {...field}
                    required
                    label="Recipe"
                    itemLabelPath="recipeName"
                    itemValuePath="recipeName"
                    items={recipes.value}
                    errorMessage="Field is required"></ComboBox>
                ),
              },
              location: {
                renderer: ({ field }) => (
                  <ComboBox
                    {...field}
                    required
                    label="Location"
                    itemLabelPath="name"
                    itemValuePath="name"
                    items={locations.value}
                    errorMessage="Field is required"></ComboBox>
                ),
              },
              staff: {
                renderer: ({ field }) => (
                  <ComboBox
                    {...field}
                    required
                    label="Staff"
                    itemLabelPath="name"
                    itemValuePath="name"
                    items={staffs.value}
                    errorMessage="Field is required"></ComboBox>
                ),
              },
              orderStage: {
                renderer: ({ field }) => (
                  <ComboBox
                    {...field}
                    required
                    label="Order Stage"
                    itemLabelPath="stage"
                    itemValuePath="stage"
                    items={orderStages.value}
                    errorMessage="Field is required"></ComboBox>
                ),
              },
            },
          }}
        />
      </div>
    </>
  );
}
