import React from "react";
import { graphql, useFragment } from "react-relay/hooks";
import styled from "styled-components";

let ListText = styled.p`
  overflow: hidden;
  max-width: 75ch;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const NotesListItemTitle: React.FC<any> = ({ note }) => {
  const data = useFragment(
    graphql`
      fragment NotesListItemTitle_note on notes_app_notes {
        id
        title
      }
    `,
    note
  );

  return data.title || "Untitled";
};

export default NotesListItemTitle;
