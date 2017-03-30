/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import ListData from './components/ListData';
import FormData from './components/FormData';
import DetailData from './components/DetailData';

export default class ContactApp extends Component {
    render() {
        return(
            <ListData
                trigger={this.props.navigation}
            />
        );
    }
}

const App = StackNavigator({
    List: { screen: ListData },
    Form: { screen: FormData },
    Detail: { screen: DetailData }
});
AppRegistry.registerComponent('ContactApp', () => App);
