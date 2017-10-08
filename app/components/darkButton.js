import React from 'react';
import { Text, TouchableOpacity, ActivityIndicator } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import styles from '../styles';

const DarkButton = props => (
  <TouchableOpacity
    style={[styles.darkButton, styles.formButon]}
    onPress={props.onPress}
    disabled={props.disabled}
  >
    {props.disabled ? (
      <ActivityIndicator color="#FFF" />
    ) : (
      <Text style={styles.darkButtonText}>{props.title}</Text>
    )}
  </TouchableOpacity>
);

export default DarkButton;
