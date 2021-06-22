import { useRouter } from "next/router";
import React, { useState } from "react";
import { graphql, useMutation } from "react-relay";
import { NewNoteButtonIosMutation } from "./__generated__/NewNoteButtonIosMutation.graphql";

const NewNoteButtonIos = () => {
  let router = useRouter();

  let [newNoteID, setNewNoteID] = useState("");

  let [commit, isInFlight] = useMutation<NewNoteButtonIosMutation>(graphql`
    mutation NewNoteButtonIosMutation {
      insert_notes_app_notes_one(object: {}) {
        id
      }
    }
  `);

  let handleCompleted = (data: any) => {
    setNewNoteID(data.insert_notes_app_notes_one.id);
    if (router.query.id) {
      router.replace(`${data.insert_notes_app_notes_one.id}`);
    } else {
      router.push(`${data.insert_notes_app_notes_one.id}`);
    }
  };

  let handleClick = () =>
    commit({
      variables: {},
      onCompleted: handleCompleted,
      updater: (store) => {
      store.create(newNoteID, "notes_app_notes");
      }
    });

  return (
    <ion-button disabled={isInFlight} onClick={handleClick}>
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

{
  /* <Link
  href={{
    pathname: "/blog/[slug]",
    query: { slug: "my-post" },
  }}
>
  <a>Blog Post</a>
</Link>; */
}

export default NewNoteButtonIos;
