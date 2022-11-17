import Container from '../../Layout/Container/Container';
import Footer from '../Footer/Footer';
import styles from './SocialArt.module.scss';
import React, { useEffect } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import FeedTab from './FeedTab';
import MintedPostsTab from './MintedPostsTab';
import MintedTabInBox from './MintedTabInBox';
import MintedTabList from './MintedTabList';
import { SOCIAL_ART_WEBSOCKET_URL } from '@/constants/url';

export default function SocialArtSc() {
  const socialArtSocket = new WebSocket(SOCIAL_ART_WEBSOCKET_URL);

  useEffect(() => {
    socialArtSocket.addEventListener('open', () => {
      console.log('connected from social art socket client');
    });
  }, []);

  return (
    <div className={`${styles.container}`}>
      <Container className={`${styles.settingsContainer} asinnerContainer`}>
        <h1 className={styles.settings}>Social Art</h1>
        <Tabs
          defaultActiveKey="home"
          id="uncontrolled-tab-example"
          className="default_tab mb-30"
        >
          <Tab eventKey="home" title="NAPA Society Posts">
            <FeedTab />
          </Tab>
          <Tab eventKey="profile" title="My Active SNFTs">
            <MintedPostsTab />
            <div className="tab-content" id="nav-tabContent">
              <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                <MintedTabInBox />
              </div>
              <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                <MintedTabList />
              </div>
            </div>
            
          </Tab>
        </Tabs>
        
      </Container>
      <div>
        <hr />
        <Footer footerIconShow={false} />
      </div>
    </div>
  );
}
