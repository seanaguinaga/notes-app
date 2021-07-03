import React from "react";
import NotesListItem from "./NotesListItem";

const NotesList: React.FC<any> = ({ notes }) => {
  return notes
    ? notes?.map((note) => (
        <NotesListItem key={note.id as string} note={note} />
      ))
    : null;
};

export default NotesList;
