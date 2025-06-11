// import React from 'react';
// import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// export default function Breadcrumb({ currentPath, isRoot, goBack }: { currentPath: string; isRoot: boolean; goBack: () => void }) {
//   return (
//     <View style={styles.breadcrumb}>
//       <TouchableOpacity onPress={goBack} disabled={isRoot}>
//         <Text style={{ color: isRoot ? 'gray' : 'blue' }}>⬅ Назад</Text>
//       </TouchableOpacity>
//       <Text style={styles.path}>{currentPath}</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   breadcrumb: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 10,
//     alignItems: 'center',
//   },
//   path: { fontSize: 14, fontStyle: 'italic' },
// });

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as FileSystem from 'expo-file-system';

interface Props {
  currentPath: string;
  isRoot: boolean;
  goBack: () => void;
}

export default function Breadcrumbs({ currentPath, isRoot, goBack }: Props) {
  return (
    <View style={styles.breadcrumb}>
      <TouchableOpacity onPress={goBack} disabled={isRoot}>
        <Text style={{ color: isRoot ? 'gray' : 'blue' }}>⬅ Назад</Text>
      </TouchableOpacity>
      <Text style={styles.path}>
        {currentPath.replace(FileSystem.documentDirectory!, '')}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  breadcrumb: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    alignItems: 'center',
  },
  path: { fontSize: 14, fontStyle: 'italic' },
});
