import React, { Component } from 'react';
import { Image, TouchableOpacity, Text, View } from 'react-native';
import moment from 'moment';

import styles from '../styles';

export default class NewsItem extends Component {
  constructor(props) {
    super(props);

    console.log(props);

    this.state = {
      date: moment(props.date).format('DD/MM/YYYY')
    };
  }

  render() {
    return (
      <TouchableOpacity
        onPress={() => this.props.navigation.navigate('NewsPage', this.props.news)}
        style={styles.news}
      >
        <Image style={styles.newsImage} source={{ uri: this.props.news.smallImageUrl }} />
        <View style={styles.newsData}>
          <Text style={styles.newsTitle}>{this.props.news.title}</Text>
          <Text style={styles.newsDate}>{this.state.date}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}
