import { graphql } from "react-relay";

export default graphql`
  query IdNotePageQuery($id: uuid!) {
    notes_app_notes(where: { id: { _eq: $id } }) {
      id
      ...NoteDetail_note
    }
  }
`;
