import React, { Component } from 'react';
import {
  Animated,
  Dimensions,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View, FlatList, StatusBar, ImageBackground,
} from 'react-native';
// import str from './content';

const HEADER_EXPANDED_HEIGHT = 300;
const HEADER_COLLAPSED_HEIGHT = 60;

const { width: SCREEN_WIDTH } = Dimensions.get("screen")
const dashData = [{name:"Dream Notes",icon:""},{name:"Affirmations",icon:""},{name:"Life Goals",icon:""},{name:"Perception",icon:""}]
export default class App extends Component {
  constructor() {
    super();

    this.state = {
      scrollY: new Animated.Value(0)
    }
  }

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

        <Animated.View style={[styles.header, { height: headerHeight }]}>
          <ImageBackground style={[{ height: "100%", alignItems: 'center', justifyContent: 'center' }]} source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTxb4ceqC-7kyqxZzsNdTwucLQK8Rjv5yntziGKL47Vq87lTtRx&usqp=CAU" }}>
            {/* <Animated.Text style={{ textAlign: 'center', fontSize: 32, color: 'white', position: 'absolute', bottom: 16, left: 16, opacity: heroTitleOpacity }}>{headerTitle}</Animated.Text> */}
            <View style={{ width: "70%", alignSelf: 'center' }}>
              <Text style={{ color: '#fff', fontStyle: 'italic', fontSize: 20, fontWeight: 'bold' }}>
                “A journey of a thousand miles must begin with a single step.”
         </Text>
            </View>
          </ImageBackground>
          <Animated.View style={{ position: 'absolute', width: '100%', height: 65, opacity: toolBarOpacity, backgroundColor: '#2e3545' }}>
            <Animated.Text style={{ textAlign: 'center', fontSize: 18, color: '#fff', marginTop: 28, opacity: headerTitleOpacity }}>{headerTitle}</Animated.Text>

          </Animated.View>
        </Animated.View>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          onScroll={Animated.event(
            [{
              nativeEvent: {
                contentOffset: {
                  y: this.state.scrollY
                }
              }
            }])
          }
          scrollEventThrottle={16}>
          {/* <Text style={styles.title}>This is Title</Text>
        <Text style={styles.content}>{data}</Text> */}
          <FlatList
            data={dashData}

            renderItem={({item}) => <View style={{ width: '100%', height: 150, backgroundColor: '#222736', elevation: 2, marginBottom: 3, borderRadius: 5 }}>
              <Text style ={{position:'absolute',bottom:10, left:10, color:'#ccc',fontSize:25}}>{item.name}</Text>
            </View>}
          />

        </ScrollView>
      </View>
    );
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