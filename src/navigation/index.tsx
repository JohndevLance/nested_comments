import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../pages/Home/Home';
import Login from '../pages/Auth/Login';
import {useUserStore} from '../store/useUserStore';
import PostListScreen from '../pages/Posts/PostList';
import CreatePostScreen from '../pages/Posts/CreatePostScreen';
import {PostScreen} from '../pages/Posts/PostScreen';
import {CommentsReplies} from '../pages/Posts/CommentReplies';
import {CommentsDeepReplies} from '../pages/Posts/CommentDeepReplies';

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
        name="PostScreen"
        component={PostScreen} // Replace with actual PostDetails component
        options={{title: 'Post Details'}}
      />
      <Stack.Screen
        name="CommentReplies"
        component={CommentsReplies} // Replace with actual PostDetails component
        options={{title: 'Comment Replies'}}
      />
      {/* deep replies */}
      <Stack.Screen
        name="DeepReplies"
        component={CommentsDeepReplies} // Replace with actual DeepReplies component
        options={{title: 'Deep Replies'}}
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
