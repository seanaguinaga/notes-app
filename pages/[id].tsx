import dynamic from "next/dynamic";
import Link from "next/link";
import React from "react";
import { usePreloadedQuery } from "react-relay";
import { RelayProps, withRelay } from "relay-nextjs";
import styled from "styled-components";
import NewNoteButtonIos from "../components/NewNoteButtonIos";
import { getClientEnvironment } from "../lib/client_enviroment";
import NotePageQuery from "../queries/NotePageQuery";
import { NotePageQuery as TNotePageQuery } from "../queries/__generated__//NotePageQuery.graphql";
import { media } from "../styles/media";

let NoteDetail = dynamic(() => import("../components/NoteDetail"), {
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

let MobileIonFab = styled("ion-fab")`
  right: calc(10px + var(--ion-safe-area-right, 0px));
  bottom: 10px;

  .ios {
    display: none;
  }

  .md {
    ${media.sm`
      display: none;
    `}
  }
`;

const NotePage: React.FC<RelayProps<Record<string, unknown>, TNotePageQuery>> =
  ({ preloadedQuery }) => {
    let data = usePreloadedQuery<TNotePageQuery>(NotePageQuery, preloadedQuery);

    return (
      <>
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
              <MobileAndIosButton slot="end" fill="clear">
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
          <NoteDetail note={data?.notes_app_notes?.[0]} />

          <MobileIonFab slot="fixed">
            <ion-fab-button>
              <ion-icon ios="add-outline" md="add-sharp" />
            </ion-fab-button>
          </MobileIonFab>
        </StyledIonContent>
        <StyledIonFooter>
          <ion-toolbar>
            <ion-buttons slot="end">
              <NewNoteButtonIos />
            </ion-buttons>
          </ion-toolbar>
        </StyledIonFooter>
      </>
    );
  };

export default withRelay(NotePage, NotePageQuery, {
  // Fallback to render while the page is loading.
  // This property is optional.
  fallback: <ion-progress-bar type="indeterminate" />,
  // Create a Relay environment on the client-side.
  // Note: This function must always return the same value.
  createClientEnvironment: () => getClientEnvironment(),
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
  createServerEnvironment: async () => {
    let { createServerEnvironment } = await import(
      "../lib/server/relay_server_environment"
    );
    return createServerEnvironment();
  },
});
