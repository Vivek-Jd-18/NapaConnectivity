import useProfile from '@/hooks/useProfile';
import useWebThree from '@/hooks/useWebThree';
import {
  awardPost,
  createNewPost,
  getAllPosts,
  likePost,
} from '@/services/PostApi';
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
import {
  DoneIcon,
  ErrorIcon,
  ReplyExit,
  WalletNeedsToConnected,
} from '../assets';
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
import { CommentResponse } from '@/types/comment';
import {
  createNewComment,
  getAllComments,
  likeComment,
} from '@/services/CommentApi';
import { createReport } from '@/services/ReportApi';
import MyTimer from '../LiverTimer/Mytimer';

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
  const [parentCommentId, setParentCommentId] = React.useState('');
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
  const { profileDetails, profileId, getUserProfileDetails } = useProfile();

  const people = useRef();
  const tag = useRef();
  const [peopleTags, setPeopleTags] = React.useState([]);
  const [tags, setTags] = React.useState([]);
  const [commentText, setCommentText] = React.useState('');
  const [postComments, setPostComments] = React.useState<
    CommentResponse[] | null
  >(null);
  const [getCommentsLoading, setGetCommentsLoading] = React.useState(false);
  const [newCommentLoading, setNewCommentLoading] = React.useState(false);
  const [likeCommentLoading, setLikeCommentLoading] = React.useState(false);
  const [replyUserName, setReplyUserName] = React.useState('');
  const [replyBoxShow, setReplyBoxShow] = React.useState(false);
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
    setTimeout(() => {
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
    }, 2000);
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
    formData.append('awardsByUsers', '');
    formData.append('videoType', file?.type || '');
    formData.append('videoCaption', caption);
    formData.append('accountId', account);
    formData.append('profileId', profileId);
    formData.append('minted', 'false');
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
      collection: ', { utc }',
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
      status: '0',
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
    const temp = lodash.uniqBy(posts, 'postId').map((post: Post) => post);
    const isFound = temp.findIndex((p) => p.postId == post.postId);
    if (isFound != -1) {
      //@ts-ignore
      temp[isFound].minted = 'true';
      //@ts-ignore
      temp[isFound].mintedTimeStamp = moment(new Date()).format(
        'DD-MMM-YYYY HH:mm:ss'
      );
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
    getUserProfileDetails(profileDetails.profileId);
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

  //@ts-ignore
  const handleCreateComment = async (postId: string) => {
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
    const comment = {
      commentText,
      postId,
      profileId,
      parentCommentId: parentCommentId,
    };
    setNewCommentLoading(true);
    const { error, message } = await createNewComment(comment);
    if (error) {
      setNewCommentLoading(false);
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
    setCommentText('');
    setNewCommentLoading(false);
    // setReplyUserName('');
    // setParentCommentId('');
  };

  const handleCreateReport = async (commentId: string, message: string) => {
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
    const report = {
      type: 'message',
      status: 'start',
      typeId: commentId,
      referEmail: 'offensive-comments@napasociety.io',
      message,
      reporterId: profileId,
    };
    const { error } = await createReport(report);
    toast.success(
      CustomToastWithLink({
        icon: DoneIcon,
        title: 'Success',
        description: 'Reported Successfully',
        time: 'Now',
      })
    );
    if (error) {
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
    return;
  };

  const handleNewComment = (comment: any) => {
    if (comment.parentCommentId) {
      setPostComments((prev) => {
        const temp = prev ? prev : [];
        const commentIndex = temp.findIndex(
          (c) => c.commentId == comment.parentCommentId
        );
        if (commentIndex > -1) {
          //@ts-ignore
          if (temp[commentIndex].replies.length) {
            //@ts-ignore
            temp[commentIndex].replies = [
              comment,
              //@ts-ignore
              ...temp[commentIndex].replies,
            ];
          } else {
            temp[comment.parentCommentId]?.replies.push(comment);
          }
        }
        return temp;
      });
    } else {
      setPostComments((prevState) => {
        if (prevState) {
          const data = [comment, ...prevState];
          const filteredPost = data.filter(
            (v, i, a) =>
              a.findIndex(
                //@ts-ignore
                (v2) => v2?.commentId === v?.commentId
              ) === i
          );
          return [...filteredPost];
        } else {
          let data = [];
          // @ts-ignore
          data.push(comment);
          return [...data];
        }
      });
    }
  };

  useEffect(() => {
    socket.addEventListener('message', ({ data }) => {
      const response = JSON.parse(data);
      if (response?.event === 'comments') {
        handleNewComment(response?.comments);
      }
    });
    return () => {
      socket.removeEventListener('message', () => {});
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUpdatedCommentLikes = (comment: any) => {
    setPostComments(comment);
  };

  useEffect(() => {
    socket.addEventListener('message', ({ data }) => {
      const response = JSON.parse(data);
      if (response?.event === 'likeComment') {
        handleUpdatedCommentLikes(response?.comments);
      }
    });
    return () => {
      socket.removeEventListener('message', () => {});
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGetPostComments = async (postId: string) => {
    setGetCommentsLoading(true);
    const { data }: any = await getAllComments(postId);
    setPostComments(data?.data || []);
    setGetCommentsLoading(false);
  };

  const handleLikeComment = async (
    commentId: string,
    postId: string,
    likedByUsers: string
  ) => {
    let updatedLikesJson;
    if (likedByUsers) {
      const likes = likedByUsers;
      const updatedLikes = likes.split(',');
      const temp = [...updatedLikes];
      if (updatedLikes.includes(profileId)) {
        const index = temp.findIndex((id) => id == profileId);
        if (index > -1) {
          temp.splice(index, 1);
        }
      } else {
        temp.push(profileId);
      }
      updatedLikesJson = temp.toLocaleString();
    } else {
      updatedLikesJson = profileId;
    }

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
    setLikeCommentLoading(true);
    const { error, message } = await likeComment(
      commentId,
      postId,
      updatedLikesJson
    );
    if (error) {
      setNewCommentLoading(false);
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
    setLikeCommentLoading(false);
    return;
  };

  const getLikeByCommentId = (likedByUsers: string) => {
    let likes = 0;
    if (likedByUsers) {
      const likesCount = likedByUsers.split(',');
      likes = likesCount.length;
    }
    return likes;
  };

  const showPostLikeCount = (likedByUsers: string | null) => {
    const likes = likedByUsers ? likedByUsers.split(',') : [];
    return likes.length > 0 ? likes.length : '';
  };

  const showPostCommentCount = (commentByUsers: string | null) => {
    const comments = commentByUsers ? commentByUsers.split(',') : [];
    return comments.length > 0 ? comments.length : '';
  };

  const showPostAwardsCount = (awardsByUsers: string | null) => {
    const awards = awardsByUsers ? awardsByUsers.split(',') : [];
    return awards.length > 0 ? awards.length : '';
  };

  const handleLikePost = async (
    profileId: string,
    postId: string,
    likedByUsers: string | null
  ) => {
    let existResults = likedByUsers ? likedByUsers?.split(',') : [];
    if (existResults.includes(profileId)) {
      existResults = existResults.filter((id) => profileId != id);
    } else {
      existResults.push(profileId);
    }
    const temp = posts ? [...posts] : [];
    const postIndex = temp.findIndex((p) => p.postId == postId);
    if (postIndex > -1) {
      //@ts-ignore
      temp[postIndex].likedByUsers = String(existResults);
      setPosts(temp);
    }
    await likePost(profileId, postId);
  };

  const handleNewPostLikeCount = (likes: string, postId: string) => {
    const temp = posts ? [...posts] : [];
    const postIndex = temp.findIndex((p) => p.postId == postId);
    if (postIndex > -1) {
      //@ts-ignore
      temp[postIndex].likedByUsers = likes;
      setPosts(temp);
    }
  };

  useEffect(() => {
    socket.addEventListener('message', ({ data }) => {
      const response = JSON.parse(data);
      if (response?.event === 'post-likes-count') {
        handleNewPostLikeCount(response?.likes, response?.postId);
      }
    });
    return () => {
      socket.removeEventListener('message', () => {});
    };
  }, []);

  const handleNewPostCommentCount = (
    commentByUsers: string,
    postId: string
  ) => {
    setPosts((prev) => {
      const temp = prev ? [...prev] : [];
      if (prev) {
        const postIndex = temp.findIndex((p) => p.postId == postId);
        if (postIndex > -1) {
          //@ts-ignore
          temp[postIndex].commentByUser = commentByUsers;
        }
      }
      return temp;
    });
  };

  useEffect(() => {
    socket.addEventListener('message', ({ data }) => {
      const response = JSON.parse(data);
      if (response?.event === 'post-comments-count') {
        handleNewPostCommentCount(response?.comments, response?.postId);
      }
    });
    return () => {
      socket.removeEventListener('message', () => {});
    };
  }, []);

  const handleGetUpdatedPost = (post: Post, postId: string) => {
    console.log('post', post);

    setPosts((prev) => {
      const temp = prev ? [...prev] : [];
      if (prev) {
        const postIndex = temp.findIndex((p) => p.postId == postId);
        if (postIndex > -1) {
          //@ts-ignore
          temp[postIndex] = post;
        }
      }
      return temp;
    });
  };

  useEffect(() => {
    socket.addEventListener('message', ({ data }) => {
      const response = JSON.parse(data);
      if (response?.event === 'updated-post') {
        handleGetUpdatedPost(response?.post, response?.postId);
      }
    });
    return () => {
      socket.removeEventListener('message', () => {});
    };
  }, []);

  const handleGetUpdatedAwards = (postId: string, rewards: string) => {
    setPosts((prev) => {
      const temp = prev ? [...prev] : [];
      if (prev) {
        const postIndex = temp.findIndex((p) => p.postId == postId);
        if (postIndex > -1) {
          //@ts-ignore
          temp[postIndex].awardsByUsers = rewards;
        }
      }
      return temp;
    });
  };

  useEffect(() => {
    socket.addEventListener('message', ({ data }) => {
      const response = JSON.parse(data);
      if (response?.event === 'post-award-count') {
        handleGetUpdatedAwards(response?.postId, response?.awards);
      }
    });
    return () => {
      socket.removeEventListener('message', () => {});
    };
  }, []);

  const handlePostAward = async (post: Post) => {
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
    let existResults = post.awardsByUsers ? post.awardsByUsers.split(',') : [];
    if (existResults.includes(profileId)) {
      return toast.error(
        CustomToastWithLink({
          icon: ErrorIcon,
          title: 'Already Awarded',
          description: 'You have already given award to this post!',
          time: 'Now',
        })
      );
    }
    if (profileId == post.profileId) {
      return toast.error(
        CustomToastWithLink({
          icon: ErrorIcon,
          title: 'Award Error',
          description: 'Sorry but you cannot award your own post',
          time: 'Now',
        })
      );
    }
    if (profileDetails.awardsEarned > 0) {
      await awardPost(profileId, post.postId);
      getUserProfileDetails(profileId);
      return;
    } else {
      return toast.error(
        CustomToastWithLink({
          icon: ErrorIcon,
          title: 'No rewards',
          description: 'oops! you are not able to give rewards now.',
          time: 'Now',
        })
      );
    }
  };

  const handleReplyComment = (userName: string, id: string) => {
    setReplyBoxShow(true);
    setReplyUserName(userName);
    setParentCommentId(id);
  };

  const currentUtcOffset: number = moment().utcOffset();
  console.log('currentUtcOffset', currentUtcOffset);

  const isYouLiked = (likedByUsers: string | null) => {
    const users = likedByUsers ? likedByUsers?.split(',') : [];
    return users.includes(profileId) ? true : false;
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
                                post.avatar
                                  ? post.avatar
                                  : '/assets/images/img_avatar.png'
                              }
                              alt=""
                              width="40px"
                              height="40px"
                            />
                            <div className={styles.UserNameTxt}>
                              <h4>{post.profileName}</h4>
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
                            {post.minted == 'true' ? (
                              <MyTimer
                                // @ts-ignore
                                expiryTimestamp={new Date(
                                  post.mintedTimeStamp
                                ).setHours(
                                  new Date(post.mintedTimeStamp).getHours() + 12
                                )}
                                postId={post.postId}
                              />
                            ) : (
                              <p className={styles.notLive}>Not Minted</p>
                            )}
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
                          <a
                            href="javascript:void(0);"
                            className={
                              isYouLiked(post.likedByUsers)
                                ? `${styles.BotomLikes} ${styles.active}`
                                : `${styles.BotomLikes}`
                            }
                            onClick={() =>
                              handleLikePost(
                                profileId,
                                post.postId,
                                post.likedByUsers
                              )
                            }
                          >
                            <Image
                              src="/img/heart_icon.svg"
                              alt=""
                              width="24px"
                              height="24px"
                            />
                            <span>
                              {showPostLikeCount(post.likedByUsers)}
                              <b> likes</b>
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
                              handleGetPostComments(post.postId);
                            }}
                          >
                            <Image
                              src="/img/feedback_icon_icon.svg"
                              alt=""
                              width="24px"
                              height="24px"
                            />
                            <span>
                              {showPostCommentCount(post.commentByUser)}
                              <b> comments</b>
                            </span>
                          </button>
                          {post.minted == 'false' ? (
                            <a
                              href="javascript:void(0);"
                              className={`${styles.BotomLikes} ${styles.disableBtn}`}
                            >
                              <Image
                                src="/img/reward_icon.svg"
                                alt=""
                                width="24px"
                                height="24px"
                              />
                              <span>
                                {showPostAwardsCount(post.awardsByUsers)}
                                <b> awards</b>
                              </span>
                            </a>
                          ) : (
                            <a
                              href="javascript:void(0);"
                              className={styles.BotomLikes}
                              onClick={() => handlePostAward(post)}
                            >
                              <Image
                                src="/img/reward_icon.svg"
                                alt=""
                                width="24px"
                                height="24px"
                              />
                              <span>
                                {showPostAwardsCount(post.awardsByUsers)}
                                <b> awards</b>
                              </span>
                            </a>
                          )}
                          {((account == post.accountId &&
                            profileId == post.profileId) ||
                            post.minted == 'true') && (
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
                                {post.minted == 'true' ? 'minted post' : 'mint'}
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
                                <b>share</b>
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
                              onClick={() => {
                                handleClickOne({
                                  postId: '',
                                  type: '',
                                  index: null,
                                });
                                setCommentText('');
                                setReplyBoxShow(false);
                                setReplyUserName('');
                                setParentCommentId('');
                              }}
                            >
                              <Image
                                src="/img/exit_icon.svg"
                                alt=""
                                width="24px"
                                height="24px"
                              />
                            </button>
                            <div className={styles.commentsContainer}>
                              {getCommentsLoading ? (
                                <div className={styles.commentsloaderContainer}>
                                  <FadeLoader color="#ffffff" />
                                </div>
                              ) : (
                                <>
                                  <h1>
                                    {showPostCommentCount(post.commentByUser) +
                                      ' '}
                                    comments
                                  </h1>
                                  <div className={styles.ForShadow}>
                                    <div className={styles.UserComment}>
                                      {postComments?.length &&
                                      postComments?.length > 0 ? (
                                        postComments?.map((comment, index) => {
                                          return (
                                            <>
                                              <div
                                                key={`comment ${index}`}
                                                className={styles.FisrtComBox}
                                              >
                                                <div
                                                  className={styles.HadComment}
                                                >
                                                  <a
                                                    href="#"
                                                    className={
                                                      styles.leftIcontxt
                                                    }
                                                  >
                                                    <Image
                                                      src={`${
                                                        comment?.avatar
                                                          ? comment.avatar
                                                          : '/img/comment02.svg'
                                                      }`}
                                                      alt=""
                                                      width="28px"
                                                      height="28px"
                                                    />
                                                    <h4>
                                                      {comment?.profileName}
                                                    </h4>
                                                  </a>
                                                  <p>
                                                    {moment(comment?.createdAt)
                                                      .startOf('seconds')
                                                      .fromNow()}
                                                  </p>
                                                </div>
                                                <div
                                                  className={styles.btmcomment}
                                                >
                                                  <p>{comment?.commentText}</p>
                                                  <div
                                                    className={
                                                      styles.LikeReplyTxt
                                                    }
                                                  >
                                                    <a
                                                      onClick={() =>
                                                        !likeCommentLoading &&
                                                        handleLikeComment(
                                                          comment?.commentId,
                                                          comment?.postId,
                                                          comment?.likedByUsers
                                                        )
                                                      }
                                                    >
                                                      {`${
                                                        getLikeByCommentId(
                                                          comment?.likedByUsers
                                                        ) > 0
                                                          ? getLikeByCommentId(
                                                              comment?.likedByUsers
                                                            )
                                                          : ''
                                                      }` +
                                                        `${
                                                          getLikeByCommentId(
                                                            comment?.likedByUsers
                                                          ) > 1
                                                            ? ' Likes'
                                                            : ' Like'
                                                        }`}
                                                    </a>
                                                    <a
                                                      onClick={() =>
                                                        handleReplyComment(
                                                          comment?.profileName,
                                                          comment?.commentId
                                                        )
                                                      }
                                                    >
                                                      {comment?.replies
                                                        ?.length > 0 &&
                                                        comment?.replies
                                                          ?.length}
                                                      {comment?.replies
                                                        ?.length > 1
                                                        ? ' Replies'
                                                        : ' Reply'}
                                                    </a>
                                                    <a
                                                      onClick={() =>
                                                        handleCreateReport(
                                                          comment?.commentId,
                                                          comment?.commentText
                                                        )
                                                      }
                                                    >
                                                      Report
                                                    </a>
                                                  </div>
                                                </div>
                                              </div>
                                              {replyBoxShow &&
                                                comment.commentId ==
                                                  parentCommentId &&
                                                comment.replies &&
                                                comment.replies.map((c) => {
                                                  return (
                                                    <div
                                                      style={{
                                                        paddingLeft: '2.5rem',
                                                      }}
                                                      key={`c ${index}`}
                                                      className={
                                                        styles.FisrtComBox
                                                      }
                                                    >
                                                      <div
                                                        className={
                                                          styles.HadComment
                                                        }
                                                      >
                                                        <a
                                                          href="#"
                                                          className={
                                                            styles.leftIcontxt
                                                          }
                                                        >
                                                          <Image
                                                            src={`${
                                                              c?.avatar
                                                                ? c.avatar
                                                                : '/img/comment02.svg'
                                                            }`}
                                                            alt=""
                                                            width="28px"
                                                            height="28px"
                                                          />
                                                          <h4>
                                                            {c?.profileName}
                                                          </h4>
                                                        </a>
                                                        <p>
                                                          {moment(c?.createdAt)
                                                            .startOf('seconds')
                                                            .fromNow()}
                                                        </p>
                                                      </div>
                                                      <div
                                                        className={
                                                          styles.btmcomment
                                                        }
                                                      >
                                                        <p>{c?.commentText}</p>
                                                        <div
                                                          className={
                                                            styles.LikeReplyTxt
                                                          }
                                                        >
                                                          <a
                                                            onClick={() =>
                                                              !likeCommentLoading &&
                                                              handleLikeComment(
                                                                c?.commentId,
                                                                c?.postId,
                                                                c?.likedByUsers
                                                              )
                                                            }
                                                          >
                                                            {`${
                                                              getLikeByCommentId(
                                                                c?.likedByUsers
                                                              ) > 0
                                                                ? getLikeByCommentId(
                                                                    c?.likedByUsers
                                                                  )
                                                                : ''
                                                            }` +
                                                              `${
                                                                getLikeByCommentId(
                                                                  c?.likedByUsers
                                                                ) > 1
                                                                  ? ' Likes'
                                                                  : ' Like'
                                                              }`}
                                                          </a>
                                                          <a
                                                            onClick={() =>
                                                              handleReplyComment(
                                                                c?.profileName,
                                                                c?.parentCommentId
                                                              )
                                                            }
                                                          >
                                                            Reply
                                                          </a>
                                                          <a
                                                            onClick={() =>
                                                              handleCreateReport(
                                                                c?.commentId,
                                                                c?.commentText
                                                              )
                                                            }
                                                          >
                                                            Report
                                                          </a>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  );
                                                })}
                                            </>
                                          );
                                        })
                                      ) : (
                                        <div className={styles.commentNotFound}>
                                          <p>No comments yet</p>
                                        </div>
                                      )}
                                    </div>
                                    {replyBoxShow && (
                                      <div className={styles.replyBox}>
                                        <div className={styles.replyUserName}>
                                          <p>{`Response to the user @${replyUserName}`}</p>
                                        </div>
                                        <div>
                                          <Image
                                            onClick={() => {
                                              setReplyBoxShow(false);
                                              setReplyUserName('');
                                              setParentCommentId('');
                                            }}
                                            src={ReplyExit}
                                            width={10}
                                            height={10}
                                          />
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                  <div className={styles.BtmCommentBtn}>
                                    <input
                                      type="text"
                                      placeholder="Write a comment.."
                                      value={commentText}
                                      onChange={(e) =>
                                        setCommentText(e.target.value)
                                      }
                                      disabled={newCommentLoading}
                                      onKeyDown={(e) => {
                                        if (
                                          commentText &&
                                          !newCommentLoading &&
                                          e.key == 'Enter'
                                        ) {
                                          handleCreateComment(post.postId);
                                        }
                                      }}
                                    />
                                    <button
                                      disabled={
                                        !commentText || newCommentLoading
                                      }
                                      onClick={() =>
                                        handleCreateComment(post.postId)
                                      }
                                    >
                                      Send
                                    </button>
                                  </div>
                                </>
                              )}
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
                                        <p>Supported format: png, jpeg, jpg</p>
                                        <p>Maximum size: 5MB</p>
                                      </div>
                                    }
                                  >
                                    <p
                                      onClick={() => handleClick(thumbnailRef)}
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
