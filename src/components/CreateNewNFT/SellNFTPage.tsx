import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import styles from './SellNFTPage.module.scss';
import Input from '../Input/Input';
import Select from 'react-select';
import Image from 'next/image';
import 'bootstrap-daterangepicker/daterangepicker.css';
import { useRouter } from 'next/router';
import { Dayoptions } from '../../constants/sell-nft.constants';
import { MintPost } from '../../types/mint';
import { FadeLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import { DoneIcon, ErrorIcon } from '../assets';
import { CustomToastWithLink } from '../CustomToast/CustomToast';
import { createNewSnft, updateSnft } from '../../services/MarketplaceApi';
import { SnftResponse } from '../../types/marketplace';

type SellNFTPageProps = {
  mintDetails: MintPost | null;
  loading: boolean;
  snftDetails: SnftResponse | null;
};

export default function SellNFTPage({
  mintDetails,
  loading,
  snftDetails,
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
  const [collection, setCollection] = React.useState<any>();
  const [amount, setAmount] = React.useState('');
  const [duration, setDuration] = React.useState<any>();
  const [type, setType] = React.useState('Fixed Price');
  const [errors, setErrors] = React.useState({
    collection: '',
    amount: '',
    duration: '',
  });

  useEffect(() => {
    if (snftDetails) {
      const collectionIndex = optionsone.findIndex(
        (option) => snftDetails.collection == option.value
      );

      if (collectionIndex > -1) {
        setCollection({ ...optionsone[collectionIndex] });
      } else {
        setCollection(null);
      }
      const durationIndex = Dayoptions.findIndex(
        (option) => snftDetails.duration == option.value
      );
      if (durationIndex > -1) {
        setDuration({ ...Dayoptions[durationIndex] });
      } else {
        setDuration(null);
      }
      if (snftDetails.amount) {
        setAmount(snftDetails.amount);
      } else {
        setAmount('');
      }
      if (snftDetails.type) {
        setType(snftDetails.type);
      } else {
        setType('Fixed Price');
      }
    }
  }, [snftDetails]);

  const handleCreateSnft = async () => {
    if (mintDetails?.marketplace_listed == 'true') {
      toast.error(
        CustomToastWithLink({
          icon: ErrorIcon,
          title: 'Error',
          description: 'Already listed to marketplace',
          time: 'Now',
        })
      );
      return;
    }
    setErrors({
      collection: '',
      amount: '',
      duration: '',
    });
    if (!collection) {
      setErrors((prev) => {
        return {
          ...prev,
          collection: 'Collection is required',
        };
      });
    }
    if (!amount) {
      setErrors((prev) => {
        return {
          ...prev,
          amount: 'Amount is required',
        };
      });
    }
    if (!duration) {
      setErrors((prev) => {
        return {
          ...prev,
          duration: 'Duration is required',
        };
      });
    }
    if (!duration || !amount || !collection) return;
    setIsLoading(true);
    const newSnft = {
      collection: collection?.value ?? '',
      type,
      amount,
      duration: duration?.value ?? '',
      mintId: mintDetails?.mintId ?? '',
      profileId: mintDetails?.profileId ?? '',
      postId: mintDetails?.postId ?? '',
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
    setCollection(null);
    setAmount('');
    setDuration(null);
    setType('Fixed Price');
    toast.success(
      CustomToastWithLink({
        icon: DoneIcon,
        title: 'Success',
        description: 'Nft Was Created Successfully',
        time: 'Now',
      })
    );
    push('/marketplace');
  };

  const handleUpdateSnft = async () => {
    setErrors({
      collection: '',
      amount: '',
      duration: '',
    });
    if (!collection) {
      setErrors((prev) => {
        return {
          ...prev,
          collection: 'Collection is required',
        };
      });
    }
    if (!amount) {
      setErrors((prev) => {
        return {
          ...prev,
          amount: 'Amount is required',
        };
      });
    }
    if (!duration) {
      setErrors((prev) => {
        return {
          ...prev,
          duration: 'Duration is required',
        };
      });
    }
    if (!duration || !amount || !collection) return;
    setIsLoading(true);
    const updatedSnft = {
      collection: collection?.value ?? '',
      type,
      amount,
      duration: duration?.value ?? '',
      mintId: mintDetails?.mintId ?? '',
    };
    const { error, message }: any = await updateSnft(updatedSnft);
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
    setCollection(null);
    setAmount('');
    setDuration(null);
    setType('Fixed Price');
    toast.success(
      CustomToastWithLink({
        icon: DoneIcon,
        title: 'Success',
        description: 'Nft Was Updated Successfully',
        time: 'Now',
      })
    );
    push('/marketplace');
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
                    style={{ position: 'relative' }}
                    className={`${styles.SelectPrntNftSell} selectprntnft selectprntnftssell`}
                  >
                    <p className={styles.ClctionTxt}>Collection</p>
                    <Select
                      options={optionsone}
                      // menuIsOpen={true}
                      className="select_pernt select_pernt_v2"
                      placeholder="Bring Me the Open Space"
                      classNamePrefix="cntrslct"
                      onChange={(selectedOption) =>
                        //@ts-ignore
                        setCollection(selectedOption)
                      }
                      value={collection}
                    />
                    {!collection && errors.collection && (
                      <span
                        style={{
                          position: 'absolute',
                          bottom: '-2rem',
                          left: '0rem',
                        }}
                        className={styles.errormsg}
                      >
                        {errors.collection}
                      </span>
                    )}
                  </div>
                  <div
                    style={{ position: 'relative' }}
                    className={`${styles.FrstInput} frstinputsell`}
                  >
                    <Input
                      value={amount}
                      type="number"
                      placeholder="0.48"
                      label="Amount"
                      onChange={(e) => setAmount(e.target.value)}
                    />
                    {!amount && errors.amount && (
                      <span
                        className={styles.errormsg}
                        style={{
                          position: 'absolute',
                          bottom: '1rem',
                          left: '0rem',
                          color: 'red',
                        }}
                      >
                        {errors.amount}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div style={{ position: 'relative' }} className={styles.typePrnt}>
                <h1 className={styles.DefHed}>Duration (Days)</h1>
                <div className={styles.Sections}>
                  <Select
                    options={Dayoptions}
                    className={`select_pernt select_pernt_v2 ${styles.options}`}
                    placeholder="Select Duration"
                    classNamePrefix="cntrslct"
                    onChange={(selectedOption) =>
                      //@ts-ignore
                      setDuration(selectedOption)
                    }
                    value={duration}
                  />
                </div>
                {!duration && errors.duration && (
                  <span
                    className={styles.errormsg}
                    style={{
                      position: 'absolute',
                      bottom: '-2rem',
                      left: '0rem',
                    }}
                  >
                    {errors.duration}
                  </span>
                )}
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
                ) : mintDetails?.marketplace_listed == 'true' ? (
                  <a onClick={handleUpdateSnft} className={styles.linkPrnt}>
                    Update Listing
                  </a>
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
                    height={'540px'}
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
