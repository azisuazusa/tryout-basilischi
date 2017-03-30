import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Alert,
    Button,
    TextInput,
    AsyncStorage,
    ToastAndroid
} from 'react-native';
import GeneralStyle from '../styles/GeneralStyle';

export default class FormData extends Component {
    state = {
        firstName: '',
        lastName: '',
        organization: '',
        phoneNumber: '',
        address: ''
    }

    static navigationOptions = {
        title: 'Add New Contact',
    }

    componentDidMount() {
        if (this.props.navigation.state.params.phoneNumber !== '') {
            this.getData(this.props.navigation.state.params.phoneNumber);
        }
    }

    async getData(key) {
        try {
            await AsyncStorage.getItem(key, (err, result) => {
                var res = JSON.parse(result);
                this.setState({
                    firstName: res.firstName,
                    lastName: res.lastName,
                    organization: res.organization,
                    phoneNumber: res.phoneNumber,
                    address: res.address
                });
            });
        } catch (e) {
            console.log(e);
        }
    }

    validation() {
        var error = [];
        if (this.state.firstName == '') {
            error.push(1);
        }
        if (this.state.lastName == '') {
            error.push(2);
        }
        if (this.state.organization == '') {
            error.push(3);
        }
        if (isNaN(parseFloat(this.state.phoneNumber)) && !isFinite(this.state.phoneNumber) || this.state.phoneNumber == '') {
            error.push(4);
        }
        if (this.state.address == '') {
            error.push(5);
        }
        return error;
    }

    async saveData() {
        const self = this;
        if (this.validation().length < 1) {
            try {
                await AsyncStorage.setItem(self.state.phoneNumber, JSON.stringify(self.state), function (error){
                    ToastAndroid.show('Your contact has been successfully saved', ToastAndroid.SHORT);
                    self.props.navigation.goBack();
                });
            } catch (e) {
                console.log(e);
            }
        } else {
            for (var i = 0; i < this.validation().length; i++) {
                switch (this.validation()[i]) {
                    case 1:
                        ToastAndroid.show('Please fill out the firstname\'s field!', ToastAndroid.SHORT);
                        break;
                    case 2:
                        ToastAndroid.show('Please fill out the lastname\'s field!', ToastAndroid.SHORT);
                        break;
                    case 3:
                        ToastAndroid.show('Please fill out the organization\'s field!', ToastAndroid.SHORT);
                        break;
                    case 4:
                        ToastAndroid.show('Please fill out the phone number\'s field with numeric value!', ToastAndroid.SHORT);
                        break;
                    case 5:
                        ToastAndroid.show('Please fill out the address\'s field!', ToastAndroid.SHORT);
                        break;
                    default:

                }
            }
        }
    }

    render() {
        return (
            <View style={GeneralStyle.container}>
                <TextInput
                    placeholder="First Name"
                    autoCapitalize="words"
                    value={this.state.firstName}
                    onChange={(event) => this.setState({firstName:event.nativeEvent.text})}
                />
                <TextInput
                    placeholder="Last Name"
                    autoCapitalize="words"
                    value={this.state.lastName}
                    onChange={(event) => this.setState({lastName:event.nativeEvent.text})}
                />
                <TextInput
                    placeholder="Organization"
                    autoCapitalize="words"
                    value={this.state.organization}
                    onChange={(event) => this.setState({organization:event.nativeEvent.text})}
                />
                <TextInput
                    placeholder="Phone Number"
                    keyboardType="numeric"
                    value={this.state.phoneNumber}
                    onChange={(event) => this.setState({phoneNumber:event.nativeEvent.text})}
                />
                <TextInput
                    placeholder="Address"
                    multiline={true}
                    value={this.state.address}
                    onChange={(event) => this.setState({address:event.nativeEvent.text})}
                />
                <View style={styles.buttonView}>
                    <Button
                        onPress={() => this.saveData()}
                        color="#2244ff"
                        title="Save"
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    buttonView: {
        flexDirection: 'row',
        backgroundColor: '#F5FCFF',
        justifyContent: 'space-between',
        marginTop: 10
    }
});
