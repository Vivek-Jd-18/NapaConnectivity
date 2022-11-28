import useProfile from '@/hooks/useProfile';
import useWebThree from '@/hooks/useWebThree';
import { createNewPost, getAllPosts } from '@/services/PostApi';
import { activePost, Post } from '@/types/post';
import { ToastDescription, ToastTitle } from '@/typing/toast';
import Tippy from '@tippyjs/react';
import moment from 'moment';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useRef } from 'react';
import { FadeLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import { DoneIcon, ErrorIcon, WalletNeedsToConnected } from '../assets';
import { CustomToastWithLink } from '../CustomToast/CustomToast';
import HighlightButton from '../HighlightButton/HighlightButton';
import styles from './FeedTab.module.scss';
import lodash from 'lodash';

type FeedTabProps = {
  socket: WebSocket;
};

export default function FeedTab({ socket }: FeedTabProps) {
  const [active, setActive] = React.useState<activePost>({
    postId: '',
    type: '',
  });
  const handleClickOne = (activeObj: activePost) => {
    setActive(activeObj);
  };
  const [open, setOpen] = React.useState(false);
  const inputRef = useRef(null);
  const [file, setFile] = React.useState<File | null>(null);
  const [videoTitle, setVideoTitle] = React.useState('');
  const [caption, setCaption] = React.useState('');
  const [modalPosition, setModalPosition] = React.useState(false);
  const [videoPreview, setVideoPreview] = React.useState<
    string | ArrayBuffer | null
  >('');
  const { account }: { account: string } = useWebThree();
  const { push, pathname } = useRouter();
  const [postError, setPostError] = React.useState({
    caption: '',
    title: '',
  });
  const [loading, setLoading] = React.useState(false);
  const [getPostsLoading, setGetPostsLoading] = React.useState(false);
  const [posts, setPosts] = React.useState<Post[] | null>(null);
  const [counter, setCounter] = React.useState(60);

  const { profileDetails } = useProfile();

  const handleDragOver = (ev: any) => {
    ev.preventDefault();
    ev.stopPropagation();
    ev.dataTransfer.dropEffect = 'copy';
  };

  const handleDropBanner = (ev: any) => {
    ev.preventDefault();
    ev.stopPropagation();
    handleDrop(ev.dataTransfer.files[0]);
  };

  React.useEffect(() => {
    let timer: any;
    if (!getPostsLoading) {
      timer = counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [counter, getPostsLoading]);

  const handleClick = () => {
    // @ts-ignore
    inputRef.current.click();
  };

  const handleChange = (ev: any) => {
    handleOnChange(ev.target.files[0]);
    ev.target.value = '';
  };

  const handleOnChange = useCallback((file: any) => {
    if (!file) {
      return;
    }
    const allowedFiles = ['video/mp4', 'video/webm'];
    const fileSize = file.size;
    if (!allowedFiles.includes(file?.type)) {
      toast.error(
        CustomToastWithLink({
          icon: ErrorIcon,
          title: 'Invalid File Type',
          description: 'Please upload a video in mp4 or webm format',
          time: 'Now',
        })
      );
      return;
    }
    if (fileSize > 1024 * 1024 * 100) {
      toast.error(
        CustomToastWithLink({
          icon: ErrorIcon,
          title: 'Invalid File Size',
          description: "File size can't exceed 100 MB",
          time: 'Now',
        })
      );
      return;
    }
    setFile(file);
    const reader: FileReader = new FileReader();

    reader.addEventListener(
      'load',
      () => {
        setVideoPreview(reader?.result || '');
      },
      false
    );

    if (file) {
      reader.readAsDataURL(file);
    }
  }, []);

  const handleRemove = () => {
    setFile(null);
    setVideoPreview('');
    setCaption('');
    setVideoTitle('');
  };

  const handleDrop = (file: any) => {
    handleOnChange(file);
  };

  const handleModalPosition = () => {
    if (window.innerWidth <= 1024) {
      setModalPosition(true);
    } else {
      setModalPosition(false);
    }
  };

  useEffect(() => {
    handleModalPosition();
    window.addEventListener('resize', handleModalPosition);
  }, []);

  useEffect(() => {
    socket.addEventListener(
      'message',
      (payload: { type: string; data: string }) => {
        if (posts?.length && posts?.length > 0) {
          setPosts([JSON.parse(payload.data).posts, ...posts]);
        } else {
          setPosts([JSON.parse(payload.data).posts]);
        }
      }
    );
  }, [posts]);

  //@ts-ignore
  const handleActionClick = () => {
    if (!account) {
      toast.error(
        CustomToastWithLink({
          icon: WalletNeedsToConnected,
          title: ToastTitle.WALLET_NEEDS_TO_CONNECTED,
          description: ToastDescription.WALLET_NEEDS_TO_CONNECTED,
          time: 'Now',
        })
      );
      return push(`/wallet?redirectTo=${pathname.split('/')[1]}`);
    }
    if (!profileDetails?.profileName) {
      toast.error(
        CustomToastWithLink({
          icon: ErrorIcon,
          title: ToastTitle.PROFILE_NEEDS_TO_BE_CREATED,
          description: ToastDescription.PROFILE_NEEDS_TO_BE_CREATED,
          time: 'Now',
        })
      );
      return push(`/settings`);
    }
    setOpen(true);
    setActive({
      postId: '',
      type: '',
    });
  };

  const handleCreatePost = async () => {
    setPostError({
      caption: '',
      title: '',
    });
    if (!caption) {
      setPostError((prev) => {
        return {
          ...prev,
          caption: 'Caption is required',
        };
      });
    }
    if (!videoTitle) {
      setPostError((prev) => {
        return {
          ...prev,
          title: 'Title is required',
        };
      });
    }
    if (!videoTitle || !caption) {
      return;
    }
    const formData = new FormData();
    formData.append('videoTitle', videoTitle);
    //@ts-ignore
    formData.append('videoFile', file);
    formData.append('videoType', file?.type || '');
    formData.append('videoCaption', caption);
    formData.append('accountId', account);
    formData.append('minted', '');
    formData.append(
      'userImage',
      profileDetails.avatar ? profileDetails.avatar : ''
    );
    formData.append('userName', profileDetails.profileName);
    setLoading(true);
    const { error, message } = await createNewPost(formData);
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
    setLoading(false);
    setOpen(false);
    handleRemove();
    toast.success(
      CustomToastWithLink({
        icon: DoneIcon,
        title: 'Success',
        description: 'Post Was Created Successfully',
        time: 'Now',
      })
    );
  };

  const handleGetPosts = async () => {
    setGetPostsLoading(true);
    const { data }: any = await getAllPosts();
    setPosts(data?.data || []);
    setGetPostsLoading(false);
  };

  useEffect(() => {
    handleGetPosts();
  }, []);

  useEffect(() => {
    document.addEventListener(
      'play',
      (e) => {
        var videos = document.getElementsByTagName('video');
        if (videos?.length) {
          for (var i = 0, len = videos.length; i < len; i++) {
            if (videos[i] != e.target) {
              videos[i]?.pause();
            }
          }
        }
      },
      true
    );
  }, []);

  return (
    <div className={styles.MainListBox}>
      <div className={styles.parent}>
        <div onClick={handleActionClick} className={styles.newPostContainer}>
          <HighlightButton title="Create New Post" />
        </div>
      </div>
      <input
        hidden
        type="file"
        aria-label="add files"
        className={styles.input}
        ref={inputRef}
        onChange={handleChange}
      />
      <div className={styles.MainScrollBox}>
        {open && (
          <div
            className={
              open
                ? `${styles.MainTabBox} ${styles.active}`
                : `${styles.MainTabBox}`
            }
            style={{
              position: modalPosition ? 'relative' : 'absolute',
              width: modalPosition ? 'auto' : '100%',
              zIndex: 0,
            }}
          >
            <div className={styles.leftBox}></div>
            <div
              className={
                open
                  ? `${styles.rightBox} ${styles.active}`
                  : `${styles.rightBox}`
              }
            >
              <button
                className={styles.ExitButton}
                onClick={() => {
                  if (!loading) {
                    setOpen(false);
                    handleRemove();
                  }
                }}
              >
                <Image
                  src="/img/exit_icon.svg"
                  alt=""
                  width="24px"
                  height="24px"
                />
              </button>
              {!file ? (
                <div
                  className={styles.banner}
                  onDragOver={handleDragOver}
                  onDrop={handleDropBanner}
                >
                  <Image
                    src="/assets/images/video-icon.png"
                    width="24px"
                    height="24px"
                  />
                  <p className={styles.dragAndDropText}>
                    Drag and drop an video, or
                    <Tippy
                      className="toolTipContainer"
                      placement="bottom"
                      content={
                        <div>
                          <p>Supported format: mp4 or webm.</p>
                          <p>Maximum size: 100MB</p>
                        </div>
                      }
                    >
                      <span onClick={handleClick}>&nbsp; Browse</span>
                    </Tippy>
                  </p>
                  <span className={styles.recomendedText}>
                    File size limit 100 MB
                  </span>
                </div>
              ) : (
                <div className={styles.previewVideoContainer}>
                  <div className={styles.inputContainer}>
                    <input
                      disabled={loading}
                      type={'text'}
                      className={styles.videoInput}
                      placeholder="Title your post"
                      value={videoTitle}
                      onChange={(e) => setVideoTitle(e.target.value)}
                    />
                    {!videoTitle && postError.title && (
                      <span className={styles.errormsg}>{postError.title}</span>
                    )}
                    <input
                      disabled={loading}
                      type={'text'}
                      className={styles.caption}
                      placeholder="Write a short caption..."
                      value={caption}
                      onChange={(e) => setCaption(e.target.value)}
                    />
                    {!caption && postError.caption && (
                      <span className={styles.errormsg}>
                        {postError.caption}
                      </span>
                    )}
                  </div>
                  <div className={styles.videoPreview}>
                    <video
                      width={'100%'}
                      height={'100%'}
                      autoPlay
                      controls
                      src={videoPreview as string}
                    >
                      The “video” tag is not supported by your browser.
                    </video>
                  </div>
                  {loading ? (
                    <div className={styles.loaderContainer}>
                      <FadeLoader color="#ffffff" />
                    </div>
                  ) : (
                    <div className={styles.actionContainer}>
                      <div onClick={handleRemove} className={styles.uploadNew}>
                        <Image
                          src="/assets/images/upload-video-icon.png"
                          alt=""
                          width="24px"
                          height="24px"
                        />
                        <span>Replace</span>
                      </div>
                      <div
                        onClick={handleCreatePost}
                        className={styles.publishBtn}
                      >
                        <Image
                          src={DoneIcon}
                          width={24}
                          height={24}
                          alt="avatar"
                        />
                        <span>Publish</span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
        {getPostsLoading ? (
          <div className={styles.loadingContainer}>
            <FadeLoader color="#ffffff" />
          </div>
        ) : (
          <>
            {posts?.length
              ? lodash
                  .uniqBy(posts, 'postId')
                  .map((post: Post, index: number) => (
                    <div
                      key={`post-${index}`}
                      className={
                        active
                          ? `${styles.MainTabBox} ${styles.active}`
                          : `${styles.MainTabBox}`
                      }
                    >
                      <div className={styles.leftBox}>
                        <div className={styles.HadUserText}>
                          <div className={styles.HadUserImage}>
                            <Image
                              src={
                                post.userImage
                                  ? post.userImage
                                  : '/assets/images/img_avatar.png'
                              }
                              alt=""
                              width="40px"
                              height="40px"
                            />
                            <div className={styles.UserNameTxt}>
                              <h4>{post.userName}</h4>
                              <p>
                                {moment(post.createdAt).format('DD MMM YYYY')}
                              </p>
                            </div>
                          </div>
                          {counter > 0 && (
                            <div className={`${styles.messageContainer}`}>
                              Congratulations! Your post is now live for 12
                              hours!
                            </div>
                          )}

                          <div className={styles.UserRightTxt}>
                            <h4>10:22:12</h4>
                            <p>Live Post Time Remaining</p>
                          </div>
                        </div>
                        <div className={styles.MdlImage}>
                          <video
                            width={'100%'}
                            height="400"
                            preload="auto"
                            autoPlay
                            controls
                            src={post.videoURL as string}
                            style={{ objectFit: 'contain' }}
                          >
                            The “video” tag is not supported by your browser.
                          </video>
                          {/* <Image
                      src="/img/user_post.png"
                      alt=""
                      width="720px"
                      height="320px"
                    /> */}
                        </div>
                        <div className={styles.BotomTxt}>
                          <a href="#" className={styles.BotomLikes}>
                            <Image
                              src="/img/heart_icon.svg"
                              alt=""
                              width="24px"
                              height="24px"
                            />
                            <span>
                              496 <b>likes</b>
                            </span>
                          </a>
                          <button
                            style={{ zIndex: 1 }}
                            className={
                              active.postId === post.postId &&
                              active.type === 'comment'
                                ? `${styles.BotomLikes} ${styles.active}`
                                : `${styles.BotomLikes}`
                            }
                            onClick={() => {
                              handleClickOne({
                                postId: post.postId,
                                type: 'comment',
                              });
                              setOpen(false);
                            }}
                          >
                            <Image
                              src="/img/feedback_icon_icon.svg"
                              alt=""
                              width="24px"
                              height="24px"
                            />
                            <span>
                              16 <b>comments</b>
                            </span>
                          </button>
                          <a href="#" className={styles.BotomLikes}>
                            <Image
                              src="/img/reward_icon.svg"
                              alt=""
                              width="24px"
                              height="24px"
                            />
                            <span>
                              12 <b>awards</b>
                            </span>
                          </a>
                          <button
                            className={
                              active.postId === post.postId &&
                              active.type === 'mint'
                                ? `${styles.BotomLikes} ${styles.active}`
                                : `${styles.BotomLikes}`
                            }
                            // onClick={() =>
                            //   handleClickOne({
                            //     postId: post.postId,
                            //     type: 'mint',
                            //   })
                            // }
                          >
                            <Image
                              src="/img/mint_icon.svg"
                              alt=""
                              width="24px"
                              height="24px"
                            />
                            <span>Mint</span>
                          </button>
                          <a href="#" className={styles.BotomLikes}>
                            <Image
                              src="/img/share_icon.svg"
                              alt=""
                              width="24px"
                              height="24px"
                            />
                            <span>
                              <b>Share</b>
                            </span>
                          </a>
                        </div>
                        <div className={styles.videoInfoContainer}>
                          <h3>{post.videoTitle}</h3>
                          <p>{post.videoCaption}</p>
                        </div>
                      </div>
                      {active.postId === post.postId &&
                        active.type === 'comment' && (
                          <div
                            className={
                              active.postId === post.postId &&
                              active.type === 'comment'
                                ? `${styles.rightBox} ${styles.active}`
                                : `${styles.rightBox}`
                            }
                          >
                            <button
                              className={styles.ExitButton}
                              onClick={() =>
                                handleClickOne({
                                  postId: '',
                                  type: '',
                                })
                              }
                            >
                              <Image
                                src="/img/exit_icon.svg"
                                alt=""
                                width="24px"
                                height="24px"
                              />
                            </button>
                            <div className={styles.commentsContainer}>
                              <h1>16 comments</h1>
                              <div className={styles.ForShadow}>
                                <div className={styles.UserComment}>
                                  <div className={styles.FisrtComBox}>
                                    <div className={styles.HadComment}>
                                      <a
                                        href="#"
                                        className={styles.leftIcontxt}
                                      >
                                        <Image
                                          src="/img/comment01.png"
                                          alt=""
                                          width="28px"
                                          height="28px"
                                        />
                                        <h4>Marta Thornton</h4>
                                      </a>
                                      <p>1 hour</p>
                                    </div>
                                    <div className={styles.btmcomment}>
                                      <p>
                                        However venture pursuit he am mr
                                        cordial. Forming musical am hearing
                                        studied be luckily.
                                      </p>
                                      <div className={styles.LikeReplyTxt}>
                                        <a href="#">Like</a>
                                        <a href="#">Reply</a>
                                      </div>
                                    </div>
                                  </div>
                                  <div className={styles.FisrtComBox}>
                                    <div className={styles.HadComment}>
                                      <a
                                        href="#"
                                        className={styles.leftIcontxt}
                                      >
                                        <Image
                                          src="/img/comment02.svg"
                                          alt=""
                                          width="28px"
                                          height="28px"
                                        />
                                        <h4>Dorothy Mccoy</h4>
                                      </a>
                                      <p>4 hour</p>
                                    </div>
                                    <div className={styles.btmcomment}>
                                      <p>
                                        Change wholly say why eldest period.
                                      </p>
                                      <div className={styles.LikeReplyTxt}>
                                        <a href="#">Like</a>
                                        <a href="#">Reply</a>
                                      </div>
                                    </div>
                                  </div>
                                  <div className={styles.FisrtComBox}>
                                    <div className={styles.HadComment}>
                                      <a
                                        href="#"
                                        className={styles.leftIcontxt}
                                      >
                                        <Image
                                          src="/img/comment03.svg"
                                          alt=""
                                          width="28px"
                                          height="28px"
                                        />
                                        <h4>Howard Copeland</h4>
                                      </a>
                                      <p>1 hour</p>
                                    </div>
                                    <div className={styles.btmcomment}>
                                      <p>
                                        Unfeeling agreeable suffering it on
                                        smallness newspaper be. So come must
                                        time no as. Do on unpleasing.{' '}
                                      </p>
                                      <div className={styles.LikeReplyTxt}>
                                        <a href="#">Like</a>
                                        <a href="#">Reply</a>
                                      </div>
                                    </div>
                                  </div>
                                  <div className={styles.FisrtComBox}>
                                    <div className={styles.HadComment}>
                                      <a
                                        href="#"
                                        className={styles.leftIcontxt}
                                      >
                                        <Image
                                          src="/img/comment03.svg"
                                          alt=""
                                          width="28px"
                                          height="28px"
                                        />
                                        <h4>Howard Copeland</h4>
                                      </a>
                                      <p>1 hour</p>
                                    </div>
                                    <div className={styles.btmcomment}>
                                      <p>
                                        Unfeeling agreeable suffering it on
                                        smallness newspaper be. So come must
                                        time no as. Do on unpleasing.{' '}
                                      </p>
                                      <div className={styles.LikeReplyTxt}>
                                        <a href="#">Like</a>
                                        <a href="#">Reply</a>
                                      </div>
                                    </div>
                                  </div>
                                  <div className={styles.FisrtComBox}>
                                    <div className={styles.HadComment}>
                                      <a
                                        href="#"
                                        className={styles.leftIcontxt}
                                      >
                                        <Image
                                          src="/img/comment03.svg"
                                          alt=""
                                          width="28px"
                                          height="28px"
                                        />
                                        <h4>Howard Copeland</h4>
                                      </a>
                                      <p>1 hour</p>
                                    </div>
                                    <div className={styles.btmcomment}>
                                      <p>
                                        Unfeeling agreeable suffering it on
                                        smallness newspaper be. So come must
                                        time no as. Do on unpleasing.{' '}
                                      </p>
                                      <div className={styles.LikeReplyTxt}>
                                        <a href="#">Like</a>
                                        <a href="#">Reply</a>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className={styles.BtmCommentBtn}>
                                <input
                                  type="text"
                                  placeholder="Write a comment.."
                                />
                                <button>Send</button>
                              </div>
                            </div>
                          </div>
                        )}
                      {active.postId === post.postId && active.type === 'mint' && (
                        <div
                          className={
                            active.postId === post.postId &&
                            active.type === 'mint'
                              ? `${styles.rightBox} ${styles.active}`
                              : `${styles.rightBox}`
                          }
                        >
                          <button
                            className={styles.ExitButton}
                            onClick={() =>
                              handleClickOne({
                                postId: '',
                                type: '',
                              })
                            }
                          >
                            <Image
                              src="/img/exit_icon.svg"
                              alt=""
                              width="24px"
                              height="24px"
                            />
                          </button>
                          <h1>16 comments</h1>
                          <div className={styles.ForShadow}>
                            <div className={styles.UserComment}>
                              <div className={styles.FisrtComBox}>
                                <div className={styles.HadComment}>
                                  <a href="#" className={styles.leftIcontxt}>
                                    <Image
                                      src="/img/comment01.png"
                                      alt=""
                                      width="28px"
                                      height="28px"
                                    />
                                    <h4>Marta Thornton</h4>
                                  </a>
                                  <p>1 hour</p>
                                </div>
                                <div className={styles.btmcomment}>
                                  <p>
                                    However venture pursuit he am mr cordial.
                                    Forming musical am hearing studied be
                                    luckily.
                                  </p>
                                  <div className={styles.LikeReplyTxt}>
                                    <a href="#">Like</a>
                                    <a href="#">Reply</a>
                                  </div>
                                </div>
                              </div>
                              <div className={styles.FisrtComBox}>
                                <div className={styles.HadComment}>
                                  <a href="#" className={styles.leftIcontxt}>
                                    <Image
                                      src="/img/comment02.svg"
                                      alt=""
                                      width="28px"
                                      height="28px"
                                    />
                                    <h4>Dorothy Mccoy</h4>
                                  </a>
                                  <p>4 hour</p>
                                </div>
                                <div className={styles.btmcomment}>
                                  <p>Change wholly say why eldest period.</p>
                                  <div className={styles.LikeReplyTxt}>
                                    <a href="#">Like</a>
                                    <a href="#">Reply</a>
                                  </div>
                                </div>
                              </div>
                              <div className={styles.FisrtComBox}>
                                <div className={styles.HadComment}>
                                  <a href="#" className={styles.leftIcontxt}>
                                    <Image
                                      src="/img/comment03.svg"
                                      alt=""
                                      width="28px"
                                      height="28px"
                                    />
                                    <h4>Howard Copeland</h4>
                                  </a>
                                  <p>1 hour</p>
                                </div>
                                <div className={styles.btmcomment}>
                                  <p>
                                    Unfeeling agreeable suffering it on
                                    smallness newspaper be. So come must time no
                                    as. Do on unpleasing.{' '}
                                  </p>
                                  <div className={styles.LikeReplyTxt}>
                                    <a href="#">Like</a>
                                    <a href="#">Reply</a>
                                  </div>
                                </div>
                              </div>
                              <div className={styles.FisrtComBox}>
                                <div className={styles.HadComment}>
                                  <a href="#" className={styles.leftIcontxt}>
                                    <Image
                                      src="/img/comment03.svg"
                                      alt=""
                                      width="28px"
                                      height="28px"
                                    />
                                    <h4>Howard Copeland</h4>
                                  </a>
                                  <p>1 hour</p>
                                </div>
                                <div className={styles.btmcomment}>
                                  <p>
                                    Unfeeling agreeable suffering it on
                                    smallness newspaper be. So come must time no
                                    as. Do on unpleasing.{' '}
                                  </p>
                                  <div className={styles.LikeReplyTxt}>
                                    <a href="#">Like</a>
                                    <a href="#">Reply</a>
                                  </div>
                                </div>
                              </div>
                              <div className={styles.FisrtComBox}>
                                <div className={styles.HadComment}>
                                  <a href="#" className={styles.leftIcontxt}>
                                    <Image
                                      src="/img/comment03.svg"
                                      alt=""
                                      width="28px"
                                      height="28px"
                                    />
                                    <h4>Howard Copeland</h4>
                                  </a>
                                  <p>1 hour</p>
                                </div>
                                <div className={styles.btmcomment}>
                                  <p>
                                    Unfeeling agreeable suffering it on
                                    smallness newspaper be. So come must time no
                                    as. Do on unpleasing.{' '}
                                  </p>
                                  <div className={styles.LikeReplyTxt}>
                                    <a href="#">Like</a>
                                    <a href="#">Reply</a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className={styles.BtmCommentBtn}>
                            <input
                              type="text"
                              placeholder="Write a comment.."
                            />
                            <button>Send</button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))
              : !open && (
                  <div className={styles.NotFoundMessageContainer}>
                    <p>Getting things ready!</p>
                  </div>
                )}
          </>
        )}
      </div>
    </div>
  );
}
