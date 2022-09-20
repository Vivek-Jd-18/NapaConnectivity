import React, { useEffect } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import bootstrap CSS
import ReactFullpage from '@fullpage/react-fullpage';

import SocialArtSectionWithoutLimit from '../components/SocialArtSectionWithoutLimit/SocialArtSectionWithoutLimit';
import NapaSociety from '../components/NapaSocietySection/NapaSocietySection';
import SocialArtSection from '../components/SocialArtSection/SocialArtSection';
import NftMarketplaceSection from '../components/NftMarketplaceSection/NftMarketplaceSection';

const Index: NextPage = () => {
  useEffect(() => {
    document.body.classList.add('landing_page');
    return () => {
      document.body.classList.remove('landing_page');
    };
  }, []);
  return (
    <>
      <Head>
        <title>NAPA Society Staging Enviornment</title>
        <meta name="description" content="NAPA Staging Environment" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
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
