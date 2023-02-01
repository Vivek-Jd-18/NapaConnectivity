import type { NextPage } from 'next';
import Container from '../../Layout/Container/Container';
import styles from './Payouts.module.scss';

import Image from 'next/image';
import Table from 'react-bootstrap/Table';
import Footer from '../Footer/Footer';
// import { numberFormatter } from '@/utils/payout';
import React, { useEffect } from 'react';
import { getTotalNapaUsersCount, getUsersCount } from '@/services/PayoutsApi';
import { SOCIAL_ART_WEBSOCKET_URL, WEBSOCKET_URL } from '@/constants/url';

const header = [
  'Tiers',
  'Token Awards Received',
  '% Value',
  'Value in NAPA Tokens',
  // 'Tenths',
  'Value in USD',
];
const headerViralTier = [
  'Viral Categories',
  'Reward Tiers Cap',
  'Bonus',
  'Value in NAPA Tokens',
  // 'Tenths',
  // 'Value in USD',
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
    tokenAwards: '-',
    value: '10.00%',
    valueInNAPA: '0.10000000',
    valueInDollars: '$100.00',
  },
  {
    tiers: 'Tier 2',
    tokenAwards: '-',
    value: '20.00%',
    valueInNAPA: '0.20000000',
    valueInDollars: '$100.00',
  },
  {
    tiers: 'Tier 3',
    tokenAwards: '-',
    value: '30.00%',
    valueInNAPA: '0.30000000',
    valueInDollars: '$100.00',
  },
  {
    tiers: 'Tier 4',
    tokenAwards: '-',
    value: '40.00%',
    valueInNAPA: '0.40000000',
    valueInDollars: '$100.00',
  },
  {
    tiers: 'Tier 5',
    tokenAwards: '-',
    value: '50.00%',
    valueInNAPA: '0.50000000',
    valueInDollars: '$100.00',
  },
  {
    tiers: 'Tier 6',
    tokenAwards: '-',
    value: '60.00%',
    valueInNAPA: '0.60000000',
    valueInDollars: '$100.00',
  },
  {
    tiers: 'Tier 7',
    tokenAwards: '-',
    value: '70.00%',
    valueInNAPA: '0.70000000',
    valueInDollars: '$100.00',
  },
  {
    tiers: 'Tier 8',
    tokenAwards: '-',
    value: '80.00%',
    valueInNAPA: '0.80000000',
    valueInDollars: '$100.00',
  },
  {
    tiers: 'Tier 9',
    tokenAwards: '-',
    value: '90.00%',
    valueInNAPA: '0.90000000',
    valueInDollars: '$100.00',
  },
  {
    tiers: 'Tier 10',
    tokenAwards: '-',
    value: '100.00%',
    valueInNAPA: '1.00000000',
    valueInDollars: '$100.00',
  },
];
const dummyViralTiers = [
  {
    viralCat: 'Lame',
    rewardTier: '-',
    bonus: 20,
    valueInNAPA: '0.00000000',
  },
  {
    viralCat: 'Going Viral',
    rewardTier: '-',
    bonus: 40,
    valueInNAPA: '0.01562500',
  },
  {
    viralCat: 'Almost Viral',
    rewardTier: '-',
    bonus: 60,
    valueInNAPA: '0.03125000',
  },
  {
    viralCat: 'Semi Viral',
    rewardTier: '-',
    bonus: 80,
    valueInNAPA: '0.04687500',
  },
  {
    viralCat: 'Viral',
    rewardTier: '-',
    bonus: 100,
    valueInNAPA: '0.06250000',
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
  const [usersCount, setUsersCount] = React.useState<any>();
  const [totalUsers, setTotalUsers] = React.useState('');
  const socialArtSocket = new WebSocket(SOCIAL_ART_WEBSOCKET_URL);
  const socket = new WebSocket(WEBSOCKET_URL);
  const [tokenPrice, setTokenPrice] = React.useState(
    Number((Math.random() * (5 - 4) + 4).toFixed(8))
  );

  const handleGetUsersCount = async () => {
    const { data }: any = await getUsersCount();
    setUsersCount(data?.data || null);
    console.log(data.data);
  };

  const handleGetTotalNapaUsersCount = async () => {
    const { data }: any = await getTotalNapaUsersCount();
    setTotalUsers(data?.data?.totalUsers || null);
    console.log(data.data);
  };

  useEffect(() => {
    handleGetUsersCount();
    handleGetTotalNapaUsersCount();
  }, []);

  useEffect(() => {
    // @ts-ignore
    socialArtSocket.addEventListener('message', ({ data }) => {
      const response = JSON.parse(data);
      if (response?.event === 'users-count') {
        setUsersCount(response?.count);
      } else if (response?.event === 'napa-token-price') {
        setTokenPrice(response?.price);
      }
    });
    return () => {
      socialArtSocket.removeEventListener('message', () => {});
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // @ts-ignore
    socket.addEventListener('message', ({ data }) => {
      const response = JSON.parse(data);
      if (response?.event === 'total-users') {
        setTotalUsers(response?.totalUsers);
      }
    });
    return () => {
      socket.removeEventListener('message', () => {});
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const countForamatter = (count: number) => {
    const total = count
      ? count < 10
        ? '00' + count
        : count < 100
        ? '0' + count
        : count
      : '000';
    return total;
  };

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
                          {tokenPrice}
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
                        {countForamatter(Number(totalUsers))}
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
                        {countForamatter(
                          Number(usersCount?.monthlyActiveUsers)
                        )}
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
                        {countForamatter(Number(usersCount?.weeklyActiveUsers))}
                      </div>
                    </div>
                  </div>
                </div>
                {/* <div
                  className={`col-xl-2 col-md-3 col-sm-5 border mx-2 ${styles.payoutsMetaHuman}`}
                  style={{ borderColor: '#91A5A6', opacity: 0.2 }}
                > */}
                {/* <div
                    className={`d-flex  p-2 justify-content-center ${styles.payoutsText} ${styles.payoutsCharisImag}`}
                  >
                    Insert Chris */}
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
                {/* </div> */}
                {/* </div> */}
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
                          {header.map((item, index) => (
                            <td key={index} className={styles.payoutsTableHead}>
                              {item}
                            </td>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {dummyData.map((item, index) => (
                          <tr key={index} className={styles.payoutsTableRow}>
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
                                />
                                <span style={{ marginLeft: '0.5rem' }}>
                                  {item.valueInNAPA}
                                </span>
                              </div>
                            </td>
                            <td>
                              {`$${(
                                tokenPrice *
                                (((index + 1) * 10) / 100)
                              ).toFixed(2)}`}
                            </td>
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
                          {headerViralTier.map((item, index) => (
                            <td key={index} className={styles.payoutsTableHead}>
                              {item}
                            </td>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {dummyViralTiers.map((item, index) => (
                          <tr key={index} className={styles.payoutsTableRow}>
                            <td>{item.viralCat}</td>
                            <td>{item.rewardTier}</td>
                            <td>{`${item.bonus.toFixed(2)}%`}</td>
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
                                <span style={{ marginLeft: '0.5rem' }}>
                                  {item.valueInNAPA}
                                </span>
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
                          {headerEatherTransactions.map((item, index) => (
                            <td key={index} className={styles.payoutsTableHead}>
                              {item}
                            </td>
                          ))}
                        </tr>
                      </thead>

                      <tbody>
                        {dummyEatherScanTransactions.map((item, index) => (
                          <tr key={index} className={styles.payoutsTableRow}>
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
              <div>
                <hr />
                <Footer footerIconShow={false} />
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Payouts;
