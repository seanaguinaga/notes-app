import styled from "styled-components";
import { CompletedBreakdown } from "../data/breakdowns/completedBreakdowns";
import { InProgressBreakdown } from "../data/breakdowns/inProgressBreakdowns";
import { NewBreakdown } from "../data/breakdowns/newBreakdowns";

let StyledIonAvatar = styled("ion-avatar")`
  --border-radius: 4px;
`;

let StyledIonItem = styled("ion-item")`
  --inner-padding-end: 0;

  ion-label {
    margin-top: 12px;
    margin-bottom: 12px;
    white-space: normal !important;
  }

  h2 {
    font-weight: 600;
    margin: 0;
  }

  p {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    width: 95%;
  }

  .date {
    float: right;
    align-items: center;
    display: flex;
  }

  ion-icon {
    color: #c9c9ca;
  }

  ion-note {
    font-size: 15px;
    margin-right: 8px;
    font-weight: normal;
  }

  ion-note.md {
    margin-right: 14px;
  }

  .dot {
    display: block;
    height: 12px;
    width: 12px;
    border-radius: 50%;
    align-self: start;
    margin: 16px 10px 16px 16px;
  }

  .dot-unread {
    background: var(--ion-color-primary);
  }

  ion-footer ion-title {
    font-size: 11px;
    font-weight: normal;
  }
`;

interface MessageListItemProps {
  breakdown: InProgressBreakdown | CompletedBreakdown | NewBreakdown;
}

const MessageListItem: React.FC<MessageListItemProps> = ({ breakdown }) => {
  return (
    <StyledIonItem>
      <StyledIonAvatar slot="start">
        <ion-img src="https://ionicframework.com/docs/demos/api/avatar/avatar.svg" />
      </StyledIonAvatar>
      <ion-label>
        <h2>
          {breakdown.fromName}
          <span className="date">
            <ion-note>{breakdown.date}</ion-note>
          </span>
        </h2>
        <h3>{breakdown.subject}</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </ion-label>
    </StyledIonItem>
  );
};

export default MessageListItem;
