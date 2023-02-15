//1 lazyMint with Napa and USDT
export const lazyMint = async (contract: any,
    _seller: string,
    salePrice: string | undefined,
    _TokenSelect: number,
    tokenUri: string,
    _transferToNapa: boolean,
    _setSaleMinter: boolean, tx?: any) => {
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
    _setSaleMinter: boolean, tx?: any) => {
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

//3 fetchEthFee
export const ethFee = async (contract: any) => {
    return await contract.ethFee();
}

//4 NapaMintFee
export const NapaMintFee: any = async (contract: any) => {
    return await contract.NapaMintFee();
}

//5 fetchEthFee
export const UsdtMintFee = async (contract: any) => {
    return await contract.UsdtMintFee();
}

//6 approve
export const approve = async (contract: any, approveTo: string, _amount: string) => {
    try{
        return await contract.approve(approveTo, _amount);
    }catch(e:any){
        console.log(e.message,e.code,"Error Caught")
    }
}

//7 allowance
export const allowance = async (contract: any, _from?: string, _to?: string) => {
    return await contract.allowance(_from, _to);
}