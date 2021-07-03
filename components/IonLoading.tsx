import { useIonLoading } from "@ionic/react";
import { useEffect } from "react";

const IonLoading: React.FC<{ isLoading: boolean }> = ({
  isLoading,
  children,
}) => {
  const [present, dismiss] = useIonLoading();

  useEffect(() => {
    if (isLoading) {
      present();
    } else {
      dismiss();
    }
    return () => {
      dismiss();
    };
  }, [isLoading, present, dismiss]);

  return <>{children}</>;
};

export default IonLoading;
