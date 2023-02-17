import React, { useState } from 'react'
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import providerOptions from '../utils/web3Configs/providerOptions';
import {
    lazyMint, ethFee as ethFees, NapaMintFee as _NapaMintFee, UsdtMintFee as _UsdtMintFee, lazyMintEth,
    approve, allowance, marketPlace, updatemarketPlaceAddress, setApprovalForAll, buyNftToken, buyNftTokenWithEth,
    nftInfo, setSaleFromWallet, isApprovedForAll, ownerOf, napaTokenAmount, getLatestPrice
} from '../utils/testnet/callHelpers';
import { napaTokenContract, newNapaNftContract, usdtTokenContract, marketPlaceContract } from '../utils/testnet/contractObject';
import { nftAddress, marketPlace as marketPlaceAddress } from '../utils/testnet/addressHelper';

export const MarketPlace = () => {

    const decimals: number = 10 ** 18;
    const otherDecimals: number = 10 ** 10;

    const [_provider, setProvider] = useState<any>()
    const [_signer, setSigner] = useState<any>()
    const [transactionType, setTransactionType] = useState<number | string>()
    const [CurrentWalletAddress, setCurrentWalletAddress] = useState<string>("0")
    const [_ethFee, setEthFee] = useState<string>("0")
    const [conn, setConn] = useState<boolean>(false)
    const [showSpinner, setShowSpinner] = useState<boolean>(false)
    const [tType, setTType] = useState<string>("Other")
    const [btnClass, setBtnClass] = useState<string>("")


    const handleChange1 = (e: any) => {
        setEthFee(e.target.value);
    }

    /**
    function to connect to wallet and get the address
    This is an asynchronous function called "call" that initializes a web3Modal object,
    connects to an Ethereum provider, sets the provider and signer, gets the current wallet address,
    and logs the chain ID and the address. It also sets the connection status and current wallet address
    using the "setConn" and "setCurrentWalletAddress" functions.
    */

    const call = async () => {
        async function connect() {
            const externalProvider = await web3Modal.connect();
            return new ethers.providers.Web3Provider(externalProvider);
        }
        const web3Modal = new Web3Modal({
            network: "mainnet",
            cacheProvider: true,
            providerOptions,
            theme: {
                background: "rgb(39, 49, 56)",
                main: "rgb(199, 199, 199)",
                secondary: "rgb(136, 136, 136)",
                border: "rgba(195, 195, 195, 0.14)",
                hover: "rgb(16, 26, 32)"
            }
        });
        const provider = await connect();
        setProvider(provider)
        const { chainId } = await provider.getNetwork()
        const signer = await provider.getSigner(0);
        setSigner(signer)
        const address = await signer.getAddress();
        if (address) {
            setConn(true)
        }
        setCurrentWalletAddress(address)
    }

    //#1 buynft from market place
    const _buyNftToken = async () => {
        const _tokenId: number = 0;
        console.log("lvl1")
        const isApprovedNft = await doApprovalForMarketContract(CurrentWalletAddress, true);
        const isApprovedTkn = await doApprovalForToken();
        console.log("lvl2")
        const marketCtr: any = await marketPlaceContract(_signer);
        if (Number(transactionType) == 0 && await isApprovedNft && await isApprovedTkn) {
            const buyRes = await buyNftToken(marketCtr, Number(transactionType), _tokenId).then(async (res: any) => {
                await res.wait();
                console.log(await res.wait(), "approve res");
            }).catch((e: any) => {
                console.log(e)
            })
        } else if (Number(transactionType) == 1 && await isApprovedNft && await isApprovedTkn) {
            const buyRes = await buyNftToken(marketCtr, Number(transactionType), _tokenId).then(async (res: any) => {
                await res.wait();
                console.log(await res.wait(), "approve res");
            }).catch((e: any) => {
                console.log(e)
            })
        } else {
            if (await isApprovedNft) {
                const buyRes = await buyNftTokenWithEth(marketCtr, Number(transactionType), _tokenId, { value: "1000000000000000000" }).then(async (res: any) => {
                    await res.wait();
                    console.log(await res.wait(), "approve res");
                }).catch((e: any) => {
                    console.log(e)
                })
            }
        }
    }

    //#2 NFT info
    const _nftInfo = async () => {
        const marketCtr: any[] | unknown = await marketPlaceContract(_signer);
        const _nftInfoRes = await nftInfo(marketCtr, 0);
        console.log("owner", _nftInfoRes[0]);
        console.log("salePrice", _nftInfoRes[1].toString(), "in round digits", Number(_nftInfoRes[1].toString()) / decimals);
        console.log("saleStatus", _nftInfoRes[2]);
        console.log("firstTimeSell", _nftInfoRes[3]);
    }

    //#3 setSale from market place *Working 
    const _setSaleFromWallet = async () => {
        let _tokenId: number = 20;
        let _salePrice: number = 2 * decimals;
        const marketCtr: any = await marketPlaceContract(_signer);
        const _setSaleWltRes = await setSaleFromWallet(marketCtr, _tokenId, _salePrice.toString()).then(async (res: any) => {
            await res.wait();
            console.log(await res.wait(), "awaited _setSaleWltRes");
        }).catch((e: any) => {
            console.log(e)
        })
    }


    //#4 setApprovalForAll;
    const doApprovalForMarketContract = async (_operator: string, _approved: boolean) => {
        const NftCtr: any = await newNapaNftContract(_signer);
        const approveRes = await setApprovalForAll(NftCtr, _operator, _approved).then(async (res: any) => {
            await res.wait();
            console.log(await res.wait(), "approve res");
            return 1;
        }).catch((e: any) => {
            console.log(e);
            return 0;
        })
        return approveRes;
    }

    //#5 checkOwner
    const checkOwner = async () => {
        const NftCtr: any = await newNapaNftContract(_signer);
        let tknId: number = 20;
        const ownerRes = await ownerOf(NftCtr, tknId).then(async (res: any) => {
            console.log(await res, `Owner is ${tknId}`);
        }).catch((e: any) => {
            console.log(e);
        })
    }


    //#6 checkApproval
    const checkApprovalFroMarketContract = async () => {
        const NftCtr: any = await newNapaNftContract(_signer);
        const approveRes = await isApprovedForAll(NftCtr, CurrentWalletAddress, marketPlaceAddress).then(async (res: any) => {
            // await res.wait();
            console.log(await res, "approve res");
        }).catch((e: any) => {
            console.log(e)
        })
    }

    //#7 approve Napa Or Usdt Token
    // This function does the approval for a specific token contract
    const doApprovalForToken: any = async () => {
        const amountToApprove = await calculateTokenAllowance();
        if (transactionType == 0) { // Check if the transaction is for NPA tokens
            const npaTokenctr: any = await napaTokenContract(_signer); // Get the NPA token contract
            console.log(npaTokenctr, "npaTokenctr contract");
            const approveRes = await approve(npaTokenctr, marketPlaceAddress, amountToApprove.toString()); // Call the approve function of the NPA token contract to allow spending of tokens
            console.log(approveRes, "approve response of napa");
            return await approveRes.wait();
        } else if (transactionType == 1) { // Check if the transaction is for USDT tokens
            const usdtTokenctr: any = await usdtTokenContract(_signer); // Get the USDT token contract
            console.log(usdtTokenctr, "usdtTokenctr contract");
            const approveRes = await approve(usdtTokenctr, marketPlaceAddress, amountToApprove.toString()); // Call the approve function of the USDT token contract to allow spending of tokens
            console.log(approveRes, "approve response of usdt");
            return await approveRes.wait();
        } else { // If the transaction is not for tokens, return -1
            console.log("don't need any approval check as you've opted for ether");
            return -1;
        }
    }

    // NapaToken.allowance(msg.sender,address(this))>=(nftInfo[_tokenId].salePrice)/napaTokenAmount,"No NAPATOKEN allowance");
    // (nftInfo[_tokenId].salePrice)/(getLatestPrice()*(10**10))
    const calculateTokenAllowance = async () => {
        const marketCtr: any = await marketPlaceContract(_signer);
        const { salePrice } = await nftInfo(marketCtr, 0);

        if (transactionType == 0 || transactionType == 1) {
            const _napaTokenAmount = await napaTokenAmount(marketCtr);
            const calculatedAmount = await salePrice / await _napaTokenAmount;
            console.log(_napaTokenAmount.toString());
            console.log(await salePrice.toString());
            console.log(calculatedAmount * decimals);
            return calculatedAmount * decimals;
        } else {
            console.log("into else part")
            const _getLatestPrice: number = await getLatestPrice(marketCtr);
            const calculatedAmount = await salePrice / (_getLatestPrice * otherDecimals);
            console.log(calculatedAmount);
            return calculatedAmount * decimals;
        }
    }


    return (
        <>
            <div>MarketPlace</div>
            <div>
                <div className='div'>
                    <br /><br />
                    {CurrentWalletAddress}
                    <br /><br />
                    <button className='btn btn-sm btn-primary' onClick={call}>{conn ? <span style={{ color: "green" }}>Connected</span> : <span style={{ color: "red" }}>Connect</span>}</button>
                    <br /><br />
                    <label>Enter the Currency type</label><br />
                    {transactionType}<br /><br />
                    <label >NAPA Token</label>
                    <input className='ms-1' type='radio' value="NAPA Token" name="tknType" checked={transactionType === '0'} onClick={() => setTransactionType('0')} /><br></br>
                    <label  >USDT Token</label>
                    <input className='ms-1' type='radio' value="USDT Token" name="tknType" checked={transactionType === '1'} onClick={() => setTransactionType('1')} /><br></br>
                    <label >Ether</label>
                    <input className='ms-5' type='radio' value="Ether" name="tknType" checked={transactionType === '2'} onClick={() => setTransactionType('2')} />
                    <br /><br />

                    <button onClick={_buyNftToken} className="btn btn-sm btn-outline-primary m-1" type="button">buyNft FromMarketPlace</button>
                    <button onClick={_nftInfo} className="btn btn-sm btn-outline-warning m-1" type="button">get Nft Info</button>
                    <button onClick={_setSaleFromWallet} className="btn btn-sm btn-outline-warning m-1" type="button">setSale</button>
                    <button onClick={checkApprovalFroMarketContract} className="btn btn-sm btn-outline-primary m-1" type="button">check approval</button>
                    <button onClick={calculateTokenAllowance} className="btn btn-sm btn-outline-primary m-1" type="button">calculateTokenAllowance</button>

                </div>
            </div>
        </>
    )
}
