import React, { useEffect, useState } from 'react';
import styles from './Leaderboards.module.scss';
import LeaderboardsRankCards from './LeaderboardsRankCards';
import LeaderboardsSliderComponent from './LeaderboardsSlider';
import LeaderboardsRankList from './LeaderboardsRankList';
import { MostViewedPosts } from '../../types/post';
import { getMostAwardsPosts } from '../../services/PostApi';
import { FadeLoader } from 'react-spinners';
import { SOCIAL_ART_WEBSOCKET_URL } from '../../constants/url';

const LeaderboardsTab1 = () => {
  const socialArtSocket = new WebSocket(SOCIAL_ART_WEBSOCKET_URL);
  const [mostAwardedPosts, setMostAwardedPosts] = useState<
    MostViewedPosts[] | null
  >(null);
  const [loading, setLoading] = useState(false);

  const handleGetMostAwardedPosts = async () => {
    setLoading(true);
    const { data }: any = await getMostAwardsPosts();
    setMostAwardedPosts(data?.data || []);
    setLoading(false);
  };

  useEffect(() => {
    handleGetMostAwardedPosts();
  }, []);

  useEffect(() => {
    // @ts-ignore
    socialArtSocket.addEventListener('message', ({ data }) => {
      const response = JSON.parse(data);
      if (response?.event === 'most-awarded-posts') {
        setMostAwardedPosts(response?.posts);
      }
    });
    return () => {
      socialArtSocket.removeEventListener('message', () => {});
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className={styles.cardBoxContainer}>
        {loading || mostAwardedPosts?.length == 0 ? (
          <div className={styles.loading}>
            {loading ? <FadeLoader color="#ffffff" /> : <h3>No Post Found</h3>}
          </div>
        ) : (
          <>
            <div className={styles.CardBox}>
              <div id="nft-marketplace" className={styles.SliderMain}>
                <LeaderboardsSliderComponent
                  dataLength={mostAwardedPosts?.length}
                >
                  {mostAwardedPosts?.map((val, index) => {
                    return (
                      <>
                        <LeaderboardsRankCards
                          image={val.thumbnail}
                          itemName={'awards'}
                          itemAmount={val.awards || 0}
                          rank={index + 1}
                          userName={val.userName}
                          key={val.postId}
                        />
                      </>
                    );
                  })}
                </LeaderboardsSliderComponent>
              </div>
            </div>
            <div className={styles.LdrbrdListMain}>
              <div className={styles.LdrbrdListOverlay}>
                <div className={styles.LdrbrdList}>
                  {mostAwardedPosts?.map((val, index) => {
                    return (
                      <>
                        <LeaderboardsRankList
                          img={val.thumbnail}
                          rank={index + 1}
                          userName={val.userName}
                          count={val.awards || 0}
                        />
                      </>
                    );
                  })}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default LeaderboardsTab1;
