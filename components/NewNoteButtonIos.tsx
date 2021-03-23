import { useRouter } from "next/router";
import { graphql, useMutation } from "react-relay";

const NewNoteButtonIos = () => {
  let router = useRouter();

  const [commit, isInFlight] = useMutation(graphql`
    mutation NewNoteButtonIosMutation {
      insert_notes_app_notes_one(object: {}) {
        id
      }
    }
  `);

  return (
    <ion-button
      onClick={() => {
        commit({
          variables: {},
          onCompleted(data) {
            router.replace(
              `${data.insert_notes_app_notes_one.id}`,
              `${data.insert_notes_app_notes_one.id}`
            );
          },
        });
      }}
    >
      <ion-icon icon="create-outline" />
    </ion-button>
  );
};

export default NewNoteButtonIos;
