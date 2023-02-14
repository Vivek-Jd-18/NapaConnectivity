//1 lazyMint
export const lazyMint = async (contract: any,
    _seller: string,
    salePrice: string|undefined,
    _TokenSelect: number,
    tokenUri: string,
    _transferToNapa: boolean,
    _setSaleMinter: boolean,tx?:any) => {
    return await contract.lazyMint(
        _seller,
        salePrice,
        _TokenSelect,
        tokenUri,
        _transferToNapa,
        _setSaleMinter
    );
}
//2 lazyMint with eth
export const lazyMintEth = async (contract: any,
    _seller: string,
    salePrice: string,
    _TokenSelect: number,
    tokenUri: string,
    _transferToNapa: boolean,
    _setSaleMinter: boolean,tx?:any) => {
    return await contract.lazyMint(
        _seller,
        salePrice,
        _TokenSelect,
        tokenUri,
        _transferToNapa,
        _setSaleMinter,
        tx
    );
}

// uint public NapaMintFee;
// uint public UsdtMintFee;
// IERC20 public NapaToken;
// IERC20 public Usdt;
// uint public ethFee;


//3 fetchEthFee
export const ethFee = async (contract: any) => {
    return await contract.ethFee();
}

//4 NapaMintFee
export const NapaMintFee:any = async (contract: any) => {
    return await contract.NapaMintFee();
}

//5 fetchEthFee
export const UsdtMintFee = async (contract: any) => {
    return await contract.UsdtMintFee();
}