import Container from '../../Layout/Container/Container';
import Footer from '../Footer/Footer';
import styles from './Leaderboards.module.scss';
import React from 'react';
import Image from 'next/image';

export default function LeaderboardsSc() {
  return (
    <>
    <div className={`${styles.container}`}>
      <Container className={`${styles.settingsContainer} asinnerContainer`}>
        <h1 className={styles.settings}>Leaderboards</h1>
        adsad
        <div className={styles.TabLinks}>
            <ul>
                <li>
                    <button className={styles.active}>Most Liked Post</button>
                </li>
                <li>
                    <button>Most Token Rewards</button>
                </li>
                <li>
                    <button>Most Discussed</button>
                </li>
                <li>
                    <button>Social Media Minted NFT</button>
                </li>
            </ul>
        </div>
        <div className={styles.CardBox}>
            <div className={styles.CardBoxFirst}>
                <div className={styles.Overlay}>
                    <Image src="/img/letherbord_ic01.jpg" alt="" width={320} height={398} />
                    <div className={styles.FristContent}>
                        <h4>5369<span>likes</span></h4>
                    </div>
                    <div className={styles.SecondContent}>
                        <h2>02</h2>
                        <p>Catherine Patton</p>
                    </div>
                </div>
            </div>
            <div className={styles.CardBoxSecond}>
                <div className={styles.Overlay}>
                    <Image src="/img/letherbord_ic02.jpg" alt="" width={424} height={532} />
                    <div className={styles.FristContent}>
                        <h4>8716<span>likes</span></h4>
                    </div>
                    <div className={styles.SecondContent}>
                        <h2>01</h2>
                        <p>Dwight Holland</p>
                    </div>
                </div>
            </div>
            <div className={styles.CardBoxThird}>
                <div className={styles.Overlay}>
                    <Image src="/img/letherbord_ic03.jpg" alt="" width={320} height={398} />
                    <div className={styles.FristContent}>
                        <h4>4672<span>likes</span></h4>
                    </div>
                    <div className={styles.SecondContent}>
                        <h2>03</h2>
                        <p>Marta Thornton</p>
                    </div>
                </div>
            </div>
        </div>
      </Container>
      <div>
        <hr />
        <Footer footerIconShow={false} />
      </div>
    </div>
    </>
  )
}
