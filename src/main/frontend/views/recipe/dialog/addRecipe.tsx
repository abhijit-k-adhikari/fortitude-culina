import {
  Button,
  ComboBox,
  Dialog,
  FormLayout,
  HorizontalLayout,
  Icon,
  TextArea,
  TextAreaElement,
  TextField,
  Tooltip,
  VerticalLayout,
} from '@vaadin/react-components';
import { useEffect, useState } from 'react';
import { RecipeIngredientListProps, RecipeIngredientProps } from 'Frontend/views/interfaces/sharedInterfaces';
import AddIndividualIngredient from './addIndividualIngredient';

interface RecipeProps {
  dialogOpen: boolean;
  onClick: (param: any) => void;
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
    { ingredientName: '', quantity: '0', unit: '', note: '' },
    { ingredientName: 'tomato', quantity: '10', unit: 'pc', note: 'notes' },
  ]);

  const [ingredientItemProps, setIndividualIngredientProps] = useState<RecipeIngredientListProps>({
    items: ingredientItems,
  });

  return (
    <Dialog
      width="1000px"
      height="620px"
      headerTitle="Add Recipe"
      opened={props.dialogOpen}
      footer={
        <>
          <HorizontalLayout theme="spacing" style={{ flexWrap: 'wrap', justifyContent: 'flex-end' }}>
            <Button
              theme="secondary error"
              onClick={() => {
                props.dialogOpen = false;
                props.onClick('Cancel/Close');
              }}>
              Cancel
            </Button>
            <Button
              theme="primary"
              onClick={() => {
                props.dialogOpen = false;
                props.onClick('Add Clicked');
              }}>
              Add Recipe
            </Button>
          </HorizontalLayout>
        </>
      }>
      <VerticalLayout theme="spacing" style={{ alignItems: 'stretch' }}>
        <FormLayout responsiveSteps={[{ columns: 3 }]}>
          <TextField label="Recipe Name" data-colspan="2" required errorMessage="Recipe name is mandatory" />
          <ComboBox
            label="Number of Pax"
            data-colspan="1"
            required
            itemLabelPath="label"
            itemValuePath="value"
            items={pax}
            errorMessage="Field is required"></ComboBox>
          <div data-colspan="2">
            <AddIndividualIngredient items={ingredientItemProps.items}></AddIndividualIngredient>
            <HorizontalLayout theme="spacing" style={{ flexWrap: 'wrap', justifyContent: 'flex-end' }}>
              <Button theme="secondary">Add Ingredients</Button>
            </HorizontalLayout>
            <TextArea
              disabled
              label="Ingredients"
              value="4444"
              style={{
                width: '63%',
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
            style={{ width: '100%', height: '370px' }}
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
