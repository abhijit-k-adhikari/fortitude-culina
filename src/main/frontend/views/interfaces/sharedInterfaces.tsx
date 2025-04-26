export interface RecipeIngredientListProps {
  items: RecipeIngredientProps[];
}

export interface RecipeIngredientProps {
  ingredientName: string;
  quantity: string;
  unit: string;
  note: string;
}
