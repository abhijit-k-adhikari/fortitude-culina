import { Button, ComboBox, FormLayout, Icon, TextField, Tooltip } from '@vaadin/react-components';
import { RecipeIngredientListProps, RecipeIngredientProps } from 'Frontend/views/interfaces/sharedInterfaces';
import _ from 'lodash';

export default function AddIndividualIngredient(props: RecipeIngredientListProps) {
  function layout(item: RecipeIngredientProps) {
    console.log('1>>> ' + item.quantity);

    return (
      <>
        <FormLayout responsiveSteps={[{ columns: 10 }]}>
          <ComboBox label="Ingredient name" data-colspan="3" required />
          <TextField label="Quantity" data-colspan="2" required value={item.quantity} />
          <ComboBox label="Unit" required />
          <TextField label="Note" data-colspan="3" />
          <Button theme="icon error" aria-label="Close">
            <Icon icon="vaadin:close-small" />
            <Tooltip slot="tooltip" text="Delete Ingredient" />
          </Button>
        </FormLayout>
      </>
    );
  }

  const displayIngredientItems = props.items.map((item) => <>{layout(item)}</>);

  return <>{displayIngredientItems}</>;
}
