import Container from '../../Layout/Container/Container';
import Footer from '../Footer/Footer';
import styles from './Leaderboards.module.scss';
import React from 'react';
import Image from 'next/image';
import SliderComponent from '../Slider/Slider';

export default function LeaderboardsSc() {
  return (
    <>
    <div className={styles.LederBordBg}>
    
    <div className={`${styles.container}`}>
      <Container className={`${styles.settingsContainer} asinnerContainer`}>
        <h1 className={styles.settings}>Leaderboards</h1>
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
            <div id="nft-marketplace" className={styles.SliderMain}>
                <SliderComponent centerMode={true} slidesToShow={3}>
                    <div>
                        <div className={styles.CardBoxFirst}>
                            <div className={styles.Overlay}>
                                <Image src="/img/letherbord_ic01.png" alt="" width={320} height={398} />
                                <div className={styles.FristContent}>
                                    <h4>8716<span>likes</span></h4>
                                </div>
                                <div className={styles.SecondContent}>
                                    <h2>01</h2>
                                    <p>Dwight Holland</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className={styles.CardBoxFirst}>
                            <div className={styles.Overlay}>
                                <Image src="/img/letherbord_ic02.png" alt="" width={320} height={398} />
                                <div className={styles.FristContent}>
                                    <h4>5369<span>likes</span></h4>
                                </div>
                                <div className={styles.SecondContent}>
                                    <h2>02</h2>
                                    <p>Catherine Patton</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className={styles.CardBoxFirst}>
                            <div className={styles.Overlay}>
                                <Image src="/img/letherbord_ic03.png" alt="" width={320} height={398} />
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
                    <div>
                        <div className={styles.CardBoxFirst}>
                            <div className={styles.Overlay}>
                                <Image src="/img/letherbord_ic04.png" alt="" width={320} height={398} />
                                <div className={styles.FristContent}>
                                    <h4>3861<span>likes</span></h4>
                                </div>
                                <div className={styles.SecondContent}>
                                    <h2>04</h2>
                                    <p>Madeline Keller</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className={styles.CardBoxFirst}>
                            <div className={styles.Overlay}>
                                <Image src="/img/letherbord_ic01.png" alt="" width={320} height={398} />
                                <div className={styles.FristContent}>
                                    <h4>8716<span>likes</span></h4>
                                </div>
                                <div className={styles.SecondContent}>
                                    <h2>05</h2>
                                    <p>Dwight Holland</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className={styles.CardBoxFirst}>
                            <div className={styles.Overlay}>
                                <Image src="/img/letherbord_ic02.png" alt="" width={320} height={398} />
                                <div className={styles.FristContent}>
                                    <h4>5369<span>likes</span></h4>
                                </div>
                                <div className={styles.SecondContent}>
                                    <h2>06</h2>
                                    <p>Catherine Patton</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className={styles.CardBoxFirst}>
                            <div className={styles.Overlay}>
                                <Image src="/img/letherbord_ic03.png" alt="" width={320} height={398} />
                                <div className={styles.FristContent}>
                                    <h4>4672<span>likes</span></h4>
                                </div>
                                <div className={styles.SecondContent}>
                                    <h2>07</h2>
                                    <p>Marta Thornton</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className={styles.CardBoxFirst}>
                            <div className={styles.Overlay}>
                                <Image src="/img/letherbord_ic04.png" alt="" width={320} height={398} />
                                <div className={styles.FristContent}>
                                    <h4>3861<span>likes</span></h4>
                                </div>
                                <div className={styles.SecondContent}>
                                    <h2>08</h2>
                                    <p>Madeline Keller</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className={styles.CardBoxFirst}>
                            <div className={styles.Overlay}>
                                <Image src="/img/letherbord_ic01.png" alt="" width={320} height={398} />
                                <div className={styles.FristContent}>
                                    <h4>8716<span>likes</span></h4>
                                </div>
                                <div className={styles.SecondContent}>
                                    <h2>09</h2>
                                    <p>Dwight Holland</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className={styles.CardBoxFirst}>
                            <div className={styles.Overlay}>
                                <Image src="/img/letherbord_ic02.png" alt="" width={320} height={398} />
                                <div className={styles.FristContent}>
                                    <h4>5369<span>likes</span></h4>
                                </div>
                                <div className={styles.SecondContent}>
                                    <h2>10</h2>
                                    <p>Catherine Patton</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <div>
                        <div className={styles.CardBoxSecond}>
                            <div className={styles.Overlay}>
                                <Image src="/img/letherbord_ic02.png" alt="" width={320} height={398} />
                                <div className={styles.FristContent}>
                                    <h4>8716<span>likes</span></h4>
                                </div>
                                <div className={styles.SecondContent}>
                                    <h2>02</h2>
                                    <p>Dwight Holland</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className={styles.CardBoxThird}>
                            <div className={styles.Overlay}>
                                <Image src="/img/letherbord_ic03.png" alt="" width={320} height={398} />
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
                    <div>
                        <div className={styles.CardBoxFirst}>
                            <div className={styles.Overlay}>
                                <Image src="/img/letherbord_ic04.png" alt="" width={320} height={398} />
                                <div className={styles.FristContent}>
                                    <h4>5369<span>likes</span></h4>
                                </div>
                                <div className={styles.SecondContent}>
                                    <h2>04</h2>
                                    <p>Catherine Patton</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className={styles.CardBoxSecond}>
                            <div className={styles.Overlay}>
                                <Image src="/img/letherbord_ic01.png" alt="" width={320} height={398} />
                                <div className={styles.FristContent}>
                                    <h4>8716<span>likes</span></h4>
                                </div>
                                <div className={styles.SecondContent}>
                                    <h2>05</h2>
                                    <p>Dwight Holland</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className={styles.CardBoxThird}>
                            <div className={styles.Overlay}>
                                <Image src="/img/letherbord_ic02.png" alt="" width={320} height={398} />
                                <div className={styles.FristContent}>
                                    <h4>4672<span>likes</span></h4>
                                </div>
                                <div className={styles.SecondContent}>
                                    <h2>06</h2>
                                    <p>Marta Thornton</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className={styles.CardBoxThird}>
                            <div className={styles.Overlay}>
                                <Image src="/img/letherbord_ic03.png" alt="" width={320} height={398} />
                                <div className={styles.FristContent}>
                                    <h4>4672<span>likes</span></h4>
                                </div>
                                <div className={styles.SecondContent}>
                                    <h2>07</h2>
                                    <p>Marta Thornton</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className={styles.CardBoxThird}>
                            <div className={styles.Overlay}>
                                <Image src="/img/letherbord_ic04.png" alt="" width={320} height={398} />
                                <div className={styles.FristContent}>
                                    <h4>4672<span>likes</span></h4>
                                </div>
                                <div className={styles.SecondContent}>
                                    <h2>08</h2>
                                    <p>Marta Thornton</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className={styles.CardBoxThird}>
                            <div className={styles.Overlay}>
                                <Image src="/img/letherbord_ic01.png" alt="" width={320} height={398} />
                                <div className={styles.FristContent}>
                                    <h4>4672<span>likes</span></h4>
                                </div>
                                <div className={styles.SecondContent}>
                                    <h2>09</h2>
                                    <p>Marta Thornton</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className={styles.CardBoxThird}>
                            <div className={styles.Overlay}>
                                <Image src="/img/letherbord_ic01.png" alt="" width={320} height={398} />
                                <div className={styles.FristContent}>
                                    <h4>4672<span>likes</span></h4>
                                </div>
                                <div className={styles.SecondContent}>
                                    <h2>10</h2>
                                    <p>Marta Thornton</p>
                                </div>
                            </div>
                        </div>
                    </div> */}
                    
                    
                    
            </SliderComponent>
            </div>
            
        </div>
        <div className={styles.LdrbrdListMain}>
            <div className={styles.LdrbrdListOverlay}>
                <div className={styles.LdrbrdList}>
                    <div className={styles.LdrbrdItems}>
                        <div className={styles.LdrbrdItemsRaigt}>
                            <h4>01</h4>
                            <Image src="/img/madkiler01.jpg" alt="" width={80} height={80} />
                            <p>Madeline Keller</p>
                        </div>
                        <div className={styles.LdrbrdItemsLeft}>
                            <h6>4398</h6>
                        </div>
                    </div>
                    <div className={styles.LdrbrdItems}>
                        <div className={styles.LdrbrdItemsRaigt}>
                            <h4>02</h4>
                            <Image src="/img/madkiler02.jpg" alt="" width={80} height={80} />
                            <p>Tom Bradley</p>
                        </div>
                        <div className={styles.LdrbrdItemsLeft}>
                            <h6>4345</h6>
                        </div>
                    </div>
                    <div className={styles.LdrbrdItems}>
                        <div className={styles.LdrbrdItemsRaigt}>
                            <h4>03</h4>
                            <Image src="/img/madkiler03.jpg" alt="" width={80} height={80} />
                            <p>Dorothy Mccoy</p>
                        </div>
                        <div className={styles.LdrbrdItemsLeft}>
                            <h6>3027</h6>
                        </div>
                    </div>
                
                    <div className={styles.LdrbrdItems}>
                        <div className={styles.LdrbrdItemsRaigt}>
                            <h4>04</h4>
                            <Image src="/img/madkiler04.jpg" alt="" width={80} height={80} />
                            <p>Howard Copeland</p>
                        </div>
                        <div className={styles.LdrbrdItemsLeft}>
                            <h6>2178</h6>
                        </div>
                    </div>
                    <div className={styles.LdrbrdItems}>
                        <div className={styles.LdrbrdItemsRaigt}>
                            <h4>05</h4>
                            <Image src="/img/madkiler05.jpg" alt="" width={80} height={80} />
                            <p>Rufus Flores</p>
                        </div>
                        <div className={styles.LdrbrdItemsLeft}>
                            <h6>1807</h6>
                        </div>
                    </div>
                    <div className={styles.LdrbrdItems}>
                        <div className={styles.LdrbrdItemsRaigt}>
                            <h4>06</h4>
                            <Image src="/img/madkiler01.jpg" alt="" width={80} height={80} />
                            <p>Madeline Keller</p>
                        </div>
                        <div className={styles.LdrbrdItemsLeft}>
                            <h6>4398</h6>
                        </div>
                    </div>
                    <div className={styles.LdrbrdItems}>
                        <div className={styles.LdrbrdItemsRaigt}>
                            <h4>07</h4>
                            <Image src="/img/madkiler02.jpg" alt="" width={80} height={80} />
                            <p>Tom Bradley</p>
                        </div>
                        <div className={styles.LdrbrdItemsLeft}>
                            <h6>4345</h6>
                        </div>
                    </div>
                    <div className={styles.LdrbrdItems}>
                        <div className={styles.LdrbrdItemsRaigt}>
                            <h4>08</h4>
                            <Image src="/img/madkiler03.jpg" alt="" width={80} height={80} />
                            <p>Dorothy Mccoy</p>
                        </div>
                        <div className={styles.LdrbrdItemsLeft}>
                            <h6>3027</h6>
                        </div>
                    </div>
                
                    <div className={styles.LdrbrdItems}>
                        <div className={styles.LdrbrdItemsRaigt}>
                            <h4>09</h4>
                            <Image src="/img/madkiler04.jpg" alt="" width={80} height={80} />
                            <p>Howard Copeland</p>
                        </div>
                        <div className={styles.LdrbrdItemsLeft}>
                            <h6>2178</h6>
                        </div>
                    </div>
                    <div className={styles.LdrbrdItems}>
                        <div className={styles.LdrbrdItemsRaigt}>
                            <h4>10</h4>
                            <Image src="/img/madkiler05.jpg" alt="" width={80} height={80} />
                            <p>Rufus Flores</p>
                        </div>
                        <div className={styles.LdrbrdItemsLeft}>
                            <h6>1807</h6>
                        </div>
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
    </div>
    </>
  )
}
