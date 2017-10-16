import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  Linking,
  ActivityIndicator
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import HTMLView from 'react-native-htmlview';
import moment from 'moment';
import * as locale from 'moment/locale/pt-br';
moment.updateLocale('pt-br', locale);

import White from '../containers/white';
import styles from '../styles';

import { getAssignments } from '../services/api';

export default class Assignment extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.content.name}`
  });

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      course: props.navigation.state.params.course,
      content: props.navigation.state.params.content,
      assignment: undefined
    };

    console.log(this.state);
  }

  async componentDidMount() {
    try {
      const assignment = await getAssignments(this.state.course.id);

      if (assignment) {
        console.log(assignment);
        const assign = assignment.courses[0].assignments.filter(
          assign =>
            assign.cmid === this.state.content.id || assign.id === this.state.content.instance
        )[0];

        if (assign.introattachments) {
          assign.introattachments.forEach(attachment => {
            attachment.fileurl += '&token=' + global.USER.token;
          });
        }

        this.setState({
          assignment: assign,
          loading: false
        });

        this.forceUpdate();
      }
    } catch (error) {
      console.log(error);
      this.setState({
        loading: false
      });
    }
  }

  openLink(link) {
    Linking.openURL(link);
  }

  getDate() {
    const date = new Date(this.state.assignment.duedate * 1000);
    return moment(date).format('llll');
  }

  getRemaing() {
    const date = new Date(this.state.assignment.duedate * 1000);
    const today = new Date();

    if (date.getTime() > today.getTime()) {
      return moment(date).fromNow();
    } else {
      return 'A data de encerramento para essa tarefa já foi atingida';
    }
  }

  render() {
    return (
      <View style={styles.page}>
        <ScrollView>
          <View style={[styles.courseList, { borderLeftColor: this.state.course.color }]}>
            <Text style={styles.courseListTime}>{this.state.course.classes.name}</Text>
            <Text style={styles.courseListTitle}>{this.state.content.name}</Text>
            {this.state.loading && <ActivityIndicator />}
            {this.state.assignment && (
              <View>
                <HTMLView
                  value={this.state.assignment.intro}
                  renderNode={this.renderNode}
                  paragraphBreak=""
                />
                {this.state.assignment.introattachments &&
                  this.state.assignment.introattachments.map((attachment, index) => (
                    <White
                      key={index}
                      style={{ marginLeft: 0, marginBottom: 8, flex: 1 }}
                      title="Clique para ver a imagem"
                      description={attachment.filename}
                      onPress={this.openLink.bind(this, attachment.fileurl)}
                    />
                  ))}
              </View>
            )}
          </View>
          <View style={[styles.courseList, { borderLeftColor: this.state.course.color }]}>
            {this.state.assignment && (
              <View>
                <Text style={styles.courseListPlace}>Data de entrega:</Text>
                <Text style={styles.courseListPlace}>{this.getDate()}</Text>
                <Text style={styles.courseListPlace} />
                <Text style={styles.courseListPlace}>Tempo restante:</Text>
                <Text style={styles.courseListPlace}>{this.getRemaing()}</Text>
              </View>
            )}
          </View>

          {this.state.content.url && (
            <TouchableOpacity
              style={[styles.darkButton, styles.content]}
              onPress={this.openLink.bind(this, this.state.content.url)}
            >
              <Text style={styles.darkButtonText}>Visualizar no AVA</Text>
            </TouchableOpacity>
          )}
        </ScrollView>
      </View>
    );
  }
}
