import { graphql } from "react-relay";

const NoteTitleFragment = graphql`
  fragment NoteTitleFragment on notes {
    id
    title
  }
`;

export default NoteTitleFragment;
