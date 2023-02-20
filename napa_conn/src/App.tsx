import React from 'react';
import './App.css';
import { createContext, useState } from "react";
// import { Home } from './component/Home';
import { Desktop } from './component/Desktop';
import { MarketPlace } from './component/MarketPlace';
import { Home as LazyMint } from './component/LazyMint';
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import providerOptions from './utils/web3Configs/providerOptions';

import { lazyMint, ethFee as ethFees, NapaMintFee as _NapaMintFee, UsdtMintFee as _UsdtMintFee, lazyMintEth, approve, allowance, marketPlace, updatemarketPlaceAddress, currentTokenId } from './utils/testnet/callHelpers';
import { napaTokenContract, newNapaNftContract, usdtTokenContract } from './utils/testnet/contractObject';
import { nftAddress, marketPlace as marketPlaceAddress } from './utils/testnet/addressHelper';

export const CurrentUserContext = createContext<any>(null);
function App() {


  const [_provider, setProvider] = useState<any>()
  const [_signer, setSigner] = useState<any>()
  const [transactionType, setTransactionType] = useState<number | string>()
  const [CurrentWalletAddress, setCurrentWalletAddress] = useState<string>()
  const [_ethFee, setEthFee] = useState<string>("0")
  const [conn, setConn] = useState<boolean>(false)
  const [showSpinner, setShowSpinner] = useState<boolean>(false)
  const [tType, setTType] = useState<string>("Other")
  const [btnClass, setBtnClass] = useState<string>("")

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
  return (
    <div className="App">
      <button onClick={call} className='btn btn-primary m-3'>{CurrentWalletAddress?"connected":"connect wallet"}</button>
      <CurrentUserContext.Provider value={{ CurrentWalletAddress: CurrentWalletAddress, _signer: _signer, _provider: _provider }}>
        <LazyMint />
        <MarketPlace />
        {/* <Spinner/> */}
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
