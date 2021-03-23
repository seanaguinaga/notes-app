import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { graphql, useFragment } from "react-relay/hooks";

const NoteDetailTitle = dynamic(() => import("./NoteDetailTitle"), {
  ssr: false,
});

const NoteDetailText = dynamic(() => import("./NoteDetailText"), {
  ssr: false,
});

const NoteDetail = ({ note }) => {
  const data = useFragment(
    graphql`
      fragment NoteDetail_note on notes_app_notes {
        id
        ...NoteDetailTitle_note
        ...NoteDetailText_note
      }
    `,
    note
  );

  const [formState, setFormState] = useState({
    lastFocused: null,
    lastUpdated: null,
  });

  const focusTitleInput = () => {
    let titleInput = document.getElementById(
      "title-input"
    ) as HTMLIonInputElement;
    titleInput.setFocus();
  };

  const focusTextInput = () => {
    let textInput = document.getElementById(
      "text-input"
    ) as HTMLIonInputElement;
    textInput.setFocus();
  };

  useEffect(() => {}, []);

  return (
    <ion-list>
      <ion-item lines="none">
        <NoteDetailTitle note={data} />
      </ion-item>
      <ion-item lines="none">
        <NoteDetailText note={data} />
      </ion-item>
    </ion-list>
  );
};

export default NoteDetail;
