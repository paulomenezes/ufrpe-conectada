import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image, FlatList, ActivityIndicator } from 'react-native';
import moment from 'moment';

import { getMessages, getUserById } from '../services/api';
import styles from '../styles';

export default class Message extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.userfromfullname}`
  });

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      messages: [],
      chat: props.navigation.state.params
    };
  }

  componentDidMount() {
    this.loadData().done();
  }

  async loadData() {
    try {
      const messages = await getMessages(global.USER.id, this.state.chat.useridfrom);

      if (messages) {
        this.setState({
          loading: false,
          messages: messages.messages
        });

        this.forceUpdate();
      }
    } catch (error) {
      console.log(error);
    }
  }

  _keyExtractor = (item, index) => item.id;

  renderItem({ item }) {
    const date = new Date(item.timecreated * 1000);

    return (
      <View
        style={{
          paddingHorizontal: 16,
          paddingVertical: 8,
          borderBottomWidth: 1,
          borderBottomColor: '#EEE'
        }}
      >
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 1 }}>
            <Text>{item.fullmessage}</Text>
            <Text style={{ color: '#AAA', fontSize: 12, marginTop: 8, textAlign: 'right' }}>
              {moment(date).format('DD/MM/YYYY')}
            </Text>
          </View>
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.page}>
        {this.state.loading && <ActivityIndicator />}
        <FlatList
          keyExtractor={this._keyExtractor}
          data={this.state.messages}
          renderItem={this.renderItem.bind(this)}
        />
      </View>
    );
  }
}
