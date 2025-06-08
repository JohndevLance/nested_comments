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
import {useNavigation, useRoute} from '@react-navigation/native';
import {usePostCommentStore} from '../../store/usePostCommentStore';

export const CommentsReplies = () => {
  const navigation = useNavigation();
  const {commentId, postId, setCommentId} = usePostCommentStore();
  const {data, isLoading, isError} = useFetchCommentReplies(commentId);
  const {data: replies, isLoading: isRepliesLoading} =
    useFetchCommentReplies(commentId);

  const {data: deepReplies, isLoading: isDeepRepliesLoading} =
    useFetchDeepReplies(commentId);

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

  const handleLoadMore = (commentId: string) => {
    setCommentId(commentId);
    navigation.navigate('DeepReplies');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Comments</Text>
      {isLoading ? <ActivityIndicator size="large" color="#0000ff" /> : null}
      {isError ? <Text>Error loading comments</Text> : null}

      {data ? (
        <CommentThread
          postId={postId}
          comments={sortedComments}
          onLoadMore={handleLoadMore}
        />
      ) : (
        <Text>No comments available</Text>
      )}
      {isRepliesLoading && <ActivityIndicator size="large" color="#0000ff" />}
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
