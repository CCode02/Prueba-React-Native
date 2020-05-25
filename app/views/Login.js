import React from 'react';
import { ActivityIndicator, AsyncStorage, Dimensions, Image, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';
import { Input } from 'react-native-elements';
import { connect } from 'react-redux';
import { SignIn } from '../services/api.js';

class Login extends React.Component {
    state = { user: '', password: '', loading: false };

    RenderButton(){
		if (!this.state.loading){
			return(
				<TouchableOpacity style={styles.button} onPress={ this.onButtonPress.bind(this)}>
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
    
    onButtonPress() {
		this.setState({ loading: true});
		SignIn(this.state.user, this.state.password)
		  .then(response => {
			return response.json();
		  })
		  .then(json => {
			if (json.error == undefined) {
				AsyncStorage.setItem('user', this.state.user);
				AsyncStorage.setItem('password', this.state.password);
				this.setState({ loading: false});
				this.props.navigation.navigate('App');
			} else {
				this.ServerError(json.msg);
			}
		  })
		  .catch(error => {
			this.ServerError(error.message);
		  });
    }
    
    ServerError(message){
		this.setState({ loading: false })
		ToastAndroid.show(message, ToastAndroid.SHORT);
	  }

    render(){
        return(
            <View style={styles.container}>
				<Image style={{ width: Dimensions.get('window').width*0.3, height: Dimensions.get('window').width*0.3, margin: 20 }} source={require('../../assets/logo.jpg')}/>
                <Input
                    placeholder="Username"
                    //leftIcon={{ type: 'font-awesome', name: 'comment' }}
                    onChangeText={value => this.setState({ user: value })}
                    />
                <Input
                    placeholder="Password"
                    //leftIcon={{ type: 'font-awesome', name: 'comment' }}
                    onChangeText={value => this.setState({ password: value })}
                    secureTextEntry={true}
                    />
                {this.RenderButton()}
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);