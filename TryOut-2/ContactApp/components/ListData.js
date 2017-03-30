import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    ListView,
    Button,
    ScrollView,
    AsyncStorage
} from 'react-native';
import GeneralStyle from '../styles/GeneralStyle';
export default class ListData extends Component {
    static navigationOptions = {
        title: 'Contacts',
    }

    async getAllData() {
        try {
            await AsyncStorage.getAllKeys((err, keys) => {
                AsyncStorage.multiGet(keys, (err, stores) => {
                    var data = [];
                    stores.map((result, i, store) => {
                        data.push(JSON.parse(store[i][1]))
                    });
                    console.log(data);
                    this.setState({
                        dataSource: this.state.dataSource.cloneWithRows(data)
                    });
                });
            });
        } catch (e) {
            console.log(e);
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
        }
    }

    componentDidMount() {
        this.getAllData();
    }

    renderRow(rowData) {
        return (
            <TouchableHighlight onPress={() => {
                this.props.navigation.navigate('Detail', { phoneNumber: rowData.phoneNumber })
            }}>
                <View style={styles.viewRow}>
                    <Text style={{fontSize: 18, color: '#000000'}}>
                        {rowData.firstName} {rowData.lastName}
                    </Text>
                    <Text style={{fontSize: 14}}>
                        {rowData.organization}
                    </Text>
                </View>
            </TouchableHighlight>
        );
    }

    render() {
        return (
            <View style={GeneralStyle.container}>
                <Button
                    onPress={() => this.props.navigation.navigate('Form', {phoneNumber: ''})}
                    title="Add"
                    color="#2244ff"
                    accessibilityLabel="Add New Contact"
                />
                <ScrollView>
                    <ListView
                    dataSource={this.state.dataSource}
                    renderRow={(rowData) => this.renderRow(rowData) }
                    renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
                    />
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    viewRow: {
        paddingTop: 12,
        paddingBottom: 12,
    },
    separator: {
        flex: 1,
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#8E8E8E',
    },
});
