import { ethers } from "ethers";
import marketAbi from "../utils/abis/market.json"
import nftAbi from "../utils/abis/nft.json"
import { MarketPlaceAddress, NapaNFTAddress } from "./addressHelper";

export const marketPlaceContract = async (signer: any) => {
    try {
        return new ethers.Contract(MarketPlaceAddress, marketAbi.abi, signer);
    } catch (e) {
        return e
    }
}

export const napaNftContract = async (signer: any) => {
    try {
        return new ethers.Contract(NapaNFTAddress, nftAbi.abi, signer);
    } catch (e) {
        return e
    }
}