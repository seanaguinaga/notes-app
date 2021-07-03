import Link from "next/link";
import React from "react";
import { useFragment } from "react-relay/hooks";
import NoteCompleteFragment from "../fragments/NoteCompleteFragment";
import { NoteCompleteFragment$key } from "../fragments/__generated__/NoteCompleteFragment.graphql";
import NotesListItemText from "./NotesListItemText";
import NotesListItemTitle from "./NotesListItemTitle";

interface NotesListItemProps {
  note: NoteCompleteFragment$key;
}

const NotesListItem: React.FC<NotesListItemProps> = ({ note }) => {
  let data = useFragment(NoteCompleteFragment, note);

  let displayDate = new Date(
    (data.updated_at as number) || (data.created_at as number)
  );

  function isDateBeforeToday(date: Date) {
    return new Date(date.toDateString()) < new Date(new Date().toDateString());
  }

  let timestamp = isDateBeforeToday(displayDate)
    ? `${displayDate.toLocaleDateString()}`
    : `${displayDate.toLocaleTimeString()}`;

  return (
    <ion-item-sliding>
      <Link href={`/${data.id}`} passHref>
        <ion-item detail={false} lines="full">
          <ion-label class="ion-text-wrap">
            <h2>
              <NotesListItemTitle note={data} />
              <span className="date ion-float-right">
                <ion-note>{timestamp}</ion-note>
              </span>
            </h2>
            <NotesListItemText note={data} />
          </ion-label>
        </ion-item>
      </Link>
      <ion-item-options side="end">
        <ion-item-option
          color="danger"
          expandable
          // onClick={() => deleteNote(note.id)}
        >
          Delete
        </ion-item-option>
      </ion-item-options>
    </ion-item-sliding>
  );
};

export default NotesListItem;
