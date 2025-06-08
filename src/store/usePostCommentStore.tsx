import {create} from 'zustand';
import {persist} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Post} from '../types';

type PostCommentState = {
  postId: string | null;
  post: Post | null;
  commentId: string | null;
  showReplyForm: boolean;
  setPost: (post: Post) => void;
  setPostId: (id: string) => void;
  setCommentId: (id: string) => void;
  resetIds: () => void;
  toggleReplyForm: () => void;
};

export const usePostCommentStore = create<PostCommentState>()(
  persist(
    set => ({
      postId: null,
      commentId: null,
      post: null,
      showReplyForm: false,
      setPostId: (id: string) => set({postId: id}),
      setCommentId: (id: string) => set({commentId: id}),
      resetIds: () => set({postId: null, commentId: null}),
      setPost: (post: Post) => set({post}),
      toggleReplyForm: () =>
        set(state => ({showReplyForm: !state.showReplyForm})),
    }),
    {
      name: 'post-comment-store',
      storage: {
        getItem: async name => {
          const item = await AsyncStorage.getItem(name);
          return item ? JSON.parse(item) : null;
        },
        setItem: async (name, value) => {
          await AsyncStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: async name => {
          await AsyncStorage.removeItem(name);
        },
      },
    },
  ),
);
