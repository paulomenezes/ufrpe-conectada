import React, { Component } from 'react';
import { Image, TouchableOpacity, Text, View, ScrollView, ActivityIndicator } from 'react-native';
import moment from 'moment';
import Icon from 'react-native-vector-icons/MaterialIcons';

import styles from '../styles';
import { getNews } from '../services/poraqui';
import { PORAQUI_URL, headers } from '../contants';

export default class NewsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      page: 0,
      news: [],
      controls: {}
    };
  }

  componentDidMount() {
    this.load(0);
  }

  load(action) {
    let page = 0;
    switch (action) {
      case 0:
        page = 0;
        this.setState({
          loading: true,
          page: 0
        });
        break;
      case 1:
        page = this.state.page - 1;
        this.setState({
          loading: true,
          page: --this.state.page
        });
        break;
      case 2:
        page = this.state.page + 1;
        this.setState({
          loading: true,
          page: ++this.state.page
        });
        break;
      case 3:
        page = this.state.controls.totalPages;
        this.setState({
          loading: true,
          page: this.state.controls.totalPages
        });
        break;
    }

    fetch(PORAQUI_URL + 'stationIds=19&page=' + page)
      .then(response => response.json())
      .then(data => {
        this.setState(
          {
            loading: false,
            error: false,
            news: data.content,
            controls: {
              first: data.first,
              last: data.last,
              totalPages: data.totalPages,
              totalElements: data.totalElements,
              sort: data.sort,
              numberOfElements: data.numberOfElements,
              size: data.size,
              number: data.number
            }
          },
          () => {
            this.forceUpdate();
          }
        );
      })
      .catch(error => {
        this.setState({
          loading: false,
          error: true
        });
      });
  }

  render() {
    return (
      <ScrollView>
        {this.state.loading ? (
          <ActivityIndicator />
        ) : (
          <View>
            {this.state.news.map((news, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => this.props.navigation.navigate('NewsPage', news)}
                style={{ flexDirection: 'row', padding: 5 }}
              >
                <Image style={styles.newsImage} source={{ uri: news.smallImageUrl }} />
                <View style={styles.newsData}>
                  <Text style={styles.newsTitle}>{news.title}</Text>
                  <Text style={styles.newsDate}>{moment(news.date).format('DD/MM/YYYY')}</Text>
                </View>
              </TouchableOpacity>
            ))}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginVertical: 10
              }}
            >
              <TouchableOpacity
                onPress={() => this.load(0)}
                style={styles.darkButton2}
                disabled={this.state.page === 0}
              >
                <Icon name="first-page" color="#FFF" size={20} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.load(1)}
                style={styles.darkButton2}
                disabled={this.state.page === 0}
              >
                <Icon name="chevron-left" color="#FFF" size={20} />
              </TouchableOpacity>
              <Text>Página {this.state.page + 1}</Text>
              <TouchableOpacity
                onPress={() => this.load(2)}
                style={styles.darkButton2}
                disabled={this.state.page === this.state.controls.totalPages}
              >
                <Icon name="chevron-right" color="#FFF" size={20} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.load(3)}
                style={styles.darkButton2}
                disabled={this.state.page === this.state.controls.totalPages}
              >
                <Icon name="last-page" color="#FFF" size={20} />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
    );
  }
}
