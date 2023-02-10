/**
    all the 'read' and 'write' functions of @contract @NAPASociety "NFT Conrtact" 
*/

//WRITE FUNCTIONS

//1 addToBlackList
export const addToBlackList = async (contract: any, _address: string) => {
    return await contract.addToBlackList(_address);
}
//2 approve
export const approve = async (contract: any, _to: string, _tokenId: number) => {
    return await contract.buyNftToken(_to, _tokenId);
}
//3 bulkMintToken
export const bulkMintToken = async (contract: any,
    tokenSelect: number,
    salePrice: Array<number>,
    tokenUri: Array<string>,
    _transferToNapa: Array<boolean>,
    _setSaleMinter: Array<boolean>) => {
    return await contract.bulkMintToken(
        salePrice,
        tokenUri,
        _transferToNapa,
        _setSaleMinter);
}
//4 removeFromBlackList
export const removeFromBlackList = async (contract: any, _address: string) => {
    return await contract.removeFromBlackList(_address);
}

//5 renounceOwnership
export const renounceOwnership = async (contract: any) => {
    return await contract.renounceOwnership();
}

//6 safeTransferFrom
export const safeTransferFrom = async (contract: any, _from: string, _to: string, _tokenId: number) => {
    return await contract.safeTransferFrom(_from, _to, _tokenId);
}

//7 safeTransferFrom
export const safeTransferFrom2 = async (contract: any,
    from: string,
    to: string,
    tokenId: number,
    data: string) => {
    return await contract.safeTransferFrom(from, to, tokenId, data);
}


//8 setApprovalForAll
export const setApprovalForAll = async (contract: any, _operator: string, _approved: boolean) => {
    return await contract.setApprovalForAll(_operator, _approved);
}


//9 setBaseURI
export const setBaseURI = async (contract: any, baseURI: string) => {
    return await contract.setBaseURI(baseURI);
}


//10 setFees
export const setFees = async (contract: any, _ethFeeNew: number, _usdtMintFee: number, _NapaMintFeeNew: number) => {
    return await contract.setFees(_ethFeeNew, _usdtMintFee, _NapaMintFeeNew);
}

//11 setTokenAddresses
export const setTokenAddresses = async (contract: any, _napaToken: string, _usdt: string) => {
    return await contract.setTokenAddresses(_napaToken, _usdt);
}

//12 setWallets
export const setWallets = async (contract: any, _NAPA_WALLET: string, _feeWallet: string) => {
    return await contract.setWallets(_NAPA_WALLET, _feeWallet);
}


//13 singleMintToken
export const singleMintToken = async (contract: any,
    _salePrice: number,
    _TokenSelect: number,
    _tokenUri: string,
    _transferToNapa: boolean,
    _setSaleMinter: boolean) => {
    return await contract.singleMintToken(_salePrice,
        _TokenSelect,
        _tokenUri,
        _transferToNapa,
        _setSaleMinter);
}


//14 transferFrom
export const transferFrom = async (contract: any,
    from: string,
    to: string,
    tokenId: number) => {
    return await contract.transferFrom(from, to, tokenId);
}

//15 transferOwnership
export const transferOwnership = async (contract: any,
    newOwner: string) => {
    return await contract.transferOwnership(newOwner);
}


//16 updatemarketPlaceAddress
export const updatemarketPlaceAddress = async (contract: any,
    _address: string) => {
    return await contract.updatemarketPlaceAddress(_address);
}



// READ FUNCTIONS

//1 NAPA_WALLET
export const NAPA_WALLET = async (contract: any) => {
    return await contract.NAPA_WALLET();
}

//2 NapaMintFee
export const NapaMintFee = async (contract: any) => {
    return await contract.NapaMintFee();
}

//3 NapaToken
export const NapaToken = async (contract: any) => {
    return await contract.NapaToken();
}

//4 Usdt
export const Usdt = async (contract: any) => {
    return await contract.Usdt();
}

//5 UsdtMintFee
export const UsdtMintFee = async (contract: any) => {
    return await contract.UsdtMintFee();
}

//6 _exist
export const _exist = async (contract: any, tokenId: number) => {
    return await contract._exist(tokenId);
}

//7 balanceOf
export const balanceOf = async (contract: any, _address: number) => {
    return await contract.balanceOf(_address);
}

//8 baseURI
export const baseURI = async (contract: any) => {
    return await contract.baseURI();
}

//9 blackList
export const blackList = async (contract: any, _address: string) => {
    return await contract.blackList(_address);
}

//10 ethFee
export const ethFee = async (contract: any) => {
    return await contract.ethFee();
}

//11 feeWallet
export const feeWallet = async (contract: any) => {
    return await contract.feeWallet();
}

//12 getApproved
export const getApproved = async (contract: any, _tokenId: number) => {
    return await contract.getApproved(_tokenId);
}

//13 isApprovedForAll
export const isApprovedForAll = async (contract: any, _owner: string, _operator: string) => {
    return await contract.isApprovedForAll(_owner, _operator);
}

//14 marketPlace
export const marketPlace = async (contract: any) => {
    return await contract.marketPlace();
}

//15 minters
export const minters = async (contract: any, _id: number) => {
    return await contract.minters(_id);
}

//16 name
export const name = async (contract: any) => {
    return await contract.name();
}

//17 owner
export const owner = async (contract: any) => {
    return await contract.owner();
}

//18 ownerOf
export const ownerOf = async (contract: any, _tokenId: number) => {
    return await contract.ownerOf(_tokenId);
}

//19 supportsInterface
export const supportsInterface = async (contract: any, _InterFaceId: number) => {
    return await contract.supportsInterface(_InterFaceId);
}

//20 symbol
export const symbol = async (contract: any) => {
    return await contract.symbol();
}

//21 tokenByIndex
export const tokenByIndex = async (contract: any, _index: number) => {
    return await contract.tokenByIndex(_index);
}

//22 tokenOfOwnerByIndex
export const tokenOfOwnerByIndex = async (contract: any, _owner: string, _index: number) => {
    return await contract.tokenOfOwnerByIndex(_owner, _index);
}

//23 tokenURI
export const tokenURI = async (contract: any, _tokenId: number) => {
    return await contract.tokenURI(_tokenId);
}

//24 totalSupply
export const totalSupply = async (contract: any) => {
    return await contract.totalSupply();
}


