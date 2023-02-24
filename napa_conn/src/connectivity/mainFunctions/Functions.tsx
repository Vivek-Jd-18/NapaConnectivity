import React, { useState } from 'react'
import { ethers } from "ethers";
import { useContext } from "react";
import Web3Modal from "web3modal";
import providerOptions from '../providers/providerOptions';

import { lazyMint, ethFee as ethFees, NapaMintFee as _NapaMintFee, UsdtMintFee as _UsdtMintFee, lazyMintEth, approve, allowance, marketPlace, updatemarketPlaceAddress, currentTokenId } from '../callHelpers/callHelper1';
import { napaTokenContract, newNapaNftContract, usdtTokenContract } from '../contractObjects/contractObject1';
import { nftAddress, marketPlace as marketPlaceAddress } from '../addressHelpers/addressHelper';


// export const Functions = () => {

//     const [transactionType, setTransactionType] = useState<number | string>(0)
//     const [currentToken, setCurrentToken] = useState<number>()


//     const [_provider, setProvider] = useState<any>()
//     const [_signer, setSigner] = useState<any>()
//     const [CurrentWalletAddress, setCurrentWalletAddress] = useState<string>()
//     const [_ethFee, setEthFee] = useState<string>("0")
//     const [conn, setConn] = useState<boolean>(false)
//     const [showSpinner, setShowSpinner] = useState<boolean>(false)
//     const [tType, setTType] = useState<string>("Other")
//     const [btnClass, setBtnClass] = useState<string>("")

//     const handleChange1 = (e: any) => {
//         setEthFee(e.target.value);
//     }

let _signer: any = "";
let _provider: any = "";
let CurrentWalletAddress: string = "";

const call = async () => {
    async function connect() {
        const externalProvider = await web3Modal.connect();
        return new ethers.providers.Web3Provider(externalProvider);
    }
    const web3Modal = new Web3Modal({
        network: "mainnet",
        cacheProvider: true,
        providerOptions
    });
    const provider = await connect();
    const { chainId } = await provider.getNetwork()
    const signer = await provider.getSigner(0);
    _signer = signer;
    const address = await signer.getAddress();
    console.log(address, "-=-address-==-")
}

/**
function to connect to wallet and get the address
This is an asynchronous function called "call" that initializes a web3Modal object,
connects to an Ethereum provider, sets the provider and signer, gets the current wallet address,
and logs the chain ID and the address. It also sets the connection status and current wallet address
using the "setConn" and "setCurrentWalletAddress" functions.
*/



/**
function to check approval from @walletAddress to @NFTcontract 
this will return the allowance approved by @walletAddress to @NFTcontract
*/
// const checkApproval: () => Promise<string> = async (transactionType:number) => {
//     // Log the value of the _ethFee parameter
//     // console.log(_ethFee)

//     // Check the transactionType to determine which contract to use
//     if (transactionType == 0) {
//         // If transactionType is 0, get the NPA token contract using the _signer object
//         const npaTokenctr: any = await napaTokenContract(_signer);
//         // Get the allowance of the NPA token for the current wallet address and the nftAddress
//         const alw1 = await allowance(npaTokenctr, CurrentWalletAddress, nftAddress)
//         // Log the allowance of the NPA token
//         console.log(alw1.toString(), "allowance of napa")
//         // Return the allowance of the NPA token as a string
//         return alw1.toString()
//     } else if (transactionType == 1) {
//         // If transactionType is 1, get the USDT token contract using the _signer object
//         const usdtTokenctr: any = await usdtTokenContract(_signer);
//         // Get the allowance of the USDT token for the current wallet address and the nftAddress
//         const alw1 = await allowance(usdtTokenctr, CurrentWalletAddress, nftAddress)
//         // Log the allowance of the USDT token
//         console.log(alw1.toString(), "allowance of usdt")
//         // Return the allowance of the USDT token as a string
//         return alw1.toString()
//     } else {
//         // If transactionType is not 0 or 1, no approval check is needed
//         console.log("don't need any approval check");
//         // Return -1 to indicate no approval check is needed
//         return -1
//     }
//     // The function is checking the approval status of a token before a transaction can be made on the contract. It first checks the transaction type to determine which token contract to use. If the transaction type is 0, the NPA token contract is used, and if the transaction type is 1, the USDT token contract is used. It then gets the allowance of the token for the current wallet address and the nftAddress, logs the allowance value, and returns the allowance value as a string. If the transaction type is neither 0 nor 1, it logs that no approval check is needed and returns -1.
// }

/**
function to make approval from @walletAddress to @NFTcontract 
*/

// This function does the approval for a specific token contract
const doApproval: any = async (amt: string, transactionType: number) => {
    transactionType=0
    if (transactionType == 0) { // Check if the transaction is for NPA tokens
        const npaTokenctr: any = await napaTokenContract(_signer); // Get the NPA token contract
        console.log(npaTokenctr, "npaTokenctr contract");
        const alw1 = await approve(npaTokenctr, nftAddress, amt.toString()); // Call the approve function of the NPA token contract to allow spending of tokens
        console.log(alw1, "allowance of napa");
        return alw1;
    } else if (transactionType == 1) { // Check if the transaction is for USDT tokens
        const usdtTokenctr: any = await usdtTokenContract(_signer); // Get the USDT token contract
        console.log(usdtTokenctr, "usdtTokenctr contract");
        const alw1 = await approve(usdtTokenctr, nftAddress, amt.toString()); // Call the approve function of the USDT token contract to allow spending of tokens
        console.log(alw1, "allowance of usdt");
        return alw1;
    } else { // If the transaction is not for tokens, return -1
        console.log("don't need any approval check as you've opted for ether");
        return -1;
    }
}


// function setApprovalForAll(address operator, bool _approved) external;
const doApprovalFroMarketContract = async () => {
    const NftCtr: any = await newNapaNftContract(_signer);
    const approveRes = await NftCtr.setApprovalForAll(marketPlaceAddress, true).then(async (res: any) => {
        await res.wait();
        console.log(await res.wait(), "approve res");
    }).catch((e: any) => {
        console.log(e)
    })
}

// function setApprovalForAll(address operator, bool _approved) external;
const checkApprovalFroMarketContract = async () => {
    const NftCtr: any = await newNapaNftContract(_signer);
    const approveRes = await NftCtr.isApprovedForAll(CurrentWalletAddress, marketPlaceAddress).then(async (res: any) => {
        // await res.wait();
        console.log(await res, "approve res");
    }).catch((e: any) => {
        console.log(e)
    })
}

/**
function to mint or LazyMint the nfts according to the token type @transactionType ("tokenType")
this function sends the fees to the feeAccount, sends the nft price to the owner of the NFT and then
sends/mints the NFT to the buyer's account
*/

const getMarketPlace: () => Promise<string> = async () => {

    const NftCtr: any = await newNapaNftContract(_signer);

    console.log(await NftCtr.owner(), "owner")

    // const updateRes = await updatemarketPlaceAddress(NftCtr,"0x61584c74b5d215D57338A28754cBcC17f33d469a")
    // console.log(await updateRes,"new address")


    console.log(await marketPlace(NftCtr))
    return await marketPlace(NftCtr);
}

// const LazyFunction = async (_tokenId: number, _supposedSeller: string, _ethFee: string, typeOfTransaction: number, _tokenUri: string, _transferToNapa: boolean, _setSaleMinter: boolean) => {
//     call()
//     const tknId = 1;
//     // get NftCtr instance from newNapaNftContract function
//     const NftCtr: any = await newNapaNftContract(_signer);
//     console.log(await NftCtr, "nannananananana")
//     const supposedSeller: string = "0x20845c0782D2279Fd906Ea3E3b3769c196032C46"

//     try {
//         if (transactionType == 0) {
//             // Get additional Napa token fee for minting NFT
//             let additional: any = await _NapaMintFee(NftCtr);
//             let convertedEthFee: any = _ethFee;
//             // Calculate the total fee by adding the additional fee and eth fee
//             const hit = Number(Number(_ethFee) * (10 ** 18)) + Number(additional.toString());
//             console.log(hit, "new hit");

//             // Check if total fee is greater than the provided eth fee
//             if (hit > convertedEthFee) {
//                 // If yes, do token approval for Napa token and then mint NFT
//                 const approveRes = await doApproval(hit.toString()).then(async function checkApproval(res: any) {
//                     const mainRes = await res.wait();
//                     setShowSpinner(true)
//                     if (await mainRes) {
//                         setShowSpinner(false)
//                         console.log(mainRes, "mainrs")
//                         const _lazy = await NftCtr.lazyMint(_tokenId, _supposedSeller,
//                             hit.toString(), typeOfTransaction,
//                             _tokenUri,
//                             _transferToNapa, _setSaleMinter);
//                         setShowSpinner(true)
//                         const _lazyRes = await _lazy.wait()
//                         setShowSpinner(false)
//                         console.log(await _lazyRes, "_lazy response");
//                     } else {
//                         setShowSpinner(true)
//                         console.log("waiting for confirmation")
//                         checkApproval(res)
//                     }
//                 }).catch((e: any) => {
//                     console.log("Unknown error occured :", e)
//                 });
//             }
//         } else if (transactionType == 1) {
//             // Get additional USDT fee for minting NFT
//             let additional: any = await _UsdtMintFee(NftCtr);
//             let convertedEthFee: any = _ethFee;
//             // Calculate the total fee by adding the additional fee and eth fee
//             const hit = Number(Number(_ethFee) * (10 ** 18)) + Number(additional.toString())
//             console.log("res of hit for usdt", hit);

//             // Check if total fee is greater than the provided eth fee
//             if (hit > convertedEthFee) {
//                 // If yes, do token approval for USDT token and then mint NFT
//                 const isApproveRes = await doApproval(hit.toString()).then(async function checkApproval(res: any) {
//                     const mainRes = await res.wait();
//                     if (await mainRes) {
//                         console.log(mainRes, "mainrs")
//                         const _lazy = await lazyMint(NftCtr, tknId, supposedSeller,
//                             hit.toString(), 1,
//                             "www.ww.com",
//                             false,
//                             false);
//                         console.log(await _lazy, "_lazy response");
//                     } else {
//                         console.log("waiting for confirmation")
//                         checkApproval(res)
//                     }
//                 }).catch((e: any) => {
//                     console.log("Unknown error occured :", e)
//                 });
//             }
//         } else {
//             // Calculate total fee for eth minting
//             const etherFee = await ethFees(NftCtr);
//             let hit = Number(Number(_ethFee) * (10 ** 18)) + Number(etherFee.toString())
//             // Mint NFT with eth
//             const _lazy = await lazyMintEth(NftCtr, tknId, supposedSeller,
//                 hit.toString(), 2,
//                 "www.ww.com",
//                 false,
//                 false, { value: hit.toString() });
//             console.log(await _lazy)
//         }
//     } catch (e: any) {
//         console.log(e.code, e.message, "caught")
//     }
// }

const _currentTokenId = async () => {
    const NftCtr: any = await newNapaNftContract(_signer);
    console.log(NftCtr, "whole contract")
    let name = await NftCtr.currentTokenId();
    console.log(name)
    // let tknCount = await currentTokenId(NftCtr);
    // console.log(tknCount, "-==-tknCount=-=-");
    // return tknCount;
}

const LazyButton = async () => {
    let tknId = 1;
    let supposedSeller = "0x20845c0782D2279Fd906Ea3E3b3769c196032C46";
    let _ethFee = "1";
    let typeOfTransaction = 0;
    let _tokenUri = "https://www.ww.com";
    let _transferToNapa = false;
    let _setSaleMinter = false;

    await LazyFunction(tknId, supposedSeller, _ethFee, typeOfTransaction, _tokenUri, _transferToNapa, _setSaleMinter);
}







export const LazyFunction = async (_tokenId: number, _supposedSeller: string, _ethFee: string, typeOfTransaction: number, _tokenUri: string, _transferToNapa: boolean, _setSaleMinter: boolean) => {
    call()
    typeOfTransaction=0;
    const tknId = 1;
    // get NftCtr instance from newNapaNftContract function
    const NftCtr: any = await newNapaNftContract(_signer);
    console.log(await NftCtr, "nannananananana")
    const supposedSeller: string = "0x20845c0782D2279Fd906Ea3E3b3769c196032C46"

    try {
        if (typeOfTransaction == 0) {
            // Get additional Napa token fee for minting NFT
            let additional: any = await _NapaMintFee(NftCtr);
            let convertedEthFee: any = _ethFee;
            // Calculate the total fee by adding the additional fee and eth fee
            const hit = Number(Number(1) * (10 ** 18)) + Number(additional.toString());
            console.log(hit, "new hit");

            // Check if total fee is greater than the provided eth fee
            if (hit > convertedEthFee) {
                // If yes, do token approval for Napa token and then mint NFT
                const approveRes = await doApproval(hit.toString()).then(async function checkApproval(res: any) {
                    const mainRes = await res.wait();
                    if (await mainRes) {
                        const _lazy = await NftCtr.lazyMint(2, "0x20845c0782D2279Fd906Ea3E3b3769c196032C46", "1", 0, "www.w.com", false, false);
                        const _lazyRes = await _lazy.wait()
                        console.log(await _lazyRes, "_lazy response");
                    } else {
                        console.log("waiting for confirmation")
                        checkApproval(res)
                    }
                }).catch((e: any) => {
                    console.log("Unknown error occured :", e)
                });
            }
        } else if (typeOfTransaction == 1) {
            // Get additional USDT fee for minting NFT
            let additional: any = await _UsdtMintFee(NftCtr);
            let convertedEthFee: any = _ethFee;
            // Calculate the total fee by adding the additional fee and eth fee
            const hit = Number(Number(_ethFee) * (10 ** 18)) + Number(additional.toString())
            console.log("res of hit for usdt", hit);

            // Check if total fee is greater than the provided eth fee
            if (hit > convertedEthFee) {
                // If yes, do token approval for USDT token and then mint NFT
                const isApproveRes = await doApproval(hit.toString()).then(async function checkApproval(res: any) {
                    const mainRes = await res.wait();
                    if (await mainRes) {
                        console.log(mainRes, "mainrs")
                        const _lazy = await lazyMint(NftCtr, tknId, supposedSeller,
                            hit.toString(), 1,
                            "www.ww.com",
                            false,
                            false);
                        console.log(await _lazy, "_lazy response");
                    } else {
                        console.log("waiting for confirmation")
                        checkApproval(res)
                    }
                }).catch((e: any) => {
                    console.log("Unknown error occured :", e)
                });
            }
        } else {
            // Calculate total fee for eth minting
            const etherFee = await ethFees(NftCtr);
            let hit = Number(Number(_ethFee) * (10 ** 18)) + Number(etherFee.toString())
            // Mint NFT with eth
            const _lazy = await lazyMintEth(NftCtr, tknId, supposedSeller,
                hit.toString(), 2,
                "www.ww.com",
                false,
                false, { value: hit.toString() });
            console.log(await _lazy)
        }
    } catch (e: any) {
        console.log(e.code, e.message, "caught")
    }
}