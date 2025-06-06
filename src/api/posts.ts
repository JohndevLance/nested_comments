import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {Post} from '../types';
import {axiosApi} from '../services/httpClient';

const fetchPostsData = async () => {
  const response = await axiosApi.get('/posts');
  return response.data;
};
export const usePosts = () => {
  return useQuery({
    queryKey: ['posts'],
    queryFn: fetchPostsData,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: false,
  });
};

// create post
export const createPost = async (newPost: Partial<Post>) => {
  const response = await axiosApi.post('/posts', newPost);
  return response.data;
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({queryKey: ['posts']});
    },
  });
};
