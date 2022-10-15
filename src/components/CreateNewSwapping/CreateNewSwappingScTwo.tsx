import Container from '../../Layout/Container/Container';
import Footer from '../Footer/Footer';
import styles from './CreateNewSwappingScTwo.module.scss';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import CreateNewSwappingTwo from './CreateNewSwappingTwo';

export default function CreateNewSwappingScTwo() {
  return (
    <div className={`${styles.container}`}>
      <Container className={`${styles.settingsContainer} asinnerContainer`}>
      <div className={styles.StaylinkFrst}>
          <Link href="/swapping"><a> <Image src="/img/arrow_icon.svg" alt="" width="18px" height="12px"/>Swapping</a></Link>
        </div>
        <h1 className={styles.settings}>Create New Swapping</h1>
        <div className={styles.threeLinkMain}>
          <ul>
            <li className={styles.active}>1.<Link href="#"><a> Select Your NFT</a></Link> </li>
            <li className={styles.active}>2.<Link href="#"><a>Details</a></Link> </li>
            <li>3.<Link href="#"><a>Offers by Users</a></Link> </li>
            <li>4.<Link href="#"><a>Offers Details</a></Link> </li>
          </ul>
        </div>
        <div>
          <CreateNewSwappingTwo />
        </div>
      </Container>

      <div>
        <hr />
        <Footer footerIconShow={false} />
      </div>
    </div>
  );
}
