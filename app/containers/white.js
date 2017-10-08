import React from 'react';
import { View, Text } from 'react-native';

import styles from '../styles';

const White = props => (
  <View style={styles.white}>
    <Text style={styles.whiteTitle}>{props.title}</Text>
    <Text style={styles.whiteDescription}>{props.description}</Text>
  </View>
);

export default White;
