import React, { useState } from 'react'
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import providerOptions from '../utils/web3Configs/providerOptions';
import marketAbi from "../utils/abis/market.json"
import { Contract } from "web3-eth-contract"
import { acceptOwnership, owner, buyNftToken, fulfill, requestVolumeData, setSale, setSaleFromWallet, transferOwnership, updateApiLink, withdrawLink, NFT, getLatestPrice, NapaToken, Usdt, api, napaTokenAmount, nftInfo, priceOfNFT, volume } from '../utils/callHelpers';
import {
    NAPA_WALLET, NapaMintFee, NapaToken, Usdt, UsdtMintFee, _exist, balanceOf, baseURI, blackList, ethFee, feeWallet, getApproved, isApprovedForAll, marketPlace, minters, name, owner, ownerOf, supportsInterface, symbol, tokenByIndex, tokenOfOwnerByIndex, tokenURI, totalSupply

} from "../utils/callHelper2"
import { marketPlaceContract, napaNftContract } from '../utils/contractObjects';
import { MarketPlaceAddress, supportedChainHexMain, supportedChainHexTest } from '../utils/addressHelper';
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

        const _transferOwnership = async () => {
            const ctr = await marketPlaceContract(_signer);
            console.log(ctr, "conract")
            const accept = await transferOwnership(ctr, MarketPlaceAddress);
            console.log(await accept, "transferOwnership");
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

    const _MarketPlaceCheck = async () => {

        //MarketPlace CallFunctionCheck =>

        // const ctr = await marketPlaceContract(_signer);
        // console.log(ctr, "conract");
        // const accept = await NFT(ctr);
        // console.log(await accept, "NFT name");
        // const accept2 = await NapaToken(ctr);
        // console.log(await accept2, "NapaToken ");
        // const accept3 = await Usdt(ctr);
        // console.log(await accept3, "Usdt ");
        // const accept4 = await api(ctr);
        // console.log(await accept4, "api");
        // const accept5 = await getLatestPrice(ctr);
        // console.log(await accept5.toString(), "getLatestPrice");
        // const accept6 = await napaTokenAmount(ctr);
        // console.log(await accept6.toString(), "napaTokenAmount");
        // const accept7 = await nftInfo(ctr, 1);
        // console.log(await accept7.toString(), "nftInfo");
        // const accept8 = await owner(ctr);
        // console.log(await accept8, "owner");
        // const accept9 = await priceOfNFT(ctr);
        // console.log(await accept9.toString(), "priceOfNFT");
        // const accept10 = await volume(ctr);
        // console.log(await accept10.toString(), "volume");


        // _NFTContract read Function Check

        const ctr = await napaNftContract(_signer);
        console.log(ctr, "napaNftContract conract");

        const accept = await NAPA_WALLET(ctr);
        console.log(await accept, "NFT name");


    }

    return (
        <>
            <div>Home</div>
            <div>
                {/* <button onClick={call}>Call</button>
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
                <button onClick={_MarketPlaceCheck}>fun9</button>

            </div>
        </>
    )
}
