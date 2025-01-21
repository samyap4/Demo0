import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";
import {
  FpjsProvider
} from '@fingerprintjs/fingerprintjs-pro-react'
import './index.css';

ReactDOM.render(
  <Auth0Provider
    domain={process.env.REACT_APP_AUTH0_DOMAIN}
    clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
    useRefreshTokens={true}
    cacheLocation={'localstorage'}
    useRefreshTokensFallback={true}
    authorizationParams={{
      redirect_uri: window.location.origin,
      audience: process.env.REACT_APP_AUTH0_AUDIENCE,
    }}
  >
    <React.StrictMode>
    <FpjsProvider
      loadOptions={{
        apiKey: "hLCm2lbfa39fWYTFFOxd"
      }}
    >
      <App />
    </FpjsProvider>

    </React.StrictMode>
  </Auth0Provider>,
  document.getElementById("root")
);
