import Head from 'next/head';
import type { NextPage } from 'next';
import CreateNewPoolScTwo from '@/components/CreateNewPool/CreateNewPoolScTwo';

const CreateNewPool: NextPage = () => {

  return (
    <>
      <Head>
        <title>NAPA Society| New Co-Batching Pool</title>
        <meta name="description" content="NAPA Developmeent Environment" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section id="earn-container">
        <div className={`mrktplcbg`} id="scrollElement">
          <CreateNewPoolScTwo />
        </div>
      </section>
    </>
  );
};

export default CreateNewPool;
