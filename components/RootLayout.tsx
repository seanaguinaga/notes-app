import React from "react";
import IonProgressBarProvider from "./IonProgressBar";

const RootLayout: React.FC = ({ children }) => {
  return (
    <IonProgressBarProvider>
      <ion-app>{children}</ion-app>
    </IonProgressBarProvider>
  );
};

export default RootLayout;
