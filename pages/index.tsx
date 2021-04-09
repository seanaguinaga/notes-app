import { GetServerSideProps } from "next";
import React from "react";
import { fetchQuery } from "react-relay";
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

const Index = ({ notes_app_notes }) => {
  // useEffect(() => {
  //   console.log(notes_app_notes);
  // }, [notes_app_notes]);
  return (
    <>
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
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  let cookies = context.req.cookies;
  // How do i pass cookies into this query?
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
};

export default Index;
