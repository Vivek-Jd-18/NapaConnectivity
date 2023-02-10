import { ethers } from "ethers";
import marketAbi from "../utils/abis/market.json"
import { MarketPlaceAddress } from "./addressHelper";

export const marketPlaceContract = async (signer: any) => {
    try {
        return new ethers.Contract(MarketPlaceAddress, marketAbi.abi, signer);
    } catch (e) {
        return e
    }
}