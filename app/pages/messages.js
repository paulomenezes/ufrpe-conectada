import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image, FlatList, ActivityIndicator } from 'react-native';
import moment from 'moment';

import { getMessages, getUserById } from '../services/api';
import styles from '../styles';

export default class Messages extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      messages: []
    };
  }

  componentDidMount() {
    this.loadData().done();
  }

  async loadData() {
    try {
      const messages = await getMessages(global.USER.id, 0);

      if (messages) {
        const chats = {};
        messages.messages.forEach(async message => {
          if (!chats[message.useridfrom]) {
            chats[message.useridfrom] = true;

            try {
              const user = await getUserById(message.useridfrom, global.USER.token);
              if (user) {
                message.user = user[0];
                const msg = this.state.messages;
                msg.push(message);

                this.setState({
                  loading: false,
                  messages: msg.sort((a, b) => b.timecreated - a.timecreated)
                });

                this.forceUpdate();
              }
            } catch (error) {
              console.log(error);
            }
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  _keyExtractor = (item, index) => item.id;

  renderItem({ item }) {
    console.log(item);
    const date = new Date(item.timecreated * 1000);

    return (
      <TouchableOpacity
        style={{
          paddingHorizontal: 16,
          paddingVertical: 8,
          borderBottomWidth: 1,
          borderBottomColor: '#EEE'
        }}
      >
        <View style={{ flexDirection: 'row' }}>
          <Image
            style={{ width: 50, height: 50, borderRadius: 25, marginRight: 8 }}
            source={{ uri: item.user.profileimageurl }}
          />
          <View style={{ flex: 1 }}>
            <Text style={{ fontWeight: 'bold' }}>{item.userfromfullname}</Text>
            <Text numberOfLines={2} style={{ color: '#AAA' }}>
              {item.fullmessage}
            </Text>
            <Text style={{ color: '#AAA', fontSize: 12 }}>{moment(date).format('DD/MM/YYYY')}</Text>
          </View>
        </View>
      </TouchableOpacity>
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
