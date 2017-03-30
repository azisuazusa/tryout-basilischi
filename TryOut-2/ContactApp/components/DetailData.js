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

export default class DetailData extends Component {

    static navigationOptions = {
        title: 'Contact Details',
    }

    state = {
        firstName: '',
        lastName: '',
        organization: '',
        phoneNumber: '',
        address: ''
    }

    async getData() {
        try {
            await AsyncStorage.getItem(this.props.navigation.state.params.phoneNumber, (err, result) => {
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

    async removeData(key) {
        try {
            await AsyncStorage.removeItem(key, (err) => {
                ToastAndroid.show('Your contact has been successfully deleted', ToastAndroid.SHORT);
            });
            this.props.navigation.goBack();
        } catch (e) {
            console.log(e);
        }
    }

    componentDidMount() {
        this.getData();
    }

    render() {
        return (
            <View style={GeneralStyle.container}>
                <View style={styles.viewRow}>
                    <Text style={{fontSize: 14}}>
                        First Name
                    </Text>
                    <Text style={styles.textRow}>
                        {this.state.firstName}
                    </Text>
                </View>
                <View style={styles.viewRow}>
                    <Text style={{fontSize: 14}}>
                        Last Name
                    </Text>
                    <Text style={styles.textRow}>
                        {this.state.lastName}
                    </Text>
                </View>
                <View style={styles.viewRow}>
                    <Text style={{fontSize: 14}}>
                        Organization
                    </Text>
                    <Text style={styles.textRow}>
                        {this.state.organization}
                    </Text>
                </View>
                <View style={styles.viewRow}>
                    <Text style={{fontSize: 14}}>
                        Phone Number
                    </Text>
                    <Text style={styles.textRow}>
                        {this.state.phoneNumber}
                    </Text>
                </View>
                <View style={styles.viewRow}>
                    <Text style={{fontSize: 14}}>
                        Address
                    </Text>
                    <Text style={styles.textRow}>
                        {this.state.address}
                    </Text>
                </View>
                <View style={styles.buttonView}>
                    <Button
                        onPress={() => {
                            this.props.navigation.navigate('Form', { phoneNumber: this.state.phoneNumber})
                        }}
                        color="#ff7700"
                        title="Edit"
                    />

                    <Button
                        onPress={() => this.removeData(this.state.phoneNumber)}
                        color="#ff0000"
                        title="Delete"
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    viewRow: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        paddingTop: 12,
        paddingBottom: 12,
    },

    textRow: {
        fontSize: 18,
        color: '#000000'
    },

    buttonView: {
        flexDirection: 'row',
        backgroundColor: '#F5FCFF',
        justifyContent: 'space-between',
        marginTop: 10
    }
});
