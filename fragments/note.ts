import { graphql } from "react-relay/hooks";

export const noteTextFragment = graphql`
  fragment noteText_note on notes_app_notes {
    id
    text
  }
`;
