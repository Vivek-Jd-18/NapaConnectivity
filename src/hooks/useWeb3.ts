import { SwapIcon } from '@/components/assets';
import { CustomToastWithLink } from '@/components/CustomToast/CustomToast';
import { getAlreadyConnectedWeb3, getWeb3 } from '@/utils/wallet';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Web3 from 'web3';

export const useWeb3 = () => {
  const [account, setAccount] = useState('');
  const [walletEth, setWalletEth] = useState(0);
  const { push } = useRouter();

  const getAccounts = useCallback(async () => {
    try {
      const web3: any = await getAlreadyConnectedWeb3();
      const accounts = await web3.eth.getAccounts();
      console.log('web3', web3.eth);
      if (accounts.length) {
        const walletBalanceInWei = await web3.eth.getBalance(accounts[0]);
        const walletBalanceInEth =
          // @ts-ignore
          Math.round(Web3.utils.fromWei(walletBalanceInWei) * 1000) / 1000;
        setAccount(accounts[0]);
        setWalletEth(walletBalanceInEth);
      }
    } catch (error: any) {
      toast.error(
        CustomToastWithLink({
          icon: SwapIcon,
          title: error.message,
          time: 'Now',
        })
      );
    }
  }, []);

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
          icon: SwapIcon,
          title: 'Wallet Connected',
          time: 'Now',
        })
      );
      push('/home');
      setAccount(walletAddress[0]);
      setWalletEth(walletBalanceInEth);
    } catch (error: any) {
      if (
        error.message ===
        "Cannot read properties of undefined (reading 'request')"
      ) {
        toast.error(
          CustomToastWithLink({
            icon: SwapIcon,
            title: 'Please install the Metamask extension',
            time: 'Now',
          })
        );
        return;
      }
      toast.error(
        CustomToastWithLink({
          icon: SwapIcon,
          title: error.message,
          time: 'Now',
        })
      );
    }
  }, [getWeb3]);

  useEffect(() => {
    getAccounts();
  }, []);

  return { account, connectWallet, walletEth };
};
