import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../pages/Home/Home';
import Login from '../pages/Auth/Login';
import {useUserStore} from '../store/useUserStore';
import PostListScreen from '../pages/Posts/PostList';
import CreatePostScreen from '../pages/Posts/CreatePostScreen';
import {CommentsScreen} from '../pages/Posts/CommentScreen';

const Stack = createNativeStackNavigator();

function AppStack() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen
        name="PostList"
        component={PostListScreen}
        options={{title: 'Posts'}}
      />
      <Stack.Screen name="CreatePost" component={CreatePostScreen} />
      <Stack.Screen
        name="Comments"
        component={CommentsScreen} // Replace with actual PostDetails component
        options={{title: 'Post Details'}}
      />
    </Stack.Navigator>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
}

export default function Navigation() {
  const auth = useUserStore(state => state.auth);

  return (
    <NavigationContainer>
      {auth ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
