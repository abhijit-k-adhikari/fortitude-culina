import { ViewConfig } from '@vaadin/hilla-file-router/types.js';
import { AutoGrid } from '@vaadin/hilla-react-crud';
import { useSignal } from '@vaadin/hilla-react-signals';
import { InventoryService } from 'Frontend/generated/endpoints';
import InventoryModel from 'Frontend/generated/fortitude/culina/entity/InventoryModel';

export const config: ViewConfig = {
  menu: { order: 1, icon: 'line-awesome/svg/atom-solid.svg' },
  title: 'Inventory',
  loginRequired: true,
};

export default function InventoryView() {
  const name = useSignal('');

  return (
    <>
      <div className="p-l">
        <AutoGrid service={InventoryService} model={InventoryModel} />
      </div>
    </>
  );
}
