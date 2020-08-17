import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Button, Modal, StyleSheet, TouchableHighlight, Picker, Image, Alert } from 'react-native';
import { TextInput, ScrollView, FlatList, } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import DatePicker from 'react-native-datepicker'
var today = new Date();
var todaysDate = today.getDate() + "-" + parseInt(today.getMonth() + 1) + "-" + today.getFullYear();
import {
    addNewCatagory
} from "../actions/VisonAction";
import ImageEditor from "@react-native-community/image-editor";
import ImagePicker from 'react-native-image-picker';
let cropData = {
    offset: { x: 100, y: 100 },
    size: { width: 100, height: 100 },
    displaySize: { width: 100, height: 100 },
    resizeMode: 'contain' | 'cover' | 'stretch',
};

class MyVision extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visionDesc: "",
            avatarSource: null,
            isCompleated: false,
            pickerActive: false,
            selectedCatagory: "Select Catagory",
            date: ""
        }

    }
    componentDidMount() {
        const {params} = this.props.route
        this.setState({
            visionDesc: params.visionData.visionDesc,
            avatarSource: params.visionData.avatarSource,
            isCompleated: params.visionData.isCompleated,
            selectedCatagory: params.visionData.selectedCatagory,
            date: params.visionData.date
        })
    }
colorTextOfCompleate (text){
    let currentDate = new Date(todaysDate);
    let saveDate = new Date(this.state.date);
    if(text){
        return "#0f0"
    }else if(!text){
        return "#d7f207"
    }else if(currentDate > saveDate){
        return "red"
    }
}
    render() {
        console.log("Nav data", this.props)
        const { visionCatagory } = this.props;
        return (
            <View style={{ flex: 1, backgroundColor: '#000' }}>
                <ScrollView>
                    <View activeOpacity={1} style={{ alignSelf: 'center', width: '97%', height: 300, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' }}>
                        <Image style={{ width: "100%", height: "100%" }} source={this.state.avatarSource} />
                    </View>
                    <View activeOpacity={0} style={{ width: '97%', alignSelf: 'center', height: 40,  justifyContent: 'center', marginTop: 10, padding: 5 }}
                        onPress={() => this.setState({ pickerActive: true })}
                    >
                        <Text style={{ color: this.colorTextOfCompleate(this.state.isCompleated),fontSize: 15,fontWeight:'bold',marginTop:5 }}>{this.state.isCompleated ?"Completed":"Yet To Complete"}</Text>
                        <Text style={{ fontSize: 18,color:'#fff',fontWeight:'bold',marginTop:5 }}>{this.state.selectedCatagory}</Text>
                        <View style={{ position:'absolute',right:0,top:0,flexDirection:'row',alignItems:'center',justifyContent:'center' }}>
                        <Text style={{ alignSelf: 'center', fontSize: 13,color:'#fff' }}>Target On:</Text>
                        <Text style={{ alignSelf: 'center', fontSize: 13,color:'#f00',alignSelf:'center' }}>{" "+this.state.date}</Text>

                        </View>

                    </View>
                    <TextInput
                        style={styles.input}
                        value={this.state.visionDesc}
                        onChangeText={text => this.setState({ visionDesc: text })}
                        multiline={true}
                        underlineColorAndroid='transparent'
                        placeholder="Add More about your Vision"
                        editable={false}
                    />
                   
                  
                    
                </ScrollView>

                <TouchableHighlight
                    style={styles.openButton}
                    onPress={() => {
                        this.props.navigation.navigate("AddVision",{isComingForEdit:true,visionData:this.props.route.params.visionData})
                    }}
                >
                    <Image style={{width:20,height:25,alignSelf:'center'}} source ={require('../image/edit.png')}/>
                </TouchableHighlight>
            </View>
        )
    }

    onSaveClick() {
        const { visionList } = this.props;
        const { visionDesc,
            avatarSource,
            isCompleated,
            selectedCatagory,
            date } = this.state;
        if (visionDesc != "" && avatarSource != "" && selectedCatagory != "" && date != "") {
            let list = visionList;
            let obj = {
                avatarSource,
                visionDesc,
                isCompleated,
                selectedCatagory,
                date
            }
            list.push(obj)
            this.props.addNewCatagory(list)
        } else {
            Alert.alert("", "Please Enter all fields")
        }

    }

}
const mapStateToProps = ({ vision }) => {
    const {
        visionList, visionCatagory
    } = vision;
    return {
        visionList, visionCatagory
    };
};

export default connect(mapStateToProps, {
    addNewCatagory
})(MyVision);

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        // justifyContent: "flex-end",
        // alignItems: "flex-start",
        // alignSelf: 'center',
        width: '100%',
        height: '100%',
        // backgroundColor:'#00f'

    },
    modalView: {
        // margin: 20,
        backgroundColor: "#151515",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: 300
    },
    openButton: {
        backgroundColor: "#222736",
        borderRadius: 100,
        borderColor: '#3E3838', borderWidth: 0.5,
        padding: 10,
        elevation: 10,
        width: 60, height: 60,
        position: 'absolute',
        bottom: 10, right: 5,alignItems:'center',justifyContent:'center'
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }, input: {
        width: "97%",
        height: null,
        alignSelf: 'center',
        color: '#fff',
        fontSize: 15,
        //borderColor:'red',
        //borderWidth:1,
        marginTop: 5,
        paddingTop: 10, textAlign: 'left', textAlignVertical: 'top',
        paddingLeft: 5,lineHeight: 23
    },
});