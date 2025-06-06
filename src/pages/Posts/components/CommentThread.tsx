// components/comments/CommentThread.tsx
import React, {useEffect, useState} from 'react';
import {View, FlatList, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {CommentItem} from './CommentItem';
import {Comment} from '../../../types';

interface CommentThreadProps {
  postId: string;
  comments: Comment[];
  onLoadMore: (depth: number) => void;
}

export const CommentThread: React.FC<CommentThreadProps> = ({
  postId,
  comments,
  onLoadMore,
}) => {
  const [expandedComments, setExpandedComments] = useState<Set<string>>(
    new Set(),
  );

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

      {shouldShowViewMore(item) && item.has_more_replies && (
        <TouchableOpacity
          style={[styles.viewMoreButton, {marginLeft: item.depth_level * 20}]}
          onPress={() => onLoadMore(item.depth_level + 1)}>
          <Text style={styles.viewMoreText}>View More Replies</Text>
        </TouchableOpacity>
      )}

      {item.replies && expandedComments.has(item.id) && (
        <CommentThread
          postId={postId}
          comments={item.replies}
          onLoadMore={onLoadMore}
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
