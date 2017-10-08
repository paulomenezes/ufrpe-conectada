import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';

import iconv from 'iconv-lite';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { parseString } from 'react-native-xml2js';
import { Buffer } from 'buffer';

import styles from '../styles';
import Blue from '../containers/blue';
import White from '../containers/white';

import { weekDays, meals } from '../contants';

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

    const dayOfWeekString = weekDays[dayOfWeek].toLowerCase();
    const meal = date.getHours() < 15 ? 'almoco' : 'jantar';

    this.state = {
      restaurant: undefined,
      title: date.getHours() < 15 ? 'Almoço' : 'Jantar',
      description: '',
      date,
      meal,
      dayOfWeek: weekDays[dayOfWeek],
      dayOfWeekString
    };
  }

  componentWillMount() {
    this.getMenu();
  }

  getMenu() {
    const req = new XMLHttpRequest();
    req.open('GET', 'http://restaurante.6te.net/restaurante.xml', true);
    req.responseType = 'arraybuffer';

    req.onload = event => {
      const resp = req.response;
      if (resp) {
        const responseText = iconv.decode(new Buffer(resp), 'iso-8859-1').toString();
        parseString(responseText, (err, result) => {
          global.restaurant = result.restaurante;

          this.setState({
            restaurant: result.restaurante,
            description:
              this.state.dayOfWeek + ' ' + result.restaurante[this.state.dayOfWeekString][0].data[0]
          });
        });
      }
    };

    req.send(null);
  }

  goRestaurant() {
    this.props.navigation.navigate('Restaurant');
  }

  render() {
    return (
      <View style={styles.content}>
        {this.state.restaurant ? (
          <Blue
            title={this.state.title}
            description={this.state.description}
            onMorePress={this.goRestaurant.bind(this)}
          >
            <ScrollView horizontal>
              {Object.keys(meals).map(
                (key, index) =>
                  this.state.restaurant[this.state.dayOfWeekString][0][this.state.meal][0][key] && (
                    <White
                      key={index}
                      title={this.state.restaurant[this.state.dayOfWeekString][0][
                        this.state.meal
                      ][0][key][0].substr(
                        this.state.restaurant[this.state.dayOfWeekString][0][this.state.meal][0][
                          key
                        ][0].indexOf(':') + 2
                      )}
                      description={meals[key]}
                    />
                  )
              )}
            </ScrollView>
          </Blue>
        ) : (
          <ActivityIndicator />
        )}
      </View>
    );
  }
}
