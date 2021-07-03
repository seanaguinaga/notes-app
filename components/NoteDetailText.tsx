import { InputChangeEventDetail } from "@ionic/core";
import { IonLoading, IonTextarea } from "@ionic/react";
import React, { Suspense } from "react";
import { graphql, useFragment, useMutation } from "react-relay/hooks";
import { useIonProgressBar } from "./IonProgressBar";
import { NoteDetailTextMutation } from "./__generated__/NoteDetailTextMutation.graphql";
import { NoteDetailText_note$key } from "./__generated__/NoteDetailText_note.graphql";

interface NoteDetailTextProps {
  note: NoteDetailText_note$key;
  textInputRef: React.MutableRefObject<HTMLIonTextareaElement>;
}

const NoteDetailText: React.FC<NoteDetailTextProps> = ({
  note,
  textInputRef,
}) => {
  let [present, dismiss] = useIonProgressBar();

  let data = useFragment(
    graphql`
      fragment NoteDetailText_note on notes {
        id
        text
      }
    `,
    note
  );

  let [commit, isInFlight] = useMutation<NoteDetailTextMutation>(graphql`
    mutation NoteDetailTextMutation($id: uuid!, $data: notes_set_input) {
      update_notes(where: { id: { _eq: $id } }, _set: $data) {
        returning {
          id
          updated_at
          text
        }
      }
    }
  `);

  let handleChange = (e: CustomEvent<InputChangeEventDetail>) => {
    if (isInFlight) {
      return;
    }

    if (e.detail.value === data?.text) {
      return;
    }

    present();

    commit({
      optimisticUpdater: (store) => {
        let noteRecord = store.get(data.id as string);
        let currentText = noteRecord.getValue("text");
        noteRecord.setValue(e.detail.value ?? currentText, "text");
        noteRecord.setValue(
          `${new Date(Date.now()).toISOString()}`,
          "updated_at"
        );
      },
      variables: {
        id: data.id,
        data: {
          text: e.detail.value,
          updated_at: `${new Date(Date.now()).toISOString()}`,
        },
      },
      onCompleted: () => dismiss(),
      onError: () => dismiss(),
    });
  };

  return (
    <Suspense fallback={<IonLoading isOpen />}>
      <IonTextarea
        autoGrow
        value={data?.text}
        placeholder="Text"
        debounce={450}
        onIonChange={handleChange}
        ref={textInputRef}
      />
    </Suspense>
  );
};

export default NoteDetailText;
