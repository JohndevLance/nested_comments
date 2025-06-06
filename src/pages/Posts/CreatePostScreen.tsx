import React from 'react';
import {View, StyleSheet, TextInput} from 'react-native';
import {Button, Text} from 'react-native-elements';
import {useForm, Controller} from 'react-hook-form';
import {useNavigation} from '@react-navigation/native';
import {useCreatePost} from '../../api/posts';
import Toast from 'react-native-toast-message';

const CreatePostScreen = () => {
  const navigation = useNavigation();
  const {mutate} = useCreatePost();
  const {
    control,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm({
    defaultValues: {
      title: '',
      content: '',
    },
  });

  const resetForm = () => {
    reset({
      title: '',
      content: '',
    });
  };

  const onSubmit = (data: any) => {
    console.log('Post Submitted:', data);

    mutate(data, {
      onSuccess: () => {
        console.log('Post created successfully');
        resetForm();
      },
      onError: error => {
        Toast.show({
          type: 'error',
          text1: 'Post Creation Failed',
          text2: error.message || 'An error occurred while creating the post.',
        });
        console.error('Post creation failed:', error);
      },
    });

    reset();
    navigation.goBack(); // Go back to Home or PostList
  };

  return (
    <View style={styles.container}>
      <Text h4 style={styles.header}>
        Create a New Post
      </Text>

      <Text style={styles.label}>Title</Text>
      <Controller
        control={control}
        name="title"
        rules={{required: 'Title is required'}}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            style={[styles.input, errors.title && styles.inputError]}
            placeholder="Enter post title"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.title && <Text style={styles.error}>{errors.title.message}</Text>}

      <Text style={styles.label}>Content</Text>
      <Controller
        control={control}
        name="content"
        rules={{required: 'Content is required'}}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            style={[
              styles.input,
              styles.textArea,
              errors.content && styles.inputError,
            ]}
            placeholder="Write your post here..."
            multiline
            numberOfLines={6}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.content && (
        <Text style={styles.error}>{errors.content.message}</Text>
      )}

      <Button
        title="Submit Post"
        onPress={handleSubmit(onSubmit)}
        containerStyle={styles.button}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    marginTop: 10,
    marginBottom: 5,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    backgroundColor: '#f9f9f9',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  inputError: {
    borderColor: 'red',
  },
  error: {
    color: 'red',
    marginBottom: 5,
    fontSize: 12,
  },
  button: {
    marginTop: 20,
  },
});

export default CreatePostScreen;
