import Web3 from 'web3';

declare global {
  interface Window {
    ethereum: any;
  }
}

export const getWeb3 = async () => {
  return new Promise(async (resolve, reject) => {
    const web3 = new Web3(window.ethereum);
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      resolve(web3);
    } catch (error) {
      reject(error);
    }
  });
};
