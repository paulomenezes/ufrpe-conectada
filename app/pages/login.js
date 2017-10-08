import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  AsyncStorage,
  ActivityIndicator
} from 'react-native';
import { NavigationActions } from 'react-navigation';

import styles from '../styles';

import Welcome from '../components/welcome';
import Restaurant from '../components/restaurant';

import { SEMESTER } from '../contants';
import { login, getSiteInfo, getUsersCourses } from '../services/api';
import { getCamelSentence } from '../util/functions';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      loading: false
    };
  }

  async onPress() {
    try {
      if (
        this.state.username &&
        this.state.username.length > 0 &&
        this.state.password &&
        this.state.password.length > 0
      ) {
        this.setState({
          loading: true
        });

        const user = await login(this.state.username, this.state.password);
        const siteInfo = await getSiteInfo(user.token);
        const usersCourses = await getUsersCourses(siteInfo.userid, user.token);

        const courses = [];
        usersCourses.forEach(course => {
          if (course.shortname.indexOf(SEMESTER) >= 0) {
            courses.push(course);
          }
        });

        const name = siteInfo.fullname.split(' ');

        const userSave = {
          id: siteInfo.userid,
          username: siteInfo.username,
          firstname: getCamelSentence(name[0]),
          lastname: getCamelSentence(name[name.length - 1]),
          picture: siteInfo.userpictureurl,
          courses: courses
        };

        global.USER = userSave;
        AsyncStorage.setItem('user', JSON.stringify(userSave));

        this.setState({
          loading: false
        });

        const resetAction = NavigationActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: 'Home' })]
        });
        this.props.navigation.dispatch(resetAction);
      } else {
        Alert.alert('Login', 'O usuário e senha são obrigatórios');
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Não foi possível realizar login');
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.dark}>
          <Text style={styles.darkMessage}>
            Você deve realizar o login com sua conta do AVA. Use seu usuário informado no seu Siga e
            sua Senha de Serviços Integrados.
          </Text>
        </View>
        <View style={styles.form}>
          <Text style={styles.formLabel}>Usuário</Text>
          <TextInput
            style={styles.formInput}
            keyboardType="email-address"
            onChangeText={username => this.setState({ username })}
            value={this.state.username}
          />

          <Text style={styles.formLabel}>Senha</Text>
          <TextInput
            style={styles.formInput}
            secureTextEntry
            onChangeText={password => this.setState({ password })}
            value={this.state.password}
          />

          <ActivityIndicator animating={this.state.loading} />

          <TouchableOpacity
            style={[styles.darkButton, styles.formButon]}
            onPress={this.onPress.bind(this)}
            disabled={this.state.loading}
          >
            <Text style={styles.darkButtonText}>Entrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

module.exports = Login;
