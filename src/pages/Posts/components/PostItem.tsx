import {Button, Card, Icon, Image, Text} from 'react-native-elements';
import RenderHTML from 'react-native-render-html';
import {Post} from '../../../types';

export const PostItem = ({
  post: item,
  onPress,
  width,
}: {
  post: Post;
  onPress: () => void;
  width?: number;
}) => {
  //   const {width} = useWindowDimensions();
  return (
    <Card>
      <Card.Title>{item.title}</Card.Title>
      <Card.Divider />
      {/* HTML content */}
      <RenderHTML
        contentWidth={100}
        source={{html: item.content}}
        baseStyle={styles.body}
      />

      {/* Post image if exists */}
      {item?.images?.length > 0 && (
        <Image
          source={{uri: item?.images?.[0]?.url}}
          style={styles.postImage}
          resizeMode="cover"
        />
      )}

      {/* Author info */}
      <Text style={{marginBottom: 10, color: '#2089dc'}}>
        {item?.user_details?.display_name} -{' '}
        {new Date(item?.created_at).toLocaleDateString()}
      </Text>

      {/* View button */}
      <Button
        title="View Details"
        type="outline"
        icon={<Icon name="arrow-forward" type="material" color="#2089dc" />}
        iconRight
        buttonStyle={styles.button}
      />
    </Card>
  );
};

const styles = {
  body: {marginBottom: 10},
  button: {marginTop: 10, borderColor: '#2089dc'},
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginTop: 10,
  },
  button: {marginTop: 10, borderColor: '#2089dc'},
};
