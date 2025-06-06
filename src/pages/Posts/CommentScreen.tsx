// screens/CommentsScreen.tsx
import React from 'react';
import {ActivityIndicator, SafeAreaView, StyleSheet, Text} from 'react-native';
import {Comment} from '../../types';
import {CommentThread} from './components/CommentThread';
import {useFetchComments} from '../../api/comments';

const mockUser = {
  id: 'user1',
  name: 'Jane Doe',
  avatar: 'https://example.com/avatar.jpg', // optional
};

const sampleComments: Comment[] = [
  {
    id: 'c1',
    post_id: 'p1',
    content: 'This is a top-level comment',
    author: mockUser,
    depth_level: 0,
    created_at: new Date().toISOString(),
    has_more_replies: true,
    replies: [
      {
        id: 'c1-1',
        post_id: 'p1',
        parent_id: 'c1',
        content: 'A reply to the top-level comment',
        author: mockUser,
        depth_level: 1,
        created_at: new Date().toISOString(),
      },
      {
        id: 'c1-2',
        post_id: 'p1',
        parent_id: 'c1',
        content: 'Another reply with deeper replies',
        author: mockUser,
        depth_level: 1,
        created_at: new Date().toISOString(),
        has_more_replies: true,
        replies: [
          {
            id: 'c1-2-1',
            post_id: 'p1',
            parent_id: 'c1-2',
            content: 'Nested reply',
            author: mockUser,
            depth_level: 2,
            created_at: new Date().toISOString(),
          },
        ],
      },
    ],
  },
  {
    id: 'c2',
    post_id: 'p1',
    content: 'Another top-level comment',
    author: mockUser,
    depth_level: 0,
    created_at: new Date().toISOString(),
  },
];

export const CommentsScreen = () => {
  const postId = 'bba1c105-7dd9-410a-a0c5-19df6a0500f4';

  const {data, isLoading, isError} = useFetchComments(postId);
  console.log('Fetch Comments dATA:', data);

  //   order data by depth_level
  const comments = data || [];
  const sortCommentsByHierarchy = comments => {
    return [...comments].sort((a, b) => {
      const pathA = a.path.split(',').join('/');
      const pathB = b.path.split(',').join('/');
      return pathA.localeCompare(pathB);
    });
  };

  // Example usage

  const sortedComments = sortCommentsByHierarchy(comments);

  const handleLoadMore = (depth: number) => {
    console.log(`Load more replies at depth ${depth}`);
    // Implement your pagination or API call logic here
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Comments</Text>
      {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
      {isError && <Text>Error loading comments</Text>}

      {data && (
        <CommentThread
          postId={postId}
          comments={sortedComments}
          onLoadMore={handleLoadMore}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 16,
  },
});
