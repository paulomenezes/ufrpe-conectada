import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import styles from '../styles';
import { getCamelSentence } from '../util/functions';

const Yellow = props => (
  <View style={styles.yellow}>
    <Text style={styles.yellowTitle} numberOfLines={props.numberOfLines ? props.numberOfLines : 2}>
      {getCamelSentence(props.title, true)}
    </Text>
    <Text style={styles.yellowSubtitle}>{props.description}</Text>
    <View style={styles.seeMore}>
      <Text style={styles.seeMoreText}>{props.seeMore}</Text>
      <Icon name="keyboard-arrow-right" size={20} color="#FFF" />
    </View>
  </View>
);

export default Yellow;
