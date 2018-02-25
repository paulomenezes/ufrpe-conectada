import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { NavigationActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';

import styles from '../styles';
import Blue from '../containers/blue';
import White from '../containers/white';

import NewsItem from './newsItem';

import { getNews } from '../services/poraqui';

export default class News extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      error: false,
      news: []
    };
  }

  componentDidMount() {
    getNews()
      .then(data => {
        this.setState({
          loading: false,
          error: false,
          news: data.content
        });
      })
      .catch(error => {
        this.setState({
          loading: false,
          error: true
        });
      });
  }

  goRestaurant() {
    this.props.navigation.navigate('Restaurant');
  }

  render() {
    return (
      <View>
        <View style={{ marginTop: 15 }}>
          <Text style={styles.blueTitle}>Notícias</Text>
          <Text style={styles.blueDescription}>PorAqui - Dois Irmãos</Text>
          {!this.state.loading && !this.state.error ? (
            <View>
              <ScrollView horizontal>
                {this.state.news.map((news, index) => (
                  <NewsItem key={index} news={news} navigation={this.props.navigation} />
                ))}
              </ScrollView>
              <TouchableOpacity style={styles.seeMore} onPress={this.goRestaurant}>
                <Text style={styles.seeMoreText}>Ver mais</Text>
                <Icon style={styles.seeMoreText} name="keyboard-arrow-right" size={20} />
              </TouchableOpacity>
            </View>
          ) : this.state.loading ? (
            <ActivityIndicator />
          ) : (
            <View style={{ marginHorizontal: 15 }}>
              <Text>Não foi possível carregar as notícias</Text>
            </View>
          )}
        </View>
      </View>
    );
  }
}
