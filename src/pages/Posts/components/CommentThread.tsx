// components/comments/CommentThread.tsx
import React, {useEffect, useState} from 'react';
import {View, FlatList, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {CommentItem} from './CommentItem';
import {Comment} from '../../../types';
import {useNavigation} from '@react-navigation/native';

interface CommentThreadProps {
  postId: string;
  comments: Comment[];
  onLoadMore?: (commentId: string) => void;
}

export const CommentThread: React.FC<CommentThreadProps> = ({
  postId,
  comments,
  onLoadMore,
}) => {
  const [expandedComments, setExpandedComments] = useState<Set<string>>(
    new Set(),
  );
  const navigation = useNavigation();
  const toggleExpanded = (commentId: string) => {
    const newExpanded = new Set(expandedComments);
    if (newExpanded.has(commentId)) {
      newExpanded.delete(commentId);
    } else {
      newExpanded.add(commentId);
    }
    setExpandedComments(newExpanded);
  };

  const shouldShowViewMore = (comment: Comment) => {
    return comment.depth_level === 4 || comment.depth_level === 8;
  };

  const renderComment = ({item}: {item: Comment}) => (
    <View>
      <CommentItem
        comment={item}
        isExpanded={expandedComments.has(item.id)}
        onToggleExpanded={() => toggleExpanded(item.id)}
        postId={postId}
      />

      {shouldShowViewMore(item) && item.child_count && item.child_count > 0 && (
        <TouchableOpacity
          style={[styles.viewMoreButton, {marginLeft: item.depth_level * 20}]}
          onPress={() => onLoadMore?.(item?.id)}>
          <Text style={styles.viewMoreText}>View More Replies</Text>
        </TouchableOpacity>
      )}

      {(item.child_count || 0 > 0) && expandedComments.has(item.id) && (
        <CommentThread
          postId={postId}
          comments={item.replies}
          onLoadMore={
            onLoadMore
              ? (commentId: string) => onLoadMore(commentId)
              : undefined
          }
        />
      )}
    </View>
  );

  return (
    <FlatList
      data={comments}
      renderItem={renderComment}
      keyExtractor={item => item.id}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  viewMoreButton: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    marginVertical: 5,
  },
  viewMoreText: {
    color: '#2089dc',
    fontSize: 14,
  },
});
