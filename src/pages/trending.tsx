import type { NextPage } from 'next';
import { useEffect } from 'react';
import Head from 'next/head';
// import styles from '../../styles/pages/Home.module.scss';

import { WEBSOCKET_URL } from '../constants/url';

import TrendingSection from '../components/TrendingSection/Trending';

const WhatsTrending: NextPage = () => {
  const socket = new WebSocket(WEBSOCKET_URL);
  useEffect(() => {
    socket.addEventListener('open', () => {
      console.log('connected from client');
    });
  }, []);
  useEffect(() => {
    document.body.classList.add('home_page');
    return () => {
      document.body.classList.remove('home_page');
    };
  }, []);

  return (
    <>
      <Head>
        <title>NAPA Society | Trending</title>
        <meta name="description" content="NAPA Developmeent Environment" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className="hm_sc">
        <TrendingSection socket={socket} />
      </div>
    </>
  );
};

export default WhatsTrending;
