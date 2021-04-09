import React from "react";
import { graphql, useFragment } from "react-relay/hooks";
import styled from "styled-components";
import { NotesListItemText_note$key } from "./__generated__/NotesListItemText_note.graphql";

let ListText = styled.p`
  overflow: hidden;
  max-width: 75ch;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

interface NotesListItemTextProps {
  note: NotesListItemText_note$key;
}

const NotesListItemText: React.FC<NotesListItemTextProps> = ({ note }) => {
  const data = useFragment(
    graphql`
      fragment NotesListItemText_note on notes_app_notes {
        id
        text
      }
    `,
    note
  );

  return <ListText>{data?.text || "Empty Note"}</ListText>;
};

export default NotesListItemText;
