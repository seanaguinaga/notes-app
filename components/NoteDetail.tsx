import React, { useRef } from "react";
import NoteDetailText from "./NoteDetailText";
import NoteDetailTitle from "./NoteDetailTitle";

const NoteDetail = ({ note }) => {
  let titleInputRef = useRef<HTMLIonInputElement | null>();
  let textInputRef = useRef<HTMLIonTextareaElement | null>();

  let focusTitleInput = () => {
    titleInputRef.current.setFocus();
  };

  let focusTextInput = () => {
    textInputRef.current.setFocus();
  };

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
        <NoteDetailTitle titleInputRef={titleInputRef} note={note} />
      </ion-item>
      <ion-item lines="none">
        <NoteDetailText textInputRef={textInputRef} note={note} />
      </ion-item>
    </ion-list>
  );
};

export default NoteDetail;
