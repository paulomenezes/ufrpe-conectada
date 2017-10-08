import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import styles from '../styles';

const Blue = props => (
  <View style={styles.blue}>
    <Text style={styles.blueTitle}>{props.title}</Text>
    <Text style={styles.blueDescription}>{props.description}</Text>
    {props.children}
    {props.onMorePress && (
      <TouchableOpacity style={styles.seeMore} onPress={props.onMorePress}>
        <Text style={styles.seeMoreText}>Ver mais</Text>
        <Icon name="keyboard-arrow-right" size={20} color="#FFF" />
      </TouchableOpacity>
    )}
  </View>
);

export default Blue;
