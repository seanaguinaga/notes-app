import React, { Suspense } from "react";
import { fetchQuery } from "react-relay/hooks";
import styled from "styled-components";
import NewNoteButtonIos from "../components/NewNoteButtonIos";
import NotesList from "../components/NotesList";
import { initEnvironment } from "../lib/relay";
import indexPageQuery from "../queries/indexPage";
import { media } from "../styles/media";

let StyledIonlist = styled("ion-list")`
  margin: auto;
  max-width: 1024px;
`;

let NonMobileIonButton = styled("ion-button")`
  color: red;
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

const Index = ({ notes_app_notes }) => {
  return (
    <>
      <ion-header>
        <ion-toolbar>
          <ion-title>Notes</ion-title>
          <NonMobileIonButton slot="end" fill="clear">
            <ion-icon slot="start" name="add-sharp" />
            <ion-label>Create</ion-label>
          </NonMobileIonButton>
        </ion-toolbar>
      </ion-header>
      <ion-content fullscreen>
        <ion-header collapse="condense">
          <ion-toolbar>
            <ion-title size="large">Notes</ion-title>
          </ion-toolbar>
        </ion-header>
        <StyledIonlist>
          <Suspense fallback={<ion-progress-bar type="indeterminate" />}>
            <NotesList notes={notes_app_notes} />
          </Suspense>
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
    </>
  );
};

export async function getStaticProps() {
  const environment = initEnvironment();
  const queryProps: Object = await fetchQuery(
    environment,
    indexPageQuery,
    {}
  ).toPromise();
  const initialRecords = environment.getStore().getSource().toJSON();

  return {
    props: {
      ...queryProps,
      initialRecords,
    },
  };
}

export default Index;
