import React, { useRef } from "react";
import { graphql, useLazyLoadQuery } from "react-relay/hooks";
import NoteDetailText from "./NoteDetailText";
import NoteDetailTitle from "./NoteDetailTitle";

const NoteDetail = ({ note }) => {
  const data = useLazyLoadQuery(
    graphql`
      query NoteDetailQuery($id: uuid!) {
        notes_app_notes(where: { id: { _eq: $id } }) {
          id
          text
          title
          updated_at
          created_at
        }
      }
    `,
    { id: note.id },
    { fetchPolicy: "store-or-network" }
  );

  const titleInputRef = useRef<HTMLIonInputElement | null>();
  const textInputRef = useRef<HTMLIonInputElement | null>();

  const focusTitleInput = () => {
    titleInputRef.current.setFocus();
  };

  const focusTextInput = () => {
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
        <NoteDetailTitle
          titleInputRef={titleInputRef}
          //@ts-expect-error
          note={data.notes_app_notes[0]}
        />
      </ion-item>
      <ion-item lines="none">
        <NoteDetailText
          textInputRef={textInputRef}
          //@ts-expect-error

          note={data.notes_app_notes[0]}
        />
      </ion-item>
    </ion-list>
  );
};

export default NoteDetail;