import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect } from 'react';
// import styles from '../../styles/pages/Home.module.scss';


// import TrendingSection from '../components/TrendingSection/Trending';
// import LeaderboardSection from '../components/LeaderboardSection/LeaderboardSection';
import NapaLounge from '../components/NapaLounge/NapaLounge';
// import ReactFullpage from '@fullpage/react-fullpage';

const Home: NextPage = () => {
  useEffect(() => {
    document.body.classList.add('home_page');
    return () => {
      document.body.classList.remove('home_page');
    };
  }, []);

  return (
    <>
      <Head>
        <title>NAPA Society | Home</title>
        <meta name="description" content="NAPA Developmeent Environment" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <section className={styles.container} id="container">
        <div className={styles.child}>
          <TrendingSection socket={socket} />
        </div>
        <div className={styles.child}>
          <LeaderboardSection />
        </div>
        <div className={styles.child}>
          <NapaLounge />
        </div>
      </section> */}
      
      <div className="hm_sc hm_sc_nplng">
        {/* <ReactFullpage
          navigation
          scrollingSpeed={1000} 
          render={() => {
            return (
              <ReactFullpage.Wrapper>
                <div className="section">
                  <TrendingSection socket={socket} />
                </div>
                <div className="section">
                  <LeaderboardSection />
                </div>
                <div className="section">
                  <NapaLounge />
                </div>
              </ReactFullpage.Wrapper>
            );
          }}
        /> */}
        <NapaLounge />
      </div>
    </>
  );
};

export default Home;
