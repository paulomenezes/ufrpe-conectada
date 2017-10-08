import React, { Component } from 'react';
import { View, AsyncStorage } from 'react-native';

import styles from '../styles';

import Welcome from '../components/welcome';
import Restaurant from '../components/restaurant';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: undefined
    };
  }

  async componentWillMount() {
    try {
      const result = await AsyncStorage.getItem('user');

      global.USER = JSON.parse(result);

      this.setState({
        user: global.USER
      });
    } catch (error) {}
  }

  render() {
    return (
      <View style={styles.container}>
        {!this.state.user && <Welcome navigation={this.props.navigation} />}
        <Restaurant navigation={this.props.navigation} />
      </View>
    );
  }
}

module.exports = Home;
