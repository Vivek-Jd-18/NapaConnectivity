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
import {
  // createNewSnft,
  updateSnft
} from '../../services/MarketplaceApi';
import { SnftResponse } from '../../types/marketplace';
import { commanNFTContract } from '@/connectivity/contractObjects/commanNFTContract';
import {
  // approve,
  // getApproved,
  //  transferFrom
} from '@/connectivity/callHelpers/commanNFTCallHandlers';
import useWebThree from '@/hooks/useWebThree';

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
      value: '0',
      label: (
        <div className="cstm_napa_slct">
          <Image src="/img/napa_ic.svg" alt="" width="20px" height="20px" />
          NAPA
        </div>
      ),
    },
    {
      value: '1',
      label: (
        <div className="cstm_napa_slct">
          <Image src="/img/napa_ic.svg" alt="" width="20px" height="20px" />
          USDT
        </div>
      ),
    },
    {
      value: '2',
      label: (
        <div className="cstm_napa_slct">
          <Image src="/img/napa_ic.svg" alt="" width="20px" height="20px" />
          ETH
        </div>
      ),
    },
  ];
  const { push } = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const [currencyType, setCurrencyType] = React.useState<any>();
  const [amount, setAmount] = React.useState('');
  const [duration, setDuration] = React.useState<any>();
  const [type, setType] = React.useState('Fixed Price');
  const [errors, setErrors] = React.useState({
    currencyType: '',
    amount: '',
    duration: '',
  });

  const { address, balance, chainId, signer } = useWebThree();

  useEffect(() => {
    if (snftDetails) {
      const currencyTypeIndex = optionsone.findIndex(
        (option) => snftDetails.currencyType == option.value
      );

      if (currencyTypeIndex > -1) {
        setCurrencyType({ ...optionsone[currencyTypeIndex] });
      } else {
        setCurrencyType(null);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [snftDetails]);

  // const handleCreateSnft = async () => {
  //   if (mintDetails?.marketplace_listed == 'true') {
  //     toast.error(
  //       CustomToastWithLink({
  //         icon: ErrorIcon,
  //         title: 'Error',
  //         description: 'Already listed to marketplace',
  //         time: 'Now',
  //       })
  //     );
  //     return;
  //   }
  //   setErrors({
  //     currencyType: '',
  //     amount: '',
  //     duration: '',
  //   });
  //   if (!currencyType) {
  //     setErrors((prev) => {
  //       return {
  //         ...prev,
  //         currencyType: 'Currency type is required',
  //       };
  //     });
  //   }
  //   if (!amount) {
  //     setErrors((prev) => {
  //       return {
  //         ...prev,
  //         amount: 'Amount is required',
  //       };
  //     });
  //   }
  //   if (!duration) {
  //     setErrors((prev) => {
  //       return {
  //         ...prev,
  //         duration: 'Duration is required',
  //       };
  //     });
  //   }
  //   if (!duration || !amount || !currencyType) return;
  //   setIsLoading(true);
  //   const newSnft = {
  //     currencyType: currencyType?.value ?? '',
  //     type,
  //     amount,
  //     duration: duration?.value ?? '',
  //     mintId: mintDetails?.mintId ?? '',
  //     profileId: mintDetails?.profileId ?? '',
  //     postId: mintDetails?.postId ?? '',
  //   };
  //   const { error, message }: any = await createNewSnft(newSnft);
  //   if (error) {
  //     setIsLoading(false);
  //     toast.error(
  //       CustomToastWithLink({
  //         icon: ErrorIcon,
  //         title: 'Error',
  //         description: message,
  //         time: 'Now',
  //       })
  //     );
  //     return;
  //   }
  //   setIsLoading(false);
  //   setCurrencyType(null);
  //   setAmount('');
  //   setDuration(null);
  //   setType('Fixed Price');
  //   toast.success(
  //     CustomToastWithLink({
  //       icon: DoneIcon,
  //       title: 'Success',
  //       description: 'Nft Was Created Successfully',
  //       time: 'Now',
  //     })
  //   );
  //   push('/marketplace');
  // };

  const handleUpdateSnft = async () => {
    setErrors({
      currencyType: '',
      amount: '',
      duration: '',
    });
    if (!currencyType) {
      setErrors((prev) => {
        return {
          ...prev,
          currencyType: 'Currency type is required',
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
    if (!duration || !amount || !currencyType) return;
    setIsLoading(true);
    const updatedSnft = {
      currencyType: currencyType?.value ?? '',
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
    setCurrencyType(null);
    setAmount('');
    setDuration(null);
    setType('Fixed Price');
    toast.success(
      CustomToastWithLink({
        icon: DoneIcon,
        title: 'Success',
        description: 'SNFT Was Successfully Updated',
        time: 'Now',
      })
    );
    push('/marketplace');
  };


  //web3 functions starts here
  // user will allow his Other NFTs by approving to MarketPlace Contract (LISTING)
  // let id = "104"
  // let contract = "0x20bf1a09c7c7211ead72de3d96bc129cd2bfe743"
  
  const allowMarketToSell = async (tknId: number | string, nftAddress: string): Promise<boolean> => {
    console.log(tknId,nftAddress,"strike")
    let flag = false;
    console.log("you are giving approval to token id:", tknId, await signer, await address, await chainId.toString());
    const commanNFTCtr = await commanNFTContract(signer, nftAddress);
    await commanNFTCtr.approve(nftAddress, tknId).then(async (res: any) => {
      console.log(`You have approved your nft with id: ${tknId}, Wait for the Transaction 'Approval'... `);
      console.log(await res.wait(), "approve to market result");
    }).catch((e: any) => {
      console.log(e, "Error");
    });
    try {
      const checkApproval = await commanNFTCtr.getApproved(tknId);
      console.log(checkApproval, "address which is approved");
      if (checkApproval) {
        flag = true;
      }
    } catch (e) {
      console.log(e, "Error While checking the Approval");
      flag = false
    }
    return flag
  }


  //web3 functions ends here

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
                    className={`${type == 'Time Based Auction' && styles.Active
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
                <h1 className={styles.DefHed}>Price & Currency Type</h1>
                <div className={styles.MixInputPool}>
                  <div
                    style={{ position: 'relative' }}
                    className={`${styles.SelectPrntNftSell} selectprntnft selectprntnftssell`}
                  >
                    <p className={styles.ClctionTxt}>Currency Type</p>
                    <Select
                      options={optionsone}
                      // menuIsOpen={true}
                      className="select_pernt select_pernt_v2"
                      placeholder="Select currency type"
                      classNamePrefix="cntrslct"
                      onChange={(selectedOption) =>
                        //@ts-ignore
                        setCurrencyType(selectedOption)
                      }
                      value={currencyType}
                    />
                    {!currencyType && errors.currencyType && (
                      <span
                        style={{
                          position: 'absolute',
                          bottom: '-2rem',
                          left: '0rem',
                        }}
                        className={styles.errormsg}
                      >
                        {errors.currencyType}
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
                  <button onClick={() => { allowMarketToSell("104", "0x20bf1a09c7c7211ead72de3d96bc129cd2bfe743") }} className={styles.linkPrnt} style={{ backgroundColor: "transparent" }}>Complete Listing</button>
                  // <a onClick={handleCreateSnft} className={styles.linkPrnt}>
                  //   Complete Listing
                  // </a>
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
