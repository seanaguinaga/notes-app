/* eslint-disable react/prop-types */
import { InputChangeEventDetail } from "@ionic/core";
import { IonInput } from "@ionic/react";
import React from "react";
import { graphql, useFragment, useMutation } from "react-relay/hooks";
import styled from "styled-components";
import NoteTitleFragment from "../fragments/NoteTitleFragment";
import { NoteTitleFragment$key } from "../fragments/__generated__/NoteTitleFragment.graphql";
import { useIonProgressBar } from "./IonProgressBar";
import { NoteDetailTitleMutation } from "./__generated__/NoteDetailTitleMutation.graphql";

let TitleInput = styled(IonInput)`
  font-size: 22px;
  font-weight: 700;
`;

interface NoteDetailTitleProps {
  note: NoteTitleFragment$key;
  titleInputRef: React.MutableRefObject<HTMLIonInputElement>;
}

const NoteDetailTitle: React.FC<NoteDetailTitleProps> = ({
  note,
  titleInputRef,
}) => {
  let [present, dismiss] = useIonProgressBar();

  let data = useFragment(NoteTitleFragment, note);

  let [commit, isInFlight] = useMutation<NoteDetailTitleMutation>(graphql`
    mutation NoteDetailTitleMutation($id: uuid!, $data: notes_set_input) {
      update_notes(where: { id: { _eq: $id } }, _set: $data) {
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

    present();

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
      onCompleted: dismiss,
      onError: dismiss,
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
