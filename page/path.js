import 'react-native-gesture-handler';
import React from "react";
import {Text,Image,TouchableOpacity,View} from "react-native";
import { createStackNavigator,CardStyleInterpolators } from '@react-navigation/stack';
import { createDrawerNavigator,DrawerContentScrollView,
    DrawerItemList,DrawerItem } from '@react-navigation/drawer';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Home from "./home";
import Login from "./login";
import Charts from "./Charts";
import Command from "./Command";
import Setting from "./setting";
import Newstack from "./stack/newstack";
import Webcom from "./stack/Webcom";
import {gfont, gh, gw} from "../public/screenUtil";
import NavigationService from "../public/NavigationService";

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
    return (
        <DrawerContentScrollView {...props}>
            <View style={{flex:1,justifyContent:"center",alignItems:"center",marginBottom:gh(50)}}>
                <Image
                    source={{uri:"https://profile.csdnimg.cn/A/B/2/2_qq_37399372"}}
                    resizeMode={"contain"}
                    style={{width:gw(150),height:gw(150),borderRadius:100}}
                />
                <Text style={{marginTop:gh(20),fontSize:gfont(30),}}>xiaobo</Text>
            </View>

            <DrawerItemList {...props} />

        </DrawerContentScrollView>
    );
}

//抽屉堆栈
function MyDrawer() {
    return (
        <Drawer.Navigator initialRouteName="Dashboard" drawerType={"back"}
                          drawerContent={CustomDrawerContent}
                          drawerStyle={{
                              backgroundColor: '#fff',
                              width: gw(500),
                          }}
        >
            <Drawer.Screen
                name="Dashboard"
                component={Home}
                options={{ drawerLabel: 'Dashboard' }}
            />
            <Drawer.Screen
                name="Charts"
                component={Charts}
                options={{ drawerLabel: 'Charts' }}
            />
            <Drawer.Screen
                name="Command"
                component={Command}
                options={{ drawerLabel: 'Command' }}
            />
            <Drawer.Screen
                name="Setting"
                component={Setting}
                options={{ drawerLabel: 'Setting' }}
            />
        </Drawer.Navigator>
    );
}

//导航堆栈
export default function App({params}) {
    const Stack=params;
    return (
        <SafeAreaProvider>

                <Stack.Navigator
                    initialRouteName="Login"
                    mode="card"
                    screenOptions={{
                        mode: "card",
                        gestureEnabled: false,
                        cardShadowEnabled: false,
                        headerMode: "screen",
                        title: "defaultTitle",
                        gestureResponseDistance: "horizontal",
                        gestureDirection: "horizontal",
                        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                        headerShown: true,
                    }}
                >
                    <Stack.Screen name="Home" component={MyDrawer} options={{
                        title:"首页",
                        headerLeft: (props) => <TouchableOpacity onPress={()=>{
                            NavigationService.toggle();
                        }}>
                            <Image source={require("../resource/menu.png")} style={{marginLeft:gw(20),width:gw(50),height:gw(50)}} resizeMode={"contain"}/>
                        </TouchableOpacity>,
                    }}

                    />
                    <Stack.Screen name="Login" component={Login} options={{
                        headerShown:false
                    }} />
                    <Stack.Screen name="Newstack" component={Newstack} options={{
                        title:"新页面"
                    }} />
                    <Stack.Screen name="Webcom" component={Webcom} options={{
                        title:"打开 webpage"
                    }} />
                </Stack.Navigator>

        </SafeAreaProvider>
    );

}

