// Contains code for List of Inventory information's

import { ViewConfig } from '@vaadin/hilla-file-router/types.js';
import { useEffect, useState } from 'react';
import { useSignal } from '@vaadin/hilla-react-signals';
import { RecipeOrderService } from 'Frontend/generated/endpoints';
import RecipeOrder from 'Frontend/generated/fortitude/culina/entity/order/RecipeOrder';
import { Button, Grid, GridColumn, Icon } from '@vaadin/react-components';
import Recipe from 'Frontend/generated/fortitude/culina/entity/recipe/Recipe';
import AddOrder from 'Frontend/popups/order/addOrder';

export const config: ViewConfig = {
  menu: { order: 4, icon: 'line-awesome/svg/luggage-cart-solid.svg' },
  title: 'Order',
  loginRequired: true,
};

export default function StaffOrderListView() {
  const detailsOpenedItems = useSignal<Recipe[]>([]);

  // Recipe Add Dialog Popup
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const orders = useSignal<any>([]);

  useEffect(() => {
    RecipeOrderService.getAllOrders().then((data) => (orders.value = data));    
  }, []);

  const statusRenderer = ({ item: recipeOrder }: { item: RecipeOrder }) => (
    <span {...{ theme: `badge ${recipeOrder.orderStage === 'Completed' ? 'success' : 'info'}` }}>
      {recipeOrder.orderStage}
    </span>
  );

  const editRenderer = ({ item: recipe }: { item: Recipe }) => (
    <Button theme="tertiary">
      Edit
      <Icon icon="vaadin:eraser" slot={'prefix'} />
    </Button>
  );

  const deleteRenderer = ({ item: recipe }: { item: Recipe }) => (
    <Button theme="tertiary error">
      Delete
      <Icon icon="vaadin:close-circle-o" slot={'prefix'} />
    </Button>
  );

  const onCloseDialog = (param: any) => {
    setOpenDialog(false);
  };

  return (
    <>
      <div>
        <div style={{ textAlign: 'right' }}>
          <Button
            theme="primary success"
            style={{ display: 'inline-block', marginRight: '20px' }}
            onClick={() => {
              setOpenDialog(true);
            }}>
            Add Order <Icon icon='line-awesome/svg/luggage-cart-solid.svg' slot={'prefix'} />
          </Button>
        </div>
        <Grid          
          theme="row-stripes"
          items={orders.value}
          detailsOpenedItems={detailsOpenedItems.value}>        
          <GridColumn autoWidth resizable path="recipe" header="Recipe" />
          <GridColumn autoWidth resizable path="location" header="Location"/>   
          <GridColumn autoWidth resizable path="orderStage" header="Order Stage"/>   
          <GridColumn autoWidth resizable path="numberOfOrderPlaced" header="Number Of Order Placed"/>   
          <GridColumn autoWidth resizable path="orderDateFrom" header="Order Date From"/>   
          <GridColumn autoWidth resizable path="orderDateTo" header="Order Date To"/>  
          <GridColumn autoWidth resizable path="customerName" header="Customer Name"/>   
          <GridColumn autoWidth resizable path="customerPhoneNumber" header="Customer Phone Number"/>   
          <GridColumn autoWidth resizable path="customerEmailId" header="Customer Email Id"/>   
          <GridColumn autoWidth resizable path="customerAddress" header="customer Address"/>   
          <GridColumn autoWidth resizable frozenToEnd flexGrow={0} renderer={editRenderer} />
          <GridColumn autoWidth resizable frozenToEnd flexGrow={0} renderer={deleteRenderer} />      
        </Grid>
        <AddOrder dialogOpen={openDialog} onClose={onCloseDialog}></AddOrder>
      </div>
    </>
  );
}
