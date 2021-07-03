import { graphql } from "react-relay";

const NoteTextFragment = graphql`
  fragment NoteTextFragment on notes {
    id
    text
  }
`;

export default NoteTextFragment;
