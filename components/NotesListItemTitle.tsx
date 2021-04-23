import React from "react";
import { graphql, useFragment } from "react-relay/hooks";
import { NotesListItemTitle_note$key } from "./__generated__/NotesListItemTitle_note.graphql";

interface NotesListItemTitleProps {
  note: NotesListItemTitle_note$key;
}

const NotesListItemTitle: React.FC<NotesListItemTitleProps> = ({ note }) => {
  const data = useFragment(
    graphql`
      fragment NotesListItemTitle_note on notes_app_notes {
        id
        title
      }
    `,
    note
  );

  return <>{data?.title || "Untitled"}</>;
};

export default NotesListItemTitle;