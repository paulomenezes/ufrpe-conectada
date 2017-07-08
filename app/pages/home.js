import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { parseString } from 'react-native-xml2js';

class Home extends Component {
  static navigationOptions = {
    title: 'UFRPE Conectada',
    headerStyle: { backgroundColor: '#1B2D4F' },
    headerTintColor: '#FFF'
  };

  constructor(props) {
    super(props);

    this.state = {
      restaurant: undefined
    };

    fetch('http://restaurante.6te.net/restaurante.xml')
      .then(response => response.text())
      .then(responseText => {
        parseString(responseText, (err, result) => {
          this.setState({
            restaurant: result.restaurante
          });
        });
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.date}>8 de julho</Text>
        </View>
        <View style={styles.dark}>
          <Text style={styles.darkTitle}>Entrar com o AVA</Text>
          <Text style={styles.darkMessage}>
            Ao entrar com sua conta do AVA você tem acesso as suas aulas, exercícios, mensagens
            entre outros.
          </Text>
          <TouchableOpacity style={styles.darkButton}>
            <Text style={styles.darkButtonText}>Entrar</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.content}>
          {this.state.restaurant
            ? <View style={styles.blue}>
                <Text style={styles.blueTitle}>Almoço</Text>
                <Text style={styles.blueDescription}>
                  Segunda ({this.state.restaurant.segunda[0].data[0]})
                </Text>
                <ScrollView horizontal={true}>
                  <View style={styles.white}>
                    <Text style={styles.whiteTitle}>
                      {this.state.restaurant.segunda[0].almoco[0].principal[0].substr(11)}
                    </Text>
                    <Text style={styles.whiteDescription}>Principal</Text>
                  </View>
                  <View style={styles.white}>
                    <Text style={styles.whiteTitle}>
                      {this.state.restaurant.segunda[0].almoco[0].grelha[0].substr(11)}
                    </Text>
                    <Text style={styles.whiteDescription}>Na Grelha</Text>
                  </View>
                  <View style={styles.white}>
                    <Text style={styles.whiteTitle}>
                      {this.state.restaurant.segunda[0].almoco[0].vegetariano[0].substr(13)}
                    </Text>
                    <Text style={styles.whiteDescription}>Vegetariano</Text>
                  </View>
                </ScrollView>
                <TouchableOpacity style={styles.seeMore}>
                  <Text style={styles.seeMoreText}>Ver mais</Text>
                  <Icon name="keyboard-arrow-right" size={20} color="#FFF" />
                </TouchableOpacity>
              </View>
            : <View />}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1B2D4F'
  },
  content: {
    margin: 16
  },
  date: {
    fontSize: 20,
    color: '#FFF'
  },
  dark: {
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#121f38'
  },
  darkTitle: {
    fontSize: 20,
    color: '#FFF',
    marginBottom: 8
  },
  darkMessage: {
    fontSize: 16,
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 16
  },
  darkButton: {
    backgroundColor: '#f21e60',
    borderRadius: 8,
    paddingHorizontal: 32,
    paddingVertical: 8
  },
  darkButtonText: {
    fontSize: 16,
    color: '#FFF'
  },
  blue: {
    backgroundColor: '#4d9ee9',
    borderRadius: 8,
    paddingVertical: 8
  },
  blueTitle: {
    fontSize: 26,
    color: '#FFF',
    marginHorizontal: 8
  },
  blueDescription: {
    color: '#FFF',
    marginHorizontal: 8,
    marginBottom: 8
  },
  white: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 8,
    width: 200,
    marginLeft: 8,
    marginRight: 8
  },
  whiteTitle: {
    color: '#346da3',
    height: 50,
    marginBottom: 8
  },
  whiteDescription: {
    color: '#8a8a8a'
  },
  seeMore: {
    marginTop: 16,
    marginHorizontal: 8,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  seeMoreText: {
    color: '#FFF'
  }
});

module.exports = Home;
