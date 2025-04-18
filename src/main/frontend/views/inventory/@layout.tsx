import { ViewConfig } from '@vaadin/hilla-file-router/types.js';
import { Outlet } from 'react-router';

export const config: ViewConfig = {
  loginRequired: true
}

export default function InventoryLayout() {
  return (
    <div>
      {/* <header>
        <h3>Inventory</h3>
      </header> */}
      <main>
        <Outlet />
      </main>
    </div>
  );
}
