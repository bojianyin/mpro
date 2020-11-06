/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment} from 'react';
import {} from 'react-native';
import Path from "./page/path";
import NavigationService from "./public/NavigationService";
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator,} from "@react-navigation/stack";

const Stack=createStackNavigator();

const App = () => {
  return (
      <NavigationContainer ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);
      }}>
        <Path params={Stack}/>
      </NavigationContainer>
  );
};

export default App;
