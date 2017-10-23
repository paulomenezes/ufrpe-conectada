import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { NavigationActions } from 'react-navigation';

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
      loading: true,
      restaurant: undefined,
      title: date.getHours() < 15 ? 'Almoço' : 'Jantar',
      description: '',
      date,
      meal,
      dayOfWeek: weekDays[dayOfWeek],
      dayOfWeekString
    };

    this.getRestaurant = this.getRestaurant.bind(this);
  }

  componentDidMount() {
    this.getRestaurant();
  }

  getRestaurant() {
    const req = new XMLHttpRequest();
    req.open('GET', 'http://restaurante.6te.net/restaurante.xml', true);
    req.responseType = 'arraybuffer';

    req.onload = event => {
      if (req && req.status === 200 && req.response) {
        const resp = req.response;
        const responseText = iconv.decode(new Buffer(resp), 'iso-8859-1').toString();
        parseString(responseText, (err, result) => {
          global.restaurant = result.restaurante;

          this.setState({
            loading: false,
            restaurant: result.restaurante,
            description:
              this.state.dayOfWeek + ' ' + result.restaurante[this.state.dayOfWeekString][0].data[0]
          });
        });
      } else {
        this.setState({
          loading: false
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
      <View>
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
        ) : this.state.loading ? (
          <ActivityIndicator />
        ) : (
          <View style={{ margin: 16 }}>
            <Text style={{ marginBottom: 16, textAlign: 'center' }}>
              Não foi possível carregar o cardápio do RU :(
            </Text>
            <TouchableOpacity style={styles.darkButton} onPress={this.getRestaurant}>
              <Text style={styles.darkButtonText}>Tentar Novamente</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }
}
