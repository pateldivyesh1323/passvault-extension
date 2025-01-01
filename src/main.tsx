import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { HashRouter } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import environment from "./environment.ts";
import { UserAuthProvider } from "./providers/UserAuthProvider.tsx";

createRoot(document.getElementById("passvault-extension-root")!).render(
    <StrictMode>
        <HashRouter>
            <Auth0Provider
                domain={environment.auth_domain}
                clientId={environment.auth_clientid}
                authorizationParams={{
                    redirect_uri: window.location.origin,
                    audience: environment.api_identifier,
                }}
            >
                <UserAuthProvider>
                    <App />
                </UserAuthProvider>
            </Auth0Provider>
        </HashRouter>
    </StrictMode>
);
