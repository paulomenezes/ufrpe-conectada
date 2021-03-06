import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

import styles from '../styles';
import { months } from '../contants';

class Welcome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: new Date()
    };
  }

  onPress() {
    this.props.navigation.navigate('Login');
  }

  render() {
    return (
      <View>
        <View>
          <Text style={styles.date}>
            {`${this.state.date.getDate()} de ${months[this.state.date.getMonth()].toLowerCase()}`}
          </Text>
        </View>
        <View style={styles.dark}>
          <Text style={styles.darkTitle}>Olá!</Text>
          <Text style={styles.darkMessage}>
            Ao entrar com sua conta do AVA você tem acesso as suas aulas, exercícios, mensagens
            entre outros.
          </Text>
          <TouchableOpacity style={styles.darkButton} onPress={this.onPress.bind(this)}>
            <Text style={styles.darkButtonText}>Entrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

module.exports = Welcome;
