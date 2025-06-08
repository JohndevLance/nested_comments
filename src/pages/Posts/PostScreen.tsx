// screens/CommentsScreen.tsx
import React from 'react';
import {
  ActivityIndicator,
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Comment, CommentPayload} from '../../types';
import {CommentThread} from './components/CommentThread';
import {
  useCreateComment,
  useFetchCommentReplies,
  useFetchComments,
  useFetchDeepReplies,
} from '../../api/comments';
import {useNavigation, useRoute} from '@react-navigation/native';
import {usePostCommentStore} from '../../store/usePostCommentStore';
import {PostItem} from './components/PostItem';
import {sortCommentsByHierarchy} from '../../utils';
import {CommentForm} from './components/CommentForm';
import {useQueryClient} from '@tanstack/react-query';
import Toast from 'react-native-toast-message';

export const PostScreen = () => {
  const {
    postId,
    commentId,
    post,
    showReplyForm,
    toggleReplyForm,
    setCommentId,
  } = usePostCommentStore();

  const navigation = useNavigation();
  const {data, isLoading, isError} = useFetchComments(postId);
  const {mutate, isPending} = useCreateComment();
  const queryClient = useQueryClient();

  //   order data by depth_level
  const comments = data || [];

  const sortedComments = sortCommentsByHierarchy(comments);

  const handleLoadMore = (commentId: string) => {
    setCommentId(commentId);
    navigation.navigate('CommentReplies');
  };

  const submitComment = (payload: CommentPayload) => {
    mutate(payload, {
      onSuccess: () => {
        toggleReplyForm();
        Toast.show({
          type: 'success',
          text1: 'Comment posted successfully',
        });
        queryClient.invalidateQueries(['comments', payload.postId]);
      },
      onError: error => {
        Toast.show({
          type: 'error',
          text1: 'Failed to post comment',
          text2:
            error.message || 'An error occurred while posting your comment.',
        });
      },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {post ? <PostItem post={post} onPress={() => {}} /> : null}

      {isLoading ? <ActivityIndicator size="large" color="#0000ff" /> : null}
      {isError ? <Text>Error loading comments</Text> : null}
      {showReplyForm ? (
        <CommentForm
          postId={postId}
          parentId={commentId}
          onCancel={toggleReplyForm}
          onSubmit={submitComment}
          submitting={isPending}
        />
      ) : null}
      {data ? (
        <CommentThread
          postId={postId}
          comments={sortedComments}
          onLoadMore={handleLoadMore}
        />
      ) : (
        <Text>No comments available.</Text>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // paddingHorizontal: 16,
    backgroundColor: '#fff',
    paddingBottom: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 16,
  },
});
