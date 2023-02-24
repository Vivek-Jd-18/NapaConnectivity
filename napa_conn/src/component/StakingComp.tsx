import React, { useContext, useState } from 'react'
import { ethers } from "ethers";
import {
    owner, checkReward, deposit,
    pendingRewards, totalStaked, treasuryWallet
    ,
    _claim, renounceOwnership, stakeTokens,
    transferOwnership, UnstakeTokens, updateTreasuryWallet, withdrawAnyTokens, withdrawFunds
} from "../utils/testnet/CallHelpers/napaStakeCallHelpers"
import { originalNapaStakingContract, originalNapaTokenContract } from '../utils/testnet/conractObjects/contractObject';

import { CurrentUserContext } from '../App';
import { originalNapaStakingAddress } from '../utils/testnet/addressHelpers/addressHelper';
import { approve, balanceOf } from '../utils/testnet/CallHelpers/napaTokenCallHelpers';

export const StakingComp = () => {


    const currentUser = useContext(CurrentUserContext);
    const _provider = currentUser._provider;
    const _signer = currentUser._signer;
    const CurrentWalletAddress = currentUser.CurrentWalletAddress;

    const [stakePlan, setStakePlan] = useState<number>(0);
    const [stakeAmt, setStakeAmt] = useState<number>(0);
    const [currentUserReward, setCurrentUserReward] = useState<number>();
    const [stakeBtnStyle, setStakeBtnStyle] = useState<string>("btn btn-outline-success disabled");

    const decimals = 10 ** 18;

    const amtHandler = (e: any) => {
        setStakeAmt(e.target.value);
        if (stakeAmt > 0) {
            setStakeBtnStyle("btn btn-outline-success");
        }
        else {
            setStakeBtnStyle("btn btn-outline-success disabled");
        }
    }

    const changePlan = (plan: number) => {
        setStakePlan(plan);
        if (stakeAmt > 0) {
            setStakeBtnStyle("btn btn-outline-success");
        }
        else {
            setStakeBtnStyle("btn btn-outline-success disabled");
        }
    }

    // const getCallFunctions = async () => {
    //     const stakeCtr = await originalNapaStakingContract(_signer);
    //     try {
    //         console.log(stakeCtr, "-==-stakeCtr-==-");
    //         console.log(await owner(stakeCtr), "owner");
    //         // console.log(await checkReward(stakeCtr), "checkReward");
    //         console.log(await deposit(stakeCtr, originalNapaStakingAddress), "deposit");
    //         console.log(await pendingRewards(stakeCtr), "pendingRewards");
    //         console.log(await totalStaked(stakeCtr), "totalStaked");
    //         console.log(await treasuryWallet(stakeCtr), "treasuryWallet");
    //     } catch (e) {
    //         alert("Need to connect wallet first");
    //         console.log("Need to connect wallet first");
    //     }
    // }

    const _checkReward = async () => {
        const oriNapaStakeCtr = await originalNapaStakingContract(_signer);
        console.log((await checkReward(oriNapaStakeCtr)).toString(), "checkReward");
        setCurrentUserReward(Number((await checkReward(oriNapaStakeCtr)).toString()) / decimals);
    }

    const handleStake = async () => {
        await _checkReward();
        const amount = stakeAmt;
        console.log("in stake", stakeAmt);
        const oriNapaTokenCtr = await originalNapaTokenContract(_signer);
        const oriNapaStakeCtr = await originalNapaStakingContract(_signer);
        const amtInWei = amount * decimals;
        //1. check if user have enough balance or not
        const userBal: Promise<number> = await balanceOf(oriNapaTokenCtr, CurrentWalletAddress);
        if ((await userBal / decimals) > amount && await userBal > 0) {
            //2. user gives allowance to staking 
            await approve(oriNapaTokenCtr, originalNapaStakingAddress, amtInWei.toString()).then(async (res) => {
                console.log("Hang on Transaction is in progress...");
                await res.wait();
                console.log(await res.wait(), "stake approval response");
                //3. after approval to stake contract actual staking will happen down here
                if (stakePlan == 1) {
                    await stakeTokens(oriNapaStakeCtr, amtInWei.toString(), 30).then(async (res) => {
                        console.log("Hang on Transaction is in progress...");
                        await res.wait();
                        console.log(await res.wait(), "success response from staking");
                    }).catch((e) => {
                        console.log(e, "error in stake token 30 days")
                    })
                } else if (stakePlan == 2) {
                    await stakeTokens(oriNapaStakeCtr, amtInWei.toString(), 60).then(async (res) => {
                        console.log("Hang on Transaction is in progress...");
                        await res.wait();
                        console.log(await res.wait(), "success response from staking");
                    }).catch((e) => {
                        console.log(e, "error in stake token 60 days")
                    })
                } else if (stakePlan == 3) {
                    await stakeTokens(oriNapaStakeCtr, amtInWei.toString(), 90).then(async (res) => {
                        console.log("Hang on Transaction is in progress...");
                        await res.wait();
                        console.log(await res.wait(), "success response from staking");
                    }).catch((e) => {
                        console.log(e, "error in stake token 90 days")
                    })
                } else if (stakePlan == 4) {
                    await stakeTokens(oriNapaStakeCtr, amtInWei.toString(), 120).then(async (res) => {
                        console.log("Hang on Transaction is in progress...");
                        await res.wait();
                        console.log(await res.wait(), "success response from staking");
                    }).catch((e) => {
                        console.log(e, "error in stake token 120 days")
                    })
                } else {
                    console.log("selected wrong plan");
                }
            }).catch((e) => {
                console.log(e, "error in approval of stake contract");
            })
        } else {
            console.log("either your balance is low or you don't have enough amount to stake");
        }
    }

    const handleUnStake = async () => {
        const oriNapaStakeCtr = await originalNapaStakingContract(_signer);
        const oriNapaTokenCtr = await originalNapaTokenContract(_signer);

        const userDeposit = await deposit(oriNapaStakeCtr, CurrentWalletAddress);
        console.log(userDeposit[0].toString(), "-=-=plan-=-=");
        console.log(userDeposit[1].toString(), "-=-=Amount-=-=");
        console.log(userDeposit[2].toString(), "-=-=startTime-=-=");
        console.log(userDeposit[3].toString(), "-=-=EndTime-=-=");
        console.log(userDeposit[4].toString(), "-=-=LastClaimTime-=-=");

        if (Number(userDeposit[1].toString()) <= 0) {
            console.log("you don't have any tokens staked yet");
        } else if (Number(userDeposit[3].toString()) <= 0) {
            console.log("Tokens are locked, you can't unstake now");
        } else {
            const treasuryToStakeCtrAllowance =  await pendingRewards(oriNapaTokenCtr);

            if (treasuryToStakeCtrAllowance>0) {
                await UnstakeTokens(oriNapaStakeCtr);
            } else {
                console.log();
            }
        }
    }


    return (
        <>
            <div className='container-fluid mt-2'>
                <div><h2>NAPA Stake</h2></div>
                <div>
                    <div className='div'>
                        <div className='row'>
                            <div className="col-3">
                            </div>
                            <div className="col-6">
                                <div className="card" style={{ width: "100%" }}>
                                    <div className="card-body">
                                        <div className='d-flex justify-content-around'>
                                            <div className='ms-0'>
                                                <h5 className="card-title">Stake Tokens</h5>
                                                <h6 className="card-subtitle mb-2 text-muted">Lock/Stake Tokens</h6>
                                            </div>
                                            <div className='ms-0'>
                                                <h5 className="card-title">Your Current Reward</h5>
                                                <h6 className="card-subtitle mb-2 text-muted">{currentUserReward}</h6>
                                            </div>
                                        </div>

                                        <div className="input-group mb-3">
                                            <input type="number" className="form-control" placeholder="Amount To stake" aria-label="Amount To stake" aria-describedby="button-addon2" onChange={amtHandler} />
                                            <button className={stakeBtnStyle} type="button" id="button-addon2" onClick={handleStake}>Stake</button>
                                            <br />
                                        </div>
                                        <div className="btn-group" role="group" aria-label="Basic outlined example">
                                            <button type="button" className="btn btn-outline-primary" onClick={() => changePlan(1)}>30 Days</button>
                                            <button type="button" className="btn btn-outline-primary" onClick={() => changePlan(2)}>60 Days</button>
                                            <button type="button" className="btn btn-outline-primary" onClick={() => changePlan(3)}>90 Days</button>
                                            <button type="button" className="btn btn-outline-primary" onClick={() => changePlan(4)}>120 Days</button>
                                        </div>
                                        <div className='mt-2'>
                                            <span>Plan Selected - {stakePlan == 0 ? "not selected" : stakePlan == 1 ? "30 days" : stakePlan == 2 ? "60 days" : stakePlan == 3 ? "90 days" : stakePlan == 4 ? "120 days" : null}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-3">
                            </div>
                        </div>
                    </div>
                </div>

                <div className='mt-4'>
                    <div><h2>NAPA UnStake</h2></div>
                    <div>
                        <div className='div'>
                            <div className='row'>
                                <div className="col-3">
                                </div>
                                <div className="col-6">
                                    <div className="card" style={{ width: "100%" }}>
                                        <div className="card-body">
                                            <div className='d-flex justify-content-around'>
                                                <div className='ms-0'>
                                                    <h5 className="card-title">UnStake Tokens</h5>
                                                    <h6 className="card-subtitle mb-2 text-muted">UnStake Tokens</h6>
                                                </div>
                                                <div className='ms-0'>
                                                    <h5 className="card-title">Your Current Reward</h5>
                                                    <h6 className="card-subtitle mb-2 text-muted">{currentUserReward}</h6>
                                                </div>
                                            </div>

                                            <div className="input-group mb-3">
                                                <input type="number" className="form-control" placeholder="Amount To stake" aria-label="Amount To stake" aria-describedby="button-addon2" onChange={amtHandler} />
                                                <button className={stakeBtnStyle} type="button" id="button-addon2" onClick={handleUnStake}>Stake</button>
                                                <br />
                                            </div>
                                            <div className="btn-group" role="group" aria-label="Basic outlined example">
                                                <button type="button" className="btn btn-outline-primary" onClick={() => changePlan(1)}>30 Days</button>
                                                <button type="button" className="btn btn-outline-primary" onClick={() => changePlan(2)}>60 Days</button>
                                                <button type="button" className="btn btn-outline-primary" onClick={() => changePlan(3)}>90 Days</button>
                                                <button type="button" className="btn btn-outline-primary" onClick={() => changePlan(4)}>120 Days</button>
                                            </div>
                                            <div className='mt-2'>
                                                <span>Plan Selected - {stakePlan == 0 ? "not selected" : stakePlan == 1 ? "30 days" : stakePlan == 2 ? "60 days" : stakePlan == 3 ? "90 days" : stakePlan == 4 ? "120 days" : null}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-3">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}