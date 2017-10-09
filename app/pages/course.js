import React, { Component } from 'react';
import { Text, View, TouchableOpacity, AsyncStorage } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import styles from '../styles';

import Welcome from '../components/welcome';
import Restaurant from '../components/restaurant';

import Yellow from '../containers/yellow';
import Pink from '../containers/pink';

import { getCamelSentence } from '../util/functions';

class Course extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.course.classes.name}`
  });

  constructor(props) {
    super(props);

    this.state = {
      course: props.navigation.state.params.course,
      dayOfWeek: props.navigation.state.params.dayOfWeek
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <Yellow
            numberOfLines={5}
            title={this.state.course.classes.name}
            description={this.state.course.classes.place}
            seeMore={
              this.state.course.classes.schedules[this.state.dayOfWeek].timeStart +
              ' - ' +
              this.state.course.classes.schedules[this.state.dayOfWeek].timeEnd
            }
          />
        </View>
      </View>
    );
  }
}

module.exports = Course;
