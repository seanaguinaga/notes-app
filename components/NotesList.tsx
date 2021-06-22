import React from "react";
import NotesListItem from "./NotesListItem";

const NotesList: React.FC<any> = ({ notes_app_notes }) => {
  return notes_app_notes
    ? notes_app_notes?.map((note) => (
        <NotesListItem key={note.id as string} note={note} />
      ))
    : null;
};

export default NotesList;
