// Contains code for List of Inventory information's

import { ViewConfig } from '@vaadin/hilla-file-router/types.js';
import { AutoCrud } from '@vaadin/hilla-react-crud';
import { useEffect } from 'react';
import { useSignal } from '@vaadin/hilla-react-signals';
import { RecipeOrderCrudService } from 'Frontend/generated/endpoints';
import RecipeOrderModel from 'Frontend/generated/fortitude/culina/entity/order/RecipeOrderModel';
import { LocationService, RecipeService, OrderStageService, UserService } from 'Frontend/generated/endpoints';
import RecipeOrder from 'Frontend/generated/fortitude/culina/entity/order/RecipeOrder';
import { ComboBox, DateTimePicker, TextField } from '@vaadin/react-components';
import '../../themes/restaurant-management/view-styles/user.css';

export const config: ViewConfig = {
  menu: { order: 9, icon: 'line-awesome/svg/luggage-cart-solid.svg' },
  title: 'Order',
  loginRequired: true,
  rolesAllowed: ['USER'],
};

export default function StaffOrderListView() {
  const recipes = useSignal<any>([]);
  const locations = useSignal<any>([]);
  const staffs = useSignal<any>([]);
  const orderStages = useSignal<any>([]);

  useEffect(() => {
    RecipeService.getAllRecipe().then((data) => (recipes.value = data));
    LocationService.getAllLocations().then((data) => (locations.value = data));
    UserService.getAllUsers().then((data) => (staffs.value = data));
    OrderStageService.getAllOrders().then((data) => (orderStages.value = data));
  }, []);

  const statusRenderer = ({ item: recipeOrder }: { item: RecipeOrder }) => (
    <span {...{ theme: `badge ${recipeOrder.orderStage === 'Completed' ? 'success' : 'info'}` }}>
      {recipeOrder.orderStage}
    </span>
  );

  return (
    <>
      <div className="p-l app-header">
        <AutoCrud
          noNewButton={true}
          style={{ height: '600px' }}
          service={RecipeOrderCrudService}
          model={RecipeOrderModel}
          gridProps={{
            columnReorderingAllowed: true,
            visibleColumns: [
              'recipe',
              'location',
              'staff',
              'orderDateFrom',
              'orderDateTo',
              'orderStage',
              'numberOfOrderPlaced',
            ],
            columnOptions: {
              recipe: { header: 'Recipe', resizable: true },
              location: { header: 'Location', resizable: true },
              staff: { header: 'Staff', resizable: true },
              orderStage: { header: 'Order Stage', renderer: statusRenderer },
              numberOfOrderPlaced: { header: 'No. Of Order Placed', resizable: true },
            },
          }}
          formProps={{
            deleteButtonVisible: false,
            visibleFields: [
              'recipe',
              'location',
              'staff',
              'orderDateFrom',
              'orderDateTo',
              'orderStage',
              'numberOfOrderPlaced',
            ],
            fieldOptions: {
              recipe: {
                renderer: ({ field }) => (
                  <ComboBox
                    readonly
                    {...field}
                    required
                    label="Recipe"
                    itemLabelPath="recipeName"
                    itemValuePath="recipeName"
                    items={recipes.value}
                    errorMessage="Field is required" />
                ),
              },
              location: {
                renderer: ({ field }) => (
                  <ComboBox
                    readonly
                    {...field}
                    required
                    label="Location"
                    itemLabelPath="name"
                    itemValuePath="name"
                    items={locations.value}
                    errorMessage="Field is required" />
                ),
              },
              staff: {
                renderer: ({ field }) => (
                  <ComboBox
                    readonly
                    {...field}
                    required
                    label="Staff"
                    itemLabelPath="name"
                    itemValuePath="name"
                    items={staffs.value}
                    errorMessage="Field is required" />
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
                    errorMessage="Field is required" />
                ),
              },
              numberOfOrderPlaced: {
                renderer: ({ field }) => <TextField readonly {...field} label="Number Of Order Placed" />,
              },
              orderDateFrom: {
                renderer: ({ field }) => <DateTimePicker readonly {...field} label="Order Date From" />,
              },
              orderDateTo: {
                renderer: ({ field }) => <DateTimePicker readonly {...field} label="Order Date To" />,
              },
            },
          }}
        />
      </div>
    </>
  );
}
