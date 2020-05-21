import React, { Component } from 'react';
import {
    Animated,
    Dimensions,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    View, FlatList, StatusBar, ImageBackground, TouchableNativeFeedback, Image
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
// import str from './content';



export default class SplashComponent extends Component {
    constructor() {
        super();

        this.state = {
            scrollY: new Animated.Value(0)
        }
    }
    componentDidMount() {
        setTimeout(()=>{
            this.props.navigation.navigate("Home")
        },3000)
    }
    //background={TouchableNativeFeedback.Ripple('black')}
    render() {

        return (
            <View style={styles.container}>
                <StatusBar translucent backgroundColor="transparent" />
                

                  
                <ImageBackground style={{ width: '100%', height: '100%' }}
                source={require("../image/splash.png")}>
                    
                </ImageBackground>
               

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
});