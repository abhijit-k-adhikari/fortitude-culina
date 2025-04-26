import { ViewConfig } from '@vaadin/hilla-file-router/types.js';
import { Outlet } from 'react-router';

export const config: ViewConfig = {
  loginRequired: true
}

export default function RecipeLayout() {
  return (
    <div>     
      <main>
        <Outlet />
      </main>
    </div>
  );
}
