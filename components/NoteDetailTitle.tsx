import { InputChangeEventDetail } from "@ionic/core";
import { IonInput } from "@ionic/react";
import React from "react";
import { graphql, useFragment, useMutation } from "react-relay/hooks";
import styled from "styled-components";
import { NoteDetailTitleMutation } from "./__generated__/NoteDetailTitleMutation.graphql";
import { NoteDetailTitle_note$key } from "./__generated__/NoteDetailTitle_note.graphql";

let TitleInput = styled(IonInput)`
  font-size: 22px;
  font-weight: 700;
`;

interface NoteDetailTitleProps {
  note: NoteDetailTitle_note$key;
  titleInputRef: React.MutableRefObject<HTMLIonInputElement>;
}

const NoteDetailTitle: React.FC<NoteDetailTitleProps> = ({
  note,
  titleInputRef,
}) => {
  let data = useFragment(
    graphql`
      fragment NoteDetailTitle_note on notes_app_notes {
        id
        title
      }
    `,
    note
  );

  let [commit, isInFlight] = useMutation<NoteDetailTitleMutation>(graphql`
    mutation NoteDetailTitleMutation(
      $id: uuid!
      $data: notes_app_notes_set_input
    ) {
      update_notes_app_notes(where: { id: { _eq: $id } }, _set: $data) {
        returning {
          id
          updated_at
          title
        }
      }
    }
  `);

  let handleChange = (e: CustomEvent<InputChangeEventDetail>) => {
    if (isInFlight) {
      return;
    }

    if (e.detail.value === data?.title) {
      return;
    }

    commit({
      optimisticUpdater: (store) => {
        let noteRecord = store.get(data.id as string);
        let currentTitle = noteRecord.getValue("title");
        noteRecord.setValue(e.detail.value ?? currentTitle, "title");
        noteRecord.setValue(
          `${new Date(Date.now()).toISOString()}`,
          "updated_at"
        );
      },
      variables: {
        id: data.id,
        data: {
          title: e.detail.value,
          updated_at: `${new Date(Date.now()).toISOString()}`,
        },
      },
    });
  };

  return (
    <TitleInput
      value={data?.title}
      placeholder="Title"
      debounce={450}
      onIonChange={handleChange}
      ref={titleInputRef}
    />
  );
};

export default NoteDetailTitle;
