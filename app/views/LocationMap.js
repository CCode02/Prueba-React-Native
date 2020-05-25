/*import React from 'react';
import { ActivityIndicator, Dimensions, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';
import { Header } from 'react-native-elements';
import { MapViewAnimated } from 'react-native-maps';

export class LocationMap extends React.Component {
    static navigationOptions = {
        drawerlabel: 'Inicio',
      }

    render(){
        return(
            <View>
                <Header
                    leftComponent={{ icon: 'menu', color: '#fff' }}
                    centerComponent={{ text: 'Inicio', style: { color: '#fff' } }}
                    />
                <MapViewAnimated />
            </View>
        );
    }
}*/

import React, { Component } from 'react';
import { Dimensions, Text, View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';


export class LocationMap extends Component {
  state = {
    mapRegion: null,
    hasLocationPermissions: false,
    locationResult: null
  };

  componentDidMount() {
    this.getLocationAsync();
  }

    handleMapRegionChange (mapRegion){
      this.setState({ mapRegion });
    }

  async getLocationAsync (){
   let { status } = await Permissions.askAsync(Permissions.LOCATION);
   if (status !== 'granted') {
     this.setState({
       locationResult: 'Permission to access location was denied',
     });
   } else {
     this.setState({ hasLocationPermissions: true });
   }

   let location = await Location.getCurrentPositionAsync({});
   this.setState({ locationResult: location });
   
   // Center the map on the location we just fetched.
    this.setState({mapRegion: { latitude: location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }});
  }

  renderMarker(){
      if(this.state.locationResult != null){
          console.log(this.state.locationResult)
        return(
            <Marker
                coordinate={{latitude: this.state.locationResult.coords.latitude, longitude: this.state.locationResult.coords.longitude}}
                title={'Ubicación actual'}
           />
          );
      }
  }

  render() {
    return (
      <View style={styles.container}>
          <MapView style={styles.mapStyle}
            region={this.state.mapRegion}
            onRegionChange={ () => this.handleMapRegionChange}
           >
            {this.renderMarker()}   
           </MapView>
      </View>
        
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    paddingTop: Constants.statusBarHeight,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
