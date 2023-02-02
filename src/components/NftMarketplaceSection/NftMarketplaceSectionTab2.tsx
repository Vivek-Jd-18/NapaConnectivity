import NftProjectCard from '../NftProjectCard/NftProjectCard';
import React, { useEffect } from 'react';
import styles from './NftMarketplaceSection.module.scss';
import LeaderboardsSliderComponent from '../Leaderboards/LeaderboardsSlider';
import { Avatar, ErrorIcon } from '../../components/assets';
import { SnftResponse } from '@/types/marketplace';
import { toast } from 'react-toastify';
import { CustomToastWithLink } from '../CustomToast/CustomToast';
import { getAllSnfts } from '@/services/MarketplaceApi';
import { FadeLoader } from 'react-spinners';

const NftMarketplaceSectionTab2 = () => {
  const [snftsData, setSnftsData] = React.useState<SnftResponse[] | null>(null);
  const [loading, setLoading] = React.useState(false);
  const data = [
    {
      background: '',
      userName: '@TomBradley',
      title: 'Illusions of Darkness',
      currentBid: '200',
      ending: '10',
      avatar: Avatar,
    },
  ];

  useEffect(() => {
    handleGetSnfts();
  }, []);

  const handleGetSnfts = async () => {
    setLoading(true);
    const { data, error, message }: any = await getAllSnfts();
    if (error) {
      setLoading(false);
      toast.error(
        CustomToastWithLink({
          icon: ErrorIcon,
          title: 'Error',
          description: message,
          time: 'Now',
        })
      );
      return;
    }
    setSnftsData(data?.data || []);
    setLoading(false);
  };
  return (
    <>
      {loading || snftsData?.length == 0 ? (
        <div className={styles.loaderContainer}>
          {loading ? <FadeLoader color="#ffffff" /> : <h3>No Data Found</h3>}
        </div>
      ) : (
        <div id="sliderComponent">
          <LeaderboardsSliderComponent dataLength={data.length}>
            {snftsData?.map((val) => {
              return (
                <div key={1} className={styles.projectCardContainer}>
                  <NftProjectCard
                    backgroundImage={val.thumbnail}
                    avatar={val.userImage}
                    ending={val.duration}
                    currentBid={val.amount}
                    userName={val.userName}
                    title={val.SNFTTitle}
                  />
                </div>
              );
            })}
          </LeaderboardsSliderComponent>
        </div>
      )}
    </>
  );
};

export default NftMarketplaceSectionTab2;
