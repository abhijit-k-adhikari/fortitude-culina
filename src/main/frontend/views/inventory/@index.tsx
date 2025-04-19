import { ViewConfig } from '@vaadin/hilla-file-router/types.js';
import { AutoCrud } from '@vaadin/hilla-react-crud';
import { useSignal } from '@vaadin/hilla-react-signals';
import { InventoryCrudService } from 'Frontend/generated/endpoints';
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
        <AutoCrud style={{height: "600px"}} service={InventoryCrudService} model={InventoryModel} />
      </div>
    </>
  );
}
