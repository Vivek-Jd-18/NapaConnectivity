import React, { useEffect, useState } from 'react';
import styles from './Leaderboards.module.scss';
import LeaderboardsRankCards from './LeaderboardsRankCards';
import LeaderboardsSliderComponent from './LeaderboardsSlider';
import LeaderboardsRankList from './LeaderboardsRankList';
import { getMostDiscussedPosts } from '@/services/PostApi';
import { MostViewedPosts } from '@/types/post';
import { FadeLoader } from 'react-spinners';
import { SOCIAL_ART_WEBSOCKET_URL } from '@/constants/url';

const LeaderboardsTab3 = () => {
  const socialArtSocket = new WebSocket(SOCIAL_ART_WEBSOCKET_URL);
  const [mostCommentedPosts, setMostCommentedPosts] = useState<
    MostViewedPosts[] | null
  >(null);
  const [loading, setLoading] = useState(false);

  const handleGetMostDiscussedPosts = async () => {
    setLoading(true);
    const { data }: any = await getMostDiscussedPosts();
    setMostCommentedPosts(data?.data || []);
    setLoading(false);
  };

  useEffect(() => {
    handleGetMostDiscussedPosts();
  }, []);

  useEffect(() => {
    // @ts-ignore
    socialArtSocket.addEventListener('message', ({ data }) => {
      const response = JSON.parse(data);
      if (response?.event === 'most-discussed-posts') {
        setMostCommentedPosts(response?.posts);
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
        {loading || mostCommentedPosts?.length == 0 ? (
          <div className={styles.loading}>
            {loading ? <FadeLoader color="#ffffff" /> : <h3>No Post Found</h3>}
          </div>
        ) : (
          <>
            <div className={styles.CardBox}>
              <div id="nft-marketplace" className={styles.SliderMain}>
                <LeaderboardsSliderComponent
                  dataLength={mostCommentedPosts?.length}
                >
                  {mostCommentedPosts?.map((val, index) => {
                    return (
                      <>
                        <LeaderboardsRankCards
                          image={val.thumbnail}
                          itemName={'comments'}
                          itemAmount={val.comments || 0}
                          rank={index + 1}
                          userName={val.userName}
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
                  {mostCommentedPosts?.map((val, index) => {
                    return (
                      <>
                        <LeaderboardsRankList
                          img={val.thumbnail}
                          rank={index + 1}
                          userName={val.userName}
                          count={val.comments || 0}
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

export default LeaderboardsTab3;
