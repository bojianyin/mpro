// NavigationService.js

import { StackActions } from '@react-navigation/native';
import {NavigationActions} from "@react-navigation/compat";
import {DrawerActions} from "@react-navigation/native";
let _navigator;

function setTopLevelNavigator(navigatorRef) {
    _navigator = navigatorRef;
}

function navigate(routeName, params) {
    _navigator.dispatch(
        NavigationActions.navigate({
            routeName,
            params,
        })
    );
}

function toggle() {
    _navigator.dispatch(
        DrawerActions.toggleDrawer()
    );
}


// add other navigation functions that you need and export them

export default {
    navigate,
    setTopLevelNavigator,
    toggle
};
