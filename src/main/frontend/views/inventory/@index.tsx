// Contains code for List of Inventory information's

import { ViewConfig } from '@vaadin/hilla-file-router/types.js';
import { AutoCrud } from '@vaadin/hilla-react-crud';
import { useEffect } from 'react';
import { useSignal } from '@vaadin/hilla-react-signals';
import { ComboBox, TextArea } from '@vaadin/react-components';
import { InventoryCrudService } from 'Frontend/generated/endpoints';
import InventoryModel from 'Frontend/generated/fortitude/culina/entity/InventoryModel';
import { CategoryService } from 'Frontend/generated/endpoints';
import Category from 'Frontend/generated/fortitude/culina/entity/Category';
import { field } from '@vaadin/hilla-lit-form';

export const config: ViewConfig = {
  menu: { order: 1, icon: 'line-awesome/svg/atom-solid.svg' },
  title: 'Inventory',
  loginRequired: true,
};

export default function InventoryListView() {
  const name = useSignal('');
  const categories = useSignal<Category[]>([]);

  useEffect(() => {
    CategoryService.getAllCategories().then((data) => (categories.value = data));
  });

  return (
    <>
      <div className="p-l">
        <AutoCrud
          style={{ height: '600px' }}
          service={InventoryCrudService}
          model={InventoryModel}
          gridProps={{
            visibleColumns: ['name', 'category', 'quantity', 'unit', 'minQuantity', 'location'],
          }}
          formProps={{
            fieldOptions: {
              category: {
                renderer: ({ field }) => (
                  <ComboBox
                    {...field}
                    required
                    label="Category"
                    itemLabelPath="name"
                    itemValuePath="name"
                    items={categories.value}
                    errorMessage="Field is required"></ComboBox>
                ),
              },
            },
          }}
        />
      </div>
    </>
  );
}
