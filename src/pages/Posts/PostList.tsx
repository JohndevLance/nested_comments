import React from 'react';
import {FlatList, View, StyleSheet, useWindowDimensions} from 'react-native';
import {Card, Text, Button, Icon} from 'react-native-elements';
import {usePosts} from '../../api/posts';
import RenderHTML from 'react-native-render-html';
import {PostItem} from './components/PostItem';

// Sample post data (replace with your API later)
const PostListScreen = () => {
  const usePostsQuery = usePosts();
  const {width} = useWindowDimensions();
  const {data: posts, isLoading, error} = usePostsQuery;
  const postsData = posts?.items || [];

  if (isLoading) {
    return <Text>Loading...</Text>;
  }
  if (error) {
    return <Text>Error loading posts: {error.message}</Text>;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={postsData}
        renderItem={({item}) => {
          return PostItem({post: item, onPress: () => {}, width});
        }}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
  list: {paddingBottom: 20},
  body: {marginBottom: 10},
  button: {marginTop: 10, borderColor: '#2089dc'},
});

export default PostListScreen;
