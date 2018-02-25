import React, { Component } from 'react';
import { Image, TouchableOpacity, Text, View, Dimensions, WebView, ScrollView } from 'react-native';
import moment from 'moment';
import HTMLView from 'react-native-htmlview';

import styles from '../styles';

const { width, height } = Dimensions.get('window');

export default class NewsPage extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.title}`
  });

  constructor(props) {
    super(props);

    this.state = {
      news: props.navigation.state.params,
      date: moment(props.navigation.state.params.date).format('DD/MM/YYYY')
    };
  }

  render() {
    return (
      <View>
        <ScrollView>
          <Image
            style={{ width, height: 600 * width / 800, resizeMode: 'cover' }}
            source={{ uri: this.state.news.largeImageUrl }}
          />
          <View style={{ margin: 15 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{this.state.news.title}</Text>
            <Text style={[styles.newsDate, { marginVertical: 10 }]}>
              {this.state.date}, Por {this.state.news.authorName}
            </Text>
            <HTMLView value={this.state.news.body} paragraphBreak="" />
          </View>
        </ScrollView>
      </View>
    );
  }
}
