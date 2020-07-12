import React, { Component } from 'react';
import { ImageBackground, View, Text, TouchableOpacity, Button, Modal, StyleSheet, TouchableHighlight, Picker, Image, Alert, FlatList, TextInput } from 'react-native';
import { connect } from 'react-redux';
import DatePicker from 'react-native-datepicker'
var today = new Date();
var todaysDate = today.getDate() + "-" + parseInt(today.getMonth() + 1) + "-" + today.getFullYear();
import {
    upDateAffirimation
} from "../actions/AffirimationAction";

class AffirimationItemComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            affItemList: [], reRender: false, modalVisible: false, compTitle: "", newCatagory: "", itemIndex: "",editCard:false
        }

    }
    componentDidMount() {
        const { route } = this.props;
        this.props.navigation.setOptions({ title: route.params.title })
        this.setState({ affItemList: route.params.pItem.subAff, compTitle: route.params.title })
    }
    setModalClose() {
        this.setState({ modalVisible: false, newCatagory: "", editCard: false, itemIndex: "" })
    }
    _modalView() {
        return <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.modalVisible}
            onRequestClose={() => {
                Alert.alert("Modal has been closed.");
            }}
        >
            <TouchableOpacity activeOpacity={10} style={{
                flex: 1,
                // justifyContent: "flex-end",
                // alignItems: "flex-start",
                // alignSelf: 'center',
                width: '100%',
                height: '100%'
            }} onPress={() => this.setModalClose()}>
                <View style={{
                    backgroundColor: "#fff",
                    borderTopLeftRadius: 5,
                    borderTopRightRadius: 5,
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
                    height: "50%"
                }}>
                    <Text style={{ top: 8, color: '#000', position: 'absolute', alignSelf: 'center', fontSize: 20 }}>{this.state.compTitle}</Text>
                    <TouchableOpacity style={{ position: 'absolute', right: 10, top: 10 }} onPress={() => this.setModalClose()}>
                        <Text>Close</Text>
                    </TouchableOpacity>
                    <TextInput
                        style={{ textAlign: 'left', textAlignVertical: 'top', height: 100, width: "90%", borderColor: 'blue', borderWidth: 1, marginBottom: 20, marginTop: 50 }}
                        // Adding hint in TextInput using Placeholder option.
                        placeholder="Enter Here"
                        value={this.state.newCatagory}
                        multiline={true}
                        onChangeText={text => this.setState({ newCatagory: text })}
                        // Making the Under line Transparent.
                        underlineColorAndroid="transparent"
                    />
                    <View style={{ width: "90%", height: 50, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', alignSelf: 'center' }}>
                        {/* <TouchableOpacity style={{ borderColor:'transparent',borderRadius:10, borderWidth:1, width: 100, height: 35, backgroundColor: 'red',alignItems:'center',justifyContent:'center' }}>
                            <Text style={{ color: "#fff" }}>Delete</Text>
                        </TouchableOpacity> */}
                        {this.state.editCard ? <TouchableOpacity style={{ borderRadius: 10, borderWidth: 1, borderColor: 'transparent', width: 100, height: 35, backgroundColor: 'red', alignItems: 'center', justifyContent: 'center' }}
                            onPress={() => this.onCLickDelete()}>
                            <Text style={{ color: '#fff' }}>Delete</Text>
                        </TouchableOpacity> : <View style={{ borderRadius: 10, borderWidth: 1, borderColor: 'transparent', width: 100, height: 35, backgroundColor: '#ccc', alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ color: '#303030' }}>Delete</Text>
                            </View>}
                        {this.state.newCatagory !== "" ? <TouchableOpacity style={{ borderRadius: 10, borderWidth: 1, borderColor: 'transparent', width: 100, height: 35, backgroundColor: 'blue', alignItems: 'center', justifyContent: 'center' }}
                            onPress={() => this.onCLickSave()}>
                            <Text style={{ color: '#fff' }}>Save</Text>
                        </TouchableOpacity> : <View style={{ borderRadius: 10, borderWidth: 1, borderColor: 'transparent', width: 100, height: 35, backgroundColor: '#ccc', alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ color: '#303030' }}>Save</Text>
                            </View>}

                    </View>
                    <TouchableOpacity>

                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        </Modal>
    }
    onCLickSave() {
        const { route, affirmationList, navigation } = this.props;
        let affList = affirmationList;
        let pIndex = route.params.pIndex
        let {itemIndex,editCard,newCatagory} = this.state
        if(!editCard){
        let addObj = {
            "subChecked": false,
            "id": affirmationList[pIndex].subAff.length == 0 ? 0 : affirmationList[pIndex].subAff - 1,
            "subTitle": newCatagory
        }
        affList[pIndex].subAff.push(addObj);
    }else{
        affList[pIndex].subAff[itemIndex].subTitle= newCatagory;
    }
        this.props.upDateAffirimation(affList)
        // console.log("Bikash",JSON.stringify(this.props));
        this.setState({ reRender: !this.state.reRender, })
        this.setModalClose()
    }
    onCLickDelete() {
        const { route, affirmationList, navigation } = this.props;
        let affList = affirmationList;
        let pIndex = route.params.pIndex
        let itemIndex = this.state.itemIndex;
        affList[pIndex].subAff.splice(itemIndex, 1);
        this.props.upDateAffirimation(affList)
        // console.log("Bikash",JSON.stringify(this.props));
        this.setState({ reRender: !this.state.reRender, })
        this.setModalClose()
    }
    render() {
        console.log("Nav data for Aff", this.props)
        const { affItemList } = this.state;
        const { route, affirmationList, navigation } = this.props;
        let pIndex = route.params.pIndex
        return (
            <View style={{ flex: 1, backgroundColor: '#000' }}>

                <FlatList
                    style={{ width: '100%', height: '100%' }}
                    data={affirmationList[pIndex].subAff}
                    keyExtractor={(item, index) => index.toString()}
                    extraData={this.state.reRender}
                    renderItem={({ item, index }) => <TouchableOpacity disabled={false} style={{ marginTop: 3, paddingLeft: 5, paddingRight: 5 }}
                        onPress={() => this.setState({ newCatagory: item.subTitle, modalVisible: true, editCard: true, itemIndex: index })}>
                        <ImageBackground style={{ borderColor: 'blue', borderRadius: 10, borderWidth: 1, width: "100%", height: 50, elevation: 20, borderRadius: 5, resizeMode: 'stretch', alignItems: 'center', flexDirection: 'row' }}
                            source={require("../image/card_bg.png")}>
                            <TouchableOpacity style={{ width: 25, height: 25, borderRadius: 100, borderWidth: 1, borderColor: 'blue', marginLeft: 10, backgroundColor: item.subChecked ? "blue" : "#fff" }}
                                onPress={() => this.onRadioClick(index)}>

                            </TouchableOpacity>
                            <View style={{ width: 1, height: '100%', backgroundColor: 'blue', marginLeft: 11 }} />
                            <Text numberOfLines={2} style={{ fontSize: 15, color: "#000", alignSelf: 'center', marginLeft: 20, width: '80%' }}>{"" + item.subTitle}</Text>
                        </ImageBackground>
                    </TouchableOpacity>}
                />
                <TouchableHighlight
                    style={styles.openButton}
                    onPress={() => {
                        this.setState({ modalVisible: true })
                    }}
                >
                    <Image style={{ width: 20, height: 25, alignSelf: 'center' }} source={require('../image/plus_white.png')} />
                </TouchableHighlight>
                {this._modalView()}
            </View>
        )
    }
    onRadioClick(cIndex) {
        const { route, affirmationList, navigation } = this.props;
        let pIndex = route.params.pIndex
        let affList = affirmationList;
        let isCheked = affList[pIndex].subAff[cIndex].subChecked;
        affList[pIndex].subAff[cIndex].subChecked = !isCheked;
        this.props.upDateAffirimation(affList)
        // console.log("Bikash",JSON.stringify(this.props));
        this.setState({ reRender: !this.state.reRender })
    }
    // onSaveClick() {
    //     const { visionList } = this.props;
    //     const { visionDesc,
    //         avatarSource,
    //         isCompleated,
    //         selectedCatagory,
    //         date } = this.state;
    //     if (visionDesc != "" && avatarSource != "" && selectedCatagory != "" && date != "") {
    //         let list = visionList;
    //         let obj = {
    //             avatarSource,
    //             visionDesc,
    //             isCompleated,
    //             selectedCatagory,
    //             date
    //         }
    //         list.push(obj)
    //         this.props.addNewCatagory(list)
    //     } else {
    //         Alert.alert("", "Please Enter all fields")
    //     }

    // }

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
    upDateAffirimation
})(AffirimationItemComponent);

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