// import { useContext } from 'react';
// import { AuthContext } from '../contexts/auth/auth0-context';

// import {AuthContext} from 'src/contexts/auth0-context';
// import { AuthContext } from 'src/contexts/auth-context';

// import { Auth0Context, Auth0Provider } from '@auth0/auth0-react';

// export const useAuth = () => useContext(AuthContext);


import { useContext } from 'react';
import { AuthContext } from 'src/contexts/auth0-context';

export const useAuth = () => useContext(AuthContext);
