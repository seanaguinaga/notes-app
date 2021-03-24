import { InputChangeEventDetail } from "@ionic/core";
import { IonTextarea } from "@ionic/react";
import React from "react";
import { graphql, useFragment, useMutation } from "react-relay/hooks";

const NoteDetailText = ({ note, textInputRef }) => {
  const data = useFragment(
    graphql`
      fragment NoteDetailText_note on notes_app_notes {
        id
        text
      }
    `,
    note
  );

  const [commit, isInFlight] = useMutation(graphql`
    mutation NoteDetailTextMutation(
      $id: uuid!
      $data: notes_app_notes_set_input
    ) {
      update_notes_app_notes_by_pk(pk_columns: { id: $id }, _set: $data) {
        id
        updated_at
        text
      }
    }
  `);

  const handleChange = (e: CustomEvent<InputChangeEventDetail>) => {
    if (isInFlight) {
      return;
    }
    if (!e.detail.value) {
      return;
    }

    commit({
      optimisticUpdater: (store) => {
        const noteRecord = store.get(data.id);
        const currentText = noteRecord.getValue("text");
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
    });
  };

  return (
    <>
      <IonTextarea
        autoGrow
        value={data.text}
        placeholder="Text"
        debounce={450}
        onIonChange={handleChange}
        ref={textInputRef}
      />
    </>
  );
};

export default NoteDetailText;
