// components/comments/CommentItem.tsx
import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import {Comment, CommentPayload} from '../../../types';
// import {CommentForm} from './CommentForm';
import {colors} from '../../../constants/common';
import {CommentForm} from './CommentForm';
import {useCreateComment} from '../../../api/comments';
import {useQueryClient} from '@tanstack/react-query';
import Toast from 'react-native-toast-message';
import {usePostCommentStore} from '../../../store/usePostCommentStore';
import RenderHTML from 'react-native-render-html';

interface CommentItemProps {
  comment: Comment;
  isExpanded: boolean;
  onToggleExpanded: () => void;
  postId: string;
}

export const CommentItem: React.FC<CommentItemProps> = ({
  comment,
  isExpanded,
  onToggleExpanded,
  postId,
}) => {
  const [showReplyForm, setShoReplyForm] = useState(false);
  const {mutate, isPending} = useCreateComment();
  const queryClient = useQueryClient();

  const toggleReplyForm = () => {
    setShoReplyForm(prev => !prev);
  };

  const getIndentationStyle = (depth: number): any => {
    const computeIndent = (d: number): number => {
      if (d <= 4) return d * 15;
      return computeIndent(d - 4);
    };

    return {
      marginLeft: computeIndent(depth),
      borderLeftWidth: depth > 0 ? 1 : 0,
      borderLeftColor: getDepthColor(depth),
      paddingLeft: depth > 0 ? 10 : 0,
    };
  };

  const getDepthColor = (depth: number) => {
    return colors[depth % colors.length];
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60),
    );

    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
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
    <View style={[styles.container, getIndentationStyle(comment.depth_level)]}>
      <View style={styles.header}>
        <Text style={styles.author}>@{comment?.author?.user_handle}</Text>
        <Text style={styles.timestamp}>
          {formatTimeAgo(comment?.created_at)}
        </Text>
      </View>

      {/* <Text style={styles.content}>{comment?.content}</Text> */}
      <RenderHTML
        contentWidth={300}
        source={{html: comment?.content}}
        baseStyle={styles.content}
      />

      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton} onPress={toggleReplyForm}>
          <Text style={styles.actionText}>Reply</Text>
        </TouchableOpacity>

        {comment.replies && comment?.replies?.length > 0 ? (
          <TouchableOpacity
            style={styles.actionButton}
            onPress={onToggleExpanded}>
            <Text style={styles.actionText}>
              {isExpanded ? 'Hide' : 'Show'} {comment.replies?.length} replies
            </Text>
          </TouchableOpacity>
        ) : null}
      </View>

      {showReplyForm ? (
        <CommentForm
          postId={postId}
          parentId={comment?.id ?? null}
          onSubmit={submitComment}
          onCancel={toggleReplyForm}
          submitting={isPending}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    marginRight: 10,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  author: {
    fontWeight: 'bold',
    color: '#3B82F6',
  },
  timestamp: {
    color: '#6B7280',
    fontSize: 12,
  },
  content: {
    fontSize: 14,
    color: '#374151',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  actionButton: {
    padding: 5,
    borderRadius: 4,
    backgroundColor: '#E5E7EB',
  },
  actionText: {
    color: '#1F2937',
    fontSize: 14,
  },
});
