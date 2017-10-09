import React from 'react';
import { AppRegistry } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';

import './util/reactotron.config';
import styles from './styles';

import Home from './pages/home';
import Login from './pages/login';
import Restaurant from './pages/restaurant';
import Course from './pages/course';

const Monday = props => <Restaurant navigation={props.navigation} dayOfWeek="segunda" />;
const Tuesday = props => <Restaurant navigation={props.navigation} dayOfWeek="terca" />;
const Wednesday = props => <Restaurant navigation={props.navigation} dayOfWeek="quarta" />;
const Thursday = props => <Restaurant navigation={props.navigation} dayOfWeek="quinta" />;
const Friday = props => <Restaurant navigation={props.navigation} dayOfWeek="sexta" />;

const RestaurantTab = TabNavigator(
  {
    Monday: {
      screen: Monday,
      navigationOptions: {
        tabBarLabel: 'Segunda'
      }
    },
    Tuesday: {
      screen: Tuesday,
      navigationOptions: {
        tabBarLabel: 'Terça'
      }
    },
    Wednesday: {
      screen: Wednesday,
      navigationOptions: {
        tabBarLabel: 'Quarta'
      }
    },
    Thursday: {
      screen: Thursday,
      navigationOptions: {
        tabBarLabel: 'Quinta'
      }
    },
    Friday: {
      screen: Friday,
      navigationOptions: {
        tabBarLabel: 'Sexta'
      }
    }
  },
  {
    lazy: true,
    tabBarOptions: {
      showIcon: false,
      activeTintColor: '#f21e60',
      inactiveTintColor: '#fff',
      style: {
        backgroundColor: '#121f38'
      }
    }
  }
);

const UFRPE = StackNavigator(
  {
    Home: { screen: Home, navigationOptions: { title: 'UFRPE Conectada' } },
    Login: { screen: Login, navigationOptions: { title: 'UFRPE Conectada' } },
    Restaurant: { screen: RestaurantTab, navigationOptions: { title: 'Cardápio' } },
    Course: { screen: Course }
  },
  {
    cardStyle: styles.container,
    navigationOptions: {
      headerStyle: { backgroundColor: '#1B2D4F' },
      headerTintColor: '#FFF'
    }
  }
);

AppRegistry.registerComponent('UFRPEConectada', () => UFRPE);
