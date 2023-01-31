import React from 'react';
import 'bootstrap-daterangepicker/daterangepicker.css';
import 'bootstrap/dist/css/bootstrap.css';
import styles from './LeaderboardsTabs.module.scss';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import LeaderboardsTab1 from './LeaderboardsTab1';
import LeaderboardsTab2 from './LeaderboardsTab2';
import LeaderboardsTab3 from './LeaderboardsTab3';
import LeaderboardsTab4 from './LeaderboardsTab4';

export default function LeaderboardsTabs() {
  return (
    <>
      <div className={styles.LiveStreamTab}>
        <Tabs
          defaultActiveKey="home"
          id="uncontrolled-tab-example"
          className="default_tab mb-30 default_tab_wt_scroll"
        >
          <Tab eventKey="home" title="Most Token Rewards">
            <LeaderboardsTab1 />
          </Tab>
          <Tab eventKey="Most Liked Posts" title="Most Liked Posts">
           <LeaderboardsTab2 />
          </Tab>
          <Tab eventKey="Most Discussed" title="Most Discussed">
           <LeaderboardsTab3 />
          </Tab>
          <Tab eventKey="Hot Sprint SFTs" title="Hot Sprint SFTs">
            <LeaderboardsTab4 />
          </Tab>
        </Tabs>
      </div>
    </>
  );
}
