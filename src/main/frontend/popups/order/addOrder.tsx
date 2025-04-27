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
import { useEffect, useState } from 'react';
import { RecipeIngredientListProps, RecipeIngredientProps } from 'Frontend/interfaces/sharedInterfaces';
import { LocationService, RecipeService, UserService } from 'Frontend/generated/endpoints';
import _ from 'lodash';
import { useSignal } from '@vaadin/hilla-react-signals';

interface RecipeProps {
  dialogOpen: boolean;
  onClose: (param: any) => void;
}

export default function AddOrder(props: RecipeProps) {
  const recipes = useSignal<any>([]);
  const locations = useSignal<any>([]);
  const staffs = useSignal<any>([]);
  const [pax, setPax] = useState<any[]>([]);

  const [repeat, setRepeat] = useState<any[]>([
    { value: 'Never', label: 'Never' },
    { value: 'Daily', label: 'Daily' },
    { value: 'Weekly', label: 'Weekly' },
    { value: 'Monthly', label: 'Monthly' },
    { value: 'Yearly', label: 'Yearly' },
  ]);

  useEffect(() => {
    RecipeService.getAllRecipe().then((data) => (recipes.value = data));
    LocationService.getAllLocations().then((data) => (locations.value = data));
    UserService.getAllUsers().then((data) => (staffs.value = data));

    //initialize the pax count
    initializePax();
  }, []);

  function initializePax(): void {
    let pax: any[] = [];
    for (let i: number = 1; i <= 100; i++) {
      pax.push({ value: i, label: i });
    }
    setPax(pax);
  }

  function addOrder(param: any): void {
    props.onClose(param);
  }

  function cancelRecipe(param: any): void {
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
          <ComboBox
            data-colspan="3"
            required
            label="Recipe"
            itemLabelPath="recipeName"
            itemValuePath="recipeName"
            items={recipes.value}
            errorMessage="Field is required"
          />

          <ComboBox
            data-colspan="1"
            label="Order Quantity"
            required
            itemLabelPath="label"
            itemValuePath="value"
            items={pax}
            errorMessage="Field is required"
          />

          <ComboBox
            data-colspan="2"
            required
            label="Location"
            itemLabelPath="name"
            itemValuePath="name"
            items={locations.value}
            errorMessage="Field is required"
          />

          <ComboBox
            data-colspan="2"
            required
            label="Staff"
            itemLabelPath="name"
            itemValuePath="name"
            items={staffs.value}
            errorMessage="Field is required"
          />

          <DateTimePicker label="Start Time" data-colspan="2"></DateTimePicker>
          <DateTimePicker label="End Time" data-colspan="2"></DateTimePicker>
          <ComboBox
            data-colspan="2"
            label="Repeat"
            required
            itemLabelPath="label"
            itemValuePath="value"
            items={repeat}
            errorMessage="Field is required"
          />
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
