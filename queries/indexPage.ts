import { graphql } from "react-relay";

export default graphql`
  query indexPageQuery {
    notes_app_notes {
      ...NotesList_notes
    }
  }
`;
