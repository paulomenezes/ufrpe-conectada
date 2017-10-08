import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator
} from 'react-native';

import iconv from 'iconv-lite';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { parseString } from 'react-native-xml2js';
import { Buffer } from 'buffer';

import styles from '../styles';

import Welcome from '../components/welcome';
import Restaurant from '../components/restaurant';

class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Welcome />
        <Restaurant navigation={this.props.navigation} />
      </View>
    );
  }
}

module.exports = Home;
