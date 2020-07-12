import React, { Component } from 'react';
import { SafeAreaView, View, Text, Image, Dimensions, TouchableOpacity, StatusBar,Alert } from 'react-native';
import ImageSlider from 'react-native-image-slider';
const win = Dimensions.get('window');
const ratio = win.width / 541; //541 is actual image width
import TextSlider from 'text-slider';
import { connect } from 'react-redux';
import SoundPlayer from 'react-native-sound-player'


const images = [
    'https://images.pexels.com/photos/556666/pexels-photo-556666.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    'https://media-cdn.tripadvisor.com/media/photo-s/12/1b/08/89/boardwalk-walking-trail.jpg',
    'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg'
];
const wrapperStyle = {
    flex: 1,
    width: '100%',
    padding: 6,
    // backgroundColor: '#085078',
    alignSelf: 'center',
    marginTop: 0,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    elevation: 2
}
const currentText = {
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    color: '#ffffff'
}

class ImageTextMusicComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewUi: false,
            selectedList:[],
            imageList:images,imgInt:3010,txtItn:2800
        }
    }
    UNSAFE_componentWillMount(){
        //this.getSlideTextForAff()
        console.log(this.props);

        const {route} = this.props;
        if(route.params.keyType == 0){
            this.getDetailsForVision()
        }else{
            this.getSlideTextForAff()
        }
        try {
            // play the file tone.mp3
            SoundPlayer.playSoundFile('music', 'mp3')
            // or play from url
            //SoundPlayer.playUrl('https://example.com/music.mp3')
        } catch (e) {
            alert(JSON.stringify(e))
            console.log(`cannot play the sound file`, e)
        }

    }
    componentDidMount(){
         //var affData= this.props.visionList;
         console.log(this.props);
    }
    componentDidCatch(){
        alert("catch")
    }
    componentWillUnmount(){
        SoundPlayer.pause()
    }
    static getDerivedStateFromError(){
        alert("catch")

    }
    getDetailsForVision(){
        var visData= this.props.visionList;
        var imageList =[]
        var selectedList = []
        if(visData.length !=0){
            visData.map(res => {
                imageList.push(res.avatarSource.uri);
                selectedList.push(res.visionDesc)
            })
            this.setState({imageList,selectedList,imgInt:3010,txtItn:2000})
        }else{
            this.setState({imageList:[]})
            Alert.alert(
                '',
                'Seems like you have not set you Vision, Please add some and come back',
                [
                    { text: 'Ok', onPress: () => this.navBack() }
                ],
                { cancelable: false }
            );
        }
        
    }
    navBack(){
        this.props.navigation.goBack(null)
    }
    getSlideTextForAff(){
        var affData= this.props.affirmationList;
        var selectedList = []
        if(affData.length !=0){
        affData.map(res =>{
            res.subAff.map(subRes=>{
                if(subRes.subChecked){
                    selectedList.push(subRes.subTitle)
                }
            })
        })
        if(selectedList.length == 0){
            Alert.alert(
                '',
                'Seems like you have not select Affirmation, Please select some and come back',
                [
                    { text: 'Ok', onPress: () => this.navBack() }
                ],
                { cancelable: false }
            );
        }
        this.setState({selectedList,imgInt:30000,txtItn:4000})
    }else{
        Alert.alert(
            'Seems like you have not select Affirmation, Please select some and come back',
            [
                { text: 'Ok', onPress: () => this.navBack() }
            ],
            { cancelable: false }
        );
    }
    }
    render() {
       

        return (
            <SafeAreaView style={{ flex: 1, }}>
                <StatusBar hidden={!this.state.viewUi} />
                <ImageSlider
                    // loopBothSides
                    autoPlayWithInterval={this.state.imgInt}
                    images={this.state.imageList}
                    customSlide={({ index, item, style, width }) => (
                        // It's important to put style here because it's got offset inside
                        <View key={index} style={{ flex: 1 }}>
                            <Image source={{ uri: item }} style={{
                                width: win.width,
                                height: "100%",
                            }} />
                        </View>
                    )}
                />
                <View style={{ position: 'absolute', height: "100%", alignSelf: 'center', alignItems: 'center', justifyContent: 'center' }}>
                    <TextSlider
                        frequency={this.state.txtItn}
                        slideText={this.state.selectedList}
                        wrapperStyle={wrapperStyle}
                        currentTextStyle={currentText}
                    //activeDotStyle={activeDot}
                    //inactiveDotStyle={inactiveDot}
                       currentIndex={0}
                    />
                </View>
                <TouchableOpacity style={{ position: 'absolute', width: "100%", height: '100%' }} onPress={() => this.setState({ viewUi: !this.state.viewUi })} />
                {this.state.viewUi ? <TouchableOpacity style={{ position: 'absolute', width: 60, height: 60, left: 10, top: 5 }} onPress={()=> this.props.navigation.goBack(null)}>
                    <Image style={{ width: 30, height: 25, position: 'absolute', top: 30, }} source={require('../image/back.png')} />

                </TouchableOpacity> : null}
                {this.state.viewUi ? <TouchableOpacity style={{ position: 'absolute', width: 60, height: 60, right: 15, top: 5,alignItems:'flex-end' }}>
                    <Image style={{ width: 20, height: 20, position: 'absolute', top: 30 }} source={require('../image/setting.png')} />

                </TouchableOpacity> : null}

            </SafeAreaView>
        );
    }
}

const mapStateToProps = ({ affirimation,vision }) => {
    debugger;
    const {
        affirmationList
    } = affirimation;
    const {
        visionList
    } = vision;
    return {
        affirmationList,visionList
    };
};

export default connect(mapStateToProps, {
    
})(ImageTextMusicComponent);
