import { graphql } from "react-relay";

export default graphql`
  query indexPageQuery {
    notes_app_notes(order_by: { updated_at: desc_nulls_last }) {
      id
      ...NoteDetailTitle_note
      ...NoteDetailText_note
      created_at
      updated_at
    }
  }
`;
