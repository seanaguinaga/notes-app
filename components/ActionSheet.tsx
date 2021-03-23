import { IonActionSheet } from "@ionic/react";
import { useRouter } from "next/router";
import React from "react";

interface ActionSheetProps {
  showActionSheet: boolean;
  setShowActionSheet: React.Dispatch<React.SetStateAction<boolean>>;
}

const ActionSheet: React.FC<ActionSheetProps> = ({
  showActionSheet,
  setShowActionSheet,
}) => {
  let router = useRouter();

  return (
    <IonActionSheet
      isOpen={showActionSheet}
      onDidDismiss={() => setShowActionSheet(false)}
      buttons={[
        {
          text: "Delete",
          role: "destructive",
          handler: () => {
            if (window.history.length > 1) {
              router.back();
            } else {
              router.replace("/");
            }
          },
        },
        {
          text: "Cancel",
          role: "cancel",
          handler: () => {
            console.log("Cancel clicked");
          },
        },
      ]}
    ></IonActionSheet>
  );
};

export default ActionSheet;
