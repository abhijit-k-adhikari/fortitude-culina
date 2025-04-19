import { ViewConfig } from '@vaadin/hilla-file-router/types.js';
import { useSignal } from '@vaadin/hilla-react-signals';
import { Button, FormLayout, Grid, GridColumn, Icon, TextField } from '@vaadin/react-components';
import { useCallback, useEffect } from 'react';
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
          <Button theme="primary success" style={{ display: 'inline-block', marginRight: '20px' }}>
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
