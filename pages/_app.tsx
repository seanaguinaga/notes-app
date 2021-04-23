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
import RootLayout from "../components/RootLayout";
import { useEnvironment } from "../lib/relay";
import "../styles/shame.css";

export default function App({ Component, pageProps }) {
  const environment = useEnvironment(pageProps.initialRecords);

  useEffect(() => {
    ionDefineCustomElements(window);
  });

  const getLayout =
    Component.getLayout ||
    ((page: ReactNode) => <RootLayout children={page} />);

  return (
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
    </RelayEnvironmentProvider>
  );
}
