import React from 'react';
import { ActivityIndicator, Dimensions, ScrollView, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';
import { Icon, Input } from 'react-native-elements';
import { connect } from 'react-redux';
import { SearchText } from '../services/api.js';

class Devices extends React.Component {
    static navigationOptions = {
        drawerlabel: 'Devices',
    }

    limit = 5;

    state = {
        searchText: '', data: [], loading: false
    }

    ServerError(message){
		this.setState({ loading: false })
		ToastAndroid.show(message, ToastAndroid.SHORT);
	  }

    searchText(text){
        this.setState({ loading: true});
        SearchText(this.props.information.token, text, this.limit)
		  .then(response => {
			return response.json();
		  })
		  .then(json => {
            console.log(json);
            this.setState({ data: json.data.results})
            this.setState({ loading: false});
		  })
		  .catch(error => {
			this.ServerError(error.message);
		  });
    }

    renderData(){
        if(this.state.loading){
            return(
                <View style={{ height: '100%', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f4f6f8' }}>
                    <View style={{ height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                        <ActivityIndicator size="large" color="#1438A6" />
                    </View>
                </View>
              );
        }else{
            if(this.state.data.length != 0){
                return(
                    <View style={{ marginBottom: 10 }}>
                        
                        { this.state.data.map((item, index) => (
                             <View key={'Item ' + index} style={{
                                 marginTop: 5,
                                 marginBottom: 5,
                                 padding: 10,
                                 backgroundColor: "#fff",
                                 width: Dimensions.get('window').width*0.95,
                                 borderColor: '#000',
                                 borderWidth: 1,
                                 borderRadius: 10, }}
                             >
                                <Text style={{ flex: 1, flexWrap: 'wrap', fontSize: 15 }}>Id: {item.id_device}</Text>
                                <Text style={{ flex: 1, flexWrap: 'wrap', fontSize: 15 }}>Name: {item.device_name}</Text>
                                <Text style={{ flex: 1, flexWrap: 'wrap', fontSize: 15 }}>Model id: {item.id_device_model}</Text>
                                <Text style={{ flex: 1, flexWrap: 'wrap', fontSize: 15 }}>Model: {item.device_model}</Text>
                                <Text style={{ flex: 1, flexWrap: 'wrap', fontSize: 15 }}>Status: {item.status}</Text>
                                <Text style={{ flex: 1, flexWrap: 'wrap', fontSize: 15 }}>Settings:</Text>
                                <Text style={{ flex: 1, flexWrap: 'wrap', fontSize: 15 }}>  - Access type: {item.settings_device.access_type}</Text>
                                <Text style={{ flex: 1, flexWrap: 'wrap', fontSize: 15 }}>  - Exit button position: {item.settings_device.exit_btn_pos}</Text>
                                <Text style={{ flex: 1, flexWrap: 'wrap', fontSize: 15 }}>  - Id device action type: {item.settings_device.id_device_action_type}</Text>
                                <Text style={{ flex: 1, flexWrap: 'wrap', fontSize: 15 }}>  - Id structure: {item.settings_device.id_structure}</Text>
                                <Text style={{ flex: 1, flexWrap: 'wrap', fontSize: 15 }}>  - Id timezone: {item.settings_device.id_timezone}</Text>
                                <Text style={{ flex: 1, flexWrap: 'wrap', fontSize: 15 }}>  - Online: {item.settings_device.online}</Text>
                                <Text style={{ flex: 1, flexWrap: 'wrap', fontSize: 15 }}>  - Serial: {item.settings_device.serial}</Text>
                                <Text style={{ flex: 1, flexWrap: 'wrap', fontSize: 15 }}>  - Time open door: {item.settings_device.time_open_door}</Text>
                                <Text style={{ flex: 1, flexWrap: 'wrap', fontSize: 15 }}>Photo: {item.photo}</Text>
                             </View>
                         ))}
                         <View style={{ flexDirection: 'row'}}>
                            <TouchableOpacity style={styles.searchButton} 
                                onPress={() =>{
                                    console.log(this.limit);
                                    this.limit+=5;
                                    this.searchText(this.state.searchText);
                                    console.log(this.limit);
                            }}>
                                <Text style={styles.buttonText} >VIEW MORE</Text>
                            </TouchableOpacity>
                         </View>
                    </View>
                );
            }
        }
    }

    render(){
        return(
            <View style={{ height: '100%', alignItems: 'center', backgroundColor: '#f5f5f5'}}>
                <View style={{ flexDirection: 'row', width: '90%', marginTop: 20 }}>
                <Icon
                    reverse
                    name='md-locate'
                    type='ionicon'
                    color='#1438A6'
                    onPress={() => this.props.navigation.navigate('LocationMap')}
                    />
                    <View style={{ width: '80%', marginTop: 5}}>
                        <Input 
                            placeholder='Search'
                            onChangeText={search => {
                                this.setState({ searchText: search});
                                this.searchText(search);
                            }}
                        />
                    </View>
                </View>
                <ScrollView> 
                    {this.renderData()}
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    searchButton:{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#1438A6",
        height: Dimensions.get('window').width*0.1,
        width: Dimensions.get('window').width*0.9,
        borderColor: '#1438A6',
        margin: 10,
        borderWidth: 1,
        borderRadius: 10,
    },
    buttonText:{
        flexWrap: 'wrap',
        textAlign: 'center',
        color: '#f4f6f8',
        fontSize: 15
    }
});

function mapStateToProps(state){
	return{
		information: state.information
	}
}

export default connect(mapStateToProps)(Devices);