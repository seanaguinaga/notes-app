import { graphql } from "react-relay";

const NoteCompleteFragment = graphql`
  fragment NoteCompleteFragment on notes {
    id
    ...NoteTitleFragment
    ...NoteTextFragment
    updated_at
    created_at
  }
`;

export default NoteCompleteFragment;
