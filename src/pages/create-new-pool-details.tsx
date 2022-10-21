import Head from 'next/head';
import type { NextPage } from 'next';
import { WEBSOCKET_URL } from '../constants/url';
import { useEffect } from 'react';
import CreateNewPoolScTwo from '@/components/CreateNewPool/CreateNewPoolScTwo';

const CreateNewPool: NextPage = () => {
  const socket = new WebSocket(WEBSOCKET_URL);
  useEffect(() => {
    socket.addEventListener('open', () => {
      console.log('connected from client');
    });
  }, []);

  return (
    <>
      <Head>
        <title>NAPA Society| New Co-Batching Pool</title>
        <meta name="description" content="NAPA Developmeent Environment" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section id="earn-container">
        <div className={`CreateNewNFTTow_bg`} id="scrollElement">
          <CreateNewPoolScTwo />
        </div>
      </section>
    </>
  );
};

export default CreateNewPool;
