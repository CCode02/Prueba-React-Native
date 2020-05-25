import React from 'react';
import { ActivityIndicator, AsyncStorage, StatusBar, StyleSheet, ToastAndroid, View } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Login from '../views/Login.js';
import Home from '../views/Home.js';
import Devices from '../views/Devices';
import { LocationMap } from '../views/LocationMap.js';

class InitialScreen extends React.Component {
  constructor(props) {
    super(props);
    this.defineInitialScreen();
  }

  // Fetch the token from storage then navigate to our appropriate place
  defineInitialScreen = async () => {
    const user = await AsyncStorage.getItem('user');
    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    
    this.props.navigation.navigate(user ? 'App' : 'Login');
  };

  ServerError(message){
		this.setState({ loading: false })
		ToastAndroid.show(message, ToastAndroid.SHORT);
	  }

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const AppNavigator = createStackNavigator(
  {
    Home: Home,
    Devices: Devices,
    LocationMap: LocationMap
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      header: null
    }
  }
);

const App = createAppContainer(AppNavigator);

const SwitchNavigator = createSwitchNavigator(
  {
    Start: InitialScreen,
    App: App,
    Login: Login,
  },
  {
    initialRouteName: 'Start',
  }
);

export const AppContainer = createAppContainer(SwitchNavigator);