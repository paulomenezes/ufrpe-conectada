import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import styles from '../styles';

const Pink = props => (
  <View style={styles.pink}>
    <Text style={styles.pinkTitle}>{props.title}</Text>
    <Text style={styles.pinkSubtitle}>{props.description}</Text>
    <View style={styles.seeMore}>
      <Text style={styles.seeMoreText}>Ver</Text>
      <Icon name="keyboard-arrow-right" size={20} color="#FFF" />
    </View>
  </View>
);

export default Pink;
