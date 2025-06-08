import {useMutation, useQuery} from '@tanstack/react-query';
import {axiosCommentApi} from '../services/httpClient';
import {CommentPayload} from '../types';

export const fetchComments = async (postId: string | null) => {
  const response = await axiosCommentApi.get(`/comments`, {
    params: {
      post_id: postId,
    },
  });
  return response.data;
};

export const useFetchComments = (postId: string | null) => {
  return useQuery({
    queryKey: ['comments', postId],
    queryFn: () => fetchComments(postId),
    enabled: !!postId, // Only run the query if postId is truthy
    refetchOnWindowFocus: false, // Optional: prevent refetching on window focus
    staleTime: 1000 * 60 * 5, // Optional: data is fresh for 5 minutes
  });
};

export const createComment = async (payload: CommentPayload) => {
  const response = await axiosCommentApi.post('/comments', payload);
  return response.data;
};

export const useCreateComment = () => {
  return useMutation({
    mutationFn: (payload: CommentPayload) => createComment(payload),
  });
};

// fetchcomment replies
export const fetchCommentReplies = async (commentId: string | null) => {
  const response = await axiosCommentApi.get(`/comments/${commentId}/replies`);
  return response.data;
};

export const useFetchCommentReplies = (commentId: string | null) => {
  return useQuery({
    queryKey: ['commentReplies', commentId],
    queryFn: () => fetchCommentReplies(commentId),
    enabled: !!commentId, // Only run the query if commentId is truthy
    refetchOnWindowFocus: false, // Optional: prevent refetching on window focus
    staleTime: 1000 * 60 * 5, // Optional: data is fresh for 5 minutes
  });
};

// fetch deep replies
export const fetchDeepReplies = async (commentId: string | null) => {
  if (!commentId) {
    throw new Error('commentId is required to fetch deep replies');
  }
  const response = await axiosCommentApi.get(
    `/comments/${commentId}/deep-replies`,
  );
  return response.data;
};

export const useFetchDeepReplies = (commentId: string | null) => {
  return useQuery({
    queryKey: ['deepReplies', commentId],
    queryFn: () => fetchDeepReplies(commentId),
    enabled: !!commentId, // Only run the query if commentId is truthy
    refetchOnWindowFocus: false, // Optional: prevent refetching on window focus
    staleTime: 1000 * 60 * 5, // Optional: data is fresh for 5 minutes
  });
};
