import { View, Text, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function NewsItem() {
  return (
    <View style={styles.item}>
      <Ionicons style={styles.icon} name={'newspaper'} size={55} color={'#636363'}/>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Заголовок новини</Text>
        <Text style={styles.date}>Дата новини</Text>
        <Text style={styles.snippet}>Короткий текст новини</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  icon: {
    marginHorizontal: 10,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
  },
  date: {
    fontSize: 12,
    color: '#777',
  },
  snippet: {
    fontSize: 14,
  },
});
