import type { NextPage } from 'next';
import Head from 'next/head';
import { useCallback, useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import bootstrap CSS
import SocialArtSectionWithoutLimit from '../components/SocialArtSectionWithoutLimit/SocialArtSectionWithoutLimit';
import styles from '../../styles/pages/Home.module.scss';

import { scrollToNextSection } from '../utils/home';

import NapaSociety from '../components/NapaSocietySection/NapaSocietySection';
import SocialArtSection from '../components/SocialArtSection/SocialArtSection';
import NftMarketplaceSection from '../components/NftMarketplaceSection/NftMarketplaceSection';

const Index: NextPage = () => {
  const [currentSection, setCurrentSection] = useState(
    'social-art-section-without-limit'
  );

  const checkScrollDirectionIsUp = (event: any) => {
    if (event.wheelDelta) {
      return event.wheelDelta > 0;
    }
    return event.deltaY < 0;
  };

  useEffect(() => {
    window.addEventListener('wheel', checkScrollDirection);
    return () => {
      window.removeEventListener('wheel', checkScrollDirection);
    };
  }, [currentSection]);

  useEffect(() => {
    scrollToNextSection(currentSection);
  }, [currentSection]);

  const handleSectionChange = (id: string) => {
    setTimeout(() => {
      setCurrentSection(id);
    }, 600);
  };

  const checkScrollDirection = useCallback(
    (event: any) => {
      if (checkScrollDirectionIsUp(event)) {
        if (currentSection == 'nft-marketplace') {
          handleSectionChange('social-section-art');
        } else if (currentSection == 'social-section-art') {
          handleSectionChange('napa-society');
        } else if (currentSection == 'napa-society') {
          handleSectionChange('social-art-section-without-limit');
        } else if (currentSection == 'social-art-section-without-limit') {
          return;
        }
      } else {
        if (currentSection == 'social-art-section-without-limit') {
          handleSectionChange('napa-society');
        } else if (currentSection == 'napa-society') {
          handleSectionChange('social-section-art');
        } else if (currentSection == 'social-section-art') {
          handleSectionChange('nft-marketplace');
        } else if (currentSection == 'nft-marketplace') {
          return;
        }
      }
    },
    [setCurrentSection, currentSection]
  );
  return (
    <>
      <Head>
        <title>NAPA Society Development Server</title>
        <meta name="description" content="NAPA Developmeent Environment" />
        <title>NAPA Society Staging Enviornment</title>
        <meta name="description" content="NAPA Staging Environment" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className={styles.container} id="container">
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
      </section>
    </>
  );
};

export default Index;
