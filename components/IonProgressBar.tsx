import React, { useCallback, useState } from "react";
import { createContext, useContext } from "use-context-selector";

type UseIonProgressBar = [
  {
    /**
     * Presents the ion-progress-bar on the top of the screen
     */
    (): void;
  },
  /**
   * Dismisses the ion-progress-bar on the top of the screen
   */
  () => void
];

const IonProgressBarContext = createContext<UseIonProgressBar>(
  null as UseIonProgressBar
);

const IonProgressBarProvider: React.FC = ({ children }) => {
  let [visible, setVisible] = useState(false);

  let present = useCallback(() => {
    setVisible(true);
  }, []);

  let dismiss = useCallback(() => {
    setVisible(false);
  }, []);

  return (
    <IonProgressBarContext.Provider value={[present, dismiss]}>
      <ion-progress-bar
        type="indeterminate"
        style={{
          top: 0,
          position: "absolute",
          visibility: visible ? "visible" : "hidden",
        }}
      />
      {children}
    </IonProgressBarContext.Provider>
  );
};

export function useIonProgressBar(): UseIonProgressBar {
  let context = useContext(IonProgressBarContext);
  return context;
}

export default IonProgressBarProvider;
