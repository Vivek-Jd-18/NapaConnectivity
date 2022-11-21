import type { NextPage } from 'next';
import Container from '../../Layout/Container/Container';
import styles from './Payouts.module.scss';

import Image from 'next/image';
import Table from 'react-bootstrap/Table';
import Footer from '../Footer/Footer';
import { numberFormatter } from '@/utils/payout';

const napaUserData = {
  napaTokenPrice: '2.48250000',
  totalUser: '328',
  monthlyActiveUser: '87',
  dailyActiveUser: '16',
};

const header = [
  'Tiers',
  'Token Awards',
  '% Value',
  'Value in NAPA Tokens',
  'Value in USD',
];
const headerViralTier = [
  'Viral Categories',
  'Reward Tiers',
  'Bonus',
  'Value in NAPA Tokens',
];
const headerEatherTransactions = [
  'Txn Hash',
  'Method',
  'Block',
  'Age',
  'From',
  'to',
  'Value',
  'Txn Fee',
];
const dummyData = [
  {
    tiers: 'Tier 1',
    tokenAwards: '1-10',
    value: '10.00%',
    valueInNAPA: '0.00000',
    valueInDollars: '$100.00',
  },
  {
    tiers: 'Tier 1',
    tokenAwards: '1-10',
    value: '10.00%',
    valueInNAPA: '0.00000',
    valueInDollars: '$100.00',
  },
  {
    tiers: 'Tier 1',
    tokenAwards: '1-10',
    value: '10.00%',
    valueInNAPA: '0.00000',
    valueInDollars: '$100.00',
  },
  {
    tiers: 'Tier 1',
    tokenAwards: '1-10',
    value: '10.00%',
    valueInNAPA: '0.00000',
    valueInDollars: '$100.00',
  },
  {
    tiers: 'Tier 1',
    tokenAwards: '1-10',
    value: '10.00%',
    valueInNAPA: '0.00000',
    valueInDollars: '$100.00',
  },
  {
    tiers: 'Tier 1',
    tokenAwards: '1-10',
    value: '10.00%',
    valueInNAPA: '0.00000',
    valueInDollars: '$100.00',
  },
];
const dummyViralTiers = [
  {
    viralCat: 'Lame',
    rewardTier: 'Tier 1 & 2',
    bonus: '0.00%',
    valueInNAPA: '0.00000',
  },
  {
    viralCat: 'Lame',
    rewardTier: 'Tier 1 & 2',
    bonus: '0.00%',
    valueInNAPA: '0.00000',
  },
  {
    viralCat: 'Lame',
    rewardTier: 'Tier 1 & 2',
    bonus: '0.00%',
    valueInNAPA: '0.00000',
  },
  {
    viralCat: 'Lame',
    rewardTier: 'Tier 1 & 2',
    bonus: '0.00%',
    valueInNAPA: '0.00000',
  },
  {
    viralCat: 'Lame',
    rewardTier: 'Tier 1 & 2',
    bonus: '0.00%',
    valueInNAPA: '0.00000',
  },
  {
    viralCat: 'Lame',
    rewardTier: 'Tier 1 & 2',
    bonus: '0.00%',
    valueInNAPA: '0.00000',
  },
];

const dummyEatherScanTransactions = [
  {
    txnHash: '0xdb4f..4ba2',
    method: 'Transfer',
    block: '15921858',
    age: '9 sec ago',
    from: 'Endless Rays',
    to: 'Wave Navigate',
    value: '0.56',
    txnFee: '0.02',
  },
  {
    txnHash: '0xdb4f..4ba2',
    method: 'Transfer',
    block: '15921858',
    age: '9 sec ago',
    from: 'Endless Rays',
    to: 'Wave Navigate',
    value: '0.56',
    txnFee: '0.02',
  },
  {
    txnHash: '0xdb4f..4ba2',
    method: 'Transfer',
    block: '15921858',
    age: '9 sec ago',
    from: 'Endless Rays',
    to: 'Wave Navigate',
    value: '0.56',
    txnFee: '0.02',
  },
  {
    txnHash: '0xdb4f..4ba2',
    method: 'Transfer',
    block: '15921858',
    age: '9 sec ago',
    from: 'Endless Rays',
    to: 'Wave Navigate',
    value: '0.56',
    txnFee: '0.02',
  },
  {
    txnHash: '0xdb4f..4ba2',
    method: 'Transfer',
    block: '15921858',
    age: '9 sec ago',
    from: 'Endless Rays',
    to: 'Wave Navigate',
    value: '0.56',
    txnFee: '0.02',
  },
  {
    txnHash: '0xdb4f..4ba2',
    method: 'Transfer',
    block: '15921858',
    age: '9 sec ago',
    from: 'Endless Rays',
    to: 'Wave Navigate',
    value: '0.56',
    txnFee: '0.02',
  },
];

const Payouts: NextPage = () => {
  return (
    <>
      <div className={styles.backgroundImage} id="payouts">
        <Container className={`${styles.payoutsContainer} asinnerContainer`}>
          <div className={`row col-12 ${styles.payoutsBodyContainer} `}>
            <div className={`col-xl-12 col-md-12`}>
              <h1 className={`${styles.payouts}`}>
                NAPA <span>Payouts</span>
              </h1>

              <div className={styles.tabsContainer}>
                <div className="col-xl-9 col-md-9 col-sm-7">
                  <div className="">
                    <div className={`${styles.napaTokenPriceContainer}`}>
                      <div className={`p-2 ${styles.payoutsText}`}>
                        NAPA Token Price
                      </div>
                      <div className="d-flex flex-row align-items-center">
                        <div
                          className={` px-2 align-self-center ${styles.payoutsText}`}
                        >
                          <Image
                            src={'/assets/images/napa_icon.png'}
                            alt="Trending"
                            width={30}
                            height={30}
                            loading="eager"
                            priority={true}
                          />
                        </div>
                        <div
                          className={`text-white ${styles.payoutsSubTextValue}`}
                        >
                          {napaUserData.napaTokenPrice}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 mt-2 d-flex justify-content-between">
                    <div
                      className={`col-4 ${styles.payoutUserDetail} d-flex justify-content-between flex-column`}
                    >
                      <div className={`${styles.payoutsSubText}`}>
                        Total NAPA Users
                      </div>
                      <div
                        className={`text-white ${styles.payoutsSubTextValue} pt-2`}
                      >
                        {numberFormatter(napaUserData.totalUser, 1)}
                      </div>
                    </div>
                    <div
                      className={`col-4 ${styles.payoutUserDetail} d-flex justify-content-between flex-column`}
                    >
                      <div className={`${styles.payoutsSubText}`}>
                        Monthly Active Users
                      </div>

                      <div
                        className={`text-white ${styles.payoutsSubTextValue} pt-2`}
                      >
                        {numberFormatter(napaUserData.monthlyActiveUser, 1)}
                      </div>
                    </div>
                    <div
                      className={`col-4 ${styles.payoutUserDetail} d-flex justify-content-between flex-column`}
                    >
                      <div className={`${styles.payoutsSubText}`}>
                        Daily Active Users
                      </div>

                      <div
                        className={`text-white ${styles.payoutsSubTextValue} pt-2`}
                      >
                        {numberFormatter(napaUserData.dailyActiveUser, 1)}
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className={`col-xl-2 col-md-3 col-sm-5 border mx-2 ${styles.payoutsMetaHuman}`}
                  style={{ borderColor: '#91A5A6', opacity: 0.2 }}
                >
                  <div
                    className={`d-flex  p-2 justify-content-center ${styles.payoutsText} ${styles.payoutsCharisImag}`}
                  >
                    Insert Chris
                    {/* <Image
                      src={'/assets/images/avatar-dummy.png'}
                      alt="Trending"
                      layout="fill"
                      objectFit="contain"
                      loading="eager"
                      priority={true}
                      // style={{
                      //   alignItems: 'center',
                      //   alignSelf: 'center',
                      // }}
                    /> */}
                  </div>
                </div>
              </div>

              <div
                className={`${styles.socialMediaReviewContainer} otherscroll`}
              >
                <div>
                  <div className={`${styles.payoutsText} text-white`}>
                    Reward Tiers
                  </div>
                  <div className={`${styles.payoutsTableRow} text-white my-2`}>
                    Award %value is a percentage of the current token price and
                    payout amounts will fluctuate based on trading.
                  </div>
                  <div className={styles.tableContainer}>
                    <Table responsive>
                      <thead>
                        <tr>
                          {header.map((item) => (
                            <td key={item} className={styles.payoutsTableHead}>
                              {item}
                            </td>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {dummyData.map((item) => (
                          <tr
                            key={item.tiers}
                            className={styles.payoutsTableRow}
                          >
                            <td>{item.tiers}</td>
                            <td>{item.tokenAwards}</td>
                            <td>{item.value}</td>
                            <td>
                              <div>
                                <Image
                                  src={'/assets/images/napa_white_icon.png'}
                                  alt="Trending"
                                  loading="eager"
                                  priority={true}
                                  width={10}
                                  height={10}
                                />{' '}
                                {item.valueInNAPA}
                              </div>
                            </td>
                            <td>{item.valueInDollars}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                </div>
                <div className=" my-4">
                  <div className={`${styles.payoutsText} text-white`}>
                    Viral Tiers
                  </div>
                  <div className={styles.tableContainer}>
                    <Table responsive>
                      <thead>
                        <tr>
                          {headerViralTier.map((item) => (
                            <td key={item} className={styles.payoutsTableHead}>
                              {item}
                            </td>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {dummyViralTiers.map((item) => (
                          <tr
                            key={item.viralCat}
                            className={styles.payoutsTableRow}
                          >
                            <td>{item.viralCat}</td>
                            <td>{item.rewardTier}</td>
                            <td>{item.bonus}</td>
                            <td>
                              <div>
                                <Image
                                  src={'/assets/images/napa_white_icon.png'}
                                  alt="Trending"
                                  loading="eager"
                                  priority={true}
                                  width={10}
                                  height={10}
                                />{' '}
                                {item.valueInNAPA}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                </div>
                <div className=" my-4">
                  <div className={`${styles.payoutsText} text-white`}>
                    Eatherscan Transactions
                  </div>
                  <div className={styles.tableContainer}>
                    <Table responsive>
                      <thead>
                        <tr>
                          {headerEatherTransactions.map((item) => (
                            <td key={item} className={styles.payoutsTableHead}>
                              {item}
                            </td>
                          ))}
                        </tr>
                      </thead>

                      <tbody>
                        {dummyEatherScanTransactions.map((item) => (
                          <tr
                            key={item.txnHash}
                            className={styles.payoutsTableRow}
                          >
                            <td className={styles.textColor}>{item.txnHash}</td>
                            <td>{item.method}</td>
                            <td className={styles.textColor}>{item.block}</td>
                            <td>{item.age}</td>
                            <td className={styles.textColor}>{item.from}</td>
                            <td className={styles.textColor}>{item.to}</td>
                            <td>
                              <div>
                                <Image
                                  src={'/assets/images/napa_white_icon.png'}
                                  alt="Trending"
                                  loading="eager"
                                  priority={true}
                                  width={10}
                                  height={10}
                                />
                                {item.value}
                              </div>
                            </td>
                            <td>
                              <div>
                                <Image
                                  src={'/assets/images/napa_white_icon.png'}
                                  alt="Trending"
                                  loading="eager"
                                  priority={true}
                                  width={10}
                                  height={10}
                                />
                                {item.txnFee}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                </div>
                {/* <Footer footerIconShow /> */}
              </div>
              <Footer footerIconShow />
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Payouts;
