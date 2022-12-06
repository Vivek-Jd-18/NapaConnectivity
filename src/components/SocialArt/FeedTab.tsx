import useProfile from '@/hooks/useProfile';
import useWebThree from '@/hooks/useWebThree';
import { createNewPost, getAllPosts, updatePost } from '@/services/PostApi';
import { activePost, Post } from '@/types/post';
import { ToastDescription, ToastTitle } from '@/typing/toast';
import Tippy from '@tippyjs/react';
import moment from 'moment';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useRef } from 'react';
import { FadeLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import { RWebShare } from 'react-web-share';
import { DoneIcon, ErrorIcon, WalletNeedsToConnected } from '../assets';
import { CustomToastWithLink } from '../CustomToast/CustomToast';
import HighlightButton from '../HighlightButton/HighlightButton';
import styles from './FeedTab.module.scss';
import lodash from 'lodash';
import Input from '../Input/Input';
import DropDownComponent from '../Dropdown/Dropdown';
import {
  countries,
  genre,
  snftCollection,
} from '@/constants/social-art.constants';
import ReactTags from 'react-tag-autocomplete';
import { createNewMint } from '@/services/MintApi';
import { textToEmoji } from '@/utils/socialArt';
import { socialArtMessagesTriggers } from '@/constants/socialArt.constants';
import { WEB_STAGING_SOCIALART_URL } from '@/constants/url';

type FeedTabProps = {
  socket: WebSocket;
};

export default function FeedTab({ socket }: FeedTabProps) {
  const router = useRouter();
  const { postId }: any = router.query;
  const [active, setActive] = React.useState<activePost>({
    postId: '',
    type: '',
    index: null,
  });

  const textTimerRef = useRef<any>(null);
  const textTimeRef = useRef<any>(null);
  const handleClickOne = (activeObj: activePost) => {
    const val = document.getElementById(`mybox${activeObj.index}`);
    setActive(activeObj);
    window.innerWidth > 1024
      ? val?.scrollIntoView({
          behavior: 'smooth',
          block: 'end',
          inline: 'nearest',
        })
      : null;
  };

  const [open, setOpen] = React.useState(false);
  const inputRef = useRef(null);
  const thumbnailRef = useRef(null);
  const [file, setFile] = React.useState<File | null>(null);
  const [videoTitle, setVideoTitle] = React.useState('');
  const [caption, setCaption] = React.useState('');
  const [modalPosition, setModalPosition] = React.useState(false);
  const [videoPreview, setVideoPreview] = React.useState<
    string | ArrayBuffer | null
  >('');
  const [thumbnailPreview, setThumbnailPreview] = React.useState<
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
  const [mintDetails, setMintDetails] = React.useState({
    title: '',
    collection: 'NAPA Society Collection',
    description: '',
    location: countries[0]?.name,
    tagged_people: '',
    genre: 'Select Genre',
    tags: '',
  });
  const [mintDetailsErrors, setMintDetailsErrors] = React.useState({
    title: '',
    collection: '',
    description: '',
    thumbnail: '',
  });

  const { profileDetails, profileId } = useProfile();
  const people = useRef();
  const tag = useRef();
  const [peopleTags, setPeopleTags] = React.useState([]);
  const [tags, setTags] = React.useState([]);

  const onPeopleDelete = useCallback(
    (tagIndex: number) => {
      setPeopleTags(peopleTags.filter((_, i) => i !== tagIndex));
    },
    [peopleTags]
  );

  const onDelete = useCallback(
    (tagIndex: number) => {
      setTags(tags.filter((_, i) => i !== tagIndex));
    },
    [tags]
  );

  const onAddition = useCallback(
    (newTag: any) => {
      if (tags.length === 10) {
        return;
      }
      // @ts-ignore
      setTags([...tags, newTag]);
    },
    [tags]
  );

  const onPeopleAddition = useCallback(
    (newTag: any) => {
      if (peopleTags.length === 10) {
        return;
      }
      // @ts-ignore
      setPeopleTags([...peopleTags, newTag]);
    },
    [peopleTags]
  );

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

  useEffect(() => {
    if (!getPostsLoading && !textTimeRef.current) {
      textTimeRef.current = new Date();
      textTimerRef.current = setInterval(() => {
        if (
          (new Date().getTime() - textTimeRef.current.getTime()) / 1000 >=
          60
        ) {
          clearInterval(textTimerRef.current);
          let textDiv = document.getElementById('hide_title');
          if (!textDiv) return;
          textDiv.style.visibility = 'hidden';
        }
      }, 1000);
    }
    return () => {
      clearInterval(textTimerRef.current);
      textTimeRef.current = null;
      let textDiv = document.getElementById('hide_title');
      if (!textDiv) return;
      textDiv.style.visibility = 'visible';
    };
  }, [textTimeRef.current, textTimerRef.current, getPostsLoading]);

  const handleClick = (ref: any) => {
    // @ts-ignore
    ref.current.click();
  };

  const handleChange = (ev: any) => {
    handleOnChange(ev.target.files[0]);
    ev.target.value = '';
  };

  const handleThumbnailChange = (ev: any) => {
    const file = ev.target.files[0];
    ev.target.value = '';
    if (!file) {
      return;
    }

    const allowedFiles = ['image/png', 'image/jpg', 'image/jpeg'];
    const fileSize = file.size;
    if (!allowedFiles.includes(file?.type)) {
      toast.error(
        CustomToastWithLink({
          icon: ErrorIcon,
          title: 'Invalid File Type',
          description: 'Please upload a jpg or png file',
          time: 'Now',
        })
      );
      return;
    }
    if (fileSize > 1024 * 1024 * 5) {
      toast.error(
        CustomToastWithLink({
          icon: ErrorIcon,
          title: 'Invalid File Size',
          description: "File size can't exceed 5 MB",
          time: 'Now',
        })
      );
      return;
    }
    const reader: FileReader = new FileReader();

    reader.addEventListener(
      'load',
      () => {
        setThumbnailPreview(reader?.result || '');
      },
      false
    );

    if (file) {
      reader.readAsDataURL(file);
    }
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
    window.addEventListener('load', videoScroll);
    window.addEventListener('wheel', videoScroll);
  }, []);

  function videoScroll() {
    if (document.querySelectorAll('video[autoplay]').length > 0) {
      var windowHeight = window.innerHeight,
        videoEl = document.querySelectorAll('video[autoplay]');

      for (var i = 0; i < videoEl.length; i++) {
        var thisVideoEl = videoEl[i],
          videoHeight = thisVideoEl?.clientHeight,
          videoClientRect = thisVideoEl?.getBoundingClientRect().top;
        if (
          //@ts-ignore
          videoClientRect <= windowHeight - videoHeight * 0.5 &&
          //@ts-ignore
          videoClientRect >= 0 - videoHeight * 0.5
        ) {
          //@ts-ignore
          thisVideoEl.play();
        } else {
          //@ts-ignore
          thisVideoEl.pause();
        }
      }
    }
  }

  useEffect(() => {
    handleModalPosition();
    window.addEventListener('resize', handleModalPosition);
  }, []);

  useEffect(() => {
    if (!getPostsLoading) {
      document
        .getElementById(postId)
        ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [postId, getPostsLoading]);

  const handleNewPost = (post: any) => {
    //@ts-ignore
    setPosts((prevState) => {
      if (prevState) {
        const data = [post, ...prevState];
        const filteredPost = data.filter(
          (v, i, a) => a.findIndex((v2) => v2?.postId === v?.postId) === i
        );
        return [...filteredPost];
      } else {
        let data = [];
        // @ts-ignore
        data.push(post);
        return [...data];
      }
    });
  };

  useEffect(() => {
    // @ts-ignore
    socket.addEventListener('message', ({ data }) => {
      const response = JSON.parse(data);
      if (response?.event === 'posts') {
        handleNewPost(response?.posts);
      }
    });
    return () => {
      socket.removeEventListener('message', () => {});
    };
  }, []);

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
      index: null,
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
    formData.append('profileId', profileId);
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

  const handleMintPostCancel = () => {
    handleClickOne({
      postId: '',
      type: '',
      index: null,
    });
    setMintDetailsErrors({
      title: '',
      collection: '',
      description: '',
      thumbnail: '',
    });
    setMintDetails({
      title: '',
      collection: 'NAPA Society Collection',
      description: '',
      location: countries[0]?.name,
      tagged_people: '',
      genre: 'Select Genre',
      tags: '',
    });
    setTags([]);
    setPeopleTags([]);
    setThumbnailPreview(null);
  };

  const handleMintPost = async (post: any) => {
    setMintDetailsErrors({
      title: '',
      collection: '',
      description: '',
      thumbnail: '',
    });
    const newTags = tags.map((tag: any) => tag?.name).toLocaleString();
    const newPeopleTags = peopleTags
      .map((tag: any) => tag?.name)
      .toLocaleString();
    if (mintDetails.title == '') {
      setMintDetailsErrors((prev) => {
        return {
          ...prev,
          title: 'Title is required.',
        };
      });
    }
    if (mintDetails.description == '') {
      setMintDetailsErrors((prev) => {
        return {
          ...prev,
          description: 'Description is required.',
        };
      });
    }
    if (mintDetails.collection == '') {
      setMintDetailsErrors((prev) => {
        return {
          ...prev,
          collection: 'Collection is required.',
        };
      });
    }
    if (!thumbnailPreview) {
      setMintDetailsErrors((prev) => {
        return {
          ...prev,
          thumbnail: 'Thumbnail is required',
        };
      });
    }
    if (
      !mintDetails.title ||
      !mintDetails.description ||
      !mintDetails.collection ||
      !thumbnailPreview
    )
      return;
    const mintedPost = {
      postId: post.postId,
      videoType: post.videoType,
      accountId: post.accountId,
      profileId: post.profileId,
      title: mintDetails.title,
      network: '',
      status: '',
      SNFTTitle: mintDetails.title,
      SNFTCollection: mintDetails.collection,
      SNFTDescription: mintDetails.description,
      location: mintDetails.location,
      taggedPeople: newPeopleTags.length ? newPeopleTags : '',
      genre: mintDetails.genre,
      tags: newTags.length ? newTags : '',
      live: '',
      payoutApproved: '',
      SNFTAddress: '',
      networkTxId: '',
      owner: post.userName,
      gasFees: '',
      thumbnail: thumbnailPreview,
    };
    setLoading(true);
    //@ts-ignore
    const { error, message } = await createNewMint(mintedPost);
    await updatePost(post.postId, 'true');
    const temp = lodash.uniqBy(posts, 'postId').map((post: Post) => post);
    const isFound = temp.findIndex((p) => p.postId == post.postId);
    if (isFound != -1) {
      //@ts-ignore
      temp[isFound].minted = 'true';
    }
    setPosts(temp);
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
    handleMintPostCancel();
    toast.success(
      CustomToastWithLink({
        icon: DoneIcon,
        title: 'Success',
        description: 'Your Post is Now Minted and Live for 12 hours',
        time: 'Now',
      })
    );
  };

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
                      <span onClick={() => handleClick(inputRef)}>
                        &nbsp; Browse
                      </span>
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
                      // style={{ objectFit: 'fill' }}
                      width={'100%'}
                      height={'auto'}
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
          <div id="Videos_Parent">
            {posts?.length
              ? lodash
                  .uniqBy(posts, 'postId')
                  .map((post: Post, index: number) => (
                    <div
                      key={`post-${index}`}
                      id={`mybox${index}`}
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
                          <div
                            id="hide_title"
                            className={styles.messageContainer}
                            dangerouslySetInnerHTML={{
                              __html: textToEmoji(
                                socialArtMessagesTriggers[3]?.message
                              ),
                            }}
                          ></div>
                          <div className={styles.UserRightTxt}>
                            <h4>10:22:12</h4>
                            <p>Live Post!</p>
                          </div>
                        </div>
                        <div className={styles.MdlImage}>
                          <video
                            width={'100%'}
                            height="400"
                            preload="auto"
                            autoPlay
                            muted
                            loop
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
                                index,
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
                          {account == post.accountId &&
                            profileId == post.profileId && (
                              <button
                                style={{ zIndex: 1 }}
                                className={
                                  (active.postId === post.postId &&
                                    active.type === 'mint') ||
                                  post.minted == 'true'
                                    ? `${styles.BotomLikes} ${styles.active}`
                                    : `${styles.BotomLikes}`
                                }
                                onClick={() => {
                                  if (post.minted == 'true') {
                                    return;
                                  }
                                  handleClickOne({
                                    postId: post.postId,
                                    type: 'mint',
                                    index,
                                  });
                                  setOpen(false);
                                }}
                              >
                                <Image
                                  src="/img/mint_icon.svg"
                                  alt=""
                                  width="24px"
                                  height="24px"
                                />
                                <span>
                                  {post.minted == 'true'
                                    ? 'Minted Post'
                                    : 'Mint'}
                                </span>
                              </button>
                            )}
                          <RWebShare
                            data={{
                              text: 'NAPA Society | Social Art',
                              url: `${WEB_STAGING_SOCIALART_URL}/?postId=${post?.postId}`,
                            }}
                            onClick={() => console.log('shared successfully!')}
                          >
                            <button className={styles.BotomLikes}>
                              <Image
                                src="/img/share_icon.svg"
                                alt=""
                                width="24px"
                                height="24px"
                              />
                              <span>
                                <b>Share</b>
                              </span>
                            </button>
                          </RWebShare>
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
                                  index: null,
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
                      {active.postId === post.postId &&
                        active.type === 'mint' && (
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
                              onClick={handleMintPostCancel}
                            >
                              <Image
                                src="/img/exit_icon.svg"
                                alt=""
                                width="24px"
                                height="24px"
                              />
                            </button>
                            <div className={styles.mintPostContainer}>
                              <h1>Mint Your SNFT</h1>
                              <div className={styles.mintDetails}>
                                <Input
                                  type="text"
                                  placeholder="SNFT Title"
                                  label="SNFT Title"
                                  value={mintDetails.title}
                                  onChange={(e) =>
                                    !loading &&
                                    setMintDetails((prev) => {
                                      return {
                                        ...prev,
                                        title: e.target.value,
                                      };
                                    })
                                  }
                                />
                                {!mintDetails.title &&
                                  mintDetailsErrors.title && (
                                    <p className={styles.errmsg}>
                                      {mintDetailsErrors.title}
                                    </p>
                                  )}
                                <div style={{ padding: '1rem 0' }}>
                                  <DropDownComponent
                                    disabled={loading}
                                    title="SNFT Collection"
                                    options={snftCollection}
                                    dropDownValue={mintDetails.collection}
                                    onChange={(e) =>
                                      setMintDetails((prev) => {
                                        return {
                                          ...prev,
                                          collection: e.target.value,
                                        };
                                      })
                                    }
                                  />
                                  <div style={{ marginTop: '-1rem' }}>
                                    {mintDetails.collection ==
                                      'Take Ownership' && (
                                      <p className={styles.errmsg}>
                                        NAPA Mint Fee Required For this Option
                                      </p>
                                    )}
                                  </div>
                                </div>
                                <div className={styles.descriptionContainer}>
                                  <p>SNFT Description</p>
                                  <textarea
                                    disabled={loading}
                                    className={styles.description}
                                    value={mintDetails.description}
                                    onChange={(e) =>
                                      setMintDetails((prev) => {
                                        return {
                                          ...prev,
                                          description: e.target.value,
                                        };
                                      })
                                    }
                                  ></textarea>
                                </div>
                                {!mintDetails.description &&
                                  mintDetailsErrors.description && (
                                    <p className={styles.errmsg}>
                                      {mintDetailsErrors.description}
                                    </p>
                                  )}
                                <div style={{ padding: '0.5rem 0' }}>
                                  <DropDownComponent
                                    disabled={loading}
                                    title="Location"
                                    options={countries}
                                    dropDownValue={mintDetails.location || ''}
                                    onChange={(e) =>
                                      setMintDetails((prev) => {
                                        return {
                                          ...prev,
                                          location: e.target.value,
                                        };
                                      })
                                    }
                                  />
                                </div>
                                <div className={styles.tagContainer}>
                                  <span className={styles.headline}>
                                    Tag People
                                  </span>
                                  <ReactTags
                                    allowNew
                                    // @ts-ignore
                                    ref={people}
                                    tags={peopleTags}
                                    onDelete={onPeopleDelete}
                                    onAddition={onPeopleAddition}
                                    placeholderText=""
                                  />
                                </div>
                                <div style={{ padding: '0.5rem 0' }}>
                                  <DropDownComponent
                                    disabled={loading}
                                    title="Genre"
                                    options={genre}
                                    dropDownValue={mintDetails.genre}
                                    onChange={(e) =>
                                      setMintDetails((prev) => {
                                        return {
                                          ...prev,
                                          genre: e.target.value,
                                        };
                                      })
                                    }
                                  />
                                </div>
                                <div className={styles.tagContainer}>
                                  <span className={styles.headline}>Tags</span>
                                  <ReactTags
                                    allowNew
                                    // @ts-ignore
                                    ref={tag}
                                    tags={tags}
                                    onDelete={onDelete}
                                    onAddition={onAddition}
                                    placeholderText=""
                                  />
                                </div>
                                <div className={styles.thumbnailContainer}>
                                  <input
                                    hidden
                                    type="file"
                                    aria-label="add files"
                                    ref={thumbnailRef}
                                    onChange={handleThumbnailChange}
                                  />
                                  <div>
                                    <Tippy
                                      className="toolTipContainer"
                                      placement="bottom"
                                      content={
                                        <div>
                                          <p>
                                            Supported format: png, jpeg, jpg
                                          </p>
                                          <p>Maximum size: 5MB</p>
                                        </div>
                                      }
                                    >
                                      <p
                                        onClick={() =>
                                          handleClick(thumbnailRef)
                                        }
                                      >
                                        {thumbnailPreview
                                          ? 'Replace'
                                          : 'Upload SNFT Cover'}
                                      </p>
                                    </Tippy>
                                    {!thumbnailPreview &&
                                      mintDetailsErrors.thumbnail && (
                                        <span className={styles.errmsg}>
                                          {mintDetailsErrors.thumbnail}
                                        </span>
                                      )}
                                  </div>
                                  {thumbnailPreview && (
                                    <Image
                                      //@ts-ignore
                                      src={thumbnailPreview}
                                      width={'120px'}
                                      height={'100%'}
                                      alt="thumbnail"
                                    />
                                  )}
                                </div>
                              </div>
                              {loading ? (
                                <div className={styles.loaderContainer}>
                                  <FadeLoader color="#ffffff" />
                                </div>
                              ) : (
                                <div className={styles.actionContainer}>
                                  <span
                                    onClick={handleMintPostCancel}
                                    className={styles.cancelBtn}
                                  >
                                    Cancel
                                  </span>
                                  <div
                                    onClick={() => handleMintPost(post)}
                                    className={styles.mintBtn}
                                  >
                                    <Image
                                      src={DoneIcon}
                                      width={24}
                                      height={24}
                                      alt="avatar"
                                    />
                                    <span>Mint</span>
                                  </div>
                                </div>
                              )}
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
          </div>
        )}
      </div>
    </div>
  );
}
