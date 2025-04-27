import {
  Button,
  ComboBox,
  DatePicker,
  DateTimePicker,
  Dialog,
  FormItem,
  FormLayout,
  HorizontalLayout,
  TextArea,
  TextAreaElement,
  TextField,
  VerticalLayout,
} from '@vaadin/react-components';
import { useState } from 'react';
import { RecipeIngredientListProps, RecipeIngredientProps } from 'Frontend/interfaces/sharedInterfaces';
import _ from 'lodash';

interface RecipeProps {
  dialogOpen: boolean;
  onClose: (param: any) => void;
}

export default function AddOrder(props: RecipeProps) {
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

  function addOrder(param: any): void {
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
      width="900px"
      height="720px"
      headerTitle="Add Order"
      opened={props.dialogOpen}
      footer={
        <>
          <HorizontalLayout theme="spacing" style={{ flexWrap: 'wrap', justifyContent: 'flex-end' }}>
            <Button theme="secondary error" onClick={() => cancelRecipe('Cancel Clicked')}>
              Cancel
            </Button>
            <Button theme="primary" onClick={() => addOrder('Add Clicked')}>
              Add Order
            </Button>
          </HorizontalLayout>
        </>
      }>
      <VerticalLayout theme="spacing" style={{ alignItems: 'stretch' }}>
        <FormLayout responsiveSteps={[{ columns: 4 }]}>
          <ComboBox label="Recipe" data-colspan="3" errorMessage="Field is required"></ComboBox>
          <TextField label="No Of Pax" data-colspan="1" required errorMessage="Recipe name is mandatory" />
          <ComboBox label="Location" data-colspan="2" errorMessage="Field is required"></ComboBox>
          <ComboBox label="Staff" data-colspan="2" errorMessage="Field is required"></ComboBox>

          <DateTimePicker label="Start Time" data-colspan="2"></DateTimePicker>
          <DateTimePicker label="End Time" data-colspan="2"></DateTimePicker>
          <ComboBox label="Repeat" data-colspan="2" errorMessage="Field is required"></ComboBox>
          <DatePicker label="Until" data-colspan="2"></DatePicker>

          <TextField label="Customer Name" data-colspan="1" errorMessage="Recipe name is mandatory" />
          <TextField label="Customer Number" data-colspan="1" errorMessage="Recipe name is mandatory" />
          <TextField label="Customer Email" data-colspan="2" errorMessage="Recipe name is mandatory" />
          <TextField label="Customer Address" data-colspan="4" errorMessage="Recipe name is mandatory" />

          <TextArea label="Notes" data-colspan="4" errorMessage="Recipe name is mandatory" />
        </FormLayout>
      </VerticalLayout>
    </Dialog>
  );
}
