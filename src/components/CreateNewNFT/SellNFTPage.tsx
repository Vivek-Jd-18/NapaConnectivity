import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import styles from './SellNFTPage.module.scss';
import Input from '../Input/Input';
import Select from 'react-select';
import Image from 'next/image';
import 'bootstrap-daterangepicker/daterangepicker.css';
import { useRouter } from 'next/router';
import { Dayoptions } from '@/constants/sell-nft.constants';
import { MintPost } from '@/types/mint';
import { FadeLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import { DoneIcon, ErrorIcon } from '../assets';
import { CustomToastWithLink } from '../CustomToast/CustomToast';
import { createNewSnft } from '@/services/MarketplaceApi';

type SellNFTPageProps = {
  mintDetails: MintPost | null;
  loading: boolean;
};

export default function SellNFTPage({
  mintDetails,
  loading,
}: SellNFTPageProps) {
  const optionsone = [
    {
      value: 'Napa NAPA 1',
      label: (
        <div className="cstm_napa_slct">
          <Image src="/img/napa_ic.svg" alt="" width="20px" height="20px" />
          Napa NAPA 1
        </div>
      ),
    },
    {
      value: 'Napa NAPA 2',
      label: (
        <div className="cstm_napa_slct">
          <Image src="/img/napa_ic.svg" alt="" width="20px" height="20px" />
          Napa NAPA 2
        </div>
      ),
    },
    {
      value: 'Napa NAPA 3',
      label: (
        <div className="cstm_napa_slct">
          <Image src="/img/napa_ic.svg" alt="" width="20px" height="20px" />
          Napa NAPA 3
        </div>
      ),
    },
  ];
  const { push } = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const [collection, setCollection] = React.useState('');
  const [amount, setAmount] = React.useState('');
  const [duration, setDuration] = React.useState('');
  const [type, setType] = React.useState('Fixed Price');

  const handleCreateSnft = async () => {
    setIsLoading(true);
    const newSnft = {
      collection,
      type,
      amount,
      duration,
      mintId: mintDetails?.mintId ? mintDetails?.mintId : '',
      postId: mintDetails?.postId ? mintDetails?.postId : '',
      thumbnail: mintDetails?.thumbnail ? mintDetails?.thumbnail : '',
      videoURL: mintDetails?.videoURL ? mintDetails.videoURL : '',
      profileId: mintDetails?.profileId ? mintDetails?.profileId : '',
    };
    const { error, message }: any = await createNewSnft(newSnft);
    if (error) {
      setIsLoading(false);
      toast.error(
        CustomToastWithLink({
          icon: ErrorIcon,
          title: 'Error',
          description: message,
          time: 'Now',
        })
      );
      return;
    }
    setIsLoading(false);
    setCollection('');
    setAmount('');
    setDuration('');
    setType('Fixed Price');
    toast.success(
      CustomToastWithLink({
        icon: DoneIcon,
        title: 'Success',
        description: 'Nft Was Created Successfully',
        time: 'Now',
      })
    );
    push('marketplace');
  };

  return (
    <>
      <div className={styles.SellNFTPage}>
        <div className={styles.CustomGridContainer}>
          <div className={styles.CustomGrid}>
            <div className={styles.TypeSidCont}>
              <div className={styles.typePrnt}>
                <h1 className={styles.DefHed}>Type</h1>
                <div className={styles.dublBtn}>
                  <button
                    onClick={() => setType('Fixed Price')}
                    className={`${type == 'Fixed Price' && styles.Active}`}
                  >
                    <Image
                      src="/img/dollar_icon.svg"
                      alt=""
                      width={20}
                      height={20}
                    />{' '}
                    Fixed Price
                  </button>
                  <button
                    onClick={() => setType('Time Based Auction')}
                    className={`${
                      type == 'Time Based Auction' && styles.Active
                    }`}
                  >
                    <Image
                      src="/img/time_icon.svg"
                      alt=""
                      width={20}
                      height={20}
                    />
                    Time Based Auction
                  </button>
                </div>
              </div>
              <div className={styles.typePrnt}>
                <h1 className={styles.DefHed}>Price & Collection</h1>
                <div className={styles.MixInputPool}>
                  <div
                    className={`${styles.SelectPrntNftSell} selectprntnft selectprntnftssell`}
                  >
                    <p className={styles.ClctionTxt}>Collection</p>
                    <Select
                      options={optionsone}
                      // menuIsOpen={true}
                      className="select_pernt select_pernt_v2"
                      placeholder="Bring Me the Open Space "
                      classNamePrefix="cntrslct"
                      onChange={(selectedOption) =>
                        //@ts-ignore
                        setCollection(selectedOption.value)
                      }
                    />
                  </div>
                  <div className={`${styles.FrstInput} frstinputsell`}>
                    <Input
                      value={amount}
                      type="number"
                      placeholder="0.48"
                      label="Amount"
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className={styles.typePrnt}>
                <h1 className={styles.DefHed}>Duration (Days)</h1>
                <div className={styles.Sections}>
                  <Select
                    options={Dayoptions}
                    className={`select_pernt select_pernt_v2 ${styles.options}`}
                    placeholder="Select Duration"
                    classNamePrefix="cntrslct"
                    onChange={(selectedOption) =>
                      //@ts-ignore
                      setDuration(selectedOption.value)
                    }
                  />
                </div>
              </div>
              <div className={`${styles.typePrnt} typePrntaj`}>
                <h1 className={styles.DefHed}>Other Options</h1>
                <div className={`${styles.switchpool} switchpool`}>
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      role="switch"
                      id="flexSwitchCheckDefault"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexSwitchCheckDefault"
                    >
                      Creator Fees
                    </label>
                  </div>
                </div>
                <div className={`${styles.switchpool} switchpool`}>
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      role="switch"
                      id="flexSwitchCheckDefault"
                    />
                    <div className={styles.flexBox}>
                      <label
                        className="form-check-label"
                        htmlFor="flexSwitchCheckDefault"
                      >
                        Reserve for specific buyer
                      </label>
                      <p>
                        This item can be purchased as soon as it{"'"}s listed
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className={`${styles.typePrnt} `}>
                <h1 className={styles.DefHed}>Fees</h1>
                <div className={styles.flexFees}>
                  <p>Transaction Fee</p>
                  <h6>(insert fees)</h6>
                </div>
                <div className={styles.flexFees}>
                  <p>Creator Fee</p>
                  <h6> (set when collection is created)</h6>
                </div>
              </div>
              <div className={`${styles.typePrnt} `}>
                {isLoading ? (
                  <FadeLoader color="#ffffff" />
                ) : (
                  <a onClick={handleCreateSnft} className={styles.linkPrnt}>
                    Complete Listing
                  </a>
                )}
              </div>
            </div>
          </div>
          <div className={styles.CustomGrid}>
            <div className={`${styles.typePrnt} `}>
              <h1 className={styles.DefHed}>Preview</h1>

              <div className={styles.imgPernt}>
                {loading ? (
                  <div className={styles.loadingContainer}>
                    <FadeLoader color="#ffffff" />
                  </div>
                ) : (
                  // <Image
                  //   src={`${
                  //     mintDetails?.thumbnail ? mintDetails?.thumbnail : ''
                  //   }`}
                  //   alt=""
                  //   width={540}
                  //   height={540}
                  // />
                  <video
                    width={'100%'}
                    height={'auto'}
                    autoPlay
                    controls
                    muted
                    loop
                    src={mintDetails?.videoURL as string}
                  >
                    The “video” tag is not supported by your browser.
                  </video>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
