import {
  Button,
  ComboBox,
  Dialog,
  FormLayout,
  HorizontalLayout,
  TextArea,
  TextAreaElement,
  TextField,
  VerticalLayout,
} from '@vaadin/react-components';
import { useState } from 'react';
import { RecipeIngredientListProps, RecipeIngredientProps } from 'Frontend/interfaces/sharedInterfaces';
import AddIngredient from './addIngredient';
import _ from 'lodash';

interface RecipeProps {
  dialogOpen: boolean;
  onClose: (param: any) => void;
}

export default function AddRecipe(props: RecipeProps) {
  const [errorMessage, setErrorMessage] = useState('');
  const [pax, setPax] = useState<any[]>([
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4' },
    { value: '5', label: '5' },
    { value: '6', label: '6' },
    { value: '7', label: '7' },
    { value: '8', label: '8' },
    { value: '9', label: '9' },
    { value: '10', label: '10' },
    { value: '15', label: '15' },
    { value: '20', label: '20' },
    { value: '25', label: '25' },
    { value: '30', label: '30' },
    { value: '50', label: '50' },
    { value: '75', label: '75' },
    { value: '100', label: '100' },
    { value: '125', label: '125' },
    { value: '150', label: '150' },
    { value: '175', label: '175' },
    { value: '200', label: '200' },
  ]);

  const [ingredientItems, setIngredientItems] = useState<RecipeIngredientProps[]>([
    { uniqueId: _.uniqueId(), ingredientName: '', quantity: '0', unit: '', note: '' },
  ]);

  const [ingredientItemProps, setIndividualIngredientProps] = useState<RecipeIngredientListProps>({
    items: ingredientItems,
    onDelete: (param: any) => {},
  });

  function addIngredients(): void {
    let items: RecipeIngredientProps[] = ingredientItems;
    let uuid = _.uniqueId();
    console.log('addIngredients: ' + uuid);
    items.push({ uniqueId: uuid, ingredientName: '', quantity: '0', unit: '', note: '' });

    setIngredientItems(items);
    setIndividualIngredientProps({ items: items, onDelete: (param: any) => {} });
  }

  function deleteIngredients(uuId: any): void {
    _.remove(ingredientItems, function (o: RecipeIngredientProps) {
      return o.uniqueId == uuId;
    });
    
    setIngredientItems(ingredientItems);
    setIndividualIngredientProps({ items: ingredientItems, onDelete: (param: any) => {} });
  }

  function addRecipe(param: any): void {
    console.log(param);
    // reset the panel for next time render
    setIngredientItems([{ uniqueId: _.uniqueId(), ingredientName: '', quantity: '0', unit: '', note: '' }]);
    props.onClose(param);
  }

  function cancelRecipe(param: any): void {
    // reset the panel for next time render
    setIngredientItems([{ uniqueId: _.uniqueId(), ingredientName: '', quantity: '0', unit: '', note: '' }]);
    props.onClose(param);
  }

  return (
    <Dialog
      width="1200px"
      height="700px"
      headerTitle="Add Recipe"
      opened={props.dialogOpen}
      footer={
        <>
          <HorizontalLayout theme="spacing" style={{ flexWrap: 'wrap', justifyContent: 'flex-end' }}>
            <Button theme="secondary error" onClick={() => cancelRecipe('Cancel Clicked')}>
              Cancel
            </Button>
            <Button theme="primary" onClick={() => addRecipe('Add Clicked')}>
              Add Recipe
            </Button>
          </HorizontalLayout>
        </>
      }>
      <VerticalLayout theme="spacing" style={{ alignItems: 'stretch' }}>
        <FormLayout responsiveSteps={[{ columns: 4 }]}>
          <TextField label="Recipe Name" data-colspan="3" required errorMessage="Recipe name is mandatory" />
          <ComboBox
            label="Number of Pax"
            data-colspan="1"
            required
            itemLabelPath="label"
            itemValuePath="value"
            items={pax}
            errorMessage="Field is required"></ComboBox>
          <div data-colspan="3">
            <AddIngredient items={ingredientItemProps.items} onDelete={deleteIngredients}></AddIngredient>
            <HorizontalLayout theme="spacing" style={{ flexWrap: 'wrap', justifyContent: 'flex-end' }}>
              <Button theme="secondary" onClick={addIngredients}>
                Add Ingredients
              </Button>
            </HorizontalLayout>
            <TextArea
              disabled
              label="Ingredients"
              value="4444"
              style={{
                width: '72%',
                minHeight: '100px',
                maxHeight: '150px',
                position: 'absolute',
                bottom: '90px',
              }}
            />
          </div>
          <TextArea
            required
            minlength={0}
            maxlength={1000}
            allowedCharPattern="[A-Za-z0-9,.\-\s]"
            label="Preparation Method"
            helperText="Must be between 0 and 1000 characters long. Allowed special char are comma & dot"
            style={{ width: '100%', height: '370px', marginBottom: 'auto'}}
            errorMessage={errorMessage}
            onValidated={(event) => {
              const field = event.target as TextAreaElement;
              const { validity } = field.inputElement as HTMLTextAreaElement;
              if (validity.valueMissing) {
                setErrorMessage('Field is required');
              } else if (validity.tooShort) {
                setErrorMessage(`Minimum length is ${field.minlength} characters`);
              } else if (validity.tooLong) {
                setErrorMessage(`Maximum length is ${field.maxlength} characters`);
              } else {
                setErrorMessage('');
              }
            }}
          />
        </FormLayout>
      </VerticalLayout>
    </Dialog>
  );
}
