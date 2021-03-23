import { graphql } from "react-relay";

export default graphql`
  query IdNotePageQuery($id: uuid!) {
    notes_app_notes_by_pk(id: $id) {
      ...NoteDetail_note
    }
  }
`;
