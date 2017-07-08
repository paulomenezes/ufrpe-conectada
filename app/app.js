import React from 'react';
import { AppRegistry } from 'react-native';
import { StackNavigator } from 'react-navigation';

import Home from './pages/home';

const UFRPE = StackNavigator({
  Home: { screen: Home }
});

AppRegistry.registerComponent('UFRPEConectada', () => UFRPE);
