import { graphql } from "react-relay";

const NotePageQuery = graphql`
  query NotePageQuery($id: uuid!) {
    notes(where: { id: { _eq: $id } }) {
      id
      ...NoteTitleFragment
      ...NoteTextFragment
    }
  }
`;

export default NotePageQuery;
