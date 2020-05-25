import React from 'react';
import { ActivityIndicator, AsyncStorage, Dimensions, Image, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { SignIn } from '../services/api.js';

class Home extends React.Component {
    
    static navigationOptions = {
        drawerlabel: 'Inicio',
      }

      state = {
          loading: false
      }

      reciveData = async () => {
        this.setState({ loading: true });
        const user = await AsyncStorage.getItem('user');
        const password = await AsyncStorage.getItem('password');
        SignIn(user, password)
        .then(response => {
          return response.json();
        })
        .then(json => {
            console.log(json);
            this.props.saveInfo(json);
            this.props.navigation.navigate('Devices');
            this.setState({ loading: false })
        })
        .catch(error => {
          this.ServerError(error.message);
        });
      }

      ServerError(message){
		this.setState({ loading: false })
		ToastAndroid.show(message, ToastAndroid.SHORT);
	  }

      RenderButton(){
        if (!this.state.loading){
          return(
            <TouchableOpacity style={styles.button} onPress={() => this.reciveData()}>
              <Text style={styles.buttonText}>Enter</Text>
            </TouchableOpacity>
          );
        }else{
          return(
            <View styles={{marginTop: 20, alignItems: 'center'}}>
              <ActivityIndicator size="large" color="#1438A6" />
            </View>
          );
        }
    }

    logOut(){
        AsyncStorage.setItem('user', '');
        AsyncStorage.setItem('pasword', '');
        this.props.navigation.navigate('Login');
    }

    renderLogoutButton(){
      if (!this.state.loading){
        return(
          <TouchableOpacity style={styles.button} onPress={() => this.logOut()}>
            <Text style={styles.buttonText}>Exit</Text>
          </TouchableOpacity>
        );
      }
    }

    render(){
        return(
            <View style={styles.container}>
                <Image style={{ width: Dimensions.get('window').width*0.3, height: Dimensions.get('window').width*0.3, margin: 20 }} source={require('../../assets/logo.jpg')}/>
                <Text style={{ flexWrap: 'wrap', fontSize: 30 }}>Welcome to the app</Text>
                {this.RenderButton()}
                {this.renderLogoutButton()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f5f5f5',
      alignItems: 'center',
      justifyContent: 'center',
    },
    button:{
		alignItems: 'center',
		marginTop: 20,
		backgroundColor: "#1438A6",
		width: Dimensions.get('window').width*0.5,
		borderColor: '#1438A6',
		borderWidth: 5,
		borderRadius: 25,
		
	},
	buttonText:{
		color: '#fff',
		fontSize: 25,
		margin: 5
	}
  });

function mapStateToProps(state){
	return{
		information: state.information
	}
}

function mapDispatchToProps(dispatch){
	return{
		saveInfo : (info) => dispatch({type:'Save_info', payload: info}),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);