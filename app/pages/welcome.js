import React, { Component } from 'react';
import { View, AsyncStorage } from 'react-native';
import { NavigationActions } from 'react-navigation';

import styles from '../styles';

import Welcome from '../components/welcome';
import Restaurant from '../components/restaurant';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true
    };
  }

  async componentDidMount() {
    try {
      const result = await AsyncStorage.getItem('user');

      if (result) {
        global.USER = JSON.parse(result);

        const resetAction = NavigationActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: 'Home' })]
        });

        this.props.navigation.dispatch(resetAction);
      } else {
        this.setState({
          loading: false
        });
      }
    } catch (error) {}
  }

  render() {
    return (
      <View style={styles.container}>
        {!this.state.loading && (
          <View>
            <Welcome navigation={this.props.navigation} />
            <Restaurant navigation={this.props.navigation} />
          </View>
        )}
      </View>
    );
  }
}
