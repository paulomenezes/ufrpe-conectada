import React, { Component } from 'react';
import { Text, View, TouchableOpacity, AsyncStorage, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import styles from '../styles';

import Welcome from '../components/welcome';
import Restaurant from '../components/restaurant';

import Blue from '../containers/blue';
import White from '../containers/white';

import { getCourseContent } from '../services/api';
import { getCamelSentence } from '../util/functions';

class Course extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.course.classes.name}`
  });

  constructor(props) {
    super(props);

    this.state = {
      course: props.navigation.state.params.course,
      contents: [],
      dayOfWeek: props.navigation.state.params.dayOfWeek
    };
  }

  async componentWillMount() {
    await this.getCourseContent();
  }

  async getCourseContent() {
    try {
      const contents = await getCourseContent(this.state.course.id);
      this.setState({
        contents
      });
      console.log(contents);
    } catch (error) {
      console.log(error);
    }
  }

  goMessages() {}

  render() {
    return (
      <View style={styles.page}>
        <View style={styles.courseList}>
          <Text style={styles.courseListTime}>
            {this.state.course.classes.schedules[this.state.dayOfWeek].timeStart +
              ' - ' +
              this.state.course.classes.schedules[this.state.dayOfWeek].timeEnd}
          </Text>
          <Text style={styles.courseListTitle}>{this.state.course.classes.name}</Text>
          <Text style={styles.courseListPlace}>{this.state.course.classes.place}</Text>
        </View>

        {this.state.contents.map((content, index) => (
          <Blue key={index} title={content.name} onMorePress={this.goMessages.bind(this)}>
            <ScrollView horizontal>
              {content.modules.map((module, index) => <White key={index} title={module.name} />)}
            </ScrollView>
          </Blue>
        ))}
      </View>
    );
  }
}

module.exports = Course;
