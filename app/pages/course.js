import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  AsyncStorage,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import styles from '../styles';

import Welcome from '../components/welcome';
import Restaurant from '../components/restaurant';

import Blue from '../containers/blue';
import White from '../containers/white';

import { getCourseContent } from '../services/api';
import { getCamelSentence } from '../util/functions';

import { MIME_TYPES } from '../contants';

export default class Course extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.course.classes.name}`
  });

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
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
        contents,
        loading: false
      });

      this.forceUpdate();
    } catch (error) {
      this.setState({
        loading: false
      });

      console.log(error);
    }
  }

  getImage(module) {
    if (module.contents) {
      const name = module.contents[0].filename.split('.');
      const extension = name[name.length - 1];

      return MIME_TYPES[extension] ? MIME_TYPES[extension] : 'file-o';
    } else {
      return MIME_TYPES[module.modname] ? MIME_TYPES[module.modname] : 'file';
    }
  }

  openModule(module) {
    this.props.navigation.navigate('Module', {
      module,
      course: this.state.course
    });
  }

  render() {
    return (
      <View style={styles.page}>
        <View style={[styles.courseList, { borderLeftColor: this.state.course.color }]}>
          <Text style={styles.courseListTime}>
            {this.state.course.classes.schedules[this.state.dayOfWeek].timeStart +
              ' - ' +
              this.state.course.classes.schedules[this.state.dayOfWeek].timeEnd}
          </Text>
          <Text style={styles.courseListTitle}>{this.state.course.classes.name}</Text>
          <Text style={styles.courseListPlace}>{this.state.course.classes.place}</Text>
        </View>

        <ScrollView>
          {this.state.loading && <ActivityIndicator />}
          {this.state.contents.map((content, index) => (
            <View key={index}>
              <View style={{ borderBottomWidth: 1, borderBottomColor: '#DDD' }}>
                <Text
                  style={{
                    paddingHorizontal: 16,
                    paddingTop: 16,
                    paddingBottom: 8,
                    fontWeight: 'bold'
                  }}
                >
                  {content.name}
                </Text>
                <ScrollView horizontal>
                  {content.modules.map((module, index) => (
                    <White
                      key={index}
                      title={module.name}
                      description={module.modplural}
                      image={this.getImage(module)}
                    />
                  ))}
                </ScrollView>
                <TouchableOpacity
                  style={styles.seeMore}
                  onPress={this.openModule.bind(this, content)}
                >
                  <Text style={styles.seeMoreText}>Ver detalhes</Text>
                  <Icon style={styles.seeMoreText} name="keyboard-arrow-right" size={20} />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    );
  }
}
