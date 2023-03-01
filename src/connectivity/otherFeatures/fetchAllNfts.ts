import axios from 'axios';
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';


export const call = async () => {
    async function connect() {
        const externalProvider = await web3Modal.connect();
        return new ethers.providers.Web3Provider(externalProvider);
    }
    const web3Modal = new Web3Modal({
        network: 'mainnet',
        cacheProvider: true,
    });
    const provider = await connect();
    // const { chainId } = await provider.getNetwork()
    await provider.getNetwork();
    const signer = await provider.getSigner(0);
    const address = await signer.getAddress();
    console.log(address, '-=-address-==-');
    return { signer, address };
};


export const fetchNFTs = async () => {
    const callData = await call();
    const accAddress = callData.address;
    let localArr: any[] = [];
    try {
        const config = {
            method: 'get',
            url: `https://deep-index.moralis.io/api/v2/${accAddress}/nft?chain=goerli&format=decimal`,
            headers: { 'X-API-Key': "D8Kfm2KtjFHVEpqvPmTVgaNLvY8TFEhrIBi8h71wjcTfFIdlmSKFlYJcEGATK8dr" }
        }
        let res = await axios(config)
        console.log(res, "all nfts of user")
        for (let i = 0; i < res.data.result.length; i++) {
            fetch(res.data.result[i].token_uri)
                .then(response => response.json())
                .then((jsonData) => {
                    localArr.push(jsonData);
                })
                .catch((error) => {
                    console.error(error)
                })
        }
    } catch (e) {
        console.log(e);
    }
    return localArr
}
