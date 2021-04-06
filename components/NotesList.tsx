import React from "react";
import { graphql, useLazyLoadQuery } from "react-relay";
import NotesListItem from "./NotesListItem";
import { NotesListQuery } from "./__generated__/NotesListQuery.graphql";

const NotesList: React.FC<any> = ({ notes }) => {
  const data = useLazyLoadQuery<NotesListQuery>(
    graphql`
      query NotesListQuery {
        notes_app_notes {
          id
          text
          title
          updated_at
          created_at
        }
      }
    `,
    {},
    { fetchPolicy: "store-or-network" }
  );

  return (
    <>
      {data.notes_app_notes.map((note) => (
        <NotesListItem key={note.id as string} note={note} />
      ))}
    </>
  );
};

export default NotesList;
