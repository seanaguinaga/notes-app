import React from "react";
import { useFragment } from "react-relay/hooks";
import styled from "styled-components";
import NoteTextFragment from "../fragments/NoteTextFragment";
import { NoteTextFragment$key } from "../fragments/__generated__/NoteTextFragment.graphql";

let ListText = styled.p`
  overflow: hidden;
  max-width: 75ch;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

interface NotesListItemTextProps {
  note: NoteTextFragment$key;
}

const NotesListItemText: React.FC<NotesListItemTextProps> = ({ note }) => {
  let data = useFragment(NoteTextFragment, note);

  return <ListText>{data?.text || "Empty Note"}</ListText>;
};

export default NotesListItemText;
