import { ViewConfig } from '@vaadin/hilla-file-router/types.js';
import { useSignal } from '@vaadin/hilla-react-signals';
import { AutoCrud } from '@vaadin/hilla-react-crud';
import { UserCrudService } from 'Frontend/generated/endpoints';
import UserModel from 'Frontend/generated/fortitude/culina/entity/users/UserModel';


export const config: ViewConfig = {
  menu: { order: 6, icon: 'line-awesome/svg/user-solid.svg' },
  title: 'User',
  loginRequired: true,
};

export default function UserView() {
  const name = useSignal('');

  return (
    <>
    <div className="p-l">
        <AutoCrud style={{height: "600px"}} service={UserCrudService} model={UserModel} />
      </div>
    </>
  );
}
