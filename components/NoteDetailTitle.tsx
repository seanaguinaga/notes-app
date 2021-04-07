import { InputChangeEventDetail } from "@ionic/core";
import { IonInput } from "@ionic/react";
import React, { useEffect } from "react";
import { graphql, useFragment, useMutation } from "react-relay/hooks";
import styled from "styled-components";

let TitleInput = styled(IonInput)`
  font-size: 22px;
  font-weight: 700;
`;

const NoteDetailTitle = ({ note, titleInputRef }) => {
  const data = useFragment(
    graphql`
      fragment NoteDetailTitle_note on notes_app_notes {
        id
        title
      }
    `,
    note
  );

  useEffect(() => {
    console.log(data);
  }, [data]);

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

    commit({
      optimisticUpdater: (store) => {
        const noteRecord = store.get(data.id as string);
        const currentTitle = noteRecord.getValue("title");
        noteRecord.setValue(e.detail.value ?? currentTitle, "title");
        noteRecord.setValue(
          `${new Date(Date.now()).toISOString()}`,
          "updated_at"
        );
      },
      onCompleted: (response) => console.log(response),
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
      value={data.title}
      placeholder="Title"
      debounce={450}
      onIonChange={handleChange}
      ref={titleInputRef}
    />
  );
};

export default NoteDetailTitle;
