import Container from '../../Layout/Container/Container';
import type { NextPage } from 'next';
import styles from './Trending.module.scss';
import { ErrorIcon, HowardAvatar, WalletNeedsToConnected } from '../assets';
import Tab from '../Tab/Tab';
import { useCallback, useEffect, useState } from 'react';
import SocialMediaReview from '../SocialMediaReview/SocialMediaReview';
import ChatWindow from '../ChatWindow/ChatWindow';
import { API_URL } from '../../constants/url';
import axios from 'axios';
import { toast } from 'react-toastify';
import { CustomToastWithLink } from '../CustomToast/CustomToast';
import { ToastDescription, ToastTitle } from '../../typing/toast';
import useProfile from '../../hooks/useProfile';
import useWebThree from '../../hooks/useWebThree';

const trendingTabList = [
  {
    title: 'In Social Media',
  },
  {
    title: 'In NFT’s',
  },
];

const reviewCardData = [
  {
    description:
      'Made last it seen went no just when of by. Occasional entreaties comparison.',
    avatar: HowardAvatar,
    userName: 'Howard Copeland',
    date: '4 Aug 2022',
  },
  {
    description:
      'Weather however luckily enquire so certain do. Aware did stood was day under ask.',
    avatar: HowardAvatar,
    userName: 'Dorothy Mccoy',
    date: '1 Aug 2022',
  },
  {
    description:
      'Dearest affixed enquire on explain opinion he. Reached who the mrs joy offices pleased.',
    avatar: HowardAvatar,
    userName: 'Rufus Flores',
    date: '1 Jul 2022',
  },
  {
    description:
      'Dearest affixed enquire on explain opinion he. Reached who the mrs joy offices pleased.',
    avatar: HowardAvatar,
    userName: 'Rufus Flores',
    date: '1 Jul 2022',
  },
  {
    description:
      'Dearest affixed enquire on explain opinion he. Reached who the mrs joy offices pleased.',
    avatar: HowardAvatar,
    userName: 'Rufus Flores',
    date: '1 Jul 2022',
  },
  {
    description:
      'Dearest affixed enquire on explain opinion he. Reached who the mrs joy offices pleased.',
    avatar: HowardAvatar,
    userName: 'Rufus Flores',
    date: '1 Jul 2022',
  },
];

type TrendingSectionProps = {
  socket: any;
};

const TrendingSection: NextPage<TrendingSectionProps> = ({ socket }) => {
  const [tab, setTab] = useState('In Social Media');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const { account } = useWebThree();
  const { profileDetails } = useProfile();

  useEffect(() => {
    // @ts-ignore
    socket.addEventListener('message', ({ data }) => {
      const response = JSON.parse(data);
      const newMessage = {
        channel: response.message.channel,
        message: response.message.message,
        messageType: null,
        timetoken: response.message.timetoken,
        uuid: response.message.publisher,
      };
      //@ts-ignore
      setMessages([...messages, newMessage]);
    });
    return () => {
      socket.removeEventListener('message', () => {});
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

  useEffect(() => {
    if (account) {
      fetchMessages();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account]);

  const fetchMessages = useCallback(async () => {
    try {
      const res = await axios.get(`${API_URL}/chat/messages`);
      setMessages(res.data.messages);
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

  return (
    <div className={styles.backgroundImage} id="trending">
      <Container className={styles.trendingContainer}>
        <div className={`row col-12 ${styles.trendingBodyContainer}`}>
          <div className={`col-xl-8 col-md-12`}>
            <h1 className={styles.trending}>Whats Trending</h1>
            <div className={styles.tabsContainer}>
              <div className={styles.tabsInnerContainer}>
                <ul className={styles.tab}>
                  {trendingTabList.map(({ title }, index) => (
                    <Tab key={index} setTab={setTab} title={title} tab={tab} />
                  ))}
                </ul>
              </div>
            </div>
            <div className={styles.socialMediaReviewContainer}>
              {reviewCardData.map(
                ({ description, userName, avatar, date }, index) => {
                  return (
                    <SocialMediaReview
                      key={`social-media-${index}`}
                      description={description}
                      date={date}
                      icon={avatar}
                      username={userName}
                    />
                  );
                }
              )}
            </div>
          </div>
          <div className={`col-xl-4 col-md-12 ${styles.rightSideContainer}`}>
            <ChatWindow
              setMessage={setMessage}
              message={message}
              messageHandler={messageHandler}
              messages={messages}
            />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default TrendingSection;
