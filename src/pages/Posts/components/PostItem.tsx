import React, {useState} from 'react';
import {View, TouchableOpacity, Pressable} from 'react-native';
import {Card, Image, Text} from 'react-native-elements';
import RenderHTML from 'react-native-render-html';
import {Post} from '../../../types';
import {Dimensions} from 'react-native';
import Icon from '@react-native-vector-icons/fontawesome6';
import {usePostCommentStore} from '../../../store/usePostCommentStore';

const windowWidth = Dimensions.get('window').width;

export const PostItem = ({
  post: item,
  onPress,
  onPressComment,
  width = windowWidth - 40,
}: {
  post: Post;
  onPress: (item: Post) => void;
  onPressComment?: (item: Post) => void;
  width?: number;
}) => {
  const [showFullContent, setShowFullContent] = useState(false);
  const {toggleReplyForm} = usePostCommentStore();

  const getPlainText = (html: string) => {
    return html.replace(/<[^>]*>/g, '');
  };

  const plainText = getPlainText(item.content);
  const previewText =
    plainText.length > 300 ? plainText.slice(0, 300) + '...' : plainText;
  const showViewMore = !showFullContent && plainText.length > 300;

  return (
    <Pressable onPress={() => onPress(item)}>
      <Card containerStyle={{width}}>
        <Card.Title>{item.title}</Card.Title>
        <Card.Divider />

        {showFullContent ? (
          <RenderHTML
            contentWidth={width}
            source={{html: item.content}}
            baseStyle={styles.body}
          />
        ) : (
          <Text style={styles.body}>{previewText}</Text>
        )}

        {showViewMore ? (
          <TouchableOpacity onPress={() => setShowFullContent(true)}>
            <Text style={styles.viewMore}>View more</Text>
          </TouchableOpacity>
        ) : null}

        {item?.images?.length > 0 ? (
          <Image
            source={{uri: item?.images?.[0]?.url}}
            style={styles.postImage}
            resizeMode="cover"
          />
        ) : null}

        <Text style={styles.author}>
          {item?.user_details?.display_name} –{' '}
          {new Date(item?.created_at).toLocaleDateString()}
        </Text>

        <View style={styles.actions}>
          <Icon
            name="comment"
            size={20}
            color="#2089dc"
            onPress={() => {
              if (onPressComment) {
                onPressComment(item);
              } else {
                toggleReplyForm();
              }
            }}
            style={styles.icon}
          />
          <Icon
            name="heart"
            color="#e91e63"
            onPress={() => {}}
            size={20}
            style={styles.icon}
          />
        </View>
      </Card>
    </Pressable>
  );
};

const styles = {
  body: {
    marginBottom: 10,
    fontSize: 14,
    color: '#333',
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginTop: 10,
  },
  author: {
    marginBottom: 10,
    color: '#2089dc',
  },
  actions: {
    flexDirection: 'row',
    marginTop: 10,
    gap: 15,
  },
  icon: {
    padding: 6,
  },
  viewMore: {
    color: '#2089dc',
    marginBottom: 8,
    fontWeight: '500',
  },
};
