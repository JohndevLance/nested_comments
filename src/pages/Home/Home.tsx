import {useNavigation} from '@react-navigation/native';
import React, {useLayoutEffect} from 'react';
import {View, StyleSheet, ScrollView, Pressable} from 'react-native';
import {Card, Text, Icon, Button} from 'react-native-elements';
import {useUserStore} from '../../store/useUserStore';
import PostList from '../Posts/PostList';

const Home = () => {
  const navigation = useNavigation();

  const logout = useUserStore(state => state.logout);

  const handleLogOut = () => {
    logout();
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <Button title="Logout" onPress={handleLogOut} />,
    });
  }, [navigation]);

  const handleCreatePost = () => {
    navigation.navigate('CreatePost');
  };
  const goToCommentScreen = () => {
    navigation.navigate('Comments'); // Replace with actual post ID
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Button onPress={goToCommentScreen} title="Go to Comments" />
        <Card containerStyle={styles.card}>
          <Pressable onPress={handleCreatePost} style={styles.createPost}>
            <Icon name="edit" type="material" color="#2089dc" />
            <Text style={styles.createPostText}>What's on your mind?</Text>
          </Pressable>
        </Card>
        <PostList />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  card: {
    width: '100%',
    borderRadius: 10,
    elevation: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  icon: {
    marginRight: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    color: '#555',
  },
  createPost: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  createPostText: {
    marginLeft: 10,
    color: '#2089dc',
    fontSize: 16,
  },
});

export default Home;
