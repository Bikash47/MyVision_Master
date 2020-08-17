import React, { Component } from 'react';
import { View, FlatList, Text, TouchableOpacity, Button, Modal, StyleSheet, TouchableHighlight, Picker, Image, Alert } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';

import {
    addNewCatagory
} from "../actions/VisonAction";


class MyNotes extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isUpdated: false
        }

    }
    componentDidMount() {
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            this.setState({ isUpdated: !this.state.isUpdated })
        });
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#000' }}>
                <FlatList
                    // numColumns={2}
                    // horizontal={true}
                    extraData={this.state.isUpdated}
                    data={this.props.allNotes}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity activeOpacity={1} style={{
                                padding: 10, alignSelf: 'center', backgroundColor: "#1A1A1A", minHeight: 100, width: "98%",
                                flexGrow: 0, borderRadius: 5, borderWidth: 0.1, borderColor: '#1A1A1A',marginTop:5
                            }}
                                onPress={() => this.props.navigation.navigate("AddNotes", { note: item, position:index })}
                            >
                                <Text style={{ color: '#fff', marginTop: 5, fontWeight: 'bold' }}>{item.title}</Text>
                                <Text style={{ color: '#6b6b6e', marginTop: 5 }}>{item.content}</Text>
                                <Text style={{ color: '#3D3C3C',marginTop:5,marginBottom:0,fontSize:10 }}>{moment.utc(item.createnDate).local().startOf('seconds').fromNow()}</Text>
                            </TouchableOpacity>
                        );
                    }
                    }
                />
                <TouchableHighlight
                    style={styles.openButton}
                    onPress={() => {
                        this.props.navigation.navigate("AddNotes")
                    }}
                >
                    <Image style={{ width: 20, height: 25, alignSelf: 'center' }} source={require('../image/plus_white.png')} />
                </TouchableHighlight>
            </View>
        )
    }



}
const mapStateToProps = ({ affirimation }) => {
    const {
        allNotes
    } = affirimation;
    return {
        allNotes
    };
};

export default connect(mapStateToProps, {
})(MyNotes);

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