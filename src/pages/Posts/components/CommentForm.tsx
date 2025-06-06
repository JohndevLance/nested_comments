import React from 'react';
import {View} from 'react-native';
import {Button, Input} from 'react-native-elements';
import {useForm, Controller} from 'react-hook-form';
import {TextAreaField} from '../../../components/TextAreaInputField';
import {CommentPayload} from '../../../types';

type CommentFormProps = {
  onSubmit: (data: CommentPayload) => void;
  parentId: string;
  submitting?: boolean;
  postId: string; // Added postId to the props
  onCancel?: () => void; // Optional cancel callback
};

export const CommentForm: React.FC<CommentFormProps> = ({
  onSubmit,
  parentId,
  submitting = false,
  postId, // Added postId to the props
  onCancel,
}) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm<{content: string}>({
    defaultValues: {content: ''},
  });

  const handleFormSubmit = (data: {content: string}) => {
    onSubmit({
      content: data.content,
      post_id: postId, // Pass postId to the onSubmit function
      reply_to: parentId || undefined, // Use parentId if provided
    });
    reset(); // clear the form
  };

  return (
    <View style={{marginVertical: 10}}>
      <TextAreaField
        name="content"
        control={control}
        placeholder="Write a comment..."
        rules={{required: 'Comment cannot be empty'}}
        numberOfLines={4}
      />

      <Button
        title={submitting ? 'Submitting...' : 'Post Comment'}
        onPress={handleSubmit(handleFormSubmit)}
        loading={submitting}
        disabled={submitting}
        buttonStyle={{
          marginTop: 10,
          backgroundColor: submitting ? '#C97CFA' : '#A020F0',
          borderRadius: 5,
        }}
      />
    </View>
  );
};
