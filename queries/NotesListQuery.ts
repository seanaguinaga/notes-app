import { graphql } from "react-relay";

const NotesListQuery = graphql`
  query NotesListQuery {
    notes(order_by: { updated_at: desc_nulls_last }) {
      id
      ...NotesListItem_note
      created_at
      updated_at
    }
  }
`;

export default NotesListQuery;
