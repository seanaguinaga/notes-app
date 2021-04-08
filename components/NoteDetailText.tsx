import { InputChangeEventDetail } from "@ionic/core";
import { IonTextarea } from "@ionic/react";
import React from "react";
import { graphql, useFragment, useMutation } from "react-relay/hooks";
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
  const data = useFragment(
    graphql`
      fragment NoteDetailText_note on notes_app_notes {
        id
        text
      }
    `,
    note
  );

  const [commit, isInFlight] = useMutation<NoteDetailTextMutation>(graphql`
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

    if (e.detail.value === data.text) {
      return;
    }

    commit({
      optimisticUpdater: (store) => {
        const noteRecord = store.get(data.id as string);
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
    <IonTextarea
      autoGrow
      value={data?.text}
      placeholder="Text"
      debounce={450}
      onIonChange={handleChange}
      ref={textInputRef}
    />
  );
};

export default NoteDetailText;
