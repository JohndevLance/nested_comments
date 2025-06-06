import {Text} from 'react-native-elements';

export function DetailItem({title, value}: {title: string; value: string}) {
  return (
    <Text
      style={{fontSize: 16, marginVertical: 5}}>{`${title}: ${value}`}</Text>
  );
}
