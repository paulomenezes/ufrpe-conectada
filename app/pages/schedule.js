import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { NavigationActions } from 'react-navigation';

import { getCamelSentence } from '../util/functions';
import { weekDays } from '../contants';

import styles from '../styles';

export default class Schedule extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      timetable: {}
    };
  }

  async componentDidMount() {
    const timetable = {};
    global.USER.courses.forEach(course => {
      if (course.classes.schedules) {
        course.classes.schedules.forEach(schedule => {
          if (!timetable[schedule.dayOfWeek]) {
            timetable[schedule.dayOfWeek] = [];
          }

          timetable[schedule.dayOfWeek].push({
            schedule,
            course
          });
        });
      }
    });

    Object.keys(timetable).forEach(key => {
      timetable[key] = timetable[key].sort((a, b) => a.schedule.timeStart > b.schedule.timeStart);
    });

    this.setState({
      timetable
    });
  }

  goToday(course) {
    this.props.navigation.navigate('Course', {
      course: course
    });
  }

  render() {
    return (
      <ScrollView style={[styles.container]}>
        {Object.keys(this.state.timetable).map((key, i) => (
          <View key={i}>
            <Text style={styles.pageTitle}>
              {weekDays[this.state.timetable[key][0].schedule.dayOfWeek]}
            </Text>
            {this.state.timetable[key].map((item, j) => (
              <TouchableOpacity
                key={j}
                style={[styles.courseList, { borderLeftColor: item.course.color }]}
                onPress={this.goToday.bind(this, item.course)}
              >
                <Text style={styles.courseListTime}>
                  {item.schedule.timeStart + ' - ' + item.schedule.timeEnd}
                </Text>
                <Text style={styles.courseListTitle}>{item.course.classes.name}</Text>
                <Text style={styles.courseListPlace}>{item.course.classes.place}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </ScrollView>
    );
  }
}
