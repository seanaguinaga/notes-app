import React from "react";
import { graphql, usePreloadedQuery } from "react-relay";
import NotesListItem from "./NotesListItem";
import { NotesListQuery } from "./__generated__/NotesListQuery.graphql";

const NotesList: React.FC<any> = ({ notes }) => {
  const data = usePreloadedQuery<NotesListQuery>(
    graphql`
      query NotesListQuery {
        notes_app_notes {
          id
          ...NotesListItem_note
        }
      }
    `,
    notes
  );

  return (
    <>
      {data?.notes_app_notes?.map((note) => (
        <NotesListItem key={note.id as string} note={note} />
      ))}
    </>
  );
};

export default NotesList;
