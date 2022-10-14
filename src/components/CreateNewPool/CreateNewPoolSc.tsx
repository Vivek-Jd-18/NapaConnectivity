import Container from '../../Layout/Container/Container';
import Footer from '../Footer/Footer';
import styles from './CreateNewPoolSc.module.scss';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import CreateNewPoolOne from './CreateNewPoolOne';

export default function CreateNewPoolSc() {
  return (
    <div className={`${styles.container}`}>
      <Container className={`${styles.settingsContainer} asinnerContainer`}>
        <div className={styles.StaylinkFrst}>
          <Link href="/co-batching-pools"><a> <Image src="/img/arrow_icon.svg" alt="" width="18px" height="12px"/>Co-Batching Pools</a></Link>
        </div>
        <h1 className={styles.settings}>Create New Pool</h1>
        <div className={styles.threeLinkMain}>
          <ul>
            <li className={styles.active}>1.<Link href="#"><a> Select NFT</a></Link> </li>
            <li>2.<Link href="#"><a> General Info</a></Link> </li>
            <li>3.<Link href="#"><a> Invite Participants</a></Link> </li>
          </ul>
        </div>
        <div>
          <CreateNewPoolOne />
        </div>
      </Container>

      <div>
        <hr />
        <Footer footerIconShow={false} />
      </div>
    </div>
  );
}
