import { ViewConfig } from '@vaadin/hilla-file-router/types.js';
import { useSignal } from '@vaadin/hilla-react-signals';
import {
  Button,
  ComboBox,
  Dialog,
  FormLayout,
  Grid,
  GridColumn,
  HorizontalLayout,
  Icon,
  TextArea,
  TextAreaElement,
  TextField,
  Tooltip,
  VerticalLayout,
} from '@vaadin/react-components';
import { useCallback, useEffect, useState } from 'react';
import { RecipeService } from 'Frontend/generated/endpoints';
import Recipe from 'Frontend/generated/fortitude/culina/entity/Recipe';

export const config: ViewConfig = {
  menu: { order: 2, icon: 'line-awesome/svg/cocktail-solid.svg' },
  title: 'Recipe',
  loginRequired: true,
};

export default function RecipeView() {
  const name = useSignal('');
  const items = useSignal<Recipe[]>([]);
  const detailsOpenedItems = useSignal<Recipe[]>([]);
  const [addDialogOpened, setAddDialogOpened] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    RecipeService.getAllRecipe().then((recipe: any) => {
      items.value = recipe.map((r: any) => ({
        ...r,
        displayName: `${r.recipeName}`,
      }));
    });
  }, []);

  const detailsRenderer = useCallback(({ item: person }: { item: Recipe }) => {
    return (
      <FormLayout responsiveSteps={[{ minWidth: '0', columns: 3 }]}>
        <TextField label="Ingredient Summary" value={person.ingredientSummary} readonly />
        <TextField label="Preparation Method" value={person.preparationMethod} readonly />
      </FormLayout>
    );
  }, []);

  const toggleDetailsRenderer = useCallback(({ item: person }: { item: Recipe }) => {
    const isExpanded = detailsOpenedItems.value.includes(person);
    return (
      <Button
        theme="tertiary icon"
        aria-label="Toggle details"
        aria-expanded={isExpanded}
        onClick={() => {
          detailsOpenedItems.value = isExpanded
            ? detailsOpenedItems.value.filter((p) => p !== person)
            : [...detailsOpenedItems.value, person];
        }}>
        <Icon icon={isExpanded ? 'lumo:angle-down' : 'lumo:angle-right'} />
      </Button>
    );
  }, []);

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

  return (
    <>
      <div>
        <div style={{ textAlign: 'right' }}>
          <Dialog
            width="1000px"
            height="620px"
            headerTitle="Add Recipe"
            opened={addDialogOpened}
            onOpenedChanged={({ detail }) => {
              setAddDialogOpened(detail.value);
            }}
            footer={
              <>
                <HorizontalLayout theme="spacing" style={{ flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                  <Button
                    theme="secondary error"
                    onClick={() => {
                      setAddDialogOpened(false);
                    }}>
                    Cancel
                  </Button>
                  <Button
                    theme="primary"
                    onClick={() => {
                      setAddDialogOpened(false);
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
          <Button
            theme="primary success"
            style={{ display: 'inline-block', marginRight: '20px' }}
            onClick={() => {
              setAddDialogOpened(true);
            }}>
            Add Recipe <Icon icon="vaadin:cross-cutlery" slot={'prefix'} />
          </Button>
        </div>
        <Grid
          theme="row-stripes"
          items={items.value}
          detailsOpenedItems={detailsOpenedItems.value}
          rowDetailsRenderer={detailsRenderer}>
          <GridColumn width="80px" flexGrow={0} frozen renderer={toggleDetailsRenderer} />
          <GridColumn path="recipeName" header="Recipe Name" />
          <GridColumn path="dateAdded" />
          <GridColumn frozenToEnd autoWidth flexGrow={0} renderer={editRenderer} />
          <GridColumn frozenToEnd autoWidth flexGrow={0} renderer={deleteRenderer} />
        </Grid>
      </div>
    </>
  );
}
