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
import { useState } from 'react';

interface AddRecipeProps {
  dialogOpen: boolean;
  onClick: (param: any) => void;
}

export default function AddRecipe(props: AddRecipeProps) {
  const [errorMessage, setErrorMessage] = useState('');

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
          <TextField label="Recipe name" data-colspan="3" />
          <div data-colspan="2">
            <FormLayout responsiveSteps={[{ columns: 10 }]}>
              <ComboBox label="Ingredient name" data-colspan="3" />
              <TextField label="Quantity" data-colspan="2" />
              <ComboBox label="Unit" />
              <TextField label="Note" data-colspan="3" />
              <Button theme="icon error" aria-label="Close">
                <Icon icon="vaadin:close-small" />
                <Tooltip slot="tooltip" text="Delete Ingredient" />
              </Button>
            </FormLayout>
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
