import { graphql } from "react-relay";

export default graphql`
  query indexPageQuery {
    notes_app_notes(order_by: { updated_at: asc_nulls_first }) {
      id
      title
      text
      created_at
      updated_at
    }
  }
`;
