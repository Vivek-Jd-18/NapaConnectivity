//1 approveNFT
export const approve = async (
    contract: any,
    _address: string, _tokenId: string | number
) => {
    try {
        return await contract.approve(_address, _tokenId);
    } catch (e: any) {
        console.log(e.message, e.code, 'Error Caught');
    }
};

//2 transferFrom
export const transferFrom = async (
    contract: any,
    from: string,
    to: string,
    tokenId: number | string) => {
    try {
        return await contract.transferFrom(from, to, tokenId);
    } catch (e: any) {
        console.log(e.message, e.code, 'Error Caught');
    }
};

