import React from "react";
import { useFragment } from "react-relay/hooks";
import NoteTitleFragment from "../fragments/NoteTitleFragment";
import { NoteTitleFragment$key } from "../fragments/__generated__/NoteTitleFragment.graphql";

interface NotesListItemTitleProps {
  note: NoteTitleFragment$key;
}

const NotesListItemTitle: React.FC<NotesListItemTitleProps> = ({ note }) => {
  let data = useFragment(NoteTitleFragment, note);

  return <>{data?.title || "Untitled"}</>;
};

export default NotesListItemTitle;
