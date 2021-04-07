import React, { Suspense } from "react";
import { RelayProps, withRelay } from "relay-nextjs";
import styled from "styled-components";
import NewNoteButtonIos from "../components/NewNoteButtonIos";
import NotesList from "../components/NotesList";
import { getClientEnvironment } from "../lib/client_enviroment";
import indexPageQuery from "../queries/indexPage";
import { media } from "../styles/media";

let StyledIonlist = styled("ion-list")`
  margin: auto;
  max-width: 1024px;
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
let NonMobileIonButton = styled("ion-button")`
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
let NonMobileIonLabel = styled("ion-label")`
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
let NonMobileIcon = styled("ion-icon")`
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
  .ios {
    display: none;
  }

  .md {
    ${media.sm`
      display: none;
    `}
  }
`;

let StyledIonFooter = styled("ion-footer")`
  .md {
    display: none;
  }
`;

const Index = ({ notes_app_notes }: RelayProps<{}, any>) => {
  // useEffect(() => {
  //   console.log(notes_app_notes);
  // }, [notes_app_notes]);
  return (
    <Suspense fallback={<ion-progress-bar type="indeterminate" />}>
      <ion-header>
        <ion-toolbar>
          <ion-title>Notes</ion-title>
          <NonMobileIonButtons slot="end">
            <NonMobileIonButton>
              <NonMobileIcon slot="start" name="add-sharp" />
              Create
            </NonMobileIonButton>
          </NonMobileIonButtons>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        <ion-header collapse="condense">
          <ion-toolbar>
            <ion-title size="large">Notes</ion-title>
          </ion-toolbar>
        </ion-header>
        <StyledIonlist>
          <NotesList notes={notes_app_notes} />
        </StyledIonlist>
        <ion-fab horizontal="end" vertical="bottom" slot="fixed">
          <ion-fab-button>
            <ion-icon md="add-sharp" />
          </ion-fab-button>
        </ion-fab>
      </ion-content>
      <StyledIonFooter>
        <ion-toolbar>
          <ion-buttons slot="end">
            <NewNoteButtonIos />
          </ion-buttons>
        </ion-toolbar>
      </StyledIonFooter>
    </Suspense>
  );
};
export default withRelay(Index, indexPageQuery, {
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
  createServerEnvironment: async () =>
    // ctx,
    // The object returned from serverSideProps. If you don't need a token
    // you can remove this argument.
    // { token }: { token: string }
    {
      const { createServerEnvironment } = await import(
        "../lib/server_environment"
      );
      return createServerEnvironment();
    },
});
