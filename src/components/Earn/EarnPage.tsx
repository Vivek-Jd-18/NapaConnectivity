import Container from '../../Layout/Container/Container';
import Footer from '../Footer/Footer';
import styles from './Earn.module.scss';
import Image from 'next/image';
import { NapaIcon, NapaIconv2 } from '../assets';
// import SearchIconV2 from '../assets';
import Button from '../../components/Button/Button';
import moment from 'moment';
import React, { useState } from 'react';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import Link from 'next/link';
// you will need the css that comes with bootstrap@3. if you are using
// a tool like webpack, you can do the following:
import 'bootstrap/dist/css/bootstrap.css';
// you will also need the css that comes with bootstrap-daterangepicker
import 'bootstrap-daterangepicker/daterangepicker.css';

import { originalNapaStakingContract, originalNapaTokenContract } from '@/connectivity/contractObjects/contractObject1';
import { balanceOf, approve } from '@/connectivity/callHelpers/napaTokenCallHandlers';
import { UnstakeTokens, checkReward, UserPlanDetails, pendingRewards, stakeTokens } from '@/connectivity/callHelpers/napaStakeCallHandlers';
import { originalNapaStakingAddress } from '@/connectivity/addressHelpers/addressHelper';
import useWebThree from '@/hooks/useWebThree';

export default function EarnPage() {
  // const [_ethFee, setEthFee] = useState<string>("0")
  // const [ethBal, setEthBal] = useState<any>();
  const [stakePlan, setStakePlan] = useState<number>(0);
  const [stakeAmt, setStakeAmt] = useState<number>(0);

  const { address, chainId, signer } = useWebThree();
  console.log(address, chainId, "acc details")
  const decimals = 10 ** 18;

  // const onAmountChange = (e: any) => {
  //   const amount = e.target.value;

  //   if (!amount || amount.match(/^\d{1,}(\.\d{0,4})?$/)) {
  //     setLock(amount);
  //   }
  // };


  //staking/unstaking connectivity start
  const amtHandler = (e: any) => {
    setStakeAmt(e.target.value);
    if (stakeAmt > 0) {
      // setStakeBtnStyle("btn btn-outline-success");
    }
    else {
      // setStakeBtnStyle("btn btn-outline-success disabled");
    }
  }

  const changePlan = (plan: number) => {
    setStakePlan(plan);
    if (stakeAmt > 0) {
      // setStakeBtnStyle("btn btn-outline-success");
    }
    else {
      // setStakeBtnStyle("btn btn-outline-success disabled");
    }
  }
  const handleStake = async () => {
    const oriNapaTokenCtr = await originalNapaTokenContract(signer);
    const oriNapaStakeCtr = await originalNapaStakingContract(signer);

    const amount = Number(stakeAmt);

    let plan = 0;
    if (stakePlan == 1) {
      plan = 30;
    } else if (stakePlan == 2) {
      plan = 60;
    } else if (stakePlan == 3) {
      plan = 90;
    } else if (stakePlan == 4) {
      plan = 120;
    } else {
      alert("Invalid plan");
      throw (() => {
        console.log("Invalid Plan");
      })
    }

    const userDeposit = await UserPlanDetails(oriNapaStakeCtr, address, plan);
    const userStakedAmt = userDeposit[1].toString();
    if (userStakedAmt > 0) { alert("Already staked for this plan") }

    const amtInWei = amount * decimals;
    //1. check if user have enough balance or not
    const userBal: Promise<number> = await balanceOf(oriNapaTokenCtr, address);
    console.log(stakeAmt, "stakeAmt")


    if ((await userBal / decimals) > amount && await userBal > 0 && userStakedAmt <= 0 && Number(stakeAmt) > 0) {
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
      if (Number(stakeAmt) <= 0) {
        alert('please enter some amount');
        console.log(`please enter some amount`);
        return
      }
      if (userStakedAmt > 0) {
        console.log(`you already have ${userStakedAmt / decimals} token stake`);
      }
      if ((await userBal / decimals) < amount && await userBal <= 0) {
        console.log("you have less tokens to stake", (await userBal).toString());
      }
    }
  }

  const handleUnStake = async () => {
    const oriNapaStakeCtr = await originalNapaStakingContract(signer);

    let plan = 0;
    if (stakePlan == 1) {
      plan = 30;
    } else if (stakePlan == 2) {
      plan = 60;
    } else if (stakePlan == 3) {
      plan = 90;
    } else if (stakePlan == 4) {
      plan = 120;
    } else {
      alert("Invalid plan");
      throw (() => {
        console.log("Invalid Plan");
      })
    }

    const _userDeposit = await UserPlanDetails(oriNapaStakeCtr, address, plan);
    const userStakedAmt = _userDeposit[1].toString();
    console.log(_userDeposit[0].toString(), "userStakedAmt plan");
    console.log(_userDeposit[1].toString(), "userStakedAmt amount");
    console.log(_userDeposit[2].toString(), "userStakedAmt startime");
    console.log(_userDeposit[3].toString(), "userStakedAmt endtime");
    console.log(_userDeposit[4].toString(), "userStakedAmt last claimtime");
    console.log((await checkReward(oriNapaStakeCtr, 30)).toString(), "Your Rewards");

    const date = new Date(Number((_userDeposit[3].toString()) * 1000));
    var currentUnix = Math.round(+new Date() / 1000);

    if (Number(userStakedAmt.toString()) <= 0) {
      alert("you don't have any tokens staked yet for this plan")
      console.log("you don't have any tokens staked yet");
      return;
    } else if (Number(_userDeposit[3].toString()) > currentUnix) {
      alert(`Tokens are locked, you can't unstake now, wait till ${date}`)
      console.log("Tokens are locked, you can't unstake now");
      return;
    } else if (Number(_userDeposit[3].toString()) < Number(currentUnix)) {
      const treasuryToStakeCtrAllowance = await pendingRewards(oriNapaStakeCtr);
      if (treasuryToStakeCtrAllowance > 0) {
        await UnstakeTokens(oriNapaStakeCtr, 30).then(async (res: any) => {
          console.log("transaction for Unstake is in progress have patience...");
          console.log(await res.wait(), "Unstaked");
        }).catch((e: any) => {
          console.log(e, "Error While Unstaking");
        });
      } else {
        console.log("Not Enough Pending Rewards: admin hasn't added reawrds yet");
      }
    }
  }

  //staking/unstaking connectivity ends

  return (
    <div className={`${styles.container}`}>
      <Container className={`${styles.settingsContainer} asinnerContainer`}>
        <h1 className={styles.settings}>Staking</h1>
        <div className={styles.tabsContainer}>
          <div className="row align-items-center">
            <div className="col-lg-6 col-lg-6-rspnsv">
              <div className={styles.max540}>
                <div className={styles.TopLogo}>
                  <Image src={NapaIcon} alt="NapaIcon" width={48} height={48} />
                  <h4>
                    NAPA Token | <Link href="https://etherscan.io/token/0x8eb2df7137fb778a6387e84f17b80cc82cf9e884"> Etherscan </Link>
                    | Price $0.05 24h Chg +24%
                  </h4>
                </div>
                <div className={styles.MiddleCont}>
                  <label>Lock Amount</label>
                  <div className={styles.MiddleContInn}>
                    {/* <h3>0.48</h3> */}
                    <input
                      type="number"
                      // value={lock}
                      placeholder="0.00"
                      onChange={amtHandler}
                    // onClick={call}
                    />
                    <span />
                    <p>NAPA</p>
                  </div>
                </div>
                <div className={styles.BottomCont}>
                  <label>Lock Period</label><span>{<span>Plan Selected - {stakePlan == 0 ? "not selected" : stakePlan == 1 ? "30 days" : stakePlan == 2 ? "60 days" : stakePlan == 3 ? "90 days" : stakePlan == 4 ? "120 days" : null}</span>}</span>
                  <ul>
                    <li>
                      <input type="radio" name="lock-amout" id="amountOne" onClick={() => changePlan(1)} />
                      <p>30 Days</p>
                    </li>
                    <li>
                      <input type="radio" name="lock-amout" id="amountOne" onClick={() => changePlan(2)} />
                      <p>60 Days</p>
                    </li>
                    <li>
                      <input type="radio" name="lock-amout" id="amountOne" onClick={() => changePlan(3)} />
                      <p>90 Days</p>
                    </li>
                    <li>
                      <input type="radio" name="lock-amout" id="amountOne" onClick={() => changePlan(4)} />
                      <p>120 Days</p>
                    </li>
                  </ul>
                </div>
                <div className={styles.BottomAction}>
                  <Button text="Lock" onClick={handleStake} outlined />
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className={`${styles.EarnRightBox} ${styles.max540}`}>
                <h4>Staking Summary</h4>
                <div className={styles.EarnRightBoxInner}>
                  <p>Lock Start Date</p>
                  <span>12 Mar 2022</span>
                </div>
                <div className={styles.EarnRightBoxInner}>
                  <p>Interest Period</p>
                  <span>24 Jul 2022</span>
                </div>
                <div className={styles.EarnRightBoxInner}>
                  <p>Amount Locked</p>
                  <span className={styles.EarnRightBoxSpan}>
                    <Image src={NapaIconv2} alt="" width={17} height={13} />
                    20.01
                  </span>
                </div>
                <div className={styles.EarnRightBoxInner}>
                  <p>Lock Duration</p>
                  <span>15 Days</span>
                </div>
                <div className={styles.EarnRightBoxInner}>
                  <p>APY</p>
                  <span>9,45%</span>
                </div>
                <div className={styles.EarnRightBoxInner}>
                  <p>Daily APY</p>
                  <span>5.4%</span>
                </div>
                <div className={styles.EarnRightBoxInner}>
                  <p>Redeem Rewards</p>
                  <span>2.450.00</span>
                </div>
              </div>
            </div>
            <div className="col-lg-12 ">
              <div className={styles.MainTable}>
                <h4>Staked Holdings</h4>
                <div className={styles.RightTableSc}>
                  <div className="datepickerBox">
                    <DateRangePicker
                      initialSettings={{
                        singleDatePicker: true,
                        showDropdowns: true,
                        maxYear: parseInt(moment().format('YYYY'), 10),
                        opens: 'left',
                      }}
                    >
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Start Date"
                      />
                    </DateRangePicker>
                  </div>
                  <div className="datepickerBox">
                    <DateRangePicker
                      initialSettings={{
                        singleDatePicker: true,
                        showDropdowns: true,
                        maxYear: parseInt(moment().format('YYYY'), 10),
                        opens: 'left',
                      }}
                    >
                      <input
                        type="text"
                        className="form-control"
                        placeholder="End Date"
                      />
                    </DateRangePicker>
                  </div>
                  <button className={styles.SearchButton}>
                    {/* <Image src={SearchIconV2} alt="" width={24} height={24} /> */}
                  </button>
                </div>
              </div>
              <div className={styles.MainTableTable}>
                <div className={styles.TableHead}>
                  <h4>Lock Start Date</h4>
                  <h4>Interest Period</h4>
                  <h4>Amount Locked</h4>
                  <h4>Lock Duration</h4>
                  <h4>APY</h4>
                  <h4>Daily APY</h4>
                  <h4>Earned Rewards</h4>
                  <h4></h4>
                </div>
                <div className={styles.TableRowMain}>
                  <div className={styles.TableRow}>
                    <h4>
                      <label>Lock Start Date</label>
                      12 Mar 2022
                    </h4>
                    <h4>
                      <label>Interest Period</label>1 month
                    </h4>
                    <h4>
                      <label>Amount Locked</label>
                      <div>
                        <Image src={NapaIconv2} alt="" width={17} height={13} />{' '}
                        20.01
                      </div>
                    </h4>
                    <h4>
                      <label>Lock Duration</label>2 months
                    </h4>
                    <h4>
                      <label>APY</label>
                      9.45%
                    </h4>
                    <h4>
                      <label>Daily APY</label>
                      5.4%
                    </h4>
                    <h4>
                      <label>Redeem Rewards</label>
                      2.450.00
                    </h4>
                    <h4>
                      <label>&nbsp;</label>
                      <button className={styles.ClaimBtn} onClick={handleUnStake}>Claim 1</button>
                    </h4>
                  </div>
                  <div className={styles.TableRow}>
                    <h4>
                      <label>Lock Start Date</label>
                      12 Mar 2022
                    </h4>
                    <h4>
                      <label>Interest Period</label>1 month
                    </h4>
                    <h4>
                      <label>Amount Locked</label>
                      <div>
                        <Image src={NapaIconv2} alt="" width={17} height={13} />{' '}
                        20.01
                      </div>
                    </h4>
                    <h4>
                      <label>Lock Duration</label>2 months
                    </h4>
                    <h4>
                      <label>APY</label>
                      9.45%
                    </h4>
                    <h4>
                      <label>Daily APY</label>
                      5.4%
                    </h4>
                    <h4>
                      <label>Redeem Rewards</label>
                      2.450.00
                    </h4>
                    <h4>
                      <label>&nbsp;</label>
                      <button className={styles.ClaimBtn}>Claim</button>
                    </h4>
                  </div>
                  <div className={styles.TableRow}>
                    <h4>
                      <label>Lock Start Date</label>
                      12 Mar 2022
                    </h4>
                    <h4>
                      <label>Interest Period</label>1 month
                    </h4>
                    <h4>
                      <label>Amount Locked</label>
                      <div>
                        <Image src={NapaIconv2} alt="" width={17} height={13} />{' '}
                        20.01
                      </div>
                    </h4>
                    <h4>
                      <label>Lock Duration</label>2 months
                    </h4>
                    <h4>
                      <label>APY</label>
                      9.45%
                    </h4>
                    <h4>
                      <label>Daily APY</label>
                      5.4%
                    </h4>
                    <h4>
                      <label>Redeem Rewards</label>
                      2.450.00
                    </h4>
                    <h4>
                      <label>&nbsp;</label>
                      <button className={styles.ClaimBtn}>Claim</button>
                    </h4>
                  </div>
                  <div className={styles.TableRow}>
                    <h4>
                      <label>Lock Start Date</label>
                      12 Mar 2022
                    </h4>
                    <h4>
                      <label>Interest Period</label>1 month
                    </h4>
                    <h4>
                      <label>Amount Locked</label>
                      <div>
                        <Image src={NapaIconv2} alt="" width={17} height={13} />{' '}
                        20.01
                      </div>
                    </h4>
                    <h4>
                      <label>Lock Duration</label>2 months
                    </h4>
                    <h4>
                      <label>APY</label>
                      9.45%
                    </h4>
                    <h4>
                      <label>Daily APY</label>
                      5.4%
                    </h4>
                    <h4>
                      <label>Redeem Rewards</label>
                      2.450.00
                    </h4>
                    <h4>
                      <label>&nbsp;</label>
                      <button className={styles.ClaimBtn}>Claim</button>
                    </h4>
                  </div>
                  <div className={styles.TableRow}>
                    <h4>
                      <label>Lock Start Date</label>
                      12 Mar 2022
                    </h4>
                    <h4>
                      <label>Interest Period</label>1 month
                    </h4>
                    <h4>
                      <label>Amount Locked</label>
                      <div>
                        <Image src={NapaIconv2} alt="" width={17} height={13} />{' '}
                        20.01
                      </div>
                    </h4>
                    <h4>
                      <label>Lock Duration</label>2 months
                    </h4>
                    <h4>
                      <label>APY</label>
                      9.45%
                    </h4>
                    <h4>
                      <label>Daily APY</label>
                      5.4%
                    </h4>
                    <h4>
                      <label>Redeem Rewards</label>
                      2.450.00
                    </h4>
                    <h4>
                      <label>&nbsp;</label>
                      <button className={styles.ClaimBtn}>Claim</button>
                    </h4>
                  </div>
                  <div className={styles.TableRow}>
                    <h4>
                      <label>Lock Start Date</label>
                      12 Mar 2022
                    </h4>
                    <h4>
                      <label>Interest Period</label>1 month
                    </h4>
                    <h4>
                      <label>Amount Locked</label>
                      <div>
                        <Image src={NapaIconv2} alt="" width={17} height={13} />{' '}
                        20.01
                      </div>
                    </h4>
                    <h4>
                      <label>Lock Duration</label>2 months
                    </h4>
                    <h4>
                      <label>APY</label>
                      9.45%
                    </h4>
                    <h4>
                      <label>Daily APY</label>
                      5.4%
                    </h4>
                    <h4>
                      <label>Redeem Rewards</label>
                      2.450.00
                    </h4>
                    <h4>
                      <label>&nbsp;</label>
                      <button className={styles.ClaimBtn}>Claim</button>
                    </h4>
                  </div>
                  <div className={styles.TableRow}>
                    <h4>
                      <label>Lock Start Date</label>
                      12 Mar 2022
                    </h4>
                    <h4>
                      <label>Interest Period</label>1 month
                    </h4>
                    <h4>
                      <label>Amount Locked</label>
                      <div>
                        <Image src={NapaIconv2} alt="" width={17} height={13} />{' '}
                        20.01
                      </div>
                    </h4>
                    <h4>
                      <label>Lock Duration</label>2 months
                    </h4>
                    <h4>
                      <label>APY</label>
                      9.45%
                    </h4>
                    <h4>
                      <label>Daily APY</label>
                      5.4%
                    </h4>
                    <h4>
                      <label>Redeem Rewards</label>
                      2.450.00
                    </h4>
                    <h4>
                      <label>&nbsp;</label>
                      <button className={styles.ClaimBtn}>Claim</button>
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <div>
        <hr />
        <Footer footerIconShow={false} />
      </div>
    </div>
  );
}
