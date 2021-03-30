import { graphql } from "react-relay";

export default graphql`
  query indexPageQuery {
    notes_app_notes {
      id
      title
      text
      created_at
      updated_at
    }
  }
`;
