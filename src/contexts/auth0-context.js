import React, { useState, useEffect, createContext } from 'react';
import { useRouter } from 'next/router';
import { Auth0Provider } from '@auth0/auth0-react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [auth0Ready, setAuth0Ready] = useState(false);

  useEffect(() => {
    const checkAuth0Ready = async () => {
      try {
        await Auth0Provider?.getInstance();
        setAuth0Ready(true);
      } catch (error) {
        console.error('Error initializing Auth0:', error);
      }
    };

    checkAuth0Ready();
  }, []);

  return (
    <Auth0Provider
      domain={process.env.NEXT_PUBLIC_AUTH0_ISSUER_BASE_URL}
      clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID}
      redirectUri={typeof window !== 'undefined' && window.location.origin}
      onRedirectCallback={(appState) => {
        router.push(appState?.returnTo || window.location.pathname);
      }}
    >
      <AuthContext.Provider value={{ auth0Ready }}>
        {children}
      </AuthContext.Provider>
    </Auth0Provider>
  );
};

export default AuthProvider;
