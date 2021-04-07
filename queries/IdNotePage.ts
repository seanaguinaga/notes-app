import { graphql } from "react-relay";

export default graphql`
  query IdNotePageQuery($id: uuid!) {
    notes_app_notes(where: { id: { _eq: $id } }) {
      id
      title
      text
      updated_at
      created_at
    }
  }
`;
