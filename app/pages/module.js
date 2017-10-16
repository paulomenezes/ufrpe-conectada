import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  AsyncStorage,
  ScrollView,
  Dimensions,
  Linking
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import HTMLView from 'react-native-htmlview';

import styles from '../styles';

import Welcome from '../components/welcome';
import Restaurant from '../components/restaurant';

import Blue from '../containers/blue';
import White from '../containers/white';

import { getCourseContent } from '../services/api';
import { getCamelSentence } from '../util/functions';

import { MIME_TYPES } from '../contants';

const window = Dimensions.get('window');

export default class Module extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.module.name}`
  });

  constructor(props) {
    super(props);

    this.state = {
      course: props.navigation.state.params.course,
      content: props.navigation.state.params.module
    };

    console.log(this.state);

    this.data = this.state.content.summary.replace(/\n/gi, '');
  }

  renderNode(node, index, siblings, parent, defaultRenderer) {
    if (node.type === 'text' && node.data.length === 1) {
      return null;
    }
  }

  getImage(module) {
    if (module.contents && module.contents.length > 0) {
      const name = module.contents[0].filename.split('.');
      const extension = name[name.length - 1];

      return MIME_TYPES[extension] ? MIME_TYPES[extension] : 'file-o';
    } else {
      return MIME_TYPES[module.modname] ? MIME_TYPES[module.modname] : 'file';
    }
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
        <ScrollView>
          <View style={[styles.courseList, { borderLeftColor: this.state.course.color }]}>
            <Text style={styles.courseListTitle}>{this.state.content.name}</Text>
            <View>
              <HTMLView value={this.data} renderNode={this.renderNode} />
            </View>
          </View>

          <View style={{ marginBottom: 16, flex: 1 }}>
            {this.state.content.modules.map((content, index) => (
              <White
                key={index}
                style={{ marginBottom: 16, width: window.width - 28 }}
                title={content.name}
                description={content.modplural}
                image={this.getImage(content)}
                onPress={this.onPress.bind(this, content)}
              />
            ))}
          </View>
        </ScrollView>
      </View>
    );
  }
}
