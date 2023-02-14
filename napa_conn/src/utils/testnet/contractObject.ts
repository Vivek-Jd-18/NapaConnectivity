import { ethers } from "ethers";
// import marketAbi from "../utils/abis/market.json"
import nftAbi from "./abis/NAPANft.json"
import anyAbi from "./abis/anyToken.json"
import { NapaTokenAddress,UsdtTokenAddress, nftAddress } from "./addressHelper";

export const newNapaNftContract = async (signer: any) => {
    try {
        return new ethers.Contract(nftAddress, nftAbi.abi, signer);
    } catch (e) {
        return e
    }
}

export const napaTokenContract = async (signer: any) => {
    try {
        return new ethers.Contract(NapaTokenAddress,  anyAbi.abi, signer);
    } catch (e) {
        return e
    }
}

export const usdtTokenContract = async (signer: any) => {
    try {
        return new ethers.Contract(UsdtTokenAddress,  anyAbi.abi, signer);
    } catch (e) {
        return e
    }
}