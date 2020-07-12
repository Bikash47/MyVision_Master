// import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
} from '@react-navigation/drawer';
import Dashboard from './component/Dashboard';
import DreamNotes from './component/DreamNotes';
import {TouchableOpacity} from 'react-native'
import AddVision from './component/AddVision';
import MyVision from './component/MyVision';
import SplashComponent from './component/SplashComponent';
import AffirimationComponent from './component/AffirimationComponent';
import AffirimationItemComponent from './component/AffirimationItemComponent';
import ImageTextMusicComponent from './component/ImageTextMusicComponent';
import MyNotes from './component/MyNotes';
import AddNotes from './component/AddNotes';
export default function Router() {
    const Stack = createStackNavigator();//headerMode='none'
    const Drawer = createDrawerNavigator();

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Splash" screenOptions={{
                headerStyle: {
                    backgroundColor: '#222736',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    alignSelf: 'center',
                    textAlign: "center",
                    justifyContent: 'center',
                    textAlignVertical: 'center',
                },
            }}>
                <Stack.Screen name="Splash" component={SplashComponent} options={{ title: 'Dashboard', headerShown: false }} />
                <Stack.Screen name="Home" component={Dashboard} options={{ title: 'Dashboard', headerShown: false }} />
                <Stack.Screen name="DreamNote" component={DreamNotes} options={{
                    title: 'My Vision',
                    // headerRight: (navigation) => (
                    //   <TouchableOpacity style = {{width:40,height:40,backgroundColor:'#00f'}}
                    //     onPress={() => alert(JSON.stringify(navigation))}
                       
                    //   />
                    // ),
                }}
                />
                <Stack.Screen name = "AddVision" component ={AddVision} options = {{title:"Add Vision"}}/>
                <Stack.Screen name = "MyVision" component ={MyVision} options = {{title:"My Vision"}}/>
                <Stack.Screen name = "Affirimation" component ={AffirimationComponent} options = {{title:"Affirimation"}}/>
                <Stack.Screen name = "AffirimationItem" component ={AffirimationItemComponent} options = {{title:"Affirimation"}}/>
                <Stack.Screen name = "ImageTextMusicComponent" component ={ImageTextMusicComponent} options = {{title:"Play",headerShown:false}}/>
                <Stack.Screen name = "MyNotes" component ={MyNotes} options = {{title:"Notes",headerShown:true}}/>
                
                <Stack.Screen name = "AddNotes" component ={AddNotes} options = {{title:"",headerShown:true}}/>

                {/* <Stack.Screen name="Drawer">
               <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />}>
                    <Drawer.Screen name="Feed" component={Dashboard} />
                    <Drawer.Screen name="Notifications" component={Dashboard} />
                </Drawer.Navigator>
                </Stack.Screen> */}
                
            </Stack.Navigator>
           
        </NavigationContainer>
    );
}
// import * as React from 'react';
// import { View, Text, Button } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import {
//   createDrawerNavigator,
//   DrawerContentScrollView,
//   DrawerItemList,
//   DrawerItem,
// } from '@react-navigation/drawer';

// function Feed({ navigation }) {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Feed Screen</Text>
//       <Button title="Open drawer" onPress={() => navigation.openDrawer()} />
//       <Button title="Toggle drawer" onPress={() => navigation.toggleDrawer()} />
//     </View>
//   );
// }

// function Notifications() {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Notifications Screen</Text>
//     </View>
//   );
// }

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      {/* <DrawerItem
        label="Close drawer"
        onPress={() => props.navigation.closeDrawer()}
      />
      <DrawerItem
        label="Toggle drawer"
        onPress={() => props.navigation.toggleDrawer()}
      /> */}
    </DrawerContentScrollView>
  );
}


// function MyDrawer() {
//   return (
//     <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />}>
//       <Drawer.Screen name="Feed" component={Feed} />
//       <Drawer.Screen name="Notifications" component={Notifications} />
//     </Drawer.Navigator>
//   );
// }

// export default function Main() {
//   return (
//     <NavigationContainer>
//       <MyDrawer />
//     </NavigationContainer>
//   );
// }