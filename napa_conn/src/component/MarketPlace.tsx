import React, { useContext, useState } from 'react'
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import providerOptions from '../utils/web3Configs/providerOptions';
import {
    lazyMint, ethFee as ethFees, NapaMintFee as _NapaMintFee, UsdtMintFee as _UsdtMintFee, lazyMintEth,
    approve, allowance, marketPlace, updatemarketPlaceAddress, setApprovalForAll, buyNftToken, buyNftTokenWithEth,
    nftInfo, setSaleFromWallet, isApprovedForAll, ownerOf, napaTokenAmount, getLatestPrice
} from '../utils/testnet/CallHelpers/callHelpers';
import { napaTokenContract, newNapaNftContract, usdtTokenContract, marketPlaceContract } from '../utils/testnet/conractObjects/contractObject';
import { nftAddress, marketPlace as marketPlaceAddress } from '../utils/testnet/addressHelpers/addressHelper';
import { CurrentUserContext } from '../App';

export const MarketPlace = () => {

    const decimals: number = 10 ** 18;
    const otherDecimals: number = 10 ** 10;

    const currentUser = useContext(CurrentUserContext);
    const _provider = currentUser._provider;
    const _signer = currentUser._signer;
    const CurrentWalletAddress = currentUser.CurrentWalletAddress;


    const [transactionType, setTransactionType] = useState<number | string>()
    const [_ethFee, setEthFee] = useState<string>("0")
    const [conn, setConn] = useState<boolean>(false)
    const [showSpinner, setShowSpinner] = useState<boolean>(false)
    const [tType, setTType] = useState<string>("Other")
    const [btnClass, setBtnClass] = useState<string>("")


    const handleChange1 = (e: any) => {
        setEthFee(e.target.value);
    }



    //#1 buynft from market place
    const _buyNftToken = async () => {
        const _tokenId: number = 55;
        console.log("you are buying token :", _tokenId);
        // const isApprovedNft = await doApprovalForMarketContract(CurrentWalletAddress, true);
        const isApprovedTkn = await doApprovalForToken();

        console.log("lvl2")
        const marketCtr: any = await marketPlaceContract(_signer);
        if (Number(transactionType) == 0 && await isApprovedTkn) {
            const buyRes = await buyNftToken(marketCtr, Number(transactionType), _tokenId).then(async (res: any) => {
                await res.wait();
                console.log(await res.wait(), "approve res");
            }).catch((e: any) => {
                console.log(e)
            })
        } else if (Number(transactionType) == 1 && await isApprovedTkn) {
            const buyRes = await buyNftToken(marketCtr, Number(transactionType), _tokenId).then(async (res: any) => {
                await res.wait();
                console.log(await res.wait(), "approve res");
            }).catch((e: any) => {
                console.log(e)
            })
        } else {
            if (true) {
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
        const _nftInfoRes = await nftInfo(marketCtr, 3);
        console.log("owner", _nftInfoRes[0]);
        console.log("salePrice", _nftInfoRes[1].toString(), "in round digits", Number(_nftInfoRes[1].toString()) / decimals);
        console.log("saleStatus", _nftInfoRes[2]);
        console.log("firstTimeSell", _nftInfoRes[3]);
    }

    //#3 setSale from market place *Working 
    const _setSaleFromWallet = async () => {
        let _tokenId: number = 2;
        let _salePrice: number = 1 * decimals;
        const marketCtr: any = await marketPlaceContract(_signer);
        const _setSaleWltRes = await setSaleFromWallet(marketCtr, _tokenId, _salePrice.toString()).then(async (res: any) => {
            await res.wait();
            console.log(await res.wait(), "awaited _setSaleWltRes");
        }).catch((e: any) => {
            console.log(e)
        })
    }


    //#4 setApprovalForAll;
    const doApprovalForMarketContract = async () => {
        const NftCtr: any = await newNapaNftContract(_signer);
        const approveRes = await setApprovalForAll(NftCtr, marketPlaceAddress, true).then(async (res: any) => {
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
        let tknId: number = 2;
        const ownerRes = await ownerOf(NftCtr, tknId).then(async (res: any) => {
            console.log(tknId, `Owner is ${await res}`);
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
        console.log(((amountToApprove * 2).toString()), "token allowance");
        if (transactionType == 0) { // Check if the transaction is for NPA tokens
            const npaTokenctr: any = await napaTokenContract(_signer); // Get the NPA token contract
            console.log(npaTokenctr, "npaTokenctr contract");
            const approveRes = await approve(npaTokenctr, marketPlaceAddress, ((amountToApprove * 2).toString())); // Call the approve function of the NPA token contract to allow spending of tokens
            console.log(approveRes, "approve response of napa");
            return await approveRes.wait();
        } else if (transactionType == 1) { // Check if the transaction is for USDT tokens
            const usdtTokenctr: any = await usdtTokenContract(_signer); // Get the USDT token contract
            console.log(usdtTokenctr, "usdtTokenctr contract");
            const approveRes = await approve(usdtTokenctr, marketPlaceAddress, ((amountToApprove * 2).toString())); // Call the approve function of the USDT token contract to allow spending of tokens
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
        const { salePrice } = await nftInfo(marketCtr, 2);

        if (transactionType == 0 || transactionType == 1) {
            const _napaTokenAmount = await napaTokenAmount(marketCtr);
            const calculatedAmount = await salePrice / await _napaTokenAmount;
            console.log(calculatedAmount * decimals, "total allowance need");
            return calculatedAmount * decimals;
        } else {
            console.log("into else part")
            const _getLatestPrice: number = await getLatestPrice(marketCtr);
            const calculatedAmount = await salePrice / (_getLatestPrice * otherDecimals);
            console.log(calculatedAmount);
            return calculatedAmount * decimals;
        }
    }

    const checkTokenApproval: () => Promise<string> = async () => {

        // Check the transactionType to determine which contract to use
        if (transactionType == 0) {
            // If transactionType is 0, get the NPA token contract using the _signer object
            const npaTokenctr: any = await napaTokenContract(_signer);
            // Get the allowance of the NPA token for the current wallet address and the nftAddress
            const alw1 = await allowance(npaTokenctr, CurrentWalletAddress, marketPlaceAddress)
            // Log the allowance of the NPA token
            console.log(alw1.toString(), "allowance of napa")
            // Return the allowance of the NPA token as a string
            return alw1.toString()
        } else if (transactionType == 1) {
            // If transactionType is 1, get the USDT token contract using the _signer object
            const usdtTokenctr: any = await usdtTokenContract(_signer);
            // Get the allowance of the USDT token for the current wallet address and the nftAddress
            const alw1 = await allowance(usdtTokenctr, CurrentWalletAddress, marketPlaceAddress)
            // Log the allowance of the USDT token
            console.log(alw1.toString(), "allowance of usdt")
            // Return the allowance of the USDT token as a string
            return alw1.toString()
        } else {
            // If transactionType is not 0 or 1, no approval check is needed
            console.log("don't need any approval check");
            // Return -1 to indicate no approval check is needed
            return -1
        }
        // The function is checking the approval status of a token before a transaction can be made on the contract. It first checks the transaction type to determine which token contract to use. If the transaction type is 0, the NPA token contract is used, and if the transaction type is 1, the USDT token contract is used. It then gets the allowance of the token for the current wallet address and the nftAddress, logs the allowance value, and returns the allowance value as a string. If the transaction type is neither 0 nor 1, it logs that no approval check is needed and returns -1.
    }


    return (
        <>
            <div>MarketPlace</div>
            <div>
                <div className='div'>
                    <br /><br />
                    {CurrentWalletAddress}
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
                    <button onClick={checkTokenApproval} className="btn btn-sm btn-outline-primary m-1" type="button">check Token Allwance</button>

                    <button onClick={calculateTokenAllowance} className="btn btn-sm btn-outline-primary m-1" type="button">calculateTokenAllowance</button>
                    <button onClick={checkOwner} className="btn btn-sm btn-outline-primary m-1" type="button">ownerOf</button>
                    <button onClick={doApprovalForMarketContract} className="btn btn-sm btn-outline-primary m-1" type="button">approve NFT to market</button>
                </div>
            </div>
        </>
    )
}
