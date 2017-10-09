import React, { Component } from 'react';
import { Text, View, TouchableOpacity, AsyncStorage } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import styles from '../styles';

import Welcome from '../components/welcome';
import Restaurant from '../components/restaurant';

import Yellow from '../containers/yellow';
import Pink from '../containers/pink';

import { getCamelSentence } from '../util/functions';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: undefined,
      today: [],
      dayOfWeek: 0,
      date: new Date()
    };
  }

  async componentWillMount() {
    try {
      const result = await AsyncStorage.getItem('user');

      global.USER = JSON.parse(result);

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

      console.log(todayCourses);

      this.setState({
        user: global.USER,
        today: todayCourses,
        dayOfWeek
      });
    } catch (error) {
      console.log(error);
    }
  }

  goToday() {
    this.props.navigation.navigate('Course', {
      course: this.state.today[0],
      dayOfWeek: this.state.dayOfWeek
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          {!this.state.user && <Welcome navigation={this.props.navigation} />}
          {this.state.user && (
            <View style={styles.row}>
              <TouchableOpacity style={styles.yellowButton} onPress={this.goToday.bind(this)}>
                <Yellow
                  title={this.state.today[0].classes.name}
                  description="Próxima aula"
                  seeMore={
                    this.state.today[0].classes.schedules[this.state.dayOfWeek].timeStart +
                    ' - ' +
                    this.state.today[0].classes.schedules[this.state.dayOfWeek].timeEnd
                  }
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.pinkButton}>
                <Pink
                  title={this.state.today.length}
                  description={
                    this.state.today.length === 0
                      ? 'Nenhuma aula' + (this.state.date.getDay() === 0 ? ' amanhã' : ' hoje')
                      : (this.state.today.length === 1 ? 'Aula' : 'Aulas') +
                        (this.state.date.getDay() === 0 ? ' amanhã' : ' hoje')
                  }
                />
              </TouchableOpacity>
            </View>
          )}
          <Restaurant navigation={this.props.navigation} />
        </View>
      </View>
    );
  }
}

module.exports = Home;
