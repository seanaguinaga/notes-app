import React from "react";
import { graphql, useLazyLoadQuery } from "react-relay/hooks";
import styled from "styled-components";
import { NotesListItemQuery } from "./__generated__/NotesListItemQuery.graphql";

let ListText = styled.p`
  overflow: hidden;
  max-width: 75ch;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const MessageListItem: React.FC<any> = ({ note }) => {
  const data = useLazyLoadQuery<NotesListItemQuery>(
    graphql`
      query NotesListItemQuery($id: uuid!) {
        notes_app_notes(where: { id: { _eq: $id } }) {
          id
          text
          title
          updated_at
          created_at
        }
      }
    `,
    { id: note.id },
    { fetchPolicy: "store-or-network" }
  );

  let displayDate = new Date(
    (data.notes_app_notes[0].updated_at as number) ||
      (data.notes_app_notes[0].created_at as number)
  );

  function isDateBeforeToday(date: Date) {
    return new Date(date.toDateString()) < new Date(new Date().toDateString());
  }

  let timestamp = isDateBeforeToday(displayDate)
    ? `${displayDate.toLocaleDateString()}`
    : `${displayDate.toLocaleTimeString()}`;

  return (
    <ion-item-sliding>
      <ion-item
        href={`/${data.notes_app_notes[0].id}`}
        detail={false}
        lines="full"
      >
        <ion-label class="ion-text-wrap">
          <h2>
            {data.notes_app_notes[0].title || "Untitled"}
            <span className="date ion-float-right">
              <ion-note>{timestamp}</ion-note>
            </span>
          </h2>
          <ListText>{data.notes_app_notes[0].text ?? "Empty note"}</ListText>
        </ion-label>
      </ion-item>
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

export default MessageListItem;
