import React, { useEffect } from "react";
import type { NextPage } from 'next';
import Head from 'next/head';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import bootstrap CSS
import ReactFullpage from "@fullpage/react-fullpage";
import SocialArtSectionWithoutLimit from '../components/SocialArtSectionWithoutLimit/SocialArtSectionWithoutLimit';
import styles from '../../styles/pages/Home.module.scss';

import NapaSociety from '../components/NapaSocietySection/NapaSocietySection';
import SocialArtSection from '../components/SocialArtSection/SocialArtSection';
import NftMarketplaceSection from '../components/NftMarketplaceSection/NftMarketplaceSection';

const Index: NextPage = () => {
  useEffect(() => {
    document.body.classList.add("landing_page");
    return () => {
      document.body.classList.remove("landing_page");
    };
  }, []);
  return (
    <>
      <Head>
        <title>NAPA Society Staging Enviornment</title>
        <meta name="description" content="NAPA Staging Environment" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <section className={styles.container} id="container">
        <div className={styles.child}>
          <SocialArtSectionWithoutLimit />
        </div>
        <div className={styles.child}>
          <NapaSociety />
        </div>
        <div className={styles.child}>
          <SocialArtSection />
        </div>
        <div className={styles.child}>
          <NftMarketplaceSection />
        </div>
      </section> */}
      <div className="hm_sc">
        <ReactFullpage
          navigation
          scrollingSpeed={1000} /* Options here */
          render={() => {
            return (
              <ReactFullpage.Wrapper>
                <div className="section">
                <SocialArtSectionWithoutLimit />
                </div>
                <div className="section">
                <NapaSociety />
                </div>
                <div className="section">
                <SocialArtSection />
                </div>
                <div className="section">
                <NftMarketplaceSection />
                </div>
              </ReactFullpage.Wrapper>
            );
          }}
        />
      </div>
    </>
  );
};

export default Index;
