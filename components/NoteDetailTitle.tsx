import { IonInput } from "@ionic/react";
import React, { useEffect, useState } from "react";
import { graphql, useFragment, useMutation } from "react-relay/hooks";
import styled from "styled-components";

let TitleInput = styled(IonInput)`
  font-size: 22px;
  font-weight: 700;
`;

const NoteDetailTitle = ({ note }) => {
  const data = useFragment(
    graphql`
      fragment NoteDetailTitle_note on notes_app_notes {
        id
        title
      }
    `,
    note
  );

  const [commit, isInFlight] = useMutation(graphql`
    mutation NoteDetailTitleMutation(
      $id: uuid!
      $data: notes_app_notes_set_input
    ) {
      update_notes_app_notes_by_pk(pk_columns: { id: $id }, _set: $data) {
        updated_at
        title
      }
    }
  `);

  let [title, setTitle] = useState(data.title);

  useEffect(() => {
    if (data.title === title) {
      return;
    }
    commit({
      optimisticUpdater: (store) => {
        const noteRecord = store.get(data.id);
        const currentTitle = noteRecord.getValue("title");
        noteRecord.setValue(currentTitle ?? title, "title");
        noteRecord.setValue(
          `${new Date(Date.now()).toISOString()}`,
          "updated_at"
        );
      },
      variables: {
        id: data.id,
        data: {
          title,
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
  }, [title]);

  useEffect(() => {
    if (!isInFlight) {
      let titleInput = document.getElementById(
        "title-input"
      ) as HTMLIonInputElement;
      titleInput.setFocus();
    }
  }, [isInFlight]);

  return (
    <TitleInput
      id="title-input"
      disabled={isInFlight}
      value={title}
      placeholder="Title"
      debounce={700}
      onIonChange={(e) => {
        if (!isInFlight) {
          setTitle(e.detail.value);
        }
      }}
      autoCapitalize="true"
    />
  );
};

export default NoteDetailTitle;
