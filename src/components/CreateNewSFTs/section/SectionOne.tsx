import React from 'react';
import styles from './SectionOne.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { SnftResponse } from '../../../types/marketplace';
import { deleteSnft } from '../../../services/MarketplaceApi';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { CustomToastWithLink } from '../../../components/CustomToast/CustomToast';
import { DoneIcon, ErrorIcon } from '../../../components/assets';
import { FadeLoader } from 'react-spinners';
import {
  LazyFunction,
  call,
} from '../../../connectivity/mainFunctions/Functions';
import {
  _setSaleFromWallet,
  _buyNftToken,
  _nftInfo
} from '../../../connectivity/mainFunctions/marketFunctions';


type SectionOneProps = {
  snftDetails: SnftResponse | null;
  profileId: string | null;
};

export default function SectionOne({
  snftDetails,
  profileId,
}: SectionOneProps) {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  console.log(snftDetails, 'all data');

  const handleDeleteSnft = async () => {
    setLoading(true);
    //@ts-ignore
    const { error, message } = await deleteSnft(router?.query?.id);
    if (error) {
      toast.error(
        CustomToastWithLink({
          icon: ErrorIcon,
          title: 'Error',
          description: message,
          time: 'Now',
        })
      );
      setLoading(false);
      return;
    }
    toast.success(
      CustomToastWithLink({
        icon: DoneIcon,
        title: 'Success',
        description: message,
        time: 'Now',
      })
    );
    setLoading(false);
    router.push('/marketplace');
  };


  //connectivity functions starts here

  //lazy mint connectivity function
  const lazyMint = async (data: any) => {
    console.log("changes appeared")
    try {
      await call();//to get signer from wallet
      let val = data.tokenId.toString();
      await LazyFunction(
        val,
        data.accountId,
        '0.001',
        1,
        'https://bafybeiho2j43vulwhnjmfyvjafohl5prvcx24hr2sqvz7wliynnodmovru.ipfs.dweb.link/101.json',
        false,
        false
      );
    } catch (e) {
      console.log('error :', e);
    }
  };



  // marketPlace setApprovalFunction to approve NFTs by owner('Should be called by NFT owner')
  // const approveNFTFromOwner = async () => {
  //   try {
  //     let tknId = 452610601930869570;
  //     await call2();//to get signer from wallet
  //     await _setSaleFromWallet(tknId.toString());
  //     await doApprovalForMarketContract();
  //     await checkApprovalFroMarketContract();
  //   } catch (e) {
  //     console.log('error :', e);
  //   }
  // };


  // // marketPlace BuyFunction to buyNFT by marketPlace('Should be called by Buyer')
  // const BuyFunction = async () => {
  //   try {
  //     await call2();//to get signer from wallet
  //     // console.log(await calculateTokenAllowance(2));
  //     let typeOfTransaction = 2;//should be 0,1 or 2
  //     let tknId = 452610601930869570;
  //     await _nftInfo(tknId.toString())
  //     await _buyNftToken(typeOfTransaction, tknId.toString());
  //   } catch (e) {
  //     console.log('error :', e);
  //   }
  // };

  //connectivity functions ends here

  return (
    <div className={styles.SectionOne}>
      <div className={styles.CustomGridContainer}>
        <div className={styles.CustomGrid}>
          <div className={styles.imgPerntScone}>
            {/* <Image
              src="/img/crat_nft_tow_aj.png"
              alt=""
              width={540}
              height={540}
            /> */}
            <video
              width={'100%'}
              height={'540px'}
              autoPlay
              controls
              muted
              loop
              src={snftDetails?.videoURL as string}
            ></video>
          </div>
        </div>
        <div className={styles.CustomGrid}>
          <div className={styles.ScOneLeftCont}>
            <h1>{snftDetails?.collection}</h1>
            <p>{snftDetails?.SNFTDescription}</p>
            <div className={styles.imgAndperaFlex}>
              <Image
                src={`${snftDetails?.userImage
                  ? snftDetails?.userImage
                  : '/assets/images/img_avatar.png'
                  }`}
                alt=""
                width={40}
                height={40}
                style={{ borderRadius: '50px' }}
              />
              <p>{snftDetails?.userName}</p>
            </div>
            <div className={styles.CurrentBitBox}>
              <div className={styles.CurrentBitBoxInrr}>
                <p>Current Bid</p>
                <div className={styles.imgAdnHH}>
                  <Image
                    src="/img/napa_ic.svg"
                    height="28px"
                    width="28px"
                    alt=""
                    className=""
                  />
                  <h3>{snftDetails?.amount}</h3>
                </div>
              </div>
              <div className={styles.CurrentBitBoxInrr}>
                <p>Ending In</p>
                <div className={styles.imgAdnHH}>
                  <h3>{snftDetails?.duration}</h3>
                </div>
              </div>
            </div>
            {loading ? (
              <div className={styles.loadingContainer}>
                <FadeLoader color="#ffffff" />
              </div>
            ) : (
              <div className={styles.thrBtnPrnt}>
                {profileId == snftDetails?.profileId && (
                  <Link href={`/list-item?id=${router?.query?.id}`}>
                    <a className={styles.linkPernt}>Edit</a>
                  </Link>
                )}
                {profileId == snftDetails?.profileId && (
                  <Link href="">
                    <a onClick={handleDeleteSnft} className={styles.linkPernt}>
                      Delist
                    </a>
                  </Link>
                )}
                {profileId != snftDetails?.profileId && (
                  <Link href="/">
                    <a className={styles.linkPernt}>Submit Offer</a>
                  </Link>
                )}
                {profileId != snftDetails?.profileId && (
                  <button
                    className={styles.linkPernt}
                    onClick={()=>lazyMint(snftDetails)}
                  >
                    Buy Now for {snftDetails?.amount} NAPA
                  </button>

                )}
                <div className={`${styles.RowLabel} ${styles.RowSeven}`}>
                  <div className={styles.butnPernt}>
                    <button
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <Image
                        src="/img/tow_dot_white_img.svg"
                        alt=""
                        width={32}
                        height={32}
                      />
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end drpdwn_list">
                      <li>
                        <a className="dropdown-item" href="#">
                          Add to Watchlist
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Add to DAVE
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="co-batching-pools">
                          Create New Pool
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
// for create new pool the NFT or SFT will be added to co-bathing pools on step 2 //
