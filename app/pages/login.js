import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  AsyncStorage,
  KeyboardAvoidingView
} from 'react-native';
import { NavigationActions } from 'react-navigation';

import styles from '../styles';

import Welcome from '../components/welcome';
import Restaurant from '../components/restaurant';
import DarkButton from '../components/darkButton';

import { SEMESTER } from '../contants';
import { login, getSiteInfo, getUsersCourses, getSemester, getSchedules } from '../services/api';
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
        const currentSemester = await getSemester();
        const schedules = await getSchedules();

        const semester = currentSemester.substr(1, 6);

        const courses = [];
        usersCourses.forEach(course => {
          if (course.shortname.indexOf(semester) >= 0) {
            courses.push(course);
          }
        });

        for (let i = 0; i < courses.length; i++) {
          let course = courses[i];
          for (let j = 0; j < schedules.length; j++) {
            let schedule = schedules[j];
            if (course.shortname.split('-')[1].indexOf(schedule.cod) >= 0) {
              course.classes = schedule;
              break;
            }
          }
        }

        const name = siteInfo.fullname.split(' ');

        const userSave = {
          id: siteInfo.userid,
          username: siteInfo.username,
          firstname: getCamelSentence(name[0]),
          lastname: getCamelSentence(name[name.length - 1]),
          picture: siteInfo.userpictureurl,
          courses: courses,
          token: user.token
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
      this.setState({
        loading: false
      });
    }
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container}>
        <View style={styles.dark}>
          <Text style={styles.darkMessage}>
            Você deve realizar o login com sua conta do AVA. Use seu usuário informado no seu Siga e
            sua Senha de Serviços Integrados.
          </Text>
        </View>
        <View style={styles.form}>
          <Text style={styles.formLabel}>Usuário</Text>
          <TextInput
            autoFocus
            autoCorrect={false}
            autoCapitalize="none"
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

          <DarkButton
            onPress={this.onPress.bind(this)}
            disabled={this.state.loading}
            title="Entrar"
          />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

module.exports = Login;
