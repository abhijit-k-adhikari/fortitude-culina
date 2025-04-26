// Contains code for List of Inventory information's

import { ViewConfig } from '@vaadin/hilla-file-router/types.js';
import { AutoCrud } from '@vaadin/hilla-react-crud';
import { useEffect, useState } from 'react';
import { useSignal } from '@vaadin/hilla-react-signals';
import { RecipeOrderService } from 'Frontend/generated/endpoints';
import RecipeOrderModel from 'Frontend/generated/fortitude/culina/entity/order/RecipeOrderModel';
import { LocationService, RecipeService, OrderStageService, UserService } from 'Frontend/generated/endpoints';
import RecipeOrder from 'Frontend/generated/fortitude/culina/entity/order/RecipeOrder';
import { Button, ComboBox, Grid, GridColumn, Icon } from '@vaadin/react-components';
import AddRecipe from 'Frontend/popups/recipe/addRecipe';
import Recipe from 'Frontend/generated/fortitude/culina/entity/recipe/Recipe';

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
  });

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
          <GridColumn path="recipe" header="Recipe Name" />
          <GridColumn path="staff" />   
          <GridColumn frozenToEnd autoWidth flexGrow={0} renderer={editRenderer} />
          <GridColumn frozenToEnd autoWidth flexGrow={0} renderer={deleteRenderer} />      
        </Grid>
        <AddRecipe dialogOpen={openDialog} onClose={onCloseDialog}></AddRecipe>
      </div>
    </>
  );
}
