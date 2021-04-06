import { InputChangeEventDetail } from "@ionic/core";
import { IonTextarea } from "@ionic/react";
import React from "react";
import { graphql, useLazyLoadQuery, useMutation } from "react-relay/hooks";
import { NoteDetailTextQuery } from "./__generated__/NoteDetailTextQuery.graphql";

const NoteDetailText = ({ note, textInputRef }) => {
  const data = useLazyLoadQuery<NoteDetailTextQuery>(
    graphql`
      query NoteDetailTextQuery($id: uuid!) {
        notes_app_notes(where: { id: { _eq: $id } }) {
          id
          text
        }
      }
    `,
    { id: note.id },
    { fetchPolicy: "store-or-network" }
  );

  const [commit, isInFlight] = useMutation(graphql`
    mutation NoteDetailTextMutation(
      $id: uuid!
      $data: notes_app_notes_set_input
    ) {
      update_notes_app_notes(where: { id: { _eq: $id } }, _set: $data) {
        returning {
          id
          updated_at
          text
        }
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
      // optimisticUpdater: (store) => {
      //   const noteRecord = store.get(data.notes_app_notes[0].id as string);
      //   const currentText = noteRecord.getValue("text");
      //   noteRecord.setValue(e.detail.value ?? currentText, "text");
      //   noteRecord.setValue(
      //     `${new Date(Date.now()).toISOString()}`,
      //     "updated_at"
      //   );
      // },
      variables: {
        //@ts-ignore
        id: data.notes_app_notes[0].id,
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
        //@ts-ignore
        value={data.notes_app_notes[0].text}
        placeholder="Text"
        debounce={450}
        onIonChange={handleChange}
        ref={textInputRef}
      />
    </>
  );
};

export default NoteDetailText;
