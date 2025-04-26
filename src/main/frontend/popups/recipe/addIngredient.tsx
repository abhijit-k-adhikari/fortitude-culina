import { Button, ComboBox, FormLayout, Icon, TextField, Tooltip } from '@vaadin/react-components';
import { RecipeIngredientListProps, RecipeIngredientProps } from 'Frontend/interfaces/sharedInterfaces';
import { InventoryService } from 'Frontend/generated/endpoints';
import { UnitService } from 'Frontend/generated/endpoints';

import _, { uniqueId } from 'lodash';
import { useEffect } from 'react';
import { useSignal } from '@vaadin/hilla-react-signals';

export default function AddIngredient(props: RecipeIngredientListProps) {
  const inventories = useSignal<any>([]);
  const units = useSignal<any>([]);

  useEffect(() => {
    InventoryService.getAllInventories().then((data) => (inventories.value = data));
    UnitService.getAllUnits().then((data) => (units.value = data));
  }, []);

  // individual click occurs
  function deleteClicked(item: any) {
    props.onDelete(item.uniqueId);
  }

  // render the control list here...
  function layout(item: RecipeIngredientProps) {
    return (
      <FormLayout responsiveSteps={[{ columns: 10 }]} key={item.uniqueId}>
        <ComboBox
          data-colspan="3"
          {...item}
          required
          label="Ingredient Name"
          itemLabelPath="name"
          itemValuePath="name"
          items={inventories.value}
          errorMessage="Field is required"
        />
        <TextField label="Quantity" data-colspan="1" required />
        <ComboBox
          data-colspan="2"
          {...item}
          required
          label="Unit"
          itemLabelPath="name"
          itemValuePath="name"
          items={units.value}
          errorMessage="Field is required"
        />
        <TextField label="Note" data-colspan="3" />
        <Button theme="icon error" aria-label="Close" onClick={() => deleteClicked({ uniqueId: item.uniqueId })}>
          <Icon icon="vaadin:close-small" />
          <Tooltip slot="tooltip" text="Delete Ingredient" data-colspan="1" />
        </Button>
      </FormLayout>
    );
  }

  const displayIngredientItems = (items: RecipeIngredientProps[]) => items.map((item) => <>{layout(item)}</>);

  return <div style={{ height: '320px', overflowY: 'scroll' }}>{displayIngredientItems(props.items)}</div>;
}
