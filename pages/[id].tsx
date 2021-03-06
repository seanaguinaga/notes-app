import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { fetchQuery } from "react-relay";
import styled from "styled-components";
import NewNoteButtonIos from "../components/NewNoteButtonIos";
import { initEnvironment } from "../lib/relay";
import IdNotePageQuery from "../queries/IdNotePage";
import { media } from "../styles/media";

let NoteDetail = dynamic(() => import("../components/NoteDetail"), {
  ssr: false,
});

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

const NotePage: React.FC<any> = ({ notes_app_notes }) => {
  const router = useRouter();

  const [showActionSheet, setShowActionSheet] = useState(false);
  return (
    <>
      <ion-header translucent>
        <ion-toolbar>
          <ion-buttons>
            <Link href="/">
              <ion-button slot="start" onClick={() => router.back()}>
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
        <NoteDetail note={notes_app_notes?.[0]} />
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
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const environment = initEnvironment();
  const queryProps: Object = await fetchQuery(environment, IdNotePageQuery, {
    id: query.id,
  }).toPromise();
  const initialRecords = environment.getStore().getSource().toJSON();

  return {
    props: {
      ...queryProps,
      initialRecords,
    },
  };
};

export default NotePage;
