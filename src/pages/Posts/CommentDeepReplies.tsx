// screens/CommentsScreen.tsx
import React from 'react';
import {ActivityIndicator, SafeAreaView, StyleSheet, Text} from 'react-native';
import {Comment} from '../../types';
import {CommentThread} from './components/CommentThread';
import {
  useFetchCommentReplies,
  useFetchComments,
  useFetchDeepReplies,
} from '../../api/comments';
import {useRoute} from '@react-navigation/native';
import {usePostCommentStore} from '../../store/usePostCommentStore';
import {sortCommentsByHierarchy} from '../../utils';

export const CommentsDeepReplies = () => {
  const {commentId, postId} = usePostCommentStore();
  const {data, isLoading, isError} = useFetchDeepReplies(commentId);

  //   order data by depth_level
  const comments = data || [];
  const sortedComments = sortCommentsByHierarchy(comments);

  const handleLoadMore = (commentId: string) => {
    // Implement your pagination or API call logic here
  };
  console.log('Sorted Comments:', sortedComments, commentId, postId);
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Comments</Text>
      {isLoading ? <ActivityIndicator size="large" color="#0000ff" /> : null}
      {isError ? <Text>Error loading comments</Text> : null}

      {data ? (
        <CommentThread
          postId={postId ?? ''}
          comments={sortedComments}
          onLoadMore={handleLoadMore}
        />
      ) : (
        <Text>No comments available</Text>
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
