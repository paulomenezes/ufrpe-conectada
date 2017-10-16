import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';

import iconv from 'iconv-lite';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { parseString } from 'react-native-xml2js';
import { Buffer } from 'buffer';

import styles from '../styles';
import Blue from '../containers/blue';
import White from '../containers/white';

import { weekDays, meals, COLORS } from '../contants';

export default class Restaurant extends Component {
  constructor(props) {
    super(props);

    const date = new Date();
    let dayOfWeek = date.getDay();

    if (dayOfWeek === 0) {
      dayOfWeek = 1;
    } else if (dayOfWeek === 6) {
      dayOfWeek = 5;
    }

    const dayOfWeekString = this.props.dayOfWeek;

    const inverseDays = {
      segunda: 'Segunda',
      terca: 'Terça',
      quarta: 'Quarta',
      quinta: 'Quinta',
      sexta: 'Sexta'
    };

    this.state = {
      restaurant: global.restaurant,
      description:
        inverseDays[dayOfWeekString] + ' ' + global.restaurant[dayOfWeekString][0].data[0],
      dayOfWeek: weekDays[dayOfWeek],
      dayOfWeekString
    };
  }

  render() {
    return (
      <ScrollView style={styles.page}>
        <View style={[styles.courseList, { borderLeftColor: COLORS.pink }]}>
          <Text style={styles.courseListTime}>{this.state.description}</Text>
          <Text style={styles.courseListTitle}>Almoço</Text>
          {Object.keys(meals).map(
            (key, index) =>
              this.state.restaurant[this.state.dayOfWeekString][0]['almoco'][0][key] && (
                <White
                  key={index}
                  style={{ marginLeft: 0, marginBottom: 8 }}
                  title={this.state.restaurant[this.state.dayOfWeekString][0]['almoco'][0][
                    key
                  ][0].substr(
                    this.state.restaurant[this.state.dayOfWeekString][0]['almoco'][0][
                      key
                    ][0].indexOf(':') + 2
                  )}
                  description={meals[key]}
                />
              )
          )}
        </View>
        <View style={[styles.courseList, { borderLeftColor: COLORS.pink }]}>
          <Text style={styles.courseListTime}>{this.state.description}</Text>
          <Text style={styles.courseListTitle}>Jantar</Text>
          {Object.keys(meals).map(
            (key, index) =>
              this.state.restaurant[this.state.dayOfWeekString][0]['jantar'][0][key] && (
                <White
                  key={index}
                  style={{ marginLeft: 0, marginBottom: 8 }}
                  title={this.state.restaurant[this.state.dayOfWeekString][0]['jantar'][0][
                    key
                  ][0].substr(
                    this.state.restaurant[this.state.dayOfWeekString][0]['jantar'][0][
                      key
                    ][0].indexOf(':') + 2
                  )}
                  description={meals[key]}
                />
              )
          )}
        </View>
      </ScrollView>
    );
  }
}
