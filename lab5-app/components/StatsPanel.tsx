// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';

// export default function StatsPanel({ total, free }: { total: number; free: number }) {
//   const formatSize = (bytes: number) => {
//     if (bytes >= 1024 * 1024 * 1024) {
//       return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
//     } else {
//       return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
//     }
//   };

//   return (
//     <View style={styles.statsPanel}>
//       <Text>Загальний обсяг: {formatSize(total)}</Text>
//       <Text>Вільно: {formatSize(free)}</Text>
//       <Text>Зайнято: {formatSize(total - free)}</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   statsPanel: {
//     backgroundColor: '#dfe6e9',
//     padding: 10,
//     borderRadius: 10,
//     marginVertical: 10,
//   },
// });

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Props {
  total: number;
  free: number;
}

export default function StatsPanel({ total, free }: Props) {
  const formatSize = (bytes: number) => `${(bytes / (1024 * 1024)).toFixed(2)} MB`;

  return (
    <View style={styles.panel}>
      <Text>Загальний обсяг: {formatSize(total)}</Text>
      <Text>Вільно: {formatSize(free)}</Text>
      <Text>Зайнято: {formatSize(total - free)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  panel: {
    backgroundColor: '#dfe6e9',
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
  },
});
