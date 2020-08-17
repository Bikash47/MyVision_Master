import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, Modal, StyleSheet, TouchableHighlight, Dimensions } from 'react-native';
import { TextInput, FlatList } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import {
    emailChanged
} from "../actions/DemoAction";

class DreamNotes extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            isUpdated: false
        }
        // this.props.navigation.isFocused(() => {
        //     this.callingFunction();

        // })
    }

    //     <TextInput style = {{color:"#fff"}}value={this.props.email}
    //     passwordRules={"Enter Text"}
    //     onChangeText={(text) => this.props.emailChanged(text)}>

    // </TextInput>

    // <TouchableHighlight
    //     style={styles.openButton}
    //     onPress={() => {
    //         //this.setModalVisible();
    //         this.props.navigation.navigate("AddVision")
    //     }}
    // >
    //     <Text style={styles.textStyle}>+</Text>
    // </TouchableHighlight>
    // {this._modalView()}
    callingFunction() {
        alert("Cool one")
    }
    setModalVisible() {
        this.setState({ modalVisible: !this.state.modalVisible })
    }
    render() {
        console.log("Prop data", this.props.navigation)
        // alert(""+this.state.coolM)
        return (
            <View style={{ flex: 1, backgroundColor: '#000', padding: 5 }}>
                <FlatList
                    numColumns={2}
                    // horizontal={true}
                    extraData={this.state.isUpdated}
                    data={this.props.visionList}
                    renderItem={({ item, index }) => {
                        var itemDimension = Dimensions.get('window').width / 2;
                        return (
                            <TouchableOpacity style={{ padding: 5, alignSelf: 'center', marginRight: 7, marginBottom: 7, backgroundColor: "#fff", height: 250, width: "49%", borderRadius: 5, borderWidth: 0.1, borderColor: '#fff' }}
                                onPress={() => this.props.navigation.navigate("MyVision", { visionData: item })}
                            >
                                <Image style={{ width: "100%", height: 180, resizeMode: 'stretch', alignSelf: 'center' }} source={item.avatarSource} />
                                <View style={{ width: '100%', }}>
                                    <Text numberOfLines={1} style={{ fontSize: 19, fontWeight: 'bold' }}>{item.selectedCatagory}</Text>
                                    <Text style={{ color: '#434543', fontSize: 13 }} numberOfLines={1}>{item.visionDesc}</Text>
                                    <Text style={{ fontSize: 10, color: '#ad2363', fontWeight: 'bold' }}>{item.date}</Text>
                                </View>

                            </TouchableOpacity>
                        );
                    }
                    }
                />
                <TouchableHighlight
                    style={styles.openButton}
                    onPress={() => {
                        this.props.navigation.navigate("AddVision", { isComingForEdit: false })
                    }}
                >
                    <Image style={{ width: 30, height: 30, alignSelf: 'center' }} source={require('../image/plus_white.png')} />
                </TouchableHighlight>
            </View>
        )
    }
    componentDidMount() {
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            this.setState({isUpdated:!this.state.isUpdated})
        });
    }

    componentWillUnmount() {
        this._unsubscribe();
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
            <TouchableOpacity activeOpacity={10} style={styles.centeredView} onPress={() => this.setModalVisible()}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}></Text>


                </View>
            </TouchableOpacity>
        </Modal>
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
    emailChanged
})(DreamNotes);

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
        bottom: 10, right: 5, alignItems: 'center', justifyContent: 'center'
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});