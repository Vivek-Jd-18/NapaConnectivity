import React, { useEffect, useState } from 'react';
import styles from './Leaderboards.module.scss';
import LeaderboardsRankCards from './LeaderboardsRankCards';
import LeaderboardsSliderComponent from './LeaderboardsSlider';
import LeaderboardsRankList from './LeaderboardsRankList';
import { MostViewedPosts } from '../../types/post';
import { getMostLikedPosts } from '../../services/PostApi';
import { FadeLoader } from 'react-spinners';
import { SOCIAL_ART_WEBSOCKET_URL } from '../../constants/url';

const LeaderboardsTab2 = () => {
  const socialArtSocket = new WebSocket(SOCIAL_ART_WEBSOCKET_URL);
  const [mostLikedPosts, setMostLikedPosts] = useState<
    MostViewedPosts[] | null
  >(null);
  const [loading, setLoading] = useState(false);

  const handleGetMostLikedPosts = async () => {
    setLoading(true);
    const { data }: any = await getMostLikedPosts();
    setMostLikedPosts(data?.data || []);
    setLoading(false);
  };

  useEffect(() => {
    handleGetMostLikedPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // @ts-ignore
    socialArtSocket.addEventListener('message', ({ data }) => {
      const response = JSON.parse(data);
      if (response?.event === 'most-liked-posts') {
        setMostLikedPosts(response?.posts);
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
        {loading || mostLikedPosts?.length == 0 ? (
          <div className={styles.loading}>
            {loading ? <FadeLoader color="#ffffff" /> : <h3>No Post Found</h3>}
          </div>
        ) : (
          <>
            <div className={styles.CardBox}>
              <div id="nft-marketplace" className={styles.SliderMain}>
                <LeaderboardsSliderComponent
                  dataLength={mostLikedPosts?.length}
                >
                  {mostLikedPosts?.map((val, index) => {
                    return (
                      <>
                        <LeaderboardsRankCards
                          image={val.thumbnail}
                          itemName={'likes'}
                          itemAmount={val.likes || 0}
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
                  {mostLikedPosts?.map((val, index) => {
                    return (
                      <>
                        <LeaderboardsRankList
                          img={val.thumbnail}
                          rank={index + 1}
                          userName={val.userName}
                          count={val.likes || 0}
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

export default LeaderboardsTab2;
