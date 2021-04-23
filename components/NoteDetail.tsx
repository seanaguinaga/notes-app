import React, { useRef } from "react";
import { graphql, useFragment } from "react-relay/hooks";
import NoteDetailText from "./NoteDetailText";
import NoteDetailTitle from "./NoteDetailTitle";

const NoteDetail = ({ note }) => {
  const data = useFragment(
    graphql`
      fragment NoteDetail_note on notes_app_notes {
        id
        ...NoteDetailText_note
        ...NoteDetailTitle_note
      }
    `,
    note
  );

  const titleInputRef = useRef<HTMLIonInputElement | null>();
  const textInputRef = useRef<HTMLIonInputElement | null>();

  // Do I even want to do this focusing?

  // const focusTitleInput = () => {
  //   titleInputRef.current.setFocus();
  // };

  // const focusTextInput = () => {
  //   textInputRef.current.setFocus();
  // };

  // useEffect(() => {
  //   if (data.title && data.text) {
  //     // BOTH: maybe this is for reading - do nothing
  //     return;
  //   }
  //   if (data.title && !data.text) {
  //     // TITLE ONLY: maybe time to add text
  //     focusTextInput();
  //   }
  //   if (!data.title && data.text) {
  //     // TEXT ONLY: maybe time to add a title
  //     focusTitleInput();
  //   }
  //   if (!data.title && !data.text) {
  //     // NOTHING: probably add a title
  //     focusTitleInput();
  //     console.log("nothing");
  //   }
  // }, [data, textInputRef, titleInputRef]);

  return (
    <ion-list>
      <ion-item lines="none">
        <NoteDetailTitle titleInputRef={titleInputRef} note={data} />
      </ion-item>
      <ion-item lines="none">
        <NoteDetailText textInputRef={textInputRef} note={data} />
      </ion-item>
    </ion-list>
  );
};

export default NoteDetail;
