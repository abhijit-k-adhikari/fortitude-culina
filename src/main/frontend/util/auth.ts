import { configureAuth } from '@vaadin/hilla-react-auth';
import { AuthenticationEndpoint } from 'Frontend/generated/endpoints';

const auth = configureAuth(AuthenticationEndpoint.getAuthenticatedUser);

export const useAuth = auth.useAuth;
export const AuthProvider = auth.AuthProvider;
