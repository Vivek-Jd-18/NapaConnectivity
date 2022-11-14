import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import type { NextPage } from 'next';
import styles from './Trending.module.scss';
import { API_URL } from '../../constants/url';
import useProfile from '../../hooks/useProfile';
import useWebThree from '../../hooks/useWebThree';
import Container from '../../Layout/Container/Container';

import { ErrorIcon, HowardAvatar, WalletNeedsToConnected } from '../assets';
import Tab from '../Tab/Tab';
import SocialMediaReview from '../SocialMediaReview/SocialMediaReview';
import ChatWindow from '../ChatWindow/ChatWindow';
import { CustomToastWithLink } from '../CustomToast/CustomToast';
import { ToastDescription, ToastTitle } from '../../typing/toast';
import Footer from '../Footer/Footer';
import Image from 'next/image';

const trendingTabList = [
  {
    title: 'Social Media',
    value: 'SOCIAL',
  },
  {
    title: 'NFT’s',
    value: 'NFT',
  },
];

type TrendingSectionProps = {
  socket: any;
};

const TrendingSection: NextPage<TrendingSectionProps> = ({ socket }) => {
  const [tab, setTab] = useState('SOCIAL');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [trendingList, setTrendingList] = useState([]);
  const [openIndex, setOpenIndex] = useState<null | number>(null);
  const { account } = useWebThree();
  const { profileDetails } = useProfile();

  const handleTrending = (trending: any) => {
    //@ts-ignore
    setTrendingList((prevState) => {
      if (prevState) {
        const data = [...prevState, trending];
        const filteredTrending = data.filter(
          (v, i, a) => a.findIndex((v2) => v2?.articleId === v?.articleId) === i
        );
        return [...filteredTrending];
      } else {
        let data = [];
        // @ts-ignore
        data.push(trending);
        return [...data];
      }
    });
  };

  const handleNewMessage = (
    channel: string,
    message: string,
    timetoken: string,
    uuid: string
  ) => {
    const newMessage = {
      channel: channel,
      message: message,
      messageType: null,
      timetoken: timetoken,
      uuid: uuid,
    };
    //@ts-ignore
    setMessages((prevMessage) => {
      if (prevMessage) {
        const data = [...prevMessage, newMessage];
        const filteredMessages = data.filter(
          (v, i, a) => a.findIndex((v2) => v2.timetoken === v.timetoken) === i
        );
        return [...filteredMessages];
      } else {
        let data = [];
        // @ts-ignore
        data.push(newMessage);
        return [...data];
      }
    });
  };

  useEffect(() => {
    // @ts-ignore
    socket.addEventListener('message', ({ data }) => {
      const response = JSON.parse(data);
      if (response?.event === 'message') {
        handleNewMessage(
          response?.message?.channel,
          response?.message?.message,
          response?.message?.timetoken,
          response?.message?.publisher
        );
      }
      if (response?.event === 'trending') {
        const response = JSON.parse(data);
        handleTrending(response?.trending);
      }
    });
    return () => {
      socket.removeEventListener('message', () => {});
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openIndex]);

  const fetchTrending = useCallback(async () => {
    try {
      const res = await axios.get(`${API_URL}/trending/feed/list?status=${1}`);
      setTrendingList(res?.data?.data);
    } catch (error) {
      toast.error(
        CustomToastWithLink({
          icon: ErrorIcon,
          title: ToastTitle.ERROR,
          description: ToastDescription.ERROR,
          time: 'Now',
        })
      );
    }
  }, [setTrendingList]);

  useEffect(() => {
    fetchTrending();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchMessages = useCallback(async () => {
    try {
      const res = await axios.get(`${API_URL}/chat/messages`);
      setMessages(res?.data?.data?.messages);
    } catch (error) {
      toast.error(
        CustomToastWithLink({
          icon: ErrorIcon,
          title: ToastTitle.ERROR,
          description: ToastDescription.ERROR,
          time: 'Now',
        })
      );
    }
  }, [setMessages]);

  const messageHandler = useCallback(async () => {
    try {
      if (account && profileDetails) {
        await axios.post(`${API_URL}/chat/send`, {
          message: message,
          from: profileDetails?.profileName,
          avatar: profileDetails?.avatar,
        });
        setMessage('');
        return;
      }
      if (!account) {
        setMessage('');
        toast.error(
          CustomToastWithLink({
            icon: WalletNeedsToConnected,
            title: ToastTitle.WALLET_NEEDS_TO_CONNECTED,
            description: ToastDescription.WALLET_NEEDS_TO_CONNECTED,
            time: 'Now',
          })
        );
        return;
      }
      setMessage('');
      toast.error(
        CustomToastWithLink({
          icon: ErrorIcon,
          title: ToastTitle.PROFILE_NEEDS_TO_BE_CREATED,
          description: ToastDescription.PROFILE_NEEDS_TO_BE_CREATED,
          time: 'Now',
        })
      );
    } catch (error) {
      setMessage('');
      console.log('Unable to fetch messages');
      toast.error(
        CustomToastWithLink({
          icon: ErrorIcon,
          title: ToastTitle.ERROR,
          description: ToastDescription.ERROR,
          time: 'Now',
        })
      );
    }
  }, [message, account, profileDetails]);

  const [chatPerson, setChatPerson] = useState('');

  return (
    <>
      <div
        style={{
          zIndex: -1,
          position: 'fixed',
          width: '100vw',
          height: '100vh',
        }}
      >
        <Image
          src="/assets/images/tdb.webp"
          alt="Trending"
          layout="fill"
          objectFit="cover"
          loading="eager"
          priority={true}
        />
      </div>
      <div className={styles.backgroundImage} id="trending">
        <Container className={`${styles.trendingContainer} asinnerContainer`}>
          <div className={`row col-12 ${styles.trendingBodyContainer}`}>
            <div className={`col-xl-7 col-md-12`}>
              <h1 className={styles.trending}>
                Whats <span>Trending</span>
              </h1>
              <div className={styles.tabsContainer}>
                <div className={styles.tabsInnerContainer}>
                  <ul className={styles.tab}>
                    {trendingTabList.map(({ title, value }, index) => (
                      <Tab
                        key={index}
                        setTab={setTab}
                        title={title}
                        tab={tab}
                        value={value}
                      />
                    ))}
                  </ul>
                </div>
              </div>
              <div
                className={`${styles.socialMediaReviewContainer} otherscroll`}
              >
                {trendingList &&
                  trendingList.length &&
                  trendingList
                    .filter(({ articleType }) => articleType === tab)
                    .map(
                      (
                        {
                          articleTitle,
                          author,
                          createdAt,
                          articleBody,
                          userProfilePic,
                          articleTags,
                        },
                        index
                      ) => {
                        return (
                          <SocialMediaReview
                            key={`social-media-${index}`}
                            currentIndex={index}
                            description={articleTitle}
                            articleBody={articleBody}
                            date={createdAt}
                            icon={
                              userProfilePic ? userProfilePic : HowardAvatar
                            }
                            openIndex={openIndex}
                            setOpenIndex={setOpenIndex}
                            username={author}
                            onChatClicked={() => setChatPerson(articleTitle)}
                            articlesTags={articleTags}
                          />
                        );
                      }
                    )}
              </div>
            </div>
            <div className={`col-xl-5 col-md-12 ${styles.rightSideContainer}`}>
              <h2 className={styles.TrendingTitle}>{chatPerson}</h2>
              <ChatWindow
                setMessage={setMessage}
                message={message}
                messageHandler={messageHandler}
                messages={messages}
              />
            </div>
          </div>
        </Container>
        <Footer footerIconShow />
      </div>
    </>
  );
};

export default TrendingSection;
