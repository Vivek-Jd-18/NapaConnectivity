import Container from '../../Layout/Container/Container';
import Footer from '../Footer/Footer';
import styles from './MarketplaceSc.module.scss';
import React from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import FeedTab from './FeedTab';
// import CoBetchingPools from './CoBetchingPools';
// import ValuatorTabTwo from './ValuatorTabTwo';
// import Swapping from './Swapping';
import MyNFTs from './MyNFTs';
import MyFavorites from './MyFavorites';
import MyWatchlist from './MyWatchlist';

export default function MarketplaceSc() {

  return (
    <div className={`${styles.container}`}>
      
        <Container className={`${styles.settingsContainer} asinnerContainer`}>
          <h1 className={styles.settings}>Marketplace</h1>
          <Tabs
            defaultActiveKey="home"
            id="uncontrolled-tab-example"
            className="default_tab mb-30 default_tab_wt_scroll"
          >
            <Tab eventKey="home" title="Feed">
            <div className={`${styles.ourlyPerntAj}`}>
              <FeedTab />
            </div>
            </Tab>
            {/* <Tab eventKey="profile" title="Valuator">
              <div className={`${styles.ourlyPerntAj}`}>
                <ValuatorTabTwo />
              </div>
            </Tab> */}
            {/* <Tab eventKey="Swapping" title="Swapping">
              <Swapping />
            </Tab> */}
            {/* <Tab eventKey="Co-BatchingPools" title="Co-Batching Pools">
              <CoBetchingPools />
            </Tab> */}
            <Tab eventKey="MyNFTs" title="My NFTs">
              <div className={`${styles.ourlyPerntAj}`}>
                <MyNFTs />
              </div>
            </Tab>
            <Tab eventKey="MyFavorites" title="My Favorites">
              <MyFavorites />
            </Tab>
            <Tab eventKey="MyWatchlist" title="My Watchlist">
              <MyWatchlist />
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
