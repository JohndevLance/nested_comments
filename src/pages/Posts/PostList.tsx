import React from 'react';
import {
  FlatList,
  View,
  StyleSheet,
  useWindowDimensions,
  ActivityIndicator,
} from 'react-native';
import {Text} from 'react-native-elements';
import {usePosts} from '../../api/posts';
import {PostItem} from './components/PostItem';
import {usePostCommentStore} from '../../store/usePostCommentStore';
import {Post} from '../../types';
import {useNavigation} from '@react-navigation/native';
import {PER_PAGE} from '../../constants/common';

const PostListScreen = () => {
  const queryParams = {
    per_page: PER_PAGE,
    sort: 'latest',
  };
  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = usePosts(queryParams);

  const navigation = useNavigation();
  const {setPostId, setPost, toggleReplyForm} = usePostCommentStore();
  const {width} = useWindowDimensions();

  // Flatten paginated data
  const postsData = data
    ? data.pages.flatMap(page => page.items || page.posts || [])
    : [];

  if (isLoading) {
    return <ActivityIndicator />;
  }
  if (isError) {
    return <Text>Error loading posts: {error?.message}</Text>;
  }

  const onPressPost = (post: Post) => {
    setPost(post);
    setPostId(post.id);

    navigation.navigate('PostScreen');
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={postsData}
        renderItem={({item}) => (
          <PostItem
            post={item}
            onPress={() => onPressPost(item)}
            onPressComment={() => {
              setPost(item);
              setPostId(item.id);
              toggleReplyForm();
              navigation.navigate('PostScreen', {
                addComment: true,
              });
            }}
            width={width}
          />
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) fetchNextPage();
        }}
        onEndReachedThreshold={0.8}
        ListFooterComponent={isFetchingNextPage ? <ActivityIndicator /> : null}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {backgroundColor: '#fff', marginHorizontal: 10},
  list: {paddingBottom: 20},
  body: {marginBottom: 10},
  button: {marginTop: 10, borderColor: '#2089dc'},
});

export default PostListScreen;
