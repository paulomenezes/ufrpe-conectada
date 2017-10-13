import React from 'react';
import { View, Text, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from '../styles';
import { COLORS } from '../contants';

const White = props => (
  <View style={[styles.white, props.style]}>
    <View>
      {props.image && (
        <Icon style={styles.whiteIcon} size={32} name={props.image} color={COLORS.blue} />
      )}
    </View>
    <View style={{ flexDirection: 'column', flex: 1 }}>
      <Text style={styles.whiteTitle}>{props.title}</Text>
      <Text style={styles.whiteDescription}>{props.description}</Text>
    </View>
  </View>
);

export default White;
