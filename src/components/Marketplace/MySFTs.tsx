import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import Select from 'react-select';
import 'bootstrap-daterangepicker/daterangepicker.css';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap/dist/css/bootstrap.css';
import moment from 'moment';
import styles from './MySFTs.module.scss';
import Link from 'next/link';

import { commanNFTContract } from '@/connectivity/contractObjects/commanNFTContract';
import {
  // approve,
  getApproved,
  //  transferFrom
} from '@/connectivity/callHelpers/commanNFTCallHandlers';
import axios from 'axios';
import { nftAddress } from '@/connectivity/addressHelpers/addressHelper';
import useProfile from '../../hooks/useProfile';
import useWebThree from '@/hooks/useWebThree';
import { toast } from 'react-toastify';
import { CustomToastWithLink } from '../CustomToast/CustomToast';
import { ErrorIcon } from '../assets';
import { getMySnfts } from '@/services/MarketplaceApi';
import { useRouter } from 'next/router';
import { FadeLoader } from 'react-spinners';

export default function MySFTs(props: any) {
  const { address, balance, chainId, signer } = useWebThree();
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];
  const optionstow = [
    { value: '1', label: 'Price 20 MRP' },
    { value: '2', label: 'Price 250 MRP' },
    { value: '3', label: 'Price 50 MRP' },
  ];
  const optionsthree = [
    { value: '1', label: '20%' },
    { value: '2', label: '50%' },
    { value: '3', label: '100%' },
  ];
  const optionsfour = [
    { value: 'chocolate', label: '4h 32 min' },
    { value: 'strawberry', label: '4h 32 min' },
    { value: 'vanilla', label: '4h 32 min' },
  ];
  const [active, setActive] = React.useState(false);
  const [tokenIds, setTokenIds] = useState<string[]>([])
  const [mySntsData, setMySnftsData] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const {push} = useRouter()

  const [nfts, setNfts] = useState<any[]>([{
    tokenId: "loading..",
    shortContractAddress: "loading..",
    contractAddress: "loading..",
    id: "loading..",
    name: "loading..",
    description: "loading..",
    attributes: "loading..",
    image: "loading..",
    onSold: "loading..",
  }]);
  const { profileId } = useProfile();

  const handleClick = () => {
    setActive(!active);
  };
  const [isActiveTwo, setActiveTwo] = React.useState(false);
  const toggleClass = () => {
    setActiveTwo(!isActiveTwo);
  };
  ///
  const ref: any = useRef(null);
  const { onClickOutside } = props;

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setActive(isActiveTwo);
      }
    };
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onClickOutside]);

  // fetch nfts starts here
  const loadNFTs: () => Promise<object[]> = async () => {
    setLoading(true)
    let newItems: any = [];
    console.log("inside Lead")
    let dt: any = [];
    try {
      const config = {
        method: 'get',
        url: `https://deep-index.moralis.io/api/v2/${address}/nft?chain=goerli&format=decimal`,
        headers: {
          'X-API-Key':
            'D8Kfm2KtjFHVEpqvPmTVgaNLvY8TFEhrIBi8h71wjcTfFIdlmSKFlYJcEGATK8dr',
        },
      };
      let res = await axios(config);
      console.log(res, 'SNFTS');
      await Promise.all(
        res.data.result.map(async (data: any) => {
          let splitted =
            data.token_address.slice(0, 6) +
            '...' +
            data.token_address.slice(38, data.token_address.length);
          // console.log(splitted, "datas")
          let isOnSold = await checkIfApprovedToMarket(
            data.token_id,
            data.token_address
          );
          let contractAddress = data.token_address;
          console.log(
            nftAddress.toUpperCase() == contractAddress.toUpperCase(),
            'onsold1'
          );
          if (nftAddress.toUpperCase() == contractAddress.toUpperCase()) {
            console.log('inside if', data.token_uri);
            let ff = await data.token_uri;
            let meta: any = await axios.get(ff);
            // console.log(meta, "MMM");
            let item = {
              tokenId: await data.token_id,
              shortContractAddress: splitted,
              contractAddress: data.token_address,
              id: await meta.data.id,
              name: await meta.data.name,
              description: await meta.data.description,
              attributes: await meta.data.attributes,
              image: await meta.data.image,
              onSold: isOnSold,
            };
            newItems.push(item);
            console.log(newItems, "AAA");
          } else {
            console.log(
              data.token_address,
              `the nft with id ${data.token_id} is not for SNFT`
            );
          }
        })
      );
      console.log(newItems, "all Items");
    } catch (e) {
      console.log(e);
    }
    setNfts(newItems);
    const tknIds = newItems.map((item:any)=>item.tokenId)
    setTokenIds(tknIds)
    return dt;
  };

  const handleGetMySnftsFromWeb2 = async () => {
    const { data, error, message }: any = await getMySnfts(tokenIds);
    if (error) {
      setLoading(false);
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
    setMySnftsData(data?.data || []);
    setLoading(false);
  }

  useEffect(()=>{
   if(tokenIds.length)
   {
    handleGetMySnftsFromWeb2()
   }
  },[tokenIds])

  useEffect(() => {
    if (profileId) {
      console.log(nfts, "AAA")
      loadNFTs();
    }
  }, [profileId]);

  const checkIfApprovedToMarket = async (tknId: number, nftAddress: string) => {
    let flag: boolean = false;
    const commanNFTCtr = await commanNFTContract(signer, nftAddress);
    await getApproved(commanNFTCtr, tknId)
      .then(async (res) => {
        if (res.startsWith('0x0000000')) {
          console.log('status');
          flag = false;
        } else {
          flag = true;
        }
      })
      .catch((e: any) => {
        console.log(e, 'Error');
        return false;
      });
    return flag;
  };

  // user will allow his Other NFTs by approving to MarketPlace Contract (LISTING)
  // const allowMarketToSell = async (tknId: number, nftAddress: string) => {
  //   console.log('you are giving approval to token id:', tknId);
  //   const commanNFTCtr = await commanNFTContract(signer, nftAddress);
  //   await approve(commanNFTCtr, nftAddress, tknId)
  //     .then(async (res) => {
  //       console.log(
  //         `You have approved your nft with id: ${tknId}, Wait for the Transaction 'Approval'... `
  //       );
  //       console.log(await res.wait());
  //     })
  //     .catch((e: any) => {
  //       console.log(e, 'Error');
  //     });
  // };

  // users NFTs will be sold by MarketPlace Contract only if allowed(NFT BUY FROM MarketPlace)
  // const _transferFrom = async () => {
  //   const nftAddress: string = "";
  //   const receiver = "";
  //   const newTokenID = 1;
  //   const { signer }: any = await call()
  //   const commanNFTCtr = await commanNFTContract("", signer);
  //   await transferFrom(commanNFTCtr, nftAddress, receiver, newTokenID).then(async (res: any) => {
  //     console.log("Wait for Transaction 'Approval'... ");
  //     console.log(await res.wait());
  //   }).catch((e: any) => {
  //     console.log(e, "Error");
  //   });
  // }

  // fetch NFTs working ends

  return (
    <>
      <div className={styles.tipandtotolmain}>
        <div className="select_main select_main_NFT slectmainmargnsmll slectmainmargnsmlltwo">
          <Select
            options={options}
            // menuIsOpen={true}
            className="select_pernt slctrspnsv"
            placeholder="Project"
            classNamePrefix="cntrslct"
          />
          <Select
            options={optionsthree}
            // menuIsOpen={true}
            className="select_pernt slctrspnsv"
            placeholder="Price (from low)"
            classNamePrefix="cntrslct"
          />
          <div className="datepickerBox">
            <DateRangePicker
              initialSettings={{
                singleDatePicker: true,
                showDropdowns: true,
                maxYear: parseInt(moment().format('YYYY'), 10),
                opens: 'left',
              }}
            >
              <input
                type="text"
                className="form-control"
                placeholder="End Date"
              />
            </DateRangePicker>
          </div>
          <Select
            options={optionsfour}
            // menuIsOpen={true}
            className="select_pernt"
            placeholder="Time"
            classNamePrefix="cntrslct"
          />
          <Select
            options={optionstow}
            // menuIsOpen={true}
            className="select_pernt slctrspnsv"
            placeholder="Rating"
            classNamePrefix="cntrslct"
          />
        </div>

        <div className={styles.AnyObjects}>
          <button className={styles.FilterButton} onClick={handleClick}>
            Filters
          </button>
        </div>
        <div
          className={
            active
              ? `${styles.FilterBox} ${styles.active}`
              : `${styles.FilterBox}`
          }
        >
          <button className={styles.ExitButton} onClick={handleClick}>
            <Image src="/img/exit_icon.svg" alt="" width="24px" height="24px" />
          </button>
          <div className={`${styles.MobileDatpcker} MobileDatpckertips`}>
            <div className="select_main">
              <Select
                options={options}
                // menuIsOpen={true}
                className="select_pernt slctrspnsv"
                placeholder="Project"
                classNamePrefix="cntrslct"
              />
              <Select
                options={optionsthree}
                // menuIsOpen={true}
                className="select_pernt slctrspnsv"
                placeholder="Price (from low)"
                classNamePrefix="cntrslct"
              />
              <div className="datepickerBox">
                <DateRangePicker
                  initialSettings={{
                    singleDatePicker: true,
                    showDropdowns: true,
                    maxYear: parseInt(moment().format('YYYY'), 10),
                    opens: 'left',
                  }}
                >
                  <input
                    type="text"
                    className="form-control"
                    placeholder="End Date"
                  />
                </DateRangePicker>
              </div>
              <Select
                options={optionsfour}
                // menuIsOpen={true}
                className="select_pernt slctrspnsv"
                placeholder="Time"
                classNamePrefix="cntrslct"
              />
              <Select
                options={optionstow}
                // menuIsOpen={true}
                className="select_pernt slctrspnsv"
                placeholder="Rating"
                classNamePrefix="cntrslct"
              />
            </div>
          </div>
        </div>
        <div className={styles.buttonperntAj}>
          <div
            className={
              isActiveTwo
                ? `${styles.PstnBtnEnter} ${styles.Active}`
                : `${styles.PstnBtnEnter}`
            }
          >
            <input type="text" placeholder="Enter name or eth address.." />
          </div>
          <button onClick={toggleClass}>
            <Image
              src="/img/search_icon_aj.svg"
              alt=""
              height="24px"
              width="24px"
              className=""
            />
          </button>
          {/* <button className={styles.marginPrnt}><Image src='/img/grid_ic_light.svg' alt='' height="24px" width="24px" className='' /></button>
                        <button><Image src='/img/grid_ic_dark.svg' alt='' height="24px" width="24px" className='' /></button> */}
          <button className={styles.CreateNFTBtn}>
            <Link href="/create-new-snft">
              <a>Create New SNFT</a>
            </Link>
          </button>
          {/* pstnbx */}
          <div className={styles.PstnSetBxMain}>
            <div
              className={
                isActiveTwo
                  ? `${styles.ScrollPstn} ${styles.Active}`
                  : `${styles.ScrollPstn}`
              }
            >
              <div className={styles.PositionProject}>
                <div className={styles.ProjectPsnIn}>
                  <div className={styles.UpScPstn}>
                    <p>Projects</p>
                  </div>
                  <div className={styles.FuturisticFierceBx}>
                    <div className={styles.FuturisticFsrst}>
                      <Image
                        src="/img/pstnfrst01.png"
                        height="48px"
                        width="48px"
                        alt=""
                        className=""
                      />
                      <div className={styles.FuturisticText}>
                        <h6>
                          Futuristic<span>Fierce</span>
                        </h6>
                        <p>8,213 items</p>
                      </div>
                    </div>
                    <div className={styles.Last24Text}>
                      <Image
                        src="/img/napa_ic.svg"
                        height="20px"
                        width="20px"
                        alt=""
                        className=""
                      />
                      <h5>0.24</h5>
                    </div>
                  </div>
                  <div className={styles.FuturisticFierceBx}>
                    <div className={styles.FuturisticFsrst}>
                      <Image
                        src="/img/pstnfrst02.png"
                        height="48px"
                        width="48px"
                        alt=""
                        className=""
                      />
                      <div className={styles.FuturisticText}>
                        <h6>
                          <span>Man in</span> Futuristic
                        </h6>
                        <p>2,347 items</p>
                      </div>
                    </div>
                    <div className={styles.Last24Text}>
                      <Image
                        src="/img/napa_ic.svg"
                        height="20px"
                        width="20px"
                        alt=""
                        className=""
                      />
                      <h5>1.03</h5>
                    </div>
                  </div>
                </div>
                {/* secnd */}
                <div className={styles.ProjectPsnIn}>
                  <div className={styles.UpScPstn}>
                    <p>Items</p>
                  </div>
                  <div className={styles.FuturisticFierceBx}>
                    <div className={styles.FuturisticFsrst}>
                      <Image
                        src="/img/pstnfrst03.png"
                        height="48px"
                        width="48px"
                        alt=""
                        className=""
                      />
                      <div className={styles.FuturisticText}>
                        <h6>
                          Futuristic <span>Spaces</span>
                        </h6>
                        <p>Ending In 5h 44 min</p>
                      </div>
                    </div>
                    <div className={styles.Last24Text}>
                      <Image
                        src="/img/napa_ic.svg"
                        height="20px"
                        width="20px"
                        alt=""
                        className=""
                      />
                      <h5>3.14</h5>
                    </div>
                  </div>
                  <div className={styles.FuturisticFierceBx}>
                    <div className={styles.FuturisticFsrst}>
                      <Image
                        src="/img/pstnfrst04.png"
                        height="48px"
                        width="48px"
                        alt=""
                        className=""
                      />
                      <div className={styles.FuturisticText}>
                        <h6>
                          <span>Horizont</span> Futuristic
                        </h6>
                        <p>Ending In 2h 22 min</p>
                      </div>
                    </div>
                    <div className={styles.Last24Text}>
                      <Image
                        src="/img/napa_ic.svg"
                        height="20px"
                        width="20px"
                        alt=""
                        className=""
                      />
                      <h5>3.16</h5>
                    </div>
                  </div>
                </div>
                {/* lstOne */}
                <div className={styles.ProjectPsnIn}>
                  <div className={styles.UpScPstn}>
                    <p>Projects</p>
                  </div>
                  <div className={styles.FuturisticFierceBx}>
                    <div className={styles.FuturisticFsrst}>
                      <Image
                        src="/img/pstnfrst01.png"
                        height="48px"
                        width="48px"
                        alt=""
                        className=""
                      />
                      <div className={styles.FuturisticText}>
                        <h6>
                          Futuristic<span>Fierce</span>
                        </h6>
                        <p>8,213 items</p>
                      </div>
                    </div>
                    <div className={styles.Last24Text}>
                      <Image
                        src="/img/napa_ic.svg"
                        height="20px"
                        width="20px"
                        alt=""
                        className=""
                      />
                      <h5>0.24</h5>
                    </div>
                  </div>
                  <div className={styles.FuturisticFierceBx}>
                    <div className={styles.FuturisticFsrst}>
                      <Image
                        src="/img/pstnfrst02.png"
                        height="48px"
                        width="48px"
                        alt=""
                        className=""
                      />
                      <div className={styles.FuturisticText}>
                        <h6>
                          <span>Man in</span> Futuristic
                        </h6>
                        <p>2,347 items</p>
                      </div>
                    </div>
                    <div className={styles.Last24Text}>
                      <Image
                        src="/img/napa_ic.svg"
                        height="20px"
                        width="20px"
                        alt=""
                        className=""
                      />
                      <h5>1.03</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* pstnbx */}
        </div>
      </div>

      {/* <div className={styles.scrollPernt}>
        <div className={styles.CustomGridContainer}>
          <div className={styles.CustomGrid}>
            <div className={styles.TipsTulsOverlay}>
              <div className={styles.boxinnrcont}>
                <Link href="#">
                  <a href="#" className={`${styles.apernt} hovereffect`}>
                    <Image
                      src="/img/nft_01.png"
                      height="372px"
                      width="282px"
                      alt=""
                      className="evmtimg"
                    />
                    <div className={styles.upCont}>
                                                <Image
                                                    src="/img/feed_small_img01.png"
                                                    height="40px"
                                                    width="40px"
                                                    alt=""
                                                    className=""
                                                />
                                                <p>@DorothyMccoy</p>
                                            </div>
                    <div className={styles.downCont}>
                      <h3>Futuristic Fierce Radiant Cube</h3>
                      <div className={styles.flexPernt}>
                        <div className={styles.currentBit}>
                          <h5>Current Bid</h5>
                          <div className={styles.txtimgFlex}>
                            <Image
                              src="/img/etherium_ic.svg"
                              height="24px"
                              width="24px"
                              alt=""
                              className=""
                            />
                            <p>0.36 ETH</p>
                          </div>
                        </div>
                        <div className={styles.endingIn}>
                          <p>Ending In</p>
                          <h3>1h 45 min</h3>
                        </div>
                      </div>
                    </div>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      <div className={styles.scrollPernt}>
        {loading ? (
          <div className={styles.loaderContainer}>
            <FadeLoader color="#ffffff" />
          </div>
        ) : mySntsData?.length ? (
          <div className={styles.CustomGridContainer}>
            {mySntsData.map((snft, index) => {
              return (
                <div key={index} className={styles.CustomGrid}>
                  <div
                    onClick={() => push(`snft-details?id=${snft.snftId}`)}
                    className={styles.TipsTulsOverlay}
                  >
                    <div className={styles.boxinnrcont}>
                      {/* <Link href=""> */}
                      <a href="" className={`${styles.apernt} hovereffect`}>
                        <Image
                          src={`${snft.thumbnail}`}
                          height="372px"
                          width="282px"
                          alt=""
                          className="evmtimg"
                        />
                        <div className={styles.upCont}>
                          <Image
                            style={{ borderRadius: '50px' }}
                            src={`${
                              snft.userImage
                                ? snft.userImage
                                : '/assets/images/img_avatar.png'
                            }`}
                            height="40px"
                            width="40px"
                            alt=""
                            className=""
                          />
                          <p>@{snft.userName}</p>
                        </div>
                        <div className={styles.downCont}>
                          <h3>{snft.SNFTTitle}</h3>
                          <div className={styles.flexPernt}>
                            <div className={styles.currentBit}>
                              <h5>Current Bid</h5>
                              <div className={styles.txtimgFlex}>
                                <Image
                                  src="/img/etherium_ic.svg"
                                  height="24px"
                                  width="24px"
                                  alt=""
                                  className=""
                                />
                                <p>{snft.amount}</p>
                              </div>
                            </div>
                            <div className={styles.endingIn}>
                              <p>Ending In</p>
                              <h3>{snft.duration}</h3>
                            </div>
                          </div>
                        </div>
                      </a>
                      {/* </Link> */}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className={styles.messageContainer}>
            <h3>No Data Found</h3>
          </div>
        )}
      </div>
    </>
  );
}
