import { graphql } from "react-relay";

export default graphql`
  query indexPageQuery {
<<<<<<< HEAD
    notes_app_notes(order_by: { updated_at: asc_nulls_first }) {
=======
    notes_app_notes(order_by: { updated_at: desc_nulls_last }) {
>>>>>>> with-relay-nextjs
      id
      ...NoteDetailTitle_note
      ...NoteDetailText_note
      created_at
      updated_at
    }
  }
`;
