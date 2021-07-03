import React from "react";
import { usePreloadedQuery } from "react-relay";
import { RelayProps, withRelay } from "relay-nextjs";
import styled from "styled-components";
import NewNoteButtonIos from "../components/NewNoteButtonIos";
import NotesList from "../components/NotesList";
import { getClientEnvironment } from "../lib/client_enviroment";
import NotesListQuery from "../queries/NotesListQuery";
import { NotesListQuery as TNotesListQuery } from "../queries/__generated__/NotesListQuery.graphql";
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

const Index: React.FC<RelayProps<Record<string, unknown>, TNotesListQuery>> = ({
  preloadedQuery,
}) => {
  let data = usePreloadedQuery<TNotesListQuery>(NotesListQuery, preloadedQuery);

  return (
    <>
      <ion-header translucent>
        <ion-toolbar>
          <ion-title data-cy="index-ion-title">Notes</ion-title>
          <NonMobileIonButtons slot="end">
            <NonMobileIonButton>
              <NonMobileIcon slot="start" name="add-sharp" />
              Create
            </NonMobileIonButton>
          </NonMobileIonButtons>
        </ion-toolbar>
      </ion-header>
      <ion-content fullscreen>
        <ion-header collapse="condense">
          <ion-toolbar>
            <ion-title size="large">Notes</ion-title>
          </ion-toolbar>
        </ion-header>
        <StyledIonlist>
          <NotesList notes={data.notes} />
        </StyledIonlist>
      </ion-content>
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

export default withRelay(Index, NotesListQuery, {
  fallback: <ion-progress-bar type="indeterminate" />,
  createClientEnvironment: () => getClientEnvironment(),
  createServerEnvironment: async () => {
    let { createServerEnvironment } = await import(
      "../lib/server/relay_server_environment"
    );
    return createServerEnvironment();
  },
});
