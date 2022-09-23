import Container from '../../Layout/Container/Container';
import Footer from '../Footer/Footer';
import styles from './Earn.module.scss';
import Image from 'next/image';
import { NapaIcon, NapaIconv2, SearchIconV2 } from '../assets';
import Button from '../../components/Button/Button';
import moment from 'moment';
import React, { useState } from 'react';
import DateRangePicker from 'react-bootstrap-daterangepicker';
// you will need the css that comes with bootstrap@3. if you are using
// a tool like webpack, you can do the following:
import 'bootstrap/dist/css/bootstrap.css';
// you will also need the css that comes with bootstrap-daterangepicker
import 'bootstrap-daterangepicker/daterangepicker.css';

export default function EarnPage() {
  const [lock, setLock] = useState<string>();

  const onAmountChange = (e: any) => {
    const amount = e.target.value;

    if (!amount || amount.match(/^\d{1,}(\.\d{0,4})?$/)) {
      setLock(amount);
    }
  };
  return (
    <div className={`${styles.container}`}>
      <Container className={`${styles.settingsContainer} asinnerContainer`}>
        <h1 className={styles.settings}>NAPA Earn</h1>
        <div className={styles.tabsContainer}>
          <div className="row align-items-center">
            <div className="col-lg-6 col-lg-6-rspnsv">
              <div className={styles.max540}>
                <div className={styles.TopLogo}>
                  <Image src={NapaIcon} alt="NapaIcon" width={48} height={48} />
                  <h4>
                    NAPA Token <span>NAPA</span>
                  </h4>
                </div>
                <div className={styles.MiddleCont}>
                  <label>Lock Amount</label>
                  <div className={styles.MiddleContInn}>
                    {/* <h3>0.48</h3> */}
                    <input
                      type="number"
                      value={lock}
                      placeholder="0.00"
                      onChange={onAmountChange}
                    />
                    <span />
                    <p>NAPA</p>
                  </div>
                </div>
                <div className={styles.BottomCont}>
                  <label>Lock Amount</label>
                  <ul>
                    <li>
                      <input type="radio" name="lock-amout" id="amountOne" />
                      <p>15 Days</p>
                    </li>
                    <li>
                      <input type="radio" name="lock-amout" id="amountOne" />
                      <p>30 Days</p>
                    </li>
                    <li>
                      <input type="radio" name="lock-amout" id="amountOne" />
                      <p>60 Days</p>
                    </li>
                    <li>
                      <input type="radio" name="lock-amout" id="amountOne" />
                      <p>120 Days</p>
                    </li>
                  </ul>
                </div>
                <div className={styles.BottomAction}>
                  <Button text="Lock" outlined />
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className={`${styles.EarnRightBox} ${styles.max540}`}>
                <h4>Summary</h4>
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
                <h4>Staked</h4>
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
                    <Image src={SearchIconV2} alt="" width={24} height={24} />
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
                  <h4>Redeem Rewards</h4>
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
