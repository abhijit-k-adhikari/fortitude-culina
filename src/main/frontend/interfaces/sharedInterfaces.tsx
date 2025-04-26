import { ButtonElement } from "@vaadin/react-components";
import { MouseEventHandler } from "react";

export interface RecipeIngredientListProps {
  items: RecipeIngredientProps[];
  onDelete: (param: any) => void;
}

export interface RecipeIngredientProps {
  uniqueId: string;
  ingredientName: string;
  quantity: string;
  unit: string;
  note: string;
}
