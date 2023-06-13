// import Head from 'next/head';
// import { CacheProvider } from '@emotion/react';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import { CssBaseline } from '@mui/material';
// import { ThemeProvider } from '@mui/material/styles';

// // import { AuthConsumer, AuthProvider } from 'src/contexts/auth-context';
// import { AuthConsumer, AuthProvider } from '../contexts/auth/auth0-context';

// import { useNProgress } from 'src/hooks/use-nprogress';
// import { createTheme } from 'src/theme';
// import { createEmotionCache } from 'src/utils/create-emotion-cache';
// import 'simplebar-react/dist/simplebar.min.css';


// const clientSideEmotionCache = createEmotionCache();

// const SplashScreen = () => null;

// const App = (props) => {
//   const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

//   useNProgress();

//   const getLayout = Component.getLayout ?? ((page) => page);

//   const theme = createTheme();

//   return (
//     <CacheProvider value={emotionCache}>
//       <Head>
//         <title>
//           Devias Kit
//         </title>
//         <meta
//           name="viewport"
//           content="initial-scale=1, width=device-width"
//         />
//       </Head>
//       <LocalizationProvider dateAdapter={AdapterDateFns}>
//         <AuthProvider>
//           <ThemeProvider theme={theme}>
//             <CssBaseline />
//             <AuthConsumer>
//               {
//                 (auth) => auth.isLoading
//                   ? <SplashScreen />
//                   : getLayout(<Component {...pageProps} />)
//               }
//             </AuthConsumer>
//           </ThemeProvider>
//         </AuthProvider>
//       </LocalizationProvider>
//     </CacheProvider>
//   );
// };

// export default App;


// IMPLEMENTAMOS AUTH0

import Head from 'next/head';
import { CacheProvider } from '@emotion/react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { AuthProvider, AuthConsumer } from '../contexts/auth-context';
import { useRouter } from 'next/router';


import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';

import { useNProgress } from 'src/hooks/use-nprogress';
import { createTheme } from 'src/theme';
import { createEmotionCache } from 'src/utils/create-emotion-cache';
import 'simplebar-react/dist/simplebar.min.css';
import { useEffect } from 'react';

const clientSideEmotionCache = createEmotionCache();

const SplashScreen = () => null;

const redirectUri = typeof window !== 'undefined' ? window.location.origin : '';
const auto0Config = {
  domain: process.env.NEXT_PUBLIC_AUTH0_ISSUER_BASE_URL,
  clientId: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID,
  redirectUri: redirectUri
};

const App = (props) => {
  const router = useRouter();

  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  useNProgress();

  const getLayout = Component.getLayout ?? ((page) => page);

  const theme = createTheme();


  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Devias Kit</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Auth0Provider
        {...auto0Config}
        useRefreshTokens
        onRedirectCallback={(appState) => {
          router.push(appState?.returnTo || '/');
        }}
        >
          <ThemeProvider theme={theme}>
            <CssBaseline />
            
            <AuthConsumer>
               {
                 (auth) => auth.isLoading
                   ?
                   <SplashScreen />
                   :
                   getLayout(<Component {...pageProps} />)
               }
             </AuthConsumer>

          </ThemeProvider>
        </Auth0Provider>
      </LocalizationProvider>
    </CacheProvider>
  );
};

export default App;
