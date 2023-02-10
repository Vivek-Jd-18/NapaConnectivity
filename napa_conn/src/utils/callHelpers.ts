export const owner = async (contract: any) => {
    return await contract.owner();
}
//1 acceptOwnership
export const acceptOwnership = async (contract: any) => {
    return await contract.acceptOwnership();
}
//2 buyNftToken
export const buyNftToken = async (contract: any, _tokenSelect: number, _tokenID: number) => {
    return await contract.buyNftToken(_tokenSelect, _tokenID);
}
//3 fulfill
export const fulfill = async (contract: any, _requestedId: string, _volume: number) => {
    return await contract.fulfill(_requestedId, _volume);
}
//4 requestVolumeData
export const requestVolumeData = async (contract: any) => {
    return await contract.requestVolumeData();
}
//5 setSale
export const setSale = async (contract: any, _tokenId: number, salePrice: number, _address: string) => {
    return await contract.setSale(_tokenId, salePrice, _address);
}
//6 setSaleFromWallet
export const setSaleFromWallet = async (contract: any, _tokenId: number, salePrice: number) => {
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