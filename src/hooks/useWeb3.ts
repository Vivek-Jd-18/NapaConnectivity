import { ErrorIcon, WalletConnectedIcon } from '@/components/assets';
import { CustomToastWithLink } from '@/components/CustomToast/CustomToast';
import { ToastDescription, ToastTitle } from '@/typing/toast';
import { getAlreadyConnectedWeb3, getWeb3 } from '@/utils/wallet';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Web3 from 'web3';

const minABI = [
  // balanceOf
  {
    constant: true,
    inputs: [{ name: '_owner', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: 'balance', type: 'uint256' }],
    type: 'function',
  },
];

export const useWeb3 = () => {
  const [account, setAccount] = useState('');
  const [walletEth, setWalletEth] = useState(0);
  const { push } = useRouter();
  const [walletBnb, setWalletBnb] = useState(0);
  const [walletNapa, setWalletNapa] = useState(0);

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
        getBalanceBnb(accounts, web3);
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

  // @ts-ignore
  const getBalanceBnb = async (accounts, web3) => {
    const contract = new web3.eth.Contract(
      minABI,
      '0x8eb2df7137fb778a6387e84f17b80cc82cf9e884'
    );
    const tokenBalance = await contract.methods.balanceOf(accounts[0]).call();
    setWalletBnb(tokenBalance);
  };

  // @ts-ignore
  const getBalanceNapa = async (accounts, web3) => {
    const contract = new web3.eth.Contract(
      minABI,
      '0xB8c77482e45F1F44dE1745F52C74426C631bDD52'
    );
    const tokenBalance = await contract.methods.balanceOf(accounts[0]).call();
    setWalletNapa(tokenBalance);
  };

  const connectWallet = useCallback(async () => {
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
      push('/home');
      setAccount(walletAddress[0]);
      setWalletEth(walletBalanceInEth);
      getBalanceBnb(walletAddress, web3);
      getBalanceNapa(walletAddress, web3);
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
  }, [push, setAccount, setWalletEth]);

  useEffect(() => {
    getAccounts();
  }, [getAccounts]);

  return { account, connectWallet, walletEth, walletBnb, walletNapa };
};
