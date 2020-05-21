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
class AddVision extends Component {

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
        const { params } = this.props.route
        if (params.isComingForEdit) {
            this.props.navigation.setOptions({ title: 'Update Vision!' })
            this.setState({
                visionDesc: params.visionData.visionDesc,
                avatarSource: params.visionData.avatarSource,
                isCompleated: params.visionData.isCompleated,
                selectedCatagory: params.visionData.selectedCatagory,
                date: params.visionData.date
            })
        }
    }
    selectPhotoTapped() {
        const options = {
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup: true,
            },
        };

        ImagePicker.showImagePicker(options, response => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled photo picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                let source = { uri: response.uri };
                // ImageEditor.cropImage(response.uri, cropData).then(url => {
                //     console.log("Cropped image uri", url);
                //     alert(url)
                //   })
                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };

                this.setState({
                    avatarSource: source,
                });
            }
        });
    }
    render() {
        const { visionCatagory } = this.props;
        const { params } = this.props.route

        return (
            <View style={{ flex: 1, backgroundColor: '#000' }}>
                <ScrollView>
                    <TouchableOpacity activeOpacity={1} style={{ alignSelf: 'center', width: '97%', height: 300, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' }}
                        onPress={() => this.selectPhotoTapped()}>
                        {this.state.avatarSource == null ? <Image style={{ width: 150, height: 150, alignSelf: 'center' }} source={require('../image/add_Image.png')} />
                            : <Image style={{ width: "100%", height: "100%" }} source={this.state.avatarSource} />}
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0} style={{ width: '97%', alignSelf: 'center', height: 40, backgroundColor: '#fff', justifyContent: 'center', marginTop: 5, padding: 5 }}
                        onPress={() => this.setState({ pickerActive: true })}
                    >
                        <Text style={{ fontSize: 15 }}>{this.state.selectedCatagory}</Text>
                        <Image style={{ width: 25, height: 25, position: 'absolute', right: 5, alignSelf: 'center' }} source={require('../image/down.png')} />
                    </TouchableOpacity>
                    <TextInput
                        style={styles.input}
                        value={this.state.visionDesc}
                        onChangeText={text => this.setState({ visionDesc: text })}
                        multiline={true}
                        underlineColorAndroid='transparent'
                        placeholder="Add More about your Vision"
                    />
                    <TouchableOpacity style={{ flexDirection: 'row', width: '97%', alignSelf: 'center', height: 40, backgroundColor: '#fff', marginTop: 5, padding: 5 }} onPress={() => this.datePickerRef.onPressDate()}>
                        <Text style={{ alignSelf: 'center', fontSize: 15 }}>{this.state.date == "" ? "Select Target Date" : this.state.date}</Text>
                        <Image style={{ width: 25, height: 25, position: 'absolute', right: 5, alignSelf: 'center' }} source={require('../image/date.png')} />
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'row', width: '97%', height: 50, alignSelf: 'center', justifyContent: 'space-between', marginBottom: 10, marginTop: 10 }}>
                        <TouchableOpacity activeOpacity={1} style={{ width: "50%", height: '100%', alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }} onPress={() => this.setState({ isCompleated: !this.state.isCompleated })}>
                            <Text style={{ color: '#fff' }}>Completed</Text>
                            {this.state.isCompleated ? <Image style={{ width: 20, height: 20, alignSelf: 'center', marginLeft: 10 }} source={require('../image/checked.png')} />
                                : <Image style={{ width: 20, height: 20, alignSelf: 'center', marginLeft: 10 }} source={require('../image/uncheck.png')} />}
                        </TouchableOpacity>
                        <TouchableOpacity style={{ width: "50%", height: '100%', alignItems: 'center', justifyContent: 'center', backgroundColor: '#222736' }}
                            onPress={() => this.onSaveClick()}>
                            <Text style={{ color: '#fff', fontWeight: 'bold' }}>{params.isComingForEdit ? "Update" : "Save"}</Text>
                        </TouchableOpacity>
                    </View>
                    {this.state.pickerActive ? <TouchableOpacity onPress={() => this.setState({ pickerActive: false })} activeOpacity={1} style={{ position: 'absolute', width: '100%', height: '100%', backgroundColor: 'rgba(52, 52, 52, 0.8)', alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{ width: '80%', height: 400, backgroundColor: '#fff', padding: 10 }}>

                            <FlatList
                                ListHeaderComponent={() => <TouchableOpacity style={{ backgroundColor: '#e8e6e6', flexDirection: 'row', paddingTop: 5, paddingBottom: 5 }}>
                                    <Image style={{ width: 25, height: 25, alignSelf: 'center', marginLeft: 5 }} source={require('../image/plus_r.png')} />
                                    <Text style={{ fontSize: 15, marginLeft: 10, alignSelf: 'center' }}>Add New Catagory</Text>
                                </TouchableOpacity>}
                                data={visionCatagory}
                                renderItem={({ item }) => <TouchableOpacity style={{ padding: 10, borderBottomWidth: 1, borderColor: "#ccc" }}
                                    onPress={() => this.setState({ selectedCatagory: item.catagory, pickerActive: false })}>
                                    <Text style={{ fontSize: 15 }}>{item.catagory}</Text>
                                </TouchableOpacity>}
                            />
                        </View>
                    </TouchableOpacity> : null}
                    <DatePicker
                        ref={(ref) => this.datePickerRef = ref}
                        showIcon={false}
                        hideText={true}
                        style={{ width: 200 }}
                        date={this.state.date}
                        mode="date"
                        placeholder="select date"
                        format="DD-MM-YYYY"
                        minDate={todaysDate}
                        maxDate="01-06-2080"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                marginLeft: 0
                            },
                            dateInput: {
                                marginLeft: 36
                            }
                            // ... You can check the source to find the other keys.
                        }}
                        onDateChange={(date) => { this.setState({ date: date }) }}
                    />
                </ScrollView>


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
        const { params } = this.props.route

        if (visionDesc != "" && avatarSource != "" && selectedCatagory != "" && date != "") {
            let list = visionList;
            let obj = {

                avatarSource,
                visionDesc,
                isCompleated,
                selectedCatagory,
                date
            }
            debugger;
            if (params.isComingForEdit) {
                obj.id = params.visionData.id;
                list[params.visionData.id - 1] = obj
            } else {
                obj.id = list.length + 1
                list.push(obj)
            }
            this.props.addNewCatagory(list)
            this.props.navigation.navigate("DreamNote")
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
})(AddVision);

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
        bottom: 10, right: 5
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
        height: 150,
        alignSelf: 'center',
        backgroundColor: '#fff',
        color: '#000',
        fontSize: 15,
        //borderColor:'red',
        //borderWidth:1,
        marginTop: 5,
        paddingTop: 10, textAlign: 'left', textAlignVertical: 'top',
        paddingLeft: 5,
    },
});