import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import styles from './FeedTab.module.scss';

export default function FeedTab() {
  const [active, setActive] = React.useState(false);
  const handleClick = () => {
    setActive(!active);
  };
  const [activetwo, setActiveTwo] = React.useState(false);
  const handleClickTwo = () => {
    setActiveTwo(!activetwo);
  };
  return (
    <div className={styles.MainListBox}>
      <div className={styles.MainScrollBox}>
        {/* Items one */}
        <div
          className={
            active
              ? `${styles.MainTabBox} ${styles.active}`
              : `${styles.MainTabBox}`
          }
        >
          <div className={styles.leftBox}>
            <div className={styles.HadUserText}>
              <Link href="/">
                <div className={styles.HadUserImage}>
                  <Image
                    src="/img/user_had.png"
                    alt=""
                    width="40px"
                    height="40px"
                  />
                  <div className={styles.UserNameTxt}>
                    <h4>Catherine Patton</h4>
                    <p>5 Aug 2022</p>
                  </div>
                </div>
              </Link>
              <div className={styles.UserRightTxt}>
                <h4>10:22:12</h4>
                <p>Live Post Remaining</p>
              </div>
            </div>
            <div className={styles.MdlImage}>
              <Image
                src="/img/user_post.png"
                alt=""
                width="720px"
                height="320px"
              />
            </div>
            <div className={styles.BotomTxt}>
              <a href="#" className={styles.BotomLikes}>
                <Image
                  src="/img/heart_icon.svg"
                  alt=""
                  width="24px"
                  height="24px"
                />
                <span>
                  496 <b>likes</b>
                </span>
              </a>
              <button
                className={
                  active
                    ? `${styles.BotomLikes} ${styles.active}`
                    : `${styles.BotomLikes}`
                }
                onClick={handleClick}
              >
                <Image
                  src="/img/feedback_icon_icon.svg"
                  alt=""
                  width="24px"
                  height="24px"
                />
                <span>
                  16 <b>comments</b>
                </span>
              </button>
              <a href="#" className={styles.BotomLikes}>
                <Image
                  src="/img/reward_icon.svg"
                  alt=""
                  width="24px"
                  height="24px"
                />
                <span>
                  12 <b>awards</b>
                </span>
              </a>
              <button
                className={
                  active
                    ? `${styles.BotomLikes} ${styles.active}`
                    : `${styles.BotomLikes}`
                }
                onClick={handleClick}
              >
                <Image
                  src="/img/mint_icon.svg"
                  alt=""
                  width="24px"
                  height="24px"
                />
                <span>
                  Mint
                </span>
              </button>
              <button
                className={
                  active
                    ? `${styles.BotomLikes} ${styles.active}`
                    : `${styles.BotomLikes}`
                }
                onClick={handleClick}
              >
                <Image
                  src="/img/edit_icon_ic.svg"
                  alt=""
                  width="24px"
                  height="24px"
                />
                <span>
                  Post
                </span>
              </button>
              <a href="#" className={styles.BotomLikes}>
                <Image
                  src="/img/share_icon.svg"
                  alt=""
                  width="24px"
                  height="24px"
                />
                <span>
                  <b>Share</b>
                </span>
              </a>
            </div>
          </div>
          <div
            className={
              active
                ? `${styles.rightBox} ${styles.active}`
                : `${styles.rightBox}`
            }
          >
            <button className={styles.ExitButton} onClick={handleClick}>
              <Image
                src="/img/exit_icon.svg"
                alt=""
                width="24px"
                height="24px"
              />
            </button>
            <h1>16 comments</h1>
            <div className={styles.ForShadow}>
              <div className={styles.UserComment}>
                <div className={styles.FisrtComBox}>
                  <div className={styles.HadComment}>
                    <a href="#" className={styles.leftIcontxt}>
                      <Image
                        src="/img/comment01.png"
                        alt=""
                        width="28px"
                        height="28px"
                      />
                      <h4>Marta Thornton</h4>
                    </a>
                    <p>1 hour</p>
                  </div>
                  <div className={styles.btmcomment}>
                    <p>
                      However venture pursuit he am mr cordial. Forming musical
                      am hearing studied be luckily.
                    </p>
                    <div className={styles.LikeReplyTxt}>
                      <a href="#">Like</a>
                      <a href="#">Reply</a>
                    </div>
                  </div>
                </div>
                <div className={styles.FisrtComBox}>
                  <div className={styles.HadComment}>
                    <a href="#" className={styles.leftIcontxt}>
                      <Image
                        src="/img/comment02.svg"
                        alt=""
                        width="28px"
                        height="28px"
                      />
                      <h4>Dorothy Mccoy</h4>
                    </a>
                    <p>4 hour</p>
                  </div>
                  <div className={styles.btmcomment}>
                    <p>Change wholly say why eldest period.</p>
                    <div className={styles.LikeReplyTxt}>
                      <a href="#">Like</a>
                      <a href="#">Reply</a>
                    </div>
                  </div>
                </div>
                <div className={styles.FisrtComBox}>
                  <div className={styles.HadComment}>
                    <a href="#" className={styles.leftIcontxt}>
                      <Image
                        src="/img/comment03.svg"
                        alt=""
                        width="28px"
                        height="28px"
                      />
                      <h4>Howard Copeland</h4>
                    </a>
                    <p>1 hour</p>
                  </div>
                  <div className={styles.btmcomment}>
                    <p>
                      Unfeeling agreeable suffering it on smallness newspaper
                      be. So come must time no as. Do on unpleasing.{' '}
                    </p>
                    <div className={styles.LikeReplyTxt}>
                      <a href="#">Like</a>
                      <a href="#">Reply</a>
                    </div>
                  </div>
                </div>
                <div className={styles.FisrtComBox}>
                  <div className={styles.HadComment}>
                    <a href="#" className={styles.leftIcontxt}>
                      <Image
                        src="/img/comment03.svg"
                        alt=""
                        width="28px"
                        height="28px"
                      />
                      <h4>Howard Copeland</h4>
                    </a>
                    <p>1 hour</p>
                  </div>
                  <div className={styles.btmcomment}>
                    <p>
                      Unfeeling agreeable suffering it on smallness newspaper
                      be. So come must time no as. Do on unpleasing.{' '}
                    </p>
                    <div className={styles.LikeReplyTxt}>
                      <a href="#">Like</a>
                      <a href="#">Reply</a>
                    </div>
                  </div>
                </div>
                <div className={styles.FisrtComBox}>
                  <div className={styles.HadComment}>
                    <a href="#" className={styles.leftIcontxt}>
                      <Image
                        src="/img/comment03.svg"
                        alt=""
                        width="28px"
                        height="28px"
                      />
                      <h4>Howard Copeland</h4>
                    </a>
                    <p>1 hour</p>
                  </div>
                  <div className={styles.btmcomment}>
                    <p>
                      Unfeeling agreeable suffering it on smallness newspaper
                      be. So come must time no as. Do on unpleasing.{' '}
                    </p>
                    <div className={styles.LikeReplyTxt}>
                      <a href="#">Like</a>
                      <a href="#">Reply</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.BtmCommentBtn}>
              <input type="text" placeholder="Write a comment.." />
              <button>Send</button>
            </div>
          </div>
        </div>
        {/* Items one */}
        {/* Items two */}
        <div
          className={
            activetwo
              ? `${styles.MainTabBox} ${styles.active}`
              : `${styles.MainTabBox}`
          }
        >
          <div className={styles.leftBox}>
            <div className={styles.HadUserText}>
              <Link href="/">
                <div className={styles.HadUserImage}>
                  <Image
                    src="/img/user_had_sc.svg"
                    alt=""
                    width="40px"
                    height="40px"
                  />
                  <div className={styles.UserNameTxt}>
                    <h4>Tom Bradley</h4>
                    <p>2 Aug 2022</p>
                  </div>
                </div>
              </Link>
              <div className={styles.UserRightTxt}>
                <h4>08:46:23</h4>
                <p>Live Post Remaining</p>
              </div>
            </div>
            <div className={styles.MdlImage}>
              <Image
                src="/img/user_post_sc.png"
                alt=""
                width="720px"
                height="320px"
              />
            </div>
            <div className={styles.BotomTxt}>
              <a href="#" className={styles.BotomLikes}>
                <Image
                  src="/img/heart_icon.svg"
                  alt=""
                  width="24px"
                  height="24px"
                />
                <span>
                  496 <b>likes</b>
                </span>
              </a>
              <button
                className={
                  activetwo
                    ? `${styles.BotomLikes} ${styles.active}`
                    : `${styles.BotomLikes}`
                }
                onClick={handleClickTwo}
              >
                <Image
                  src="/img/feedback_icon_icon.svg"
                  alt=""
                  width="24px"
                  height="24px"
                />
                <span>
                  16 <b>comments</b>
                </span>
              </button>
              <a href="#" className={styles.BotomLikes}>
                <Image
                  src="/img/reward_icon.svg"
                  alt=""
                  width="24px"
                  height="24px"
                />
                <span>
                  12 <b>awards</b>
                </span>
              </a>
              <button
                className={
                  active
                    ? `${styles.BotomLikes} ${styles.active}`
                    : `${styles.BotomLikes}`
                }
                onClick={handleClick}
              >
                <Image
                  src="/img/mint_icon.svg"
                  alt=""
                  width="24px"
                  height="24px"
                />
                <span>
                  Mint
                </span>
              </button>
              <button
                className={
                  active
                    ? `${styles.BotomLikes} ${styles.active}`
                    : `${styles.BotomLikes}`
                }
                onClick={handleClick}
              >
                <Image
                  src="/img/edit_icon_ic.svg"
                  alt=""
                  width="24px"
                  height="24px"
                />
                <span>
                  Post
                </span>
              </button>
              <a href="#" className={styles.BotomLikes}>
                <Image
                  src="/img/share_icon.svg"
                  alt=""
                  width="24px"
                  height="24px"
                />
                <span>
                  <b>Share</b>
                </span>
              </a>
            </div>
          </div>
          <div
            className={
              activetwo
                ? `${styles.rightBox} ${styles.active}`
                : `${styles.rightBox}`
            }
          >
            <button className={styles.ExitButton} onClick={handleClickTwo}>
              <Image
                src="/img/exit_icon.svg"
                alt=""
                width="24px"
                height="24px"
              />
            </button>
            <h1>16 comments</h1>
            <div className={styles.ForShadow}>
              <div className={styles.UserComment}>
                <div className={styles.FisrtComBox}>
                  <div className={styles.HadComment}>
                    <a href="#" className={styles.leftIcontxt}>
                      <Image
                        src="/img/comment01.png"
                        alt=""
                        width="28px"
                        height="28px"
                      />
                      <h4>Marta Thornton</h4>
                    </a>
                    <p>1 hour</p>
                  </div>
                  <div className={styles.btmcomment}>
                    <p>
                      However venture pursuit he am mr cordial. Forming musical
                      am hearing studied be luckily.
                    </p>
                    <div className={styles.LikeReplyTxt}>
                      <a href="#">Like</a>
                      <a href="#">Reply</a>
                    </div>
                  </div>
                </div>
                <div className={styles.FisrtComBox}>
                  <div className={styles.HadComment}>
                    <a href="#" className={styles.leftIcontxt}>
                      <Image
                        src="/img/comment02.svg"
                        alt=""
                        width="28px"
                        height="28px"
                      />
                      <h4>Dorothy Mccoy</h4>
                    </a>
                    <p>4 hour</p>
                  </div>
                  <div className={styles.btmcomment}>
                    <p>Change wholly say why eldest period.</p>
                    <div className={styles.LikeReplyTxt}>
                      <a href="#">Like</a>
                      <a href="#">Reply</a>
                    </div>
                  </div>
                </div>
                <div className={styles.FisrtComBox}>
                  <div className={styles.HadComment}>
                    <a href="#" className={styles.leftIcontxt}>
                      <Image
                        src="/img/comment03.svg"
                        alt=""
                        width="28px"
                        height="28px"
                      />
                      <h4>Howard Copeland</h4>
                    </a>
                    <p>1 hour</p>
                  </div>
                  <div className={styles.btmcomment}>
                    <p>
                      Unfeeling agreeable suffering it on smallness newspaper
                      be. So come must time no as. Do on unpleasing.{' '}
                    </p>
                    <div className={styles.LikeReplyTxt}>
                      <a href="#">Like</a>
                      <a href="#">Reply</a>
                    </div>
                  </div>
                </div>
                <div className={styles.FisrtComBox}>
                  <div className={styles.HadComment}>
                    <a href="#" className={styles.leftIcontxt}>
                      <Image
                        src="/img/comment03.svg"
                        alt=""
                        width="28px"
                        height="28px"
                      />
                      <h4>Howard Copeland</h4>
                    </a>
                    <p>1 hour</p>
                  </div>
                  <div className={styles.btmcomment}>
                    <p>
                      Unfeeling agreeable suffering it on smallness newspaper
                      be. So come must time no as. Do on unpleasing.{' '}
                    </p>
                    <div className={styles.LikeReplyTxt}>
                      <a href="#">Like</a>
                      <a href="#">Reply</a>
                    </div>
                  </div>
                </div>
                <div className={styles.FisrtComBox}>
                  <div className={styles.HadComment}>
                    <a href="#" className={styles.leftIcontxt}>
                      <Image
                        src="/img/comment03.svg"
                        alt=""
                        width="28px"
                        height="28px"
                      />
                      <h4>Howard Copeland</h4>
                    </a>
                    <p>1 hour</p>
                  </div>
                  <div className={styles.btmcomment}>
                    <p>
                      Unfeeling agreeable suffering it on smallness newspaper
                      be. So come must time no as. Do on unpleasing.{' '}
                    </p>
                    <div className={styles.LikeReplyTxt}>
                      <a href="#">Like</a>
                      <a href="#">Reply</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.BtmCommentBtn}>
              <input type="text" placeholder="Write a comment.." />
              <button>Send</button>
            </div>
          </div>
        </div>
        {/* Items two */}
      </div>
    </div>
  );
}
