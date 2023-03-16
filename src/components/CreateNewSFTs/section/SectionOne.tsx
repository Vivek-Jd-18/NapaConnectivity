import React from 'react';
import styles from './SectionOne.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { SnftResponse } from '../../../types/marketplace';
import { buySnft, deleteSnft, pinToIPFS } from '../../../services/MarketplaceApi';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { CustomToastWithLink } from '../../../components/CustomToast/CustomToast';
import { DoneIcon, ErrorIcon } from '../../../components/assets';
import { FadeLoader } from 'react-spinners';
// import {
//   LazyFunction,
// } from '../../../connectivity/mainFunctions/Functions';
import {
  _setSaleFromWallet,
  _buyNftToken,
  _nftInfo,
} from '../../../connectivity/mainFunctions/marketFunctions';
import { createNewTransaction } from '../../../services/Transaction';
import useWebThree from '@/hooks/useWebThree';
import {
  marketPlaceContract,
  napaTokenContract,
  newNapaNftContract,
  usdtTokenContract,
} from '@/connectivity/contractObjects/contractObject1';
import {
  marketPlace,
  nftAddress,
} from '@/connectivity/addressHelpers/addressHelper';
import {
  approve,
  ethFee as ethFees,
  lazyMint,
  lazyMintEth,
  UsdtMintFee as _UsdtMintFee,
  NapaMintFee as _NapaMintFee,
  napaTokenAmount,
  nftInfo,
  getLatestPrice,
  buyNftToken,
  buyNftTokenWithEth,
} from '@/connectivity/callHelpers/callHelper1';
import useProfile from '@/hooks/useProfile';
// import { decimals } from '@/connectivity/callHelpers/napaTokenCallHandlers';

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

  const { address, balance, chainId, signer } = useWebThree();
  console.log(address, balance, chainId, signer);
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

  const handleNewTransaction = async (data: any) => {
    const { error, message }: any = await createNewTransaction(data);
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
  };

  const handleBuySnft = async (id: string) => {
    const { error, message }: any = await buySnft(id);
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
    router.push(
      {
        pathname: '/marketplace',
        query: { redirect: 'MySNFTs' },
      },
      '/marketplace'
    );
  };

  //connectivity functions starts here

  //1 for approval of tokens
  const doApproval: any = async (
    amt: string,
    transactionType: number | string
  ) => {
    if (transactionType == 0) {
      // Check if the transaction is for NPA tokens
      const npaTokenctr: any = await napaTokenContract(signer); // Get the NPA token contract
      console.log(npaTokenctr, 'npaTokenctr contract');
      console.log('isInString', amt);
      try {
        const alw1 = await approve(npaTokenctr, nftAddress, amt.toString()); // Call the approve function of the NPA token contract to allow spending of tokens
        console.log(await alw1.wait(), 'allowance of napa is in progress');
        return alw1;
      } catch (e) {
        console.log(e, 'approval error');
      }
    } else if (transactionType == 1) {
      // Check if the transaction is for USDT tokens
      const usdtTokenctr: any = await usdtTokenContract(signer); // Get the USDT token contract
      console.log(usdtTokenctr, 'usdtTokenctr contract');
      try {
        const alw1 = await approve(usdtTokenctr, nftAddress, amt.toString()); // Call the approve function of the USDT token contract to allow spending of tokens
        console.log(await alw1.wait(), 'allowance of usdt is in progress');
        return alw1;
      } catch (e) {
        console.log(e, 'approval error');
      }
    } else {
      // If the transaction is not for tokens, return -1
      console.log("don't need any approval check as you've opted for ether");
      return -1;
    }
  };

  //2 Main LazyMint function
  const LazyFunction = async (
    _tokenId: number,
    _supposedSeller: string,
    _ethFee: string,
    typeOfTransaction: number | string,
    _tokenUri: string,
    _transferToNapa: boolean,
    _setSaleMinter: boolean
  ) => {
    // get NftCtr instance from newNapaNftContract function
    const NftCtr: any = await newNapaNftContract(signer);
    // console.log(await NftCtr, "nannananananana")
    // const supposedSeller: string = '0x20845c0782D2279Fd906Ea3E3b3769c196032C46';

    try {
      if (typeOfTransaction == 0) {
        console.log('inside1 ');
        // Get additional Napa token fee for minting NFT
        let additional: any = await _NapaMintFee(NftCtr);
        let convertedEthFee: any = _ethFee;
        console.log(_ethFee, '_ethFeeeeeeeeeeeee');
        // Calculate the total fee by adding the additional fee and eth fee
        const hit =
          Number(Number(_ethFee)) + Number(additional.toString());
        console.log(hit, 'new hit');
        console.log("HIER", hit);
        // Check if total fee is greater than the provided eth fee
        if (hit > convertedEthFee) {
          // If yes, do token approval for Napa token and then mint NFT
          await doApproval(hit.toString(), typeOfTransaction)
            .then(async function checkApproval(res: any) {
              const mainRes = await res.wait();
              if (await mainRes) {
                const _lazy = await lazyMint(
                  NftCtr,
                  _tokenId,
                  _supposedSeller,
                  hit.toString(),
                  typeOfTransaction,
                  _tokenUri,
                  _transferToNapa,
                  _setSaleMinter
                );
                const _lazyRes = await _lazy.wait();
                console.log(await _lazyRes, '_lazy response');
              } else {
                console.log('waiting for confirmation');
                checkApproval(res);
              }
            })
            .catch((e: any) => {
              console.log('Unknown error occured :', e);
              toast.error(
                CustomToastWithLink({
                  icon: ErrorIcon,
                  title: 'Error',
                  description: e.error.message,
                  time: 'Now',
                })
              );
            });
        }
      } else if (typeOfTransaction == 1) {
        // Get additional USDT fee for minting NFT
        console.log('inside 2 ');
        // Get additional Napa token fee for minting NFT
        let additional: any = await _UsdtMintFee(NftCtr);
        let convertedEthFee: any = _ethFee;
        console.log(_ethFee, '_eth Feeeeeeeeeeeee');
        // Calculate the total fee by adding the additional fee and eth fee
        const hit = Number(Number(_ethFee)) + Number(additional.toString());
        console.log(hit, 'new hit');

        // Check if total fee is greater than the provided eth fee
        if (hit > convertedEthFee) {
          // If yes, do token approval for Napa token and then mint NFT
          await doApproval(hit.toString(), typeOfTransaction)
            .then(async function checkApproval(res: any) {
              const mainRes = await res.wait();
              console.log(mainRes, 'approval response');
              if (await mainRes) {
                const _lazy = await lazyMint(
                  NftCtr,
                  _tokenId,
                  _supposedSeller,
                  hit.toString(),
                  1,
                  _tokenUri,
                  _transferToNapa,
                  _setSaleMinter
                );
                const _lazyRes = await _lazy.wait();
                console.log(await _lazyRes, '_lazy response');
              } else {
                console.log('waiting for confirmation');
                checkApproval(res);
              }
            })
            .catch((e: any) => {
              console.log('Unknown error occured :', e);
              toast.error(
                CustomToastWithLink({
                  icon: ErrorIcon,
                  title: 'Error',
                  description: e.error.message,
                  time: 'Now',
                })
              );
            });
        }
      } else {
        // Calculate total fee for eth minting
        const etherFee = await ethFees(NftCtr);
        let hit = Number(Number(_ethFee)) + Number(etherFee.toString());
        console.log(_ethFee, etherFee.toString(), hit.toFixed(9), 'Problem');
        // Mint NFT with eth
        const _lazy = await lazyMintEth(
          NftCtr,
          _tokenId,
          _supposedSeller,
          hit.toString(),
          2,
          'www.ww.com',
          false,
          false,
          { value: hit.toString() }
        );
        console.log('Hang on Lazymint with ETH is in process...');
        const _lazyRes = await _lazy.wait();
        console.log(await _lazyRes, 'Successful Lazymint with ETH ');
      }
    } catch (e: any) {
      console.log(e.code, e.message, 'caught');
    }
  };

  //3 buynft from market place
  const _buyNftTokenFromMarket = async (
    transactionType: number | string,
    _tokenId: number | string,
    amount: string | number
  ) => {
    console.log('you are buying token :', _tokenId);
    const isApprovedTkn = await doApprovalForToken(transactionType, _tokenId);

    console.log('lvl2');
    const marketCtr: any = await marketPlaceContract(signer);
    if (Number(transactionType) == 0 && (await isApprovedTkn)) {
      console.log('buy from market in NAPA');
      await buyNftToken(marketCtr, 0, _tokenId)
        .then(async (res: any) => {
          const response = await res.wait();
          console.log(await response, 'buyNftToken res');
        })
        .catch((e: any) => {
          console.log(e);
          toast.error(
            CustomToastWithLink({
              icon: ErrorIcon,
              title: 'Error',
              description: e.error.message,
              time: 'Now',
            })
          );
        });
    } else if (Number(transactionType) == 1 && (await isApprovedTkn)) {
      console.log('buy from market in USDT');
      await buyNftToken(marketCtr, Number(transactionType), _tokenId)
        .then(async (res: any) => {
          const response = await res.wait();
          console.log(await response, 'buyNftToken res');
        })
        .catch((e: any) => {
          console.log(e);
          toast.error(
            CustomToastWithLink({
              icon: ErrorIcon,
              title: 'Error',
              description: e.error.message,
              time: 'Now',
            })
          );
        });
    } else {
      let valInEth = await calculateTokenAllowance(2, _tokenId);
      console.log(valInEth, 'valInEth');
      if (isApprovedTkn) {
        console.log('in to the ether put my stress right now');
        await buyNftTokenWithEth(marketCtr, Number(transactionType), _tokenId, {
          value: amount.toString(),
        })
          .then(async (res: any) => {
            const response = await res.wait();
            console.log(response, 'approve res');
          })
          .catch((e: any) => {
            console.log(e);
            toast.error(
              CustomToastWithLink({
                icon: ErrorIcon,
                title: 'Error',
                description: e.error.message,
                time: 'Now',
              })
            );
          });
      }
    }
  };

  //4 approve Napa Or Usdt Token
  // This function does the approval for a specific token contract
  const doApprovalForToken: any = async (
    transactionType: number,
    tokenId: string | number
  ) => {
    console.log('gg', tokenId);
    const amountToApprove: any = await calculateTokenAllowance(
      transactionType,
      tokenId
    );
    console.log((amountToApprove * 2).toString(), 'token allowance');
    if (transactionType == 0) {
      // Check if the transaction is for NPA tokens
      const npaTokenctr: any = await napaTokenContract(signer); // Get the NPA token contract
      console.log(npaTokenctr, 'npaTokenctr contract');
      const approveRes = await approve(
        npaTokenctr,
        marketPlace,
        (amountToApprove * 2).toString()
      ); // Call the approve function of the NPA token contract to allow spending of tokens
      console.log(approveRes, 'approve response of napa');
      return await approveRes.wait();
    } else if (transactionType == 1) {
      // Check if the transaction is for USDT tokens
      const usdtTokenctr: any = await usdtTokenContract(signer); // Get the USDT token contract
      console.log(usdtTokenctr, 'usdtTokenctr contract');
      const approveRes = await approve(
        usdtTokenctr,
        marketPlace,
        (amountToApprove * 2).toString()
      ); // Call the approve function of the USDT token contract to allow spending of tokens
      console.log(approveRes, 'approve response of usdt');
      return await approveRes.wait();
    } else {
      // If the transaction is not for tokens, return -1
      console.log("don't need any approval check as you've opted for ether");
      return -1;
    }
  };

  //5 calculates token allowance for each type
  const calculateTokenAllowance = async (
    transactionType: number,
    toknId: string | number
  ) => {
    // console.log(toknId),"gg";
    const decimals: number = 10 ** 18;
    const otherDecimals: number = 10 ** 10;
    const marketCtr: any = await marketPlaceContract(signer);
    const { salePrice } = await nftInfo(marketCtr, toknId.toString());
    console.log(salePrice.toString(), 'mysale', toknId);
    if (transactionType == 0 || transactionType == 1) {
      const _napaTokenAmount = await napaTokenAmount(marketCtr);
      const calculatedAmount = (await salePrice) / (await _napaTokenAmount);
      console.log(calculatedAmount * decimals, 'total allowance need');
      return calculatedAmount * decimals;
    } else {
      console.log('into ethers part');
      const _getLatestPrice: number = await getLatestPrice(marketCtr);
      console.log(_getLatestPrice.toString(), '_getLatestPrice aa');
      const calculatedAmount: number =
        (await salePrice) / (_getLatestPrice * otherDecimals);
      console.log(salePrice.toString(), 'salePrice');
      console.log(calculatedAmount, 'calculated');
      return calculatedAmount.toFixed(18);
    }
  };

  const handleCpmpleteTransactionTable = async (data: any) => {
    console.log('web2');
    const newTransaction = {
      sellerWallet: data?.to ? data?.to : '',
      buyerWallet: data?.from ? data?.from : '',
      type: 'SNFT',
      itemId: snftDetails?.snftId,
      amount: snftDetails?.amount,
      currencyType: snftDetails?.currencyType,
      status: '1',
      txId: data?.transactionHash ? data?.transactionHash : '',
      contractAddress: nftAddress,
      tokenId: snftDetails?.tokenId,
      wallet: 'metamask',
      profileId: profileDetails?.profileId,
      owner: data?.from ? data?.from : '',
    };
    await handleNewTransaction(newTransaction);
    await handleBuySnft(snftDetails?.snftId as string);
    setLoading(false);
  };

  //6 lazy mint connectivity function
  const lazyMintHandler = async (data: any) => {
    const tokenId = data.tokenId.toString();
    const transactionType = data.currencyType;
    console.log(data.currencyType.toString(), 'LLL');

    const _amount = (Number(data.amount) * (10 ** 18)).toString();
    console.log(_amount, "AMOUNTT");

    console.log('changes appeared', signer, address, data);
    const NFTCtr = await newNapaNftContract(signer);
    // data.tokenId.toString()
    let isNFTAvailable;

    try {
      isNFTAvailable = await NFTCtr.exists(tokenId);
      console.log(isNFTAvailable, "is nft Exists");
    } catch (e) {
      console.log(e, "NOW it will go to Lazymint")
    }
    console.log('NFT AVAILABILITY', isNFTAvailable);
    if (isNFTAvailable) {
      let val = data.tokenId.toString();
      console.log('NFT exists', val);
      // alert("You are buying from market");
      console.log('You are buying from market');
      setLoading(true);
      _buyNftTokenFromMarket(transactionType, val, _amount);
    } else {
      console.log("NFT exists");
      // alert(`You are buying by Lazymint ${transactionType}`);
      console.log(`You are buying by Lazymint ${transactionType}`);
      const metadataUrl = await generateIPFS();
      console.log("Metadata Url:", metadataUrl);
      try {
        setLoading(true);
        await LazyFunction(
          tokenId,
          data.accountId,
          _amount,
          transactionType,
          metadataUrl,
          false,
          false
        )
          .then(async (res: any) => {
            console.log('hang on lazyint is in progress...');
            console.log(await res.wait(), 'lazymint response');
            handleCpmpleteTransactionTable(res);
          })
          .catch((e: any) => {
            console.log(e, 'Error While Lazymint');
          });
      } catch (e) {
        console.log('error :', e);
      }
    }
  };

  //7 IPFS url maker
  const { profileDetails } = useProfile()
  const generateIPFS = async () => {
    console.log("generating IPFS ... ")
    const data = {
      thumbnail: snftDetails?.thumbnail,
      videoURL: snftDetails?.videoURL,
      id: snftDetails?.snftId,
      userName: profileDetails?.profileName,
      avatar: profileDetails?.avatar,
      description: snftDetails?.SNFTDescription,
      title: snftDetails?.SNFTTitle
    }
    const result = await pinToIPFS(data)
    const mainUrl: any = await result.data.data.IpfsHashURL
    console.log("pinToIPFS result", mainUrl);
    return mainUrl
  }


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

  // marketPlace BuyFunction to buyNFT by marketPlace('Should be called by Buyer')
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
            <h1>{snftDetails?.SNFTTitle}</h1>
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
                <p>Current Price</p>
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
                  <Link href={`${snftDetails?.listed == '2' ? '' : `/list-item?id=${router?.query?.id}`}`}>
                    <a
                      className={`${styles.linkPernt} ${
                        snftDetails?.listed == '2' && styles.disabled
                      }`}
                    >
                      Edit
                    </a>
                  </Link>
                )}
                {profileId == snftDetails?.profileId &&
                  snftDetails?.listed == '1' && (
                    <Link href="">
                      <a
                        onClick={handleDeleteSnft}
                        className={styles.linkPernt}
                      >
                        Delist
                      </a>
                    </Link>
                  )}
                {profileId == snftDetails?.profileId &&
                  snftDetails?.listed == '0' && (
                    <a
                      href="javascript:void(0);"
                      onClick={() =>
                        router.push(`/list-item?id=${router?.query?.id}`)
                      }
                      className={styles.linkPernt}
                    >
                      Sell
                    </a>
                  )}
                {profileId != snftDetails?.profileId && (
                  <Link href="/">
                    <a
                      className={`${styles.linkPernt} ${snftDetails?.listed == '2' && styles.disabled
                        }`}
                    >
                      Submit Offer
                    </a>
                  </Link>
                )}
                {profileId != snftDetails?.profileId && (
                  <a
                    href="javascript:void(0);"
                    className={`${styles.linkPernt} ${snftDetails?.listed == '2' && styles.disabled
                      }`}
                    onClick={() => {
                      if (snftDetails?.listed == '2') {
                        return;
                      }
                      lazyMintHandler(snftDetails);
                    }}
                  >
                    {snftDetails?.listed == '2'
                      ? 'Sold'
                      : `Buy Now for ${snftDetails?.amount}  ${snftDetails?.currencyType == '0'
                        ? 'NAPA'
                        : snftDetails?.currencyType == '1'
                          ? 'USDT'
                          : 'ETH'
                      }`}
                  </a>
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
