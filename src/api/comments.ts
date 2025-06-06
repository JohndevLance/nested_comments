import {useMutation, useQuery} from '@tanstack/react-query';
import {axiosCommentApi} from '../services/httpClient';
import {CommentPayload} from '../types';

export const fetchComments = async (postId: string) => {
  const response = await axiosCommentApi.get(`/comments`, {
    params: {
      post_id: postId,
    },
  });
  return response.data;
};

export const useFetchComments = (postId: string) => {
  return useQuery({
    queryKey: ['comments', postId],
    queryFn: () => fetchComments(postId),
    enabled: !!postId, // Only run the query if postId is truthy
    refetchOnWindowFocus: false, // Optional: prevent refetching on window focus
    staleTime: 1000 * 60 * 5, // Optional: data is fresh for 5 minutes
  });
};

export const createComment = async (payload: CommentPayload) => {
  console.log('Creating comment with payload:', payload);
  const response = await axiosCommentApi.post('/comments', payload);
  console.log('Comment created successfully:', response.data);
  return response.data;
};

export const useCreateComment = () => {
  return useMutation({
    mutationFn: (payload: CommentPayload) => createComment(payload),
  });
};
