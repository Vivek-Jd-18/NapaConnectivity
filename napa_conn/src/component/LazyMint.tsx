import React, { useState } from 'react'
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import providerOptions from '../utils/web3Configs/providerOptions';

import { marketPlaceContract, napaNftContract } from '../utils/contractObjects';
import { MarketPlaceAddress, NapaNFTAddress, supportedChainHexMain, supportedChainHexTest } from '../utils/addressHelper';
import { symbol } from '../utils/callHelper2';
import { lazyMint, ethFee as ethFees, NapaMintFee as _NapaMintFee, UsdtMintFee as _UsdtMintFee, lazyMintEth } from '../utils/testnet/callHelpers';
import { napaTokenContract, newNapaNftContract, usdtTokenContract } from '../utils/testnet/contractObject';
import { nftAddress } from '../utils/testnet/addressHelper';

export const Home = () => {
    const [_provider, setProvider] = useState<any>()
    const [_signer, setSigner] = useState<any>()
    const [transactionType, setTransactionType] = useState<number | string>()
    const [CurrentWalletAddress, setCurrentWalletAddress] = useState<string>()
    const [_ethFee, setEthFee] = useState<string | undefined>()
    const [conn, setConn] = useState<boolean>(false)
    const [tType, setTType] = useState<string>("Other")

    const handleChange1 = (e: any) => {
        setEthFee(e.target.value);
        console.log(e.target.value)
        console.log(_ethFee)
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
        console.log(chainId) // 1 or 5
        const signer = await provider.getSigner(0);
        setSigner(signer)
        const address = await signer.getAddress();
        if (address) {
            setConn(true)
        }
        setCurrentWalletAddress(address)
        console.log(address)
    }



    /**
    function to check approval from @walletAddress to @NFTcontract 
    this will return the allowance approved by @walletAddress to @NFTcontract
    */
    const checkApproval: () => Promise<string> = async () => {
        // Log the value of the _ethFee parameter
        console.log(_ethFee)

        // Check the transactionType to determine which contract to use
        if (transactionType == 0) {
            // If transactionType is 0, get the NPA token contract using the _signer object
            const npaTokenctr: any = await napaTokenContract(_signer);
            // Log the NPA token contract object
            console.log(npaTokenctr, "npaTokenctr contract");
            // Get the allowance of the NPA token for the current wallet address and the nftAddress
            const alw1 = await npaTokenctr.allowance(CurrentWalletAddress, nftAddress)
            // Log the allowance of the NPA token
            console.log(alw1.toString(), "allowance of napa")
            // Return the allowance of the NPA token as a string
            return alw1.toString()
        } else if (transactionType == 1) {
            // If transactionType is 1, get the USDT token contract using the _signer object
            const usdtTokenctr: any = await usdtTokenContract(_signer);
            // Log the USDT token contract object
            console.log(usdtTokenctr, "usdtTokenctr contract");
            // Get the allowance of the USDT token for the current wallet address and the nftAddress
            const alw1 = await usdtTokenctr.allowance(CurrentWalletAddress, nftAddress)
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

    /**
    function to make approval from @walletAddress to @NFTcontract 
    */

    const doApproval: any = async (amt: string) => {
        if (transactionType == 0) {
            const npaTokenctr: any = await napaTokenContract(_signer);
            console.log(npaTokenctr, "npaTokenctr contract");
            const alw1 = await npaTokenctr.approve("0xEF32F87f63b35061823e7f9BF1F8acEaBb6a1d79", "100000000000000000000");
            console.log(alw1, "allowance of napa");
            return alw1;
        } else if (transactionType == 1) {
            const usdtTokenctr: any = await usdtTokenContract(_signer);
            console.log(usdtTokenctr, "usdtTokenctr contract");
            const alw1 = await usdtTokenctr.approve("0xEF32F87f63b35061823e7f9BF1F8acEaBb6a1d79", "10000000000000000000");
            console.log(alw1, "allowance of usdt");
            return alw1;
        } else {
            console.log("don't need any approval check");
            return -1
        }
    }


    /**
    function to mint or LazyMint the nfts according to the token type @transactionType ("tokenType")
    this function sends the fees to the feeAccount, sends the nft price to the owner of the NFT and then
    sends/mints the NFT to the buyer's account
    */

    const LazyButton = async () => {

        const NftCtr = await newNapaNftContract(_signer);
        console.log(NftCtr, "napaNftContract conract");

        console.log(_ethFee, "inside")
        let amt = ethers.utils.parseEther(`${_ethFee}`)
        let nn = amt.toString()


        if (transactionType == 0) {
            console.log("lvl 1")
            const napaAllowance = await checkApproval();
            let additional: any = await _NapaMintFee(NftCtr);
            console.log(additional.toString(), "additional")
            let convertedEthFee: any = _ethFee;
            console.log(convertedEthFee, "ADDITIONAL ")

            console.log("lvl 2")
            console.log(napaAllowance, "allllllll")
            console.log(nn, "npppp")
            if (napaAllowance >= convertedEthFee + additional) {
                const hit = Number(_ethFee) + Number(additional.toString())
                console.log(typeof Number(_ethFee), "eth fee type")
                console.log(typeof Number(additional.toString()), "additional type")
                console.log(hit, "-==-HIT=-=-")
                const _lazy = await lazyMint(NftCtr, "0x20845c0782D2279Fd906Ea3E3b3769c196032C46",
                    hit.toString(), 0,
                    "www.ww.com",
                    false,
                    false);
                console.log(await _lazy, "_lazy response");
            } else {
                console.log(" else part")
                let additional: any = _NapaMintFee(NftCtr);
                const approveRes = await doApproval(_ethFee + additional);
                const hit = Number(_ethFee) + Number(additional.toString())
                if (approveRes != -1) {
                    const _lazy = await lazyMint(NftCtr, "0x20845c0782D2279Fd906Ea3E3b3769c196032C46",
                        hit.toString(), 0,
                        "www.ww.com",
                        false,
                        false);
                    console.log(await _lazy, "_lazy response");
                } else {
                    console.log("Failed approval")
                }
            }
        } else if (transactionType == 1) {
            const napaAllowance = await checkApproval();
            let additional: any = await _UsdtMintFee(NftCtr);
            console.log(additional.toString(), "additional")
            let convertedEthFee: any = _ethFee;
            console.log(convertedEthFee, "ADDITIONAL ")

            if (napaAllowance >= convertedEthFee + additional) {
                const hit = Number(_ethFee) + Number(additional.toString())
                console.log(hit, "-==-HIT=-=-")
                const _lazy = await lazyMint(NftCtr, "0x20845c0782D2279Fd906Ea3E3b3769c196032C46",
                    hit.toString(), 1,
                    "www.ww.com",
                    false,
                    false);
                console.log(await _lazy, "_lazy response");
            } else {
                console.log(" else part")
                let additional: any = _NapaMintFee(NftCtr);
                const approveRes = await doApproval(_ethFee + additional);
                const hit = Number(_ethFee) + Number(additional.toString())
                if (approveRes != -1) {
                    const _lazy = await lazyMint(NftCtr, "0x20845c0782D2279Fd906Ea3E3b3769c196032C46",
                        hit.toString(), 0,
                        "www.ww.com",
                        false,
                        false);
                    console.log(await _lazy, "_lazy response");
                } else {
                    console.log("Failed approval")
                }
            }
        } else {
            const etherFee = await ethFees(NftCtr);
            let hit = Number(_ethFee) + Number(etherFee.toString())

            const _lazy = await lazyMintEth(NftCtr, "0x20845c0782D2279Fd906Ea3E3b3769c196032C46",
                hit.toString(), 2,
                "www.ww.com",
                false,
                false, { value: hit.toString() });
            console.log(await _lazy)
        }
    }

    return (
        <>
            <div>Lazy Mint</div>
            <div>
                <div className='div border border-primary'>
                    <br /><br />
                    <button onClick={call}>{conn ? <span style={{ color: "green" }}>Connected</span> : <span style={{ color: "red" }}>Connect</span>}</button>
                    <br /><br />
                    <label>Enter the Currency type</label><br />
                    {transactionType}
                    <label >NAPA Token</label>
                    <input type='radio' value="NAPA Token" name="tknType" checked={transactionType === '0'} onClick={() => setTransactionType('0')} /><br></br>
                    <label >USDT Token</label>
                    <input type='radio' value="USDT Token" name="tknType" checked={transactionType === '1'} onClick={() => setTransactionType('1')} /><br></br>
                    <label >Ether</label>
                    <input type='radio' value="Ether" name="tknType" checked={transactionType === '2'} onClick={() => setTransactionType('2')} />
                    <br /><br />
                    <label>Enter the amount</label><br />
                    <input value={_ethFee} onChange={handleChange1} type='number' />
                    <br />
                    <br /><br />
                    <button onClick={checkApproval}>check approval</button>
                    <br /><br />
                    <button onClick={doApproval}>do approval</button>
                    <br /><br />
                    <button onClick={LazyButton}>nft write functions</button>
                </div>
            </div>
        </>
    )
}
