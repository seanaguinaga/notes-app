import { useRouter } from "next/router";
import React from "react";
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

  const handleCompleted = (data: any) => {
    if (router.query["note-id"]) {
      router.replace(`${data.insert_notes_app_notes_one.id}`);
    } else {
      router.push(`${data.insert_notes_app_notes_one.id}`);
    }
  };

  return (
    <ion-button
      disabled={isInFlight}
      onClick={() => {
        commit({
          variables: {},
          onCompleted: handleCompleted,
        });
      }}
    >
      <ion-icon icon="create-outline" />
    </ion-button>
  );
};

// const MyButton = React.forwardRef(({ onClick, href }, ref) => {
//   return (
//     <ion-button href={href} onClick={onClick} ref={ref}>
//       Click Me
//     </ion-button>
//   );
// });

export default NewNoteButtonIos;
