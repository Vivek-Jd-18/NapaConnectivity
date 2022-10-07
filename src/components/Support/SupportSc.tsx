import React from 'react'
import styles from './SupportSc.module.scss';
import Footer from '../Footer/Footer';
import Container from '../../Layout/Container/Container';
import Image from 'next/image';

export default function SupportSc() {
  const [active, setActive] = React.useState(false);
  const handleClick = () => {
    setActive(!active);
  };
  return (
    <>
    <div
      className={styles.WidthFull}
    >
      <Container
        className={`${styles.napaLoungeContainer} asinnerContainer`}
      >
        <div className={styles.MainContact}
        // className={
        //   active
        //     ? `${styles.MainContact} ${styles.active}`
        //     : `${styles.MainContact}`
        // }
        >
          <div className={styles.MainTextHelp}>
            <h1>Support</h1>
            <div className={styles.ContactUsMain}>
              <div className={styles.LeftContact}>
                <div className={styles.InputContact}>
                  <div className={styles.FrstInput}>
                    <p>Name</p>
                    <input type="text" placeholder='John Ridley' />
                  </div>
                  <div className={styles.FrstInput}>
                    <p>Email</p>
                    <input type="text" placeholder='john.ridley@gmail.com' />
                  </div>
                  <div className={styles.TextArea}>
                    <p>Describe Your Problem</p> 
                    <textarea></textarea>
                  </div>
                  <div className={styles.SendBtnn}>
                    <button>Send</button>
                  </div>
                </div>
              </div>
              
             
              <div className={
                  active
                    ? `${styles.ChatBtnFix} ${styles.active}`
                    : `${styles.ChatBtnFix}`}
                  >
                <button onClick={handleClick} className={styles.ChatBtn}>
                  <Image src="/img/chat_ic.svg" alt="" width={32} height={32}  />
                </button>
                <div
              className={
                active
                  ? `${styles.ChatBoxMainpstn} ${styles.active}`
                  : `${styles.ChatBoxMainpstn}`
              }>
                <div className={styles.ChatBoxMain}>
                  <div className={styles.ChatBox}>
                    <div className={styles.ChatHad}>
                      <h6>Chat</h6>
                      <div className={styles.MinusPlusBtnn}>
                        <button className={styles.Minus_icon}><Image src="/img/minus_chat.svg" alt="" width={24} height={24} /></button>
                        <button onClick={handleClick}><Image src="/img/plus_chat.svg" alt="" width={24} height={24} /></button>
                      </div>
                    </div>
                    <div>                      
                      <div className={styles.ChatInText}>
                        <div className={styles.ChatFrstImgMain}>
                          <Image src="/img/chat_ic_girl.svg" alt="" width={32} height={32} />
                          <div className={styles.ChatTxtOne}>
                            <h6>Hello! Please describe your problem.</h6>
                            <span>12:24</span>
                          </div>
                        </div>
                        <div className={styles.ChatTxtRight}>
                            <h6>Supported neglected met therefore unwilling discovery remainderbe do mutual.</h6>
                            <span>12:32</span>
                        </div>
                        <div className={styles.ChatFrstImgMain}>
                          <Image src="/img/chat_ic_girl.svg" alt="" width={32} height={32} />
                          <div className={styles.ChatTxtOne}>
                            <h6>Wished be do mutual except in effect answer.</h6>
                            <span>12:38</span>
                          </div>                    
                        </div>
                        <div className={styles.ChatTxtRight}>
                            <h6>Way sentiments two indulgence uncommonly own.</h6>
                            <span>12:32</span>
                        </div>
                        <div className={styles.ChatFrstImgMain}>
                          <Image src="/img/chat_ic_girl.svg" alt="" width={32} height={32} />
                          <div className={styles.ChatTxtOne}>
                            <h6>Wished be do mutual except in effect answer.</h6>
                            <span>12:38</span>
                          </div>                    
                        </div>
                        <div className={styles.ChatTxtRight}>
                            <h6>Way sentiments two indulgence uncommonly own.</h6>
                            <span>12:32</span>
                        </div>
                        <div className={styles.ChatFrstImgMain}>
                          <Image src="/img/chat_ic_girl.svg" alt="" width={32} height={32} />
                          <div className={styles.ChatTxtOne}>
                            <h6>Wished be do mutual except in effect answer.</h6>
                            <span>12:38</span>
                          </div>                    
                        </div>
                        <div className={styles.ChatTxtRight}>
                            <h6>Way sentiments two indulgence uncommonly own.</h6>
                            <span>12:32</span>
                        </div>
                        <div className={styles.ChatFrstImgMain}>
                          <Image src="/img/chat_ic_girl.svg" alt="" width={32} height={32} />
                          <div className={styles.ChatTxtOne}>
                            <h6>Wished be do mutual except in effect answer.</h6>
                            <span>12:38</span>
                          </div>                    
                        </div>
                        <div className={styles.ChatTxtRight}>
                            <h6>Way sentiments two indulgence uncommonly own.</h6>
                            <span>12:32</span>
                        </div>
                        <div className={styles.ChatFrstImgMain}>
                          <Image src="/img/chat_ic_girl.svg" alt="" width={32} height={32} />
                          <div className={styles.ChatTxtOne}>
                            <h6>Wished be do mutual except in effect answer.</h6>
                            <span>12:38</span>
                          </div>                    
                        </div>
                        <div className={styles.ChatTxtRight}>
                            <h6>Way sentiments two indulgence uncommonly own.</h6>
                            <span>12:32</span>
                        </div>
                        <div className={styles.ChatFrstImgMain}>
                          <Image src="/img/chat_ic_girl.svg" alt="" width={32} height={32} />
                          <div className={styles.ChatTxtOne}>
                            <h6>Wished be do mutual except in effect answer.</h6>
                            <span>12:38</span>
                          </div>                    
                        </div>
                        <div className={styles.ChatTxtRight}>
                            <h6>Way sentiments two indulgence uncommonly own.</h6>
                            <span>12:32</span>
                        </div>
                        <div className={styles.ChatFrstImgMain}>
                          <Image src="/img/chat_ic_girl.svg" alt="" width={32} height={32} />
                          <div className={styles.ChatTxtOne}>
                            <h6>Wished be do mutual except in effect answer.</h6>
                            <span>12:38</span>
                          </div>                    
                        </div>
                        <div className={styles.ChatTxtRight}>
                            <h6>Way sentiments two indulgence uncommonly own.</h6>
                            <span>12:32</span>
                        </div>
                        <div className={styles.ChatFrstImgMain}>
                          <Image src="/img/chat_ic_girl.svg" alt="" width={32} height={32} />
                          <div className={styles.ChatTxtOne}>
                            <h6>Wished be do mutual except in effect answer.</h6>
                            <span>12:38</span>
                          </div>                    
                        </div>
                        <div className={styles.ChatTxtRight}>
                            <h6>Way sentiments two indulgence uncommonly own.</h6>
                            <span>12:32</span>
                        </div>
                        <div className={styles.ChatFrstImgMain}>
                          <Image src="/img/chat_ic_girl.svg" alt="" width={32} height={32} />
                          <div className={styles.ChatTxtOne}>
                            <h6>Wished be do mutual except in effect answer.</h6>
                            <span>12:38</span>
                          </div>                    
                        </div>
                        <div className={styles.ChatTxtRight}>
                            <h6>Way sentiments two indulgence uncommonly own.</h6>
                            <span>12:32</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.LastMessageInpt}>
                    <input type="text" placeholder="Message.." />
                    <button>Send</button>
                  </div>
                </div>
              </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <div className={styles.footerContainer}>
        <Footer footerIconShow={false} />
      </div>
    </div>
    </>
  )
}
