/**
    all the 'read' and 'write' functions of @contract @marketplace
*/

// WRITE FUNCTIONS

//1 acceptOwnership
export const acceptOwnership = async (contract: any) => {
    return await contract.acceptOwnership();
}
//2.0 buyNftToken
export const buyNftToken = async (contract: any, _tokenSelect: number, _tokenID: number) => {
    return await contract.buyNftToken(_tokenSelect, _tokenID);
}
//2.1 buyNftTokenWithEth
export const buyNftTokenWithEth = async (contract: any, _tokenSelect: number, _tokenID: number,_tx:any) => {
    return await contract.buyNftToken(_tokenSelect, _tokenID,_tx);
}
//3 fulfill
export const fulfill = async (contract: any, _requestedId: string, _volume: number) => {
    return await contract.fulfill(_requestedId, _volume);
}
//4 requestVolumeData
export const requestVolumeData = async (contract: any) => {
    return await contract.requestVolumeData();
}

//5 setSale ,! Note: this function is only for calling in other contract you can't call it in your front-end  
export const setSale = async (contract: any, _tokenId: number, salePrice: number, _address: string) => {
    return await contract.setSale(_tokenId, salePrice, _address);
}

//6 setSaleFromWallet
export const setSaleFromWallet = async (contract: any, _tokenId: number, salePrice: number|string) => {
    return await contract.setSaleFromWallet(_tokenId, salePrice);
}
//7 transferOwnership
export const transferOwnership = async (contract: any, to: string) => {
    return await contract.transferOwnership(to);
}
//8 updateApiLink
export const updateApiLink = async (contract: any, _api: string) => {
    return await contract.updateApiLink(_api);
}
//9 withdrawLink
export const withdrawLink = async (contract: any) => {
    return await contract.withdrawLink();
}


// READ FUNCTIONS

//1 withdrawLink
export const NFT = async (contract: any) => {
    return await contract.NFT();
}

//2 NapaToken
export const NapaToken = async (contract: any) => {
    return await contract.NapaToken();
}

//3 Usdt
export const Usdt = async (contract: any) => {
    return await contract.Usdt();
}

//4 api
export const api = async (contract: any) => {
    return await contract.api();
}

//5 getLatestPrice
export const getLatestPrice = async (contract: any) => {
    return await contract.getLatestPrice();
}

//6 napaTokenAmount
export const napaTokenAmount = async (contract: any) => {
    return await contract.napaTokenAmount();
}

//7 nftInfo
export const nftInfo = async (contract: any, _nftId: number) => {
    return await contract.nftInfo(_nftId);
}

//8 owner
export const owner = async (contract: any) => {
    return await contract.owner();
}

//9 priceOfNFT
export const priceOfNFT = async (contract: any) => {
    return await contract.priceOfNFT();
}

//10 volume
export const volume = async (contract: any) => {
    return await contract.volume();
}