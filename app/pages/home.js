import React, { Component } from 'react';
import { Text, View, TouchableOpacity, AsyncStorage } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import styles from '../styles';

import Welcome from '../components/welcome';
import Restaurant from '../components/restaurant';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: undefined,
      today: [],
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

      console.log(global.USER);

      const todayCourses = [];
      global.USER.courses.forEach(course => {
        if (course.classes.schedules) {
          for (var i = 0; i < course.classes.schedules.length; i++) {
            var schedule = course.classes.schedules[i];
            if (schedule.dayOfWeek === today) {
              todayCourses.push(course);
              break;
            }
          }
        }
      });

      console.log(todayCourses);

      this.setState({
        user: global.USER,
        today: todayCourses
      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          {!this.state.user && <Welcome navigation={this.props.navigation} />}
          {this.state.user && (
            <View>
              <View style={styles.row}>
                <TouchableOpacity style={styles.yellow}>
                  <Text style={styles.yellowTitle} numberOfLines={2}>
                    {this.state.today[0].classes.name}
                  </Text>
                  <Text style={styles.yellowSubtitle}>Próxima aula</Text>
                  <View style={styles.seeMore}>
                    <Text style={styles.seeMoreText}>14:00 - 16:00</Text>
                    <Icon name="keyboard-arrow-right" size={20} color="#FFF" />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.pink}>
                  <Text style={styles.pinkTitle}>{this.state.today.length}</Text>
                  <Text style={styles.pinkSubtitle}>
                    {this.state.date.getDay() === 0 ? 'Aulas amanhã' : 'Aulas hoje'}
                  </Text>
                  <View style={styles.seeMore}>
                    <Text style={styles.seeMoreText}>Ver</Text>
                    <Icon name="keyboard-arrow-right" size={20} color="#FFF" />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          )}
          <Restaurant navigation={this.props.navigation} />
        </View>
      </View>
    );
  }
}

module.exports = Home;
