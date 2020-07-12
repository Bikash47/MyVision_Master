import React, { Component } from 'react';
import { ImageBackground, View, Text, TouchableOpacity, Button, Modal, StyleSheet, TouchableHighlight, Picker, Image, Alert, FlatList } from 'react-native';
import { connect } from 'react-redux';
import DatePicker from 'react-native-datepicker'
var today = new Date();
var todaysDate = today.getDate() + "-" + parseInt(today.getMonth() + 1) + "-" + today.getFullYear();
import {
    addNewCatagory
} from "../actions/VisonAction";

class AffirimationComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visionDesc: "",
            avatarSource: null,
            isCompleated: false,
            pickerActive: false,
            selectedCatagory: "Select Catagory",
            date: "",
            reRender:false
        }

    }
    componentDidMount() {
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            this.reRenderComp()
        });
    }

    componentWillUnmount() {
        this._unsubscribe();
    }
    reRenderComp(){
        this.setState({reRender:!this.state.reRender})
    }
    getSelectedAff(index){
        const { affirmationList } = this.props;
        var selectedItem = 0
        affirmationList[index].subAff.map(item =>{
            if(item.subChecked){
                selectedItem++
            }
        });
        return selectedItem;
    }
    render() {
        console.log("Nav data for Aff", this.props)
        const { affirmationList } = this.props;
        return (
            <View style={{ flex: 1, backgroundColor: '#000' }}>

                <FlatList
                    style={{ width: '100%', height: '100%',backgroundColor:'#003333'  }}
                    data={affirmationList}
                    keyExtractor={(item, index) => index.toString()}
                    extraData={this.state}
                    renderItem={({ item,index }) => 
                    <TouchableOpacity style={{ marginTop:3,paddingLeft:5,paddingRight:5}}
                        onPress={() => {this.props.navigation.navigate("AffirimationItem", {title:item.title,pItem: item,pIndex:index,reRender:this.reRenderComp })}}>
                        <ImageBackground style={{ borderColor: 'blue', borderRadius: 10, borderWidth: 1, width: "100%", height: 50, elevation: 20, borderRadius: 5, resizeMode: 'stretch', alignItems: 'center', flexDirection:'row' }}
                            source={require("../image/card_bg.png")}>
                                <View style={{width:25,height:25,borderRadius:100,borderWidth:1,borderColor:'blue',marginLeft:10,backgroundColor:this.getSelectedAff(index) != 0?"blue":"#fff"}}/>
                                <View style = {{width:1,height:'100%',backgroundColor:'blue',marginLeft:11}}/>
                                <View style={{width:55,height:'100%',position:'absolute',right:1,borderLeftWidth:2,borderTopLeftRadius:60,borderBottomLeftRadius:60,borderColor:'blue',borderRadius:1,borderColor:'blue',alignItems:'center',justifyContent:'center'}}>
        <Text style={{fontSize: 21,fontWeight:'bold', color: "#000"}}>{""+this.getSelectedAff(index)}</Text>
                                </View>

                            <Text style={{ fontSize: 21,fontWeight:'bold', color: "#000" ,alignSelf:'center',marginLeft:20}}>{item.title}</Text>
                        </ImageBackground>
                    </TouchableOpacity>}
                />
                <TouchableHighlight
                    style={styles.openButton}
                    onPress={() => {
                    }}
                >
                    <Image style={{width:20,height:25,alignSelf:'center'}} source ={require('../image/plus_white.png')}/>
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
const mapStateToProps = ({ affirimation }) => {
    const {
        affirmationList
    } = affirimation;
    return {
        affirmationList
    };
};

export default connect(mapStateToProps, {
    addNewCatagory
})(AffirimationComponent);

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
        bottom: 10, right: 10, alignItems: 'center', justifyContent: 'center'
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
        paddingLeft: 5, lineHeight: 23
    },
});