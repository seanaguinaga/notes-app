import dynamic from "next/dynamic";
import Link from "next/link";
import React, { Suspense, useState } from "react";
import { withRelay } from "relay-nextjs";
import styled from "styled-components";
import NewNoteButtonIos from "../components/NewNoteButtonIos";
import NoteDetail from "../components/NoteDetail";
import { getClientEnvironment } from "../lib/client_enviroment";
import { createServerEnvironment } from "../lib/server_environment";
import IdNotePageQuery from "../queries/IdNotePage";
import { media } from "../styles/media";

const ActionSheet = dynamic(() => import("../components/ActionSheet"), {
  ssr: false,
});

let StyledIonContent = styled("ion-content")`
  align-self: center;
  max-width: 1024px;
`;

let StyledIonFooter = styled("ion-footer")`
  .md {
    display: none;
  }
`;

let MobileAndIosButton = styled("ion-button")`
  .md {
    ${media.sm`
      display: none;
    `}
  }
`;

let NonMobileIonButtons = styled("ion-buttons")`
  .ios {
    display: none;
  }

  .md {
    display: none;

    ${media.sm`
      display: block;
    `}
  }
`;

const NotePage: React.FC<any> = (props) => {
  const [showActionSheet, setShowActionSheet] = useState(false);
  return (
    <Suspense fallback={<ion-progress-bar type="indeterminate" />}>
      <ion-header translucent>
        <ion-toolbar>
          <ion-buttons>
            <Link href="/">
              <ion-button slot="start">
                <ion-icon
                  slot="start"
                  ios="chevron-back-outline"
                  md="arrow-back-sharp"
                ></ion-icon>
                <ion-label>Notes</ion-label>
              </ion-button>
            </Link>
          </ion-buttons>
          <ion-buttons slot="end">
            <MobileAndIosButton
              onClick={() => setShowActionSheet(true)}
              slot="end"
              fill="clear"
            >
              <ion-icon
                md="ellipsis-vertical-sharp"
                ios="ellipsis-horizontal-circle-outline"
              ></ion-icon>
            </MobileAndIosButton>
          </ion-buttons>
          <NonMobileIonButtons slot="end">
            <ion-button color="danger" fill="clear">
              <ion-label>Delete</ion-label>
            </ion-button>
          </NonMobileIonButtons>
        </ion-toolbar>
      </ion-header>
      <StyledIonContent fullscreen>
        <NoteDetail note={props.preloadedQuery} />
      </StyledIonContent>
      <ion-fab horizontal="end" vertical="bottom" slot="fixed">
        <ion-fab-button>
          <ion-icon ios="add-outline" md="add-sharp" />
        </ion-fab-button>
      </ion-fab>
      <StyledIonFooter>
        <ion-toolbar>
          <ion-buttons slot="end">
            <NewNoteButtonIos />
          </ion-buttons>
        </ion-toolbar>
      </StyledIonFooter>
      <ActionSheet
        showActionSheet={showActionSheet}
        setShowActionSheet={setShowActionSheet}
      />
    </Suspense>
  );
};

// export const getServerSideProps: GetServerSideProps = async ({ query }) => {
//   const environment = initEnvironment();
//   const queryProps: Object = await fetchQuery(environment, IdNotePageQuery, {
//     id: query["note-id"],
//   }).toPromise();
//   const initialRecords = environment.getStore().getSource().toJSON();

//   return {
//     props: {
//       ...queryProps,
//       initialRecords,
//     },
//   };
// };

export default withRelay(NotePage, IdNotePageQuery, {
  // This property is optional.
  error: null,
  // Fallback to render while the page is loading.
  // This property is optional.
  fallback: <ion-progress-bar type="indeterminate" />,
  // Create a Relay environment on the client-side.
  // Note: This function must always return the same value.
  createClientEnvironment: () => getClientEnvironment()!,
  // Gets server side props for the page.
  // serverSideProps: async (ctx) => {
  //   // This is an example of getting an auth token from the request context.
  //   // If you don't need to authenticate users this can be removed and return an
  //   // empty object instead.
  //   const { getTokenFromCtx } = await import("lib/server/auth");
  //   const token = await getTokenFromCtx(ctx);
  //   if (token == null) {
  //     return {
  //       redirect: { destination: "/login", permanent: false },
  //     };
  //   }

  //   return { token };
  // },
  // Server-side props can be accessed as the second argument
  // to this function.
  createServerEnvironment: async ({ query }) =>
    // ctx,
    // The object returned from serverSideProps. If you don't need a token
    // you can remove this argument.
    // { token }: { token: string }
    {
      return createServerEnvironment();
    },
});
