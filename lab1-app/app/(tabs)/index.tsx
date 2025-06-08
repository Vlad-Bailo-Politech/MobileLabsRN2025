import { ScrollView, StyleSheet, Text, View } from 'react-native';
import NewsItem from '../../components/NewsItem';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Новини</Text>
      <ScrollView style={styles.newsList}>
        {Array.from({ length: 10 }).map((_, i) => (
          <NewsItem key={i} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 12,
    marginBottom: 5,
  },
  newsList: {
    flex: 1,
    paddingHorizontal: 10,
  },
});
