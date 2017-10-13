import React, { Component } from 'react';
import { Text, View, TouchableOpacity, AsyncStorage } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { NavigationActions } from 'react-navigation';

import styles from '../styles';

import Welcome from '../components/welcome';
import Restaurant from '../components/restaurant';

import Yellow from '../containers/yellow';
import Pink from '../containers/pink';

import { getCamelSentence } from '../util/functions';
import { weekDays, months } from '../contants';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: undefined,
      today: [],
      dayOfWeek: 0,
      date: new Date()
    };
  }

  componentDidMount() {
    try {
      let today = this.state.date.getDay();
      if (today === 0 || today === 6) {
        today = 1;
      }

      let dayOfWeek = 0;

      const todayCourses = [];
      global.USER.courses.forEach(course => {
        if (course.classes.schedules) {
          for (var i = 0; i < course.classes.schedules.length; i++) {
            var schedule = course.classes.schedules[i];
            if (schedule.dayOfWeek === today) {
              dayOfWeek = i;
              todayCourses.push(course);
              break;
            }
          }
        }
      });

      this.setState({
        user: global.USER,
        today: todayCourses,
        dayOfWeek
      });
    } catch (error) {
      console.log(error);
    }
  }

  goToday(course) {
    this.props.navigation.navigate('Course', {
      course: course,
      dayOfWeek: this.state.dayOfWeek
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <View>
            <Text style={styles.pageTitle}>
              {weekDays[this.state.date.getDay()] +
                ', ' +
                this.state.date.getDate() +
                ' de ' +
                months[this.state.date.getMonth()].toLowerCase()}
            </Text>
            {this.state.today.map((today, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.courseList, { borderLeftColor: today.color }]}
                onPress={this.goToday.bind(this, today)}
              >
                <Text style={styles.courseListTime}>
                  {today.classes.schedules[this.state.dayOfWeek].timeStart +
                    ' - ' +
                    today.classes.schedules[this.state.dayOfWeek].timeEnd}
                </Text>
                <Text style={styles.courseListTitle}>{today.classes.name}</Text>
                <Text style={styles.courseListPlace}>{today.classes.place}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <Restaurant navigation={this.props.navigation} />
        </View>
      </View>
    );
  }
}
