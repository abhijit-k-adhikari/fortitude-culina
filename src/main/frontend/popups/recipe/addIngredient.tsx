import { Button, ComboBox, FormLayout, Icon, TextField, Tooltip } from '@vaadin/react-components';
import { RecipeIngredientListProps, RecipeIngredientProps } from 'Frontend/interfaces/sharedInterfaces';
import _, { uniqueId } from 'lodash';

export default function AddIngredient(props: RecipeIngredientListProps) {
  // individual click occurs
  function deleteClicked(item: any) {
    props.onDelete(item.uniqueId);
  }

  // render the control list here...
  function layout(item: RecipeIngredientProps) {
    return (
      <FormLayout responsiveSteps={[{ columns: 10 }]} key={item.uniqueId}>
        <ComboBox label="Ingredient name" data-colspan="3" required />
        <TextField label="Quantity" data-colspan="2" required value={item.uniqueId} />
        <ComboBox label="Unit" required />
        <TextField label="Note" data-colspan="3" />
        <Button theme="icon error" aria-label="Close" onClick={() => deleteClicked({ uniqueId: item.uniqueId })}>
          <Icon icon="vaadin:close-small" />
          <Tooltip slot="tooltip" text="Delete Ingredient" />
        </Button>
      </FormLayout>
    );
  }

  const displayIngredientItems = (items: RecipeIngredientProps[]) => items.map((item) => <>{layout(item)}</>);

  return <div style={{ height: '320px', overflowY: 'scroll' }}>{displayIngredientItems(props.items)}</div>;
}
