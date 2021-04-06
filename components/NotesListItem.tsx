import React, { useEffect } from "react";
import { graphql, useFragment } from "react-relay/hooks";
import styled from "styled-components";

let ListText = styled.p`
  overflow: hidden;
  max-width: 75ch;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const MessageListItem: React.FC<any> = ({ note }) => {
  const data = useFragment(
    graphql`
      fragment NotesListItem_note on notes_app_notes {
        id
        text
        title
        updated_at
        created_at
      }
    `,
    note
  );

  useEffect(() => console.log(data), [data]);

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
      <ion-item href={`/${data.id}`} detail={false} lines="full">
        <ion-label class="ion-text-wrap">
          <h2>
            {data.title || "Untitled"}
            <span className="date ion-float-right">
              <ion-note>{timestamp}</ion-note>
            </span>
          </h2>
          <ListText>{data.text ?? "Empty note"}</ListText>
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
