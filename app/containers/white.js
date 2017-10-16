import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from '../styles';
import { COLORS } from '../contants';

const White = props => (
  <TouchableOpacity
    style={[styles.white, props.style]}
    disabled={!props.onPress}
    onPress={props.onPress}
  >
    <View>
      {props.image && (
        <Icon style={styles.whiteIcon} size={32} name={props.image} color={COLORS.blue} />
      )}
    </View>
    <View style={{ flexDirection: 'column', flex: 1 }}>
      <Text style={styles.whiteTitle}>{props.title}</Text>
      <Text style={styles.whiteDescription}>{props.description}</Text>
    </View>
  </TouchableOpacity>
);

export default White;
