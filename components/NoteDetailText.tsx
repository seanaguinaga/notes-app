import { IonTextarea } from "@ionic/react";
import React, { useEffect, useState } from "react";
import { graphql, useFragment, useMutation } from "react-relay/hooks";

const NoteDetailText = ({ note }) => {
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

  let [text, setText] = useState(data.text);

  useEffect(() => {
    if (data.text === text) {
      return;
    }
    commit({
      optimisticUpdater: (store) => {
        const noteRecord = store.get(data.id);
        const currentText = noteRecord.getValue("text");
        noteRecord.setValue(currentText ?? text, "text");
        noteRecord.setValue(
          `${new Date(Date.now()).toISOString()}`,
          "updated_at"
        );
      },
      variables: {
        id: data.id,
        data: {
          text,
          updated_at: `${new Date(Date.now()).toISOString()}`,
        },
      },
      onCompleted(data) {
        console.log(data);
      },
      onError(error) {
        console.log(error);
      },
    });
  }, [text]);

  useEffect(() => {
    if (!isInFlight) {
      let titleInput = document.getElementById(
        "text-input"
      ) as HTMLIonInputElement;
      titleInput.setFocus();
    }
  }, [isInFlight]);

  return (
    <>
      <IonTextarea
        autoGrow
        id="text-input"
        disabled={isInFlight}
        value={text}
        placeholder="Text"
        debounce={700}
        onIonChange={(e) => {
          if (!isInFlight) {
            setText(e.detail.value);
          }
        }}
      />
    </>
  );
};

export default NoteDetailText;
