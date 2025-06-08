import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import {Post} from '../types';
import {axiosApi} from '../services/httpClient';

const fetchPostsData = async ({pageParam = 1, queryKey}) => {
  // You can extract additional params from queryKey if needed
  const [_key, params] = queryKey;
  const response = await axiosApi.get('/posts', {
    params: {...params, page: pageParam}, // Add more params as needed
  });
  return response.data;
};

export const usePosts = (params = {}) => {
  return useInfiniteQuery({
    queryKey: ['posts', params],
    queryFn: ({pageParam, queryKey}) => fetchPostsData({pageParam, queryKey}),
    getNextPageParam: lastPage => {
      // Assuming lastPage contains a property 'nextPage' for pagination
      const nextPage = lastPage.nextPage;
      return nextPage ? nextPage : undefined; // Return undefined if no more pages
    },
    initialPageParam: 1,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
};

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
