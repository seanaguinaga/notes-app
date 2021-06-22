import Link from 'next/link';
import React from 'react';
import { graphql, useFragment } from 'react-relay/hooks';
import NotesListItemText from './NotesListItemText';
import NotesListItemTitle from './NotesListItemTitle';
import { NotesListItem_note$key } from './__generated__/NotesListItem_note.graphql';

interface NotesListItemProps {
  note: NotesListItem_note$key;
}

const NotesListItem: React.FC<NotesListItemProps> = ({ note }) => {
  let data = useFragment(
    graphql`
      fragment NotesListItem_note on notes_app_notes {
        id
        ...NotesListItemTitle_note
        ...NotesListItemText_note
        updated_at
        created_at
      }
    `,
    note
  );

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
      <Link href={`/${data.id}`}>
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
