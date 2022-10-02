import type { NextPage } from 'next';
import Image from 'next/image';
import styles from './SocialMediaReview.module.scss';
import moment from 'moment';
import Link from 'next/link';

type SocialMediaReviewProps = {
  description: string;
  icon: string;
  date: string;
  username: string;
};

const SocialMediaReview: NextPage<SocialMediaReviewProps> = ({
  description,
  icon,
  date,
  username,
}) => {
  return (
    <div className={styles.reviewContainer}>
      <div className={styles.review}>
        <p>{description} <button><Image src="/img/close_ic.svg" alt="" width="24px" height="24px" /></button> </p>
      </div>
      <div className={styles.userContainer}>
        <div className={styles.avatar}>
          <Image src={icon} width={40} height={40} alt="avatar" />
        </div>
        <div className={styles.userInfo}>
          <span className={styles.userName}>{username}</span>
          <span className={styles.date}>
            {moment(date).format('DD MMMM YYYY')}
          </span>
        </div>
        <div className={styles.twoLinkAj}>
          <div className={styles.twoLinkInnr}>
            <Link href="#"><a>In Social Media <Image src="/img/left_erow_ic.svg" alt="" width="14px" height="14px" /></a></Link>
          </div>
          <div className={styles.twoLinkInnr}>
            <Link href="#"><a>NFT Project on NAPA Marketplace <Image src="/img/left_erow_ic.svg" alt="" width="14px" height="14px" /></a></Link>
          </div>
        </div>
      </div>
      <div className={styles.allPeragraphMain}>
        <p>How can you tell if you are buying an NFT from the exact collection and not a cheaper replica? How to ensure that your next NFT purchase is not a scam attempt from a bad actor on the other side of the blockchain? </p>
        <p>Soon anyone from anywhere in the world will be able to create and sell an NFT on Swappable without approval from any central authority. Radical transparency is at the core of the crypto project. This, however, demands more attention and responsibility than usual.</p>
        <p>Here are a few tips on how to check and be certain that you are not being tricked and scammed in the vast wild west called Web3. Checking the smart contract info is a great way to be sure you’re buying the correct NFT. Reach out to the creator for clarity on the smart contract and token ID, and make sure it’s the same as what you see in the Chain Info section on the NFT page. Some high-profile collections on Swappable such as Jani Leinonen’s will have a verified collection badge. Look for those as extra proof that the artwork indeed belongs to the author.</p>
        <p>Normally, an artist would add his social media links on his collection page. If that is not the case, feel free to check with him. Locate his Facebook or Instagram page and drop him a DM. See if the artist has provided a link to his NFT collection. </p>
        <div className={styles.ulPerent}>
          <ul>
            <li><p>NFT</p></li>
            <li><p>Tokens</p></li>
            <li><p>Blockchain</p></li>
            <li><p>Crypto</p></li>
          </ul>
        </div>        
      </div>
    </div>
  );
};
export default SocialMediaReview;
