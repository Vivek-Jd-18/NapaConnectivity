import React, { createContext, useCallback, useEffect, useState } from 'react';
import lodash from 'lodash';
import Web3 from 'web3';
import { toast } from 'react-toastify';

import { getAlreadyConnectedWeb3, getWeb3 } from '../utils/wallet';
import { CustomToastWithLink } from '../components/CustomToast/CustomToast';
import { ErrorIcon, WalletConnectedIcon } from '../components/assets';
import { ToastDescription, ToastTitle } from '../typing/toast';
import { numberWithCommas } from '../utils/NumberWithCommas';

type WebThreeContextType = {
  account: string;
  walletEth: number;
  walletBnb: string;
  walletNapa: string;
  connectWallet: () => Promise<void>;
  getAccounts: () => void;
};

const WebThreeContext = createContext<WebThreeContextType>(
  {} as WebThreeContextType
);

const balanceOfABI = [
  {
    constant: true,
    inputs: [
      {
        name: '_owner',
        type: 'address',
      },
    ],
    name: 'balanceOf',
    outputs: [
      {
        name: 'balance',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
];

export const WebThreeContextProvider = (props: {
  children: React.ReactNode;
}) => {
  const [account, setAccount] = useState('');
  const [walletEth, setWalletEth] = useState(0);
  const [walletBnb, setWalletBnb] = useState('');
  const [walletNapa, setWalletNapa] = useState('');

  const getBalanceBnb = async () => {
    const web3: any = await getAlreadyConnectedWeb3();
    const accounts = await web3.eth.getAccounts();
    const contract = new web3.eth.Contract(
      balanceOfABI,
      '0xB8c77482e45F1F44dE1745F52C74426C631bDD52'
    );
    const tokenBalance = await contract.methods.balanceOf(accounts[0]).call();
    const bnbBalance = numberWithCommas(tokenBalance.slice(0, 8));
    // @ts-ignore
    setWalletBnb(bnbBalance);
  };

  const getBalanceNapa = async () => {
    const web3: any = await getAlreadyConnectedWeb3();
    const accounts = await web3.eth.getAccounts();
    const contract = new web3.eth.Contract(
      balanceOfABI,
      '0x8EB2Df7137FB778a6387E84f17b80CC82cF9e884'
    );
    const tokenBalance = await contract.methods.balanceOf(accounts[0]).call();
    const napaBalance = numberWithCommas(tokenBalance.slice(0, 8));
    // @ts-ignore
    setWalletNapa(napaBalance);
  };

  const getAccounts = useCallback(async () => {
    try {
      const web3: any = await getAlreadyConnectedWeb3();
      const accounts = await web3.eth.getAccounts();
      if (accounts.length) {
        const walletBalanceInWei = await web3.eth.getBalance(accounts[0]);
        const walletBalanceInEth =
          // @ts-ignore
          Math.round(Web3.utils.fromWei(walletBalanceInWei) * 1000) / 1000;
        setAccount(accounts[0]);
        setWalletEth(walletBalanceInEth);
        getBalanceBnb();
        getBalanceNapa();
      }
    } catch (error: any) {
      toast.error(
        CustomToastWithLink({
          icon: ErrorIcon,
          title: ToastTitle.ERROR,
          description: ToastDescription.ERROR,
          time: 'Now',
        })
      );
    }
  }, []);

  const connectWallet = async () => {
    try {
      const web3: any = await getWeb3();
      const walletAddress = await web3.eth.requestAccounts();
      await web3.eth.getAccounts();
      const walletBalanceInWei = await web3.eth.getBalance(walletAddress[0]);
      const walletBalanceInEth =
        // @ts-ignore
        Math.round(Web3.utils.fromWei(walletBalanceInWei) * 1000) / 1000;
      toast.success(
        CustomToastWithLink({
          icon: WalletConnectedIcon,
          title: ToastTitle.WALLET_CONNECTED,
          description: ToastDescription.WALLET_CONNECTED,
          time: 'Now',
        })
      );
      setAccount(walletAddress[0]);
      setWalletEth(walletBalanceInEth);
      getBalanceBnb();
      getBalanceNapa();
      return walletAddress[0];
    } catch (error: any) {
      toast.error(
        CustomToastWithLink({
          icon: ErrorIcon,
          title: ToastTitle.ERROR,
          description: ToastDescription.ERROR,
          time: 'Now',
        })
      );
    }
  };

  useEffect(() => {
    getAccounts();
  }, [getAccounts]);

  const value = {
    account,
    walletBnb,
    walletEth,
    walletNapa,
    connectWallet,
    getAccounts,
  };

  return (
    <WebThreeContext.Provider value={value}>
      <React.Fragment>
        <div>{lodash.get(props, 'children', false) && props.children}</div>
      </React.Fragment>
    </WebThreeContext.Provider>
  );
};

export default WebThreeContext;
