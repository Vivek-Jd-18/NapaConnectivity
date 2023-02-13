import React, { useState } from 'react'
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import providerOptions from '../utils/web3Configs/providerOptions';
import marketAbi from "../utils/abis/market.json"
import { Contract } from "web3-eth-contract"
import { acceptOwnership, owner, buyNftToken, fulfill, requestVolumeData, setSale, setSaleFromWallet, transferOwnership as transferOwnership1, updateApiLink, withdrawLink, NFT, getLatestPrice, NapaToken, Usdt, api, napaTokenAmount, nftInfo, priceOfNFT, volume } from '../utils/callHelpers';
import {
    NAPA_WALLET, NapaMintFee, UsdtMintFee, _exist, balanceOf, baseURI, blackList, ethFee, feeWallet, getApproved, isApprovedForAll, marketPlace, minters, name, ownerOf, supportsInterface, tokenByIndex, tokenOfOwnerByIndex, tokenURI, totalSupply
    , addToBlackList, approve, bulkMintToken, removeFromBlackList, renounceOwnership, safeTransferFrom, safeTransferFrom2, setApprovalForAll, setBaseURI, setFees, setTokenAddresses, setWallets, singleMintToken, transferFrom, transferOwnership, updatemarketPlaceAddress




} from "../utils/callHelper2"
import { marketPlaceContract, napaNftContract } from '../utils/contractObjects';
import { MarketPlaceAddress, NapaNFTAddress, supportedChainHexMain, supportedChainHexTest } from '../utils/addressHelper';
import { symbol } from '../utils/callHelper2';

export const Home = () => {
    const [_provider, setProvider] = useState<any>()
    const [_signer, setSigner] = useState<any>()

    const checkNetwork = async (provider: ethers.providers.Web3Provider) => {
        if (window.ethereum) {
            const currentNetwork = await window.ethereum.chainId;
            if (currentNetwork !== supportedChainHexTest) {
                window.ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: supportedChainHexTest }], // chainId must be in hexadecimal numbers
                }).then(async function (result: string) {
                    // provider = new ethers.providers.Web3Provider(window.ethereum);
                    // onSuccess();
                    alert("Correct Network");
                    console.log("success")
                }).catch(function (error: string) {
                    // onFail(error.message)
                    console.log(error, "error")
                    alert("user rejected to switch the Network")
                });
            } else {
                // onSuccess();
                alert("Correct network")
            }
        } else {
            alert("install metamask extension ")
        }
    }

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
        await checkNetwork(provider)
        // while (chainId.toString() != supportedChainHexTest){
        //     console.log((chainId.toString() != supportedChainHexTest))
        //     await checkNetwork(provider)
        // } 
        console.log(chainId) // 1 or 5
        const signer = await provider.getSigner(0);
        setSigner(signer)
        const address = await signer.getAddress();
        const rawBalance = await provider.getBalance(address);
        const ctx = await napaNftContract(signer);
        console.log(ctx, "contract object")
        const sym = await symbol(ctx)
        console.log(sym, "symbol")
    }
    {
        const _acceptOwnership = async () => {
            const ctr = await marketPlaceContract(_signer);
            console.log(ctr, "conract")
            // const funCall = await getOwner(ctr);
            // console.log(funCall, "got the Owner")
            const accept = await acceptOwnership(ctr);
            console.log(await accept, "accept response")
        }

        const _buyNftToken = async () => {
            const ctr = await marketPlaceContract(_signer);
            console.log(ctr, "conract")
            const accept = await buyNftToken(ctr, 1, 1);
            console.log(await accept, "buyNftToken")
        }

        const _fulfill = async () => {
            const ctr = await marketPlaceContract(_signer);
            console.log(ctr, "conract")
            const accept = await fulfill(ctr, "0x7fbd3EB69926273eBD69652d11fa800a7fbd3EB69926273eBD69652d11fa800a", 10);
            console.log(await accept, "fulfill");
        }

        const _requestVolumeData = async () => {
            const ctr = await marketPlaceContract(_signer);
            console.log(ctr, "conract")
            const accept = await requestVolumeData(ctr);
            console.log(await accept, "requestVolumeData");
        }

        const _setSale = async () => {
            const ctr = await marketPlaceContract(_signer);
            console.log(ctr, "conract")
            const accept = await setSale(ctr, 1, 1, MarketPlaceAddress);
            console.log(await accept, "setSale");
        }

        const _setSaleFromWallet = async () => {
            const ctr = await marketPlaceContract(_signer);
            console.log(ctr, "conract")
            const accept = await setSaleFromWallet(ctr, 1, 1);
            console.log(await accept, "setSaleFromWallet");
        }

        const _transferOwnership1 = async () => {
            const ctr = await marketPlaceContract(_signer);
            console.log(ctr, "conract")
            const accept = await transferOwnership1(ctr, MarketPlaceAddress);
            console.log(await accept, "transferOwnership1");
        }

        const _updateApiLink = async () => {
            const ctr = await marketPlaceContract(_signer);
            console.log(ctr, "conract")
            const accept = await updateApiLink(ctr, "url");
            console.log(await accept, "updateApiLink");
        }

        const _withdrawLink = async () => {
            const ctr = await marketPlaceContract(_signer);
            console.log(ctr, "conract")
            const accept = await withdrawLink(ctr);
            console.log(await accept, "withdrawLink");
        }
    }

    // const _MarketPlaceCheck = async () => {

    //     //MarketPlace CallFunctionCheck =>

    //     // const ctr = await marketPlaceContract(_signer);
    //     // console.log(ctr, "conract");
    //     // const accept = await NFT(ctr);
    //     // console.log(await accept, "NFT name");
    //     // const accept2 = await NapaToken(ctr);
    //     // console.log(await accept2, "NapaToken ");
    //     // const accept3 = await Usdt(ctr);
    //     // console.log(await accept3, "Usdt ");
    //     // const accept4 = await api(ctr);
    //     // console.log(await accept4, "api");
    //     // const accept5 = await getLatestPrice(ctr);
    //     // console.log(await accept5.toString(), "getLatestPrice");
    //     // const accept6 = await napaTokenAmount(ctr);
    //     // console.log(await accept6.toString(), "napaTokenAmount");
    //     // const accept7 = await nftInfo(ctr, 1);
    //     // console.log(await accept7.toString(), "nftInfo");
    //     // const accept8 = await owner(ctr);
    //     // console.log(await accept8, "owner");
    //     // const accept9 = await priceOfNFT(ctr);
    //     // console.log(await accept9.toString(), "priceOfNFT");
    //     // const accept10 = await volume(ctr);
    //     // console.log(await accept10.toString(), "volume");


    //     // _NFTContract read Function Check

    //     const ctr = await napaNftContract(_signer);
    //     console.log(ctr, "napaNftContract conract");


    //     const _NAPA_WALLET = await NAPA_WALLET(ctr);
    //     console.log(await _NAPA_WALLET, "NAPA_WALLET");

    //     const _NapaMintFee = await NapaMintFee(ctr);
    //     console.log(await _NapaMintFee, "NapaMintFee");

    //     const _UsdtMintFee = await UsdtMintFee(ctr);
    //     console.log(await _UsdtMintFee, "UsdtMintFee");

    //     const exist = await _exist(ctr,1);
    //     console.log(await exist, "exist");

    //     const _balanceOf = await balanceOf(ctr,NapaNFTAddress);
    //     console.log(await _balanceOf, "balanceOf");

    //     const _baseURI = await baseURI(ctr);
    //     console.log(await _baseURI, "baseURI");

    //     const _blackList = await blackList(ctr,NapaNFTAddress);
    //     console.log(await _blackList, "blackList");

    //     const _ethFee = await ethFee(ctr);
    //     console.log(await _ethFee, "ethFee");

    //     const _feeWallet = await feeWallet(ctr);
    //     console.log(await _feeWallet, "feeWallet");

    //     const _getApproved = await getApproved(ctr,2);
    //     console.log(await _getApproved, "getApproved");

    //     const _isApprovedForAll = await isApprovedForAll(ctr,NapaNFTAddress,"0x20845c0782D2279Fd906Ea3E3b3769c196032C46");
    //     console.log(await _isApprovedForAll, "isApprovedForAll");

    //     const _marketPlace = await marketPlace(ctr);
    //     console.log(await _marketPlace, "marketPlace");

    //     const _minters = await minters(ctr,1);
    //     console.log(await _minters, "minters");

    //     const _name = await name(ctr);
    //     console.log(await _name, "name");

    //     const _ownerOf = await ownerOf(ctr,1);
    //     console.log(await _ownerOf, "ownerOf");

    //     const _supportsInterface = await supportsInterface(ctr,"0x01ffc9a7");
    //     console.log(await _supportsInterface, "supportsInterface");

    //     const _tokenByIndex = await tokenByIndex(ctr,1);
    //     console.log(await _tokenByIndex, "tokenByIndex");

    //     // const _tokenOfOwnerByIndex = await tokenOfOwnerByIndex(ctr,NapaNFTAddress,1);
    //     // console.log(await _tokenOfOwnerByIndex, "tokenOfOwnerByIndex");

    //     const _tokenURI = await tokenURI(ctr,1);
    //     console.log(await _tokenURI, "tokenURI");

    //     const _totalSupply = await totalSupply(ctr);
    //     console.log(await _totalSupply, "totalSupply");
    // }

    const WriteNFT = async () => {
        // _NFTContract read Function Check
        const ctr = await napaNftContract(_signer);
        console.log(ctr, "napaNftContract conract");

        //remaining
        // safeTransferFrom2,safeTransferFrom

        //
        const _updatemarketPlaceAddress = await updatemarketPlaceAddress(ctr,"0xaF09B9535E239AaDcC2B96331341647F84a3537f");
        console.log(await _updatemarketPlaceAddress, "updatemarketPlaceAddress");

    }

    return (
        <>
            <div>Home</div>
            <div>
                {/*
                 <button onClick={call}>Call</button>
                <button onClick={_acceptOwnership}>fun1</button>
                <button onClick={_buyNftToken}>fun2</button>
                <button onClick={_fulfill}>fun3</button>
                <button onClick={_requestVolumeData}>fun4</button>
                <button onClick={_setSale}>fun5</button>
                <button onClick={_setSaleFromWallet}>fun6</button>
                <button onClick={_transferOwnership}>fun7</button>
                <button onClick={_updateApiLink}>fun8</button>
                <button onClick={_withdrawLink}>fun9</button> */}
                <button onClick={call}>Call</button>
                {/* <button onClick={_MarketPlaceCheck}>fun9</button> */}
                <button onClick={WriteNFT}>nft write functions</button>
            </div>
        </>
    )
}
