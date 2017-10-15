import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image, FlatList, ActivityIndicator } from 'react-native';
import MapView from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome';
import HTMLView from 'react-native-htmlview';

import { COLORS } from '../contants';
import map from '../../assets/json/maps.json';
import styles from '../styles';

const MARKER_ICONS = {
  985: 'book',
  1037: 'home',
  1035: 'bed',
  503: 'map-marker',
  1205: 'medkit',
  1127: 'flask',
  1157: 'tree',
  1197: 'building',
  1423: 'bus',
  1453: 'product-hunt',
  1389: 'futbol-o',
  1469: 'user',
  1353: 'futbol-o',
  1395: 'tint',
  971: 'usd',
  1379: 'pagelines',
  1085: 'cutlery'
};

export default class Map extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      mapData: [
        {
          index: 0,
          type: 'point',
          latlng: {
            latitude: -8.0175094,
            longitude: -34.9492219
          },
          title: 'UFRPE',
          description: 'Rua Manoel de Medeiros, s/n - Dois Irmãos, Recife - PE, 52171-900',
          icon: 'graduation-cap'
        }
      ],
      focus: 0
    };
  }

  componentDidMount() {
    const mapData = this.state.mapData;

    map.features.forEach((item, index) => {
      if (item.geometry.type === 'Point') {
        const icon = item.properties.styleUrl.split('-')[1];

        mapData.push({
          latlng: {
            latitude: item.geometry.coordinates[1],
            longitude: item.geometry.coordinates[0]
          },
          type: 'point',
          title: item.properties.name,
          description: item.properties.description,
          icon: MARKER_ICONS[icon] ? MARKER_ICONS[icon] : 'home'
        });
      } else if (item.geometry.type === 'LineString') {
        const latLng = [];

        item.geometry.coordinates.forEach(coord => {
          latLng.push({
            latitude: coord[1],
            longitude: coord[0]
          });
        });

        mapData.push({
          type: 'polyline',
          coordinates: latLng,
          title: item.properties.name,
          description: item.properties.description
        });
      } else if (item.geometry.type === 'Polygon') {
        const latLng = [];

        item.geometry.coordinates[0].forEach(coord => {
          latLng.push({
            latitude: coord[1],
            longitude: coord[0]
          });
        });

        mapData.push({
          type: 'polygon',
          coordinates: latLng,
          title: item.properties.name
        });
      }
    });

    console.log(mapData);
    this.setState({ mapData });

    setTimeout(() => {
      this.map.fitToSuppliedMarkers([`M0`], true);
    }, 1000);
  }

  _keyExtractor = (item, index) => index;

  getItemLayout = (data, index) => ({ length: 300, offset: 308 * index, index });

  onMomentumScrollEnd(e) {
    const index = parseInt(e.nativeEvent.contentOffset.x / 300);
    if (index >= 0 && this.state.mapData[index]) {
      this.map.fitToSuppliedMarkers([`M${index}`], true);
      this.setState({
        focus: index
      });
    }
  }

  onPress(e) {
    console.log(e.nativeEvent);
    const index = +e.nativeEvent.id.substr(1);
    this.list.scrollToIndex({ animated: true, index });
  }

  renderItem({ item }) {
    return (
      <View
        style={{
          backgroundColor: '#FFF',
          padding: 8,
          marginLeft: 8,
          marginBottom: 8,
          flex: 1,
          borderRadius: 4,
          width: 300,
          ...styles.shadow
        }}
      >
        <Text style={{ fontWeight: 'bold' }}>{item.title}</Text>
        {item.description && <HTMLView lineBreak="" paragraphBreak="" value={item.description} />}
      </View>
    );
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <MapView
          ref={ref => {
            this.map = ref;
          }}
          style={{ flex: 1 }}
          initialRegion={{
            latitude: -8.0175094,
            longitude: -34.9492219,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
        >
          {this.state.mapData.map((data, index) => {
            if (data.type === 'point') {
              return (
                <MapView.Marker
                  identifier={'M' + index}
                  key={index}
                  coordinate={data.latlng}
                  onPress={this.onPress.bind(this)}
                >
                  <Icon
                    name={data.icon}
                    size={20}
                    color={this.state.focus === index ? COLORS.pink : COLORS.blue}
                  />
                </MapView.Marker>
              );
            } else if (data.type === 'polyline') {
              return (
                <MapView.Polyline
                  identifier={'M' + index}
                  key={index}
                  coordinates={data.coordinates}
                  strokeWidth={2}
                />
              );
            } else if (data.type === 'polygon') {
              return (
                <MapView.Polygon
                  identifier={'M' + index}
                  key={index}
                  coordinates={data.coordinates}
                  fillColor="rgba(255,0,0,0.5)"
                  strokeWidth={2}
                />
              );
            }
          })}
        </MapView>
        <FlatList
          horizontal
          getItemLayout={this.getItemLayout}
          ref={ref => (this.list = ref)}
          snapToInterval={308}
          onMomentumScrollEnd={this.onMomentumScrollEnd.bind(this)}
          style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 150 }}
          data={this.state.mapData}
          keyExtractor={this._keyExtractor}
          renderItem={this.renderItem.bind(this)}
        />
      </View>
    );
  }
}
