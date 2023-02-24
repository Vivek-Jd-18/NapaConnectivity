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

import { lazyMint, ethFee as ethFees, NapaMintFee as _NapaMintFee, UsdtMintFee as _UsdtMintFee, lazyMintEth, approve, allowance, marketPlace, updatemarketPlaceAddress, currentTokenId } from './utils/testnet/CallHelpers/callHelpers';
import { napaTokenContract, newNapaNftContract, originalNapaStakingContract, originalNapaTokenContract, usdtTokenContract } from './utils/testnet/conractObjects/contractObject';
import { nftAddress, marketPlace as marketPlaceAddress } from './utils/testnet/addressHelpers/addressHelper';
import { StakingComp } from './component/StakingComp';
import { balanceOf } from './utils/testnet/CallHelpers/napaTokenCallHelpers';
import napaLogo from "./assets/napa_icon.png"

export const CurrentUserContext = createContext<any>(null);
function App() {


  const [_provider, setProvider] = useState<any>();
  const [_signer, setSigner] = useState<any>()
  const [transactionType, setTransactionType] = useState<number | string>()
  const [CurrentWalletAddress, setCurrentWalletAddress] = useState<string>()
  const [_ethFee, setEthFee] = useState<string>("0")
  const [ethBal, setEthBal] = useState<any>();
  const [conn, setConn] = useState<boolean>(false)
  const [showSpinner, setShowSpinner] = useState<boolean>(false)
  const [tType, setTType] = useState<string>("Other")
  const [btnClass, setBtnClass] = useState<string>("")
  const [napaBal, setNapaBal] = useState<number>(0);

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
    const ehBalance = await provider.getBalance(address);
    console.log(ehBalance.toString(),"balance of ETH")
    setEthBal(Number(ehBalance.toString())/(10**18))
    if (address) {
      setConn(true)
    }
    setCurrentWalletAddress(address)
    //process to get NAPA balance of current user
    setNapaBal((await balanceOf(await originalNapaTokenContract(signer), address)) / 10 ** 18);
  }

  return (
    <div className=''>
      <div className="App">
        <nav className="navbar navbar-expand-lg bg-dark">
          <div className="container-fluid">
            <a className="navbar-brand ms-4" href="#">NAPA</a>
            <img src={napaLogo} alt="" />
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav m-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <h1 className="nav-link active text-warning m-auto" aria-current="page" >{CurrentWalletAddress ? <span >Connected with: <span className='text-secondary'>{CurrentWalletAddress}</span></span> : null}</h1>{ethBal}
                </li>
                <li className="nav-item m-auto">
                  <h1 className="nav-link active text-warning m-auto" aria-current="page" >{CurrentWalletAddress ? <span className='text-primary'>NAPA balance: <span className='text-secondary'>{napaBal}</span></span> : null}</h1>
                </li>
              </ul>
              <button onClick={call} className='btn btn-primary m-3'>{CurrentWalletAddress ? "connected" : "connect wallet"}</button>
            </div>
          </div>
        </nav>

        <CurrentUserContext.Provider value={{ CurrentWalletAddress: CurrentWalletAddress, _signer: _signer, _provider: _provider }}>
          {/* <LazyMint />
        <MarketPlace /> */}
          <StakingComp />
        </CurrentUserContext.Provider>
      </div>
    </div>
  );
}

export default App;
