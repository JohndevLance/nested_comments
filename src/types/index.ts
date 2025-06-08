export interface User {
  id: string;
  user_handle: string;
}

export type LoginPayload = {
  email?: string;
  user_handle?: string;
  password: string;
};

export interface Post {
  id: string;
  title: string;
  content: string;
  author: {
    id: string;
    user_handle: string;
  };
  user_details?: {
    user_handle: string;
    avatar: string;
    display_name: string;
  };
  created_at: string;
  community_id: string;
}

export interface Comment {
  id: string;
  post_id: string;
  parent_id?: string;
  content: string;
  author: User;
  depth_level: number;
  created_at: string;
  replies?: Comment[];
  has_more_replies?: boolean;
  is_expanded?: boolean;
  child_count?: number;
  path?: string;
}

export interface CommentThread {
  comments: Comment[];
  hasMore: boolean;
  loading: boolean;
}

export type CommentForm = {
  content: string;
  parentId?: string;
  postId: string;
};

export type CommentPayload = {
  content: string;
  reply_to?: string | null;
  post_id: string;
};
