import React from "react";
import { graphql, useFragment } from "react-relay";
import NotesListItem from "./NotesListItem";

const NotesList = ({ notes }) => {
  const data = useFragment(
    graphql`
      fragment NotesList_notes on notes_app_notes @relay(plural: true) {
        id
        ...NotesListItem_note
      }
    `,
    notes
  );

  return data?.map((note) => (
    <NotesListItem key={note.id as string} note={note} />
  ));
};

export default NotesList;
