import "@ionic/core/css/core.css";
import "@ionic/core/css/display.css";
import "@ionic/core/css/flex-utils.css";
import "@ionic/core/css/float-elements.css";
import "@ionic/core/css/normalize.css";
import "@ionic/core/css/padding.css";
import "@ionic/core/css/structure.css";
import "@ionic/core/css/text-alignment.css";
import "@ionic/core/css/text-transformation.css";
import "@ionic/core/css/typography.css";
import { defineCustomElements as ionDefineCustomElements } from "@ionic/core/loader";
import React, { ReactNode, Suspense, useEffect } from "react";
import { RelayEnvironmentProvider } from "react-relay/hooks";
import { getInitialPreloadedQuery, getRelayProps } from "relay-nextjs/app";
import RootLayout from "../components/RootLayout";
import { getClientEnvironment } from "../lib/client_enviroment";
import "../styles/shame.css";

const clientEnv = getClientEnvironment();
const initialPreloadedQuery = getInitialPreloadedQuery({
  createClientEnvironment: () => getClientEnvironment()!,
});

export default function App({ Component, pageProps }) {
  const relayProps = getRelayProps(pageProps, initialPreloadedQuery);
  const env = relayProps.preloadedQuery?.environment ?? clientEnv!;

  useEffect(() => {
    ionDefineCustomElements(window);
  }, []);

  useEffect(() => console.log("Changed"), [environment]);

  const getLayout =
    Component.getLayout ||
    ((page: ReactNode) => <RootLayout children={page} />);

  return (
<<<<<<< HEAD
    <RelayEnvironmentProvider environment={environment}>
      <Suspense
        fallback={
          <ion-progress-bar
            type="indeterminate"
            style={{ position: "absolute", bottom: 0 }}
          />
        }
      >
        {getLayout(<Component {...pageProps} />)}
      </Suspense>
=======
    <RelayEnvironmentProvider environment={env}>
      {getLayout(<Component {...pageProps} {...relayProps} />)}
>>>>>>> with-relay-nextjs
    </RelayEnvironmentProvider>
  );
}
