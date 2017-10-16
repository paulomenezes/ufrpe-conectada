import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Calendar, CalendarList, Agenda, LocaleConfig } from 'react-native-calendars';

import { getCalendarEvents } from '../services/api';
import { dateToString, getCamelSentence } from '../util/functions';
import { COLORS, months, monthsShort, weekDays, weekDaysShort } from '../contants';
import styles from '../styles';

LocaleConfig.locales['pt-br'] = {
  monthNames: months,
  monthNamesShort: monthsShort,
  dayNames: weekDays,
  dayNamesShort: weekDaysShort
};

LocaleConfig.defaultLocale = 'pt-br';

export default class Exercices extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: new Date(),
      events: {}
    };
  }

  async componentDidMount() {
    try {
      const start = new Date(new Date().getFullYear(), 0, 1);
      const end = new Date(new Date().getFullYear() + 2, 0, 1);

      const courseIds = [];
      global.USER.courses.forEach(course => {
        courseIds.push(course.id);
      });

      const events = await getCalendarEvents(
        start.getTime() / 1000,
        end.getTime() / 1000,
        courseIds
      );

      if (events) {
        const calendarEvents = {};
        calendarEvents[dateToString(this.state.date)] = [];

        events.events.forEach(event => {
          const date = dateToString(new Date(event.timestart * 1000));
          if (!calendarEvents[date]) {
            calendarEvents[date] = [];
          }

          calendarEvents[date].push({
            text: event.name,
            event: event,
            course: global.USER.courses.filter(c => c.id === event.courseid)[0]
          });
        });

        this.setState({
          events: calendarEvents
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  open(item) {
    console.log(item);
    this.props.navigation.navigate('Assignment', {
      course: item.course,
      content: item.event
    });
  }

  renderItem(item) {
    return (
      <TouchableOpacity
        style={[styles.agendaItem, { height: item.height }]}
        onPress={this.open.bind(this, item)}
      >
        <Text style={{ fontWeight: 'bold', color: item.course.color }}>{item.text}</Text>
        <Text style={{ marginTop: 5, color: 'black' }}>
          {getCamelSentence(item.course.classes.name, true)}
        </Text>
      </TouchableOpacity>
    );
  }

  renderEmptyDate() {
    return (
      <View style={styles.agendaItem}>
        <Text>Nenhum exercício para essa data</Text>
      </View>
    );
  }

  setEmptyKey(day) {
    if (!this.state.events[day.dateString]) {
      let clone = Object.assign({}, this.state.events, { [day.dateString]: [] });
      this.setState({ events: clone });
    }
  }

  render() {
    return (
      <Agenda
        // the list of items that have to be displayed in agenda. If you want to render item as empty date
        // the value of date key kas to be an empty array []. If there exists no value for date key it is
        // considered that the date in question is not yet loaded
        items={this.state.events}
        // loadItemsForMonth={this.loadEvents.bind(this)}
        // callback that gets called when items for a certain month should be loaded (month became visible)
        // callback that gets called on day press
        onDayPress={this.setEmptyKey.bind(this)}
        // callback that gets called when day changes while scrolling agenda list
        onDayChange={this.setEmptyKey.bind(this)}
        dayLoading={false}
        // initially selected day
        selected={this.state.date}
        renderItem={this.renderItem.bind(this)}
        renderEmptyDate={this.renderEmptyDate.bind(this)}
        // specify your item comparison function for increased performance
        rowHasChanged={(r1, r2) => {
          return r1.text !== r2.text;
        }}
        // agenda theme
        theme={{
          agendaDayTextColor: COLORS.blue,
          agendaDayNumColor: COLORS.blue,
          agendaTodayColor: COLORS.pink,
          agendaKnobColor: COLORS.blue,
          selectedDayBackgroundColor: COLORS.pink,
          selectedDayTextColor: '#FFF',
          todayTextColor: COLORS.pink,
          dotColor: COLORS.pink
        }}
        // agenda container style
        style={{}}
      />
    );
  }
}
