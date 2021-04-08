import React from "react";
import { graphql, useFragment } from "react-relay/hooks";
import styled from "styled-components";

let ListText = styled.p`
  overflow: hidden;
  max-width: 75ch;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const NotesListItemText: React.FC<any> = ({ note }) => {
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
