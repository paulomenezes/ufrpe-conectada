import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  AsyncStorage,
  ScrollView,
  ActivityIndicator,
  FlatList,
  Linking
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import styles from '../styles';

import Welcome from '../components/welcome';
import Restaurant from '../components/restaurant';

import Blue from '../containers/blue';
import White from '../containers/white';

import { getCourseContent } from '../services/api';
import { getCamelSentence } from '../util/functions';

import { MIME_TYPES, weekDaysShort } from '../contants';

export default class Course extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.course.classes.name}`
  });

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      course: props.navigation.state.params.course,
      contents: []
    };

    this.renderItem = this.renderItem.bind(this);
  }

  async componentDidMount() {
    await this.getCourseContent();
  }

  async getCourseContent() {
    try {
      const contents = await getCourseContent(this.state.course.id);
      if (contents) {
        this.setState({
          contents,
          loading: false
        });

        this.forceUpdate();
      }
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

  _keyExtractor = (item, index) => item.id;

  renderItem({ item }) {
    return (
      <View>
        <View style={{ borderBottomWidth: 1, borderBottomColor: '#DDD' }}>
          <Text
            style={{
              paddingHorizontal: 16,
              paddingTop: 16,
              paddingBottom: 8,
              fontWeight: 'bold'
            }}
          >
            {item.name}
          </Text>
          <ScrollView horizontal>
            {item.modules.map((module, index) => (
              <White
                key={index}
                title={module.name}
                description={module.modplural}
                image={this.getImage(module)}
                onPress={this.onPress.bind(this, module)}
              />
            ))}
          </ScrollView>
          <TouchableOpacity style={styles.seeMore} onPress={this.openModule.bind(this, item)}>
            <Text style={styles.seeMoreText}>Ver detalhes</Text>
            <Icon style={styles.seeMoreText} name="keyboard-arrow-right" size={20} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  onPress(content) {
    switch (content.modname) {
      case 'assign':
        this.props.navigation.navigate('Assignment', {
          course: this.state.course,
          content: content
        });
        break;
      case 'url':
      case 'resource':
        if (content.contents && content.contents[0]) {
          Linking.openURL(`${content.contents[0].fileurl}&token=${global.USER.token}`);
        }
        break;
    }
  }

  render() {
    return (
      <View style={styles.page}>
        <View style={[styles.courseList, { borderLeftColor: this.state.course.color }]}>
          {this.state.course.classes.schedules &&
            this.state.course.classes.schedules
              .sort((a, b) => a.dayOfWeek > b.dayOfWeek)
              .map((schedule, index) => (
                <Text key={index} style={styles.courseListTime}>
                  {weekDaysShort[schedule.dayOfWeek] +
                    ': ' +
                    schedule.timeStart +
                    ' - ' +
                    schedule.timeEnd}
                </Text>
              ))}
          <Text style={styles.courseListTitle}>{this.state.course.classes.name}</Text>
          <Text style={styles.courseListPlace}>
            {this.state.course.classes.place
              ? this.state.course.classes.place
              : this.state.course.classes.departament}
          </Text>
        </View>

        <ScrollView>
          {this.state.loading && <ActivityIndicator />}
          <FlatList
            data={this.state.contents}
            keyExtractor={this._keyExtractor}
            renderItem={this.renderItem}
          />
        </ScrollView>
      </View>
    );
  }
}
