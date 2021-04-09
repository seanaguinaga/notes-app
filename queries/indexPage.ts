import { graphql } from "react-relay";

export default graphql`
  query indexPageQuery {
<<<<<<< HEAD
    notes_app_notes(order_by: { updated_at: asc_nulls_first }) {
=======
    notes_app_notes {
>>>>>>> parent of d9dc82d (try this)
      id
      title
      text
      created_at
      updated_at
    }
  }
`;
