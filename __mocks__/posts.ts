import {Post} from '../src/types';

export const posts: Post[] = [
  {
    id: '1',
    title: 'First Post',
    content: 'This is the content of the first post.',
    author: {
      id: '1',
      user_handle: 'user1',
    },
    created_at: '2023-10-01T12:00:00Z',
    community_id: 'community1',
  },
  {
    id: '2',
    title: 'Second Post',
    content: 'This is the content of the second post.',
    author: {
      id: '2',
      user_handle: 'user2',
    },
    created_at: '2023-10-02T12:00:00Z',
    community_id: 'community2',
  },
  {
    id: '3',
    title: 'Third Post',
    content: 'This is the content of the third post.',
    author: {
      id: '3',
      user_handle: 'user3',
    },
    created_at: '2023-10-03T12:00:00Z',
    community_id: 'community3',
  },
  {
    id: '4',
    title: 'Fourth Post',
    content: 'This is the content of the fourth post.',
    author: {
      id: '4',
      user_handle: 'user4',
    },
    created_at: '2023-10-04T12:00:00Z',
    community_id: 'community4',
  },
  {
    id: '5',
    title: 'Fifth Post',
    content: 'This is the content of the fifth post.',
    author: {
      id: '5',
      user_handle: 'user5',
    },
    created_at: '2023-10-05T12:00:00Z',
    community_id: 'community5',
  },
  {
    id: '6',
    title: 'Sixth Post',
    content: 'This is the content of the sixth post.',
    author: {
      id: '6',
      user_handle: 'user6',
    },
    created_at: '2023-10-06T12:00:00Z',
    community_id: 'community6',
  },
  {
    id: '7',
    title: 'Seventh Post',
    content: 'This is the content of the seventh post.',
    author: {
      id: '7',
      user_handle: 'user7',
    },
    created_at: '2023-10-07T12:00:00Z',
    community_id: 'community7',
  },
  {
    id: '8',
    title: 'Eighth Post',
    content: 'This is the content of the eighth post.',
    author: {
      id: '8',
      user_handle: 'user8',
    },
    created_at: '2023-10-08T12:00:00Z',
    community_id: 'community8',
  },
];

export const comments = [
  {
    id: '1',
    post_id: '1',
    parent_id: null,
    content: 'This is a comment on the first post.',
    likes: 5,
  },
  {
    id: '2',
    post_id: '1',
    parent_id: '1',
    content: 'This is a reply to the first comment on the first post.',
    likes: 2,
  },
  {
    id: '3',
    post_id: '2',
    parent_id: null,
    content: 'This is a comment on the second post.',
    likes: 3,
  },
  {
    id: '4',
    post_id: '2',
    parent_id: '3',
    content: 'This is a reply to the first comment on the second post.',
    likes: 1,
  },
  {
    id: '5',
    post_id: '3',
    parent_id: null,
    content: 'This is a comment on the third post.',
    likes: 4,
  },
  {
    id: '6',
    post_id: '3',
    parent_id: '5',
    content: 'This is a reply to the first comment on the third post.',
    likes: 0,
  },
  {
    id: '7',
    post_id: '4',
    parent_id: null,
    content: 'This is a comment on the fourth post.',
    likes: 6,
  },
];
