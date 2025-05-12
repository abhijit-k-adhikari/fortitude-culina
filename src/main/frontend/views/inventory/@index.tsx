// Contains code for List of Inventory information's

import { ViewConfig } from '@vaadin/hilla-file-router/types.js';
import { AutoCrud } from '@vaadin/hilla-react-crud';
import { useEffect } from 'react';
import { useSignal } from '@vaadin/hilla-react-signals';
import { ComboBox } from '@vaadin/react-components';
import { InventoryCrudService } from 'Frontend/generated/endpoints';
import InventoryModel from 'Frontend/generated/fortitude/culina/entity/inventory/InventoryModel';
import { CategoryService } from 'Frontend/generated/endpoints';
import { UnitService } from 'Frontend/generated/endpoints';
import { LocationService } from 'Frontend/generated/endpoints';

export const config: ViewConfig = {
  menu: { order: 1, icon: 'line-awesome/svg/atom-solid.svg' },
  title: 'Inventory',
  loginRequired: true,
  rolesAllowed: ['ADMIN'],
};

export default function InventoryListView() {
  const categories = useSignal<any>([]);
  const units = useSignal<any>([]);
  const locations = useSignal<any>([]);

  useEffect(() => {
    CategoryService.getAllCategories().then((data) => (categories.value = data));
    UnitService.getAllUnits().then((data) => (units.value = data));
    LocationService.getAllLocations().then((data) => (locations.value = data));
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
              unit: {
                renderer: ({ field }) => (
                  <ComboBox
                    {...field}
                    required
                    label="Unit"
                    itemLabelPath="name"
                    itemValuePath="name"
                    items={units.value}
                    errorMessage="Field is required"></ComboBox>
                ),
              },
              location: {
                renderer: ({ field }) => (
                  <ComboBox
                    {...field}
                    required
                    label="Unit"
                    itemLabelPath="name"
                    itemValuePath="name"
                    items={locations.value}
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
