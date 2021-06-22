import { graphql } from "react-relay";

const NotePageQuery = graphql`
  query NotePageQuery($id: uuid!) {
    notes_app_notes(where: { id: { _eq: $id } }) {
      id
      ...NoteDetailTitle_note
      ...NoteDetailText_note
    }
  }
`;

export default NotePageQuery;
