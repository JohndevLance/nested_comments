import {useNavigation} from '@react-navigation/native';
import React, {useLayoutEffect} from 'react';
import {View, StyleSheet, ScrollView, Pressable} from 'react-native';
import {Card, Text, Button} from 'react-native-elements';
import {useUserStore} from '../../store/useUserStore';
import PostList from '../Posts/PostList';
import Icon from '@react-native-vector-icons/fontawesome6';

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
    <View>
      <View style={styles.container}>
        <Card containerStyle={styles.card}>
          <Pressable onPress={handleCreatePost} style={styles.createPost}>
            <Icon
              name="pen"
              color="#2089dc"
              size={20}
              style={styles.icon}
              iconStyle="solid"
              onPress={goToCommentScreen}
            />
            <Text style={styles.createPostText}>What's on your mind?</Text>
          </Pressable>
        </Card>
      </View>
      <PostList />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    alignItems: 'center',
    marginBottom: 20,
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
    marginBottom: 10,
  },
  createPostText: {
    marginLeft: 10,
    color: '#2089dc',
    fontSize: 16,
  },
});

export default Home;
