import React from 'react';
import { AppRegistry } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';

import './util/reactotron.config';
import styles from './styles';
import { COLORS } from './contants';

import Welcome from './pages/welcome';
import Home from './pages/home';
import Login from './pages/login';
import Restaurant from './pages/restaurant';
import Course from './pages/course';
import Module from './pages/module';
import Assignment from './pages/assignment';

import Exercices from './pages/exercices';
import Schedule from './pages/schedule';
import Messages from './pages/messages';
import Message from './pages/message';
import Map from './pages/map';

import NewsList from './pages/newsList';
import NewsPage from './pages/newsPage';

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
      activeTintColor: COLORS.pink,
      inactiveTintColor: COLORS.blue,
      style: {
        backgroundColor: '#FFF',
        ...styles.shadow
      }
    }
  }
);

const HomeTab = TabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        tabBarLabel: 'Inicio',
        tabBarIcon: ({ tintColor }) => <Icon name="home" size={20} color={tintColor} />
      }
    },
    Exercices: {
      screen: Exercices,
      navigationOptions: {
        tabBarLabel: 'Exercícios',
        tabBarIcon: ({ tintColor }) => <Icon name="today" size={20} color={tintColor} />
      }
    },
    Schedule: {
      screen: Schedule,
      navigationOptions: {
        tabBarLabel: 'Horário',
        tabBarIcon: ({ tintColor }) => <Icon name="view-week" size={20} color={tintColor} />
      }
    },
    Messages: {
      screen: Messages,
      navigationOptions: {
        tabBarLabel: 'Mensagens',
        tabBarIcon: ({ tintColor }) => <Icon name="chat" size={20} color={tintColor} />
      }
    },
    News: {
      screen: NewsList,
      navigationOptions: {
        tabBarLabel: 'Notícias',
        tabBarIcon: ({ tintColor }) => <Icon name="school" size={20} color={tintColor} />
      }
    }
  },
  {
    lazy: true,
    tabBarOptions: {
      activeTintColor: COLORS.pink,
      inactiveTintColor: COLORS.blue,
      style: {
        backgroundColor: '#FFF',
        ...styles.shadow
      }
    }
  }
);

const UFRPE = StackNavigator(
  {
    Welcome: { screen: Welcome, navigationOptions: { title: 'UFRPE Conectada' } },
    Home: { screen: HomeTab, navigationOptions: { title: 'UFRPE Conectada' } },
    Login: { screen: Login, navigationOptions: { title: 'UFRPE Conectada' } },
    Restaurant: { screen: RestaurantTab, navigationOptions: { title: 'Cardápio' } },
    Course: { screen: Course },
    Module: { screen: Module },
    Assignment: { screen: Assignment },
    Message: { screen: Message },
    NewsPage: { screen: NewsPage }
  },
  {
    cardStyle: styles.container,
    navigationOptions: {
      headerStyle: [
        {
          backgroundColor: '#FFF'
        },
        styles.shadow
      ],
      headerTintColor: COLORS.blue
    }
  }
);

AppRegistry.registerComponent('UFRPEConectada', () => UFRPE);
