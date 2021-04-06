import { InputChangeEventDetail } from "@ionic/core";
import { IonInput } from "@ionic/react";
import React, { useEffect } from "react";
import { graphql, useLazyLoadQuery, useMutation } from "react-relay/hooks";
import styled from "styled-components";

let TitleInput = styled(IonInput)`
  font-size: 22px;
  font-weight: 700;
`;

const NoteDetailTitle = ({ note, titleInputRef }) => {
  useEffect(() => console.log("TITLE", note), [note]);
  const data = useLazyLoadQuery(
    graphql`
      query NoteDetailTitleQuery($id: uuid!) {
        notes_app_notes(where: { id: { _eq: $id } }) {
          id
          title
        }
      }
    `,
    { id: note.id },
    { fetchPolicy: "store-or-network" }
  );

  useEffect(() => console.log("TITLE DATA", data), [data]);

  const [commit, isInFlight] = useMutation(graphql`
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

  const handleChange = (e: CustomEvent<InputChangeEventDetail>) => {
    if (isInFlight) {
      return;
    }
    if (!e.detail.value) {
      return;
    }

    commit({
      optimisticUpdater: (store) => {
        //@ts-ignore
        const noteRecord = store.get(data.notes_app_notes[0].id as string);
        console.log("NOTE RECORD", noteRecord);
        const currentTitle = noteRecord.getValue("title");
        noteRecord.setValue(e.detail.value ?? currentTitle, "title");
        noteRecord.setValue(
          `${new Date(Date.now()).toISOString()}`,
          "updated_at"
        );
      },

      variables: {
        //@ts-ignore
        id: data?.notes_app_notes[0].id,
        data: {
          title: e.detail.value,
          updated_at: `${new Date(Date.now()).toISOString()}`,
        },
      },
    });
  };

  return (
    <TitleInput
      //@ts-ignore
      value={data?.notes_app_notes[0].title}
      placeholder="Title"
      debounce={450}
      onIonChange={handleChange}
      ref={titleInputRef}
    />
  );
};

export default NoteDetailTitle;
