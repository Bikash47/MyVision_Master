import React, { Component } from 'react';
import {
    Animated,
    Dimensions,
    Platform,
    ScrollView,
    StyleSheet,
    Text, TouchableOpacity,
    View, FlatList, StatusBar, ImageBackground, TouchableNativeFeedback, Image
} from 'react-native';
// import str from './content';

const HEADER_EXPANDED_HEIGHT = 300;
const HEADER_COLLAPSED_HEIGHT = 60;

const { width: SCREEN_WIDTH } = Dimensions.get("screen")
const dashData = [{ name: "My Vision", icon: require('../image/vision.png') }, { name: "Affirmations", icon: require("../image/aff.png") }, { name: "My Notes", icon: require("../image/note.png") },]// { name: "Life Goals", icon: "" }, { name: "Perception", icon: "" }]
export default class Dashboard extends Component {
    constructor() {
        super();

        this.state = {
            scrollY: new Animated.Value(0)
        }
    }
    componentDidMount() {
        console.log("Route Name", this.props)
        // alert(""+this.props.navigation.state.routeName)
    }
    //background={TouchableNativeFeedback.Ripple('black')}
    render() {
        const headerHeight = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_EXPANDED_HEIGHT - HEADER_COLLAPSED_HEIGHT],
            outputRange: [HEADER_EXPANDED_HEIGHT, HEADER_COLLAPSED_HEIGHT],
            extrapolate: 'clamp'
        });
        const headerTitleOpacity = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_EXPANDED_HEIGHT - HEADER_COLLAPSED_HEIGHT],
            outputRange: [0, 1],
            extrapolate: 'clamp'
        });
        const heroTitleOpacity = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_EXPANDED_HEIGHT - HEADER_COLLAPSED_HEIGHT],
            outputRange: [1, 0],
            extrapolate: 'clamp'
        });
        const toolBarOpacity = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_EXPANDED_HEIGHT - HEADER_COLLAPSED_HEIGHT],
            outputRange: [0, 1],
            extrapolate: 'clamp'
        });

        const headerTitle = 'Dreamers Worlds'
        console.log("headerHeight", headerHeight)
        return (
            <View style={styles.container}>
                <StatusBar translucent backgroundColor="transparent" />
                <View style={{ width: '100%', height: 70, backgroundColor: '#2e3545' }}>
                    <Text style={{ textAlign: 'center', fontSize: 18, color: '#fff', marginTop: 28, }}>{headerTitle}</Text>

                </View>
                <View style={{ width: '100%', height: '100%', backgroundColor: '#003333' }}>


                    {/* <ImageBackground style={{ width: '100%', height: '100%' }} */}
                    {/* source={require("../image/card_bg.png")}> 33AFA7 */}
                    <FlatList
                        // numColumns={2}
                        style={{ marginTop: 5 }}
                        data={dashData}
                        //DreamNote
                        renderItem={({ item, index }) => {
                            var itemDimension = Dimensions.get('window').width / 2;
                            return <View><TouchableOpacity style={{ width: '100%', height: 160, padding: 5 }}
                                onPress={() => this.navToPage(index)} >
                                <ImageBackground style={{ borderColor: 'transparent', borderRadius: 10, borderWidth: 1, width: "100%", height: "100%", elevation: 20, borderRadius: 5, resizeMode: 'stretch', alignItems: 'center', justifyContent: 'center' }}
                                    source={require("../image/card_bg.png")}>

                                    <Image style={{ width: 90, height: 90, position: 'absolute', top: 10, right: 15 }} source={item.icon} />
                                    <Text style={{ position: 'absolute', bottom: 10, right: 15, color: '#000', fontSize: 27, fontWeight: 'bold' }}>{item.name}</Text>

                                </ImageBackground>
                            </TouchableOpacity>
                                <TouchableOpacity style={{ width: 70, height: 70, position: 'absolute', top: 5, left: 0 }}
                                    onPress={() => this.props.navigation.navigate("ImageTextMusicComponent",{keyType:index})}>
                                    <Image style={{ width: 70, height: 70 }} source={require("../image/play.png")} />

                                </TouchableOpacity>
                            </View>
                        }}
                    />
                </View>
                {/* </ImageBackground> */}


            </View>
        );
    }
    navToPage(position) {
        switch (position) {
            case 0:
                this.props.navigation.navigate("DreamNote");
                break;
            case 1:
                this.props.navigation.navigate("Affirimation")
                break;

        }
    }
   
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    scrollContainer: {
        paddingLeft: 7,
        paddingRight: 7,
        paddingBottom: 10,
        paddingTop: HEADER_EXPANDED_HEIGHT
    },
    header: {
        backgroundColor: 'lightblue',
        position: 'absolute',
        width: SCREEN_WIDTH,
        top: 0,
        left: 0,
        zIndex: 9999,
        elevation: 5
    },
    title: {
        marginVertical: 16,
        color: "black",
        fontWeight: "bold",
        fontSize: 24
    }
});