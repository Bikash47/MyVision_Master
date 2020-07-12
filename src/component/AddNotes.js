import React, { Component } from 'react';
import {
    View, Keyboard, Text, TouchableOpacity, TextInput, StyleSheet,
    TouchableHighlight, Picker, Image, Alert
} from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';
import {
 addNotes
} from "../actions/AffirimationAction";


class AddNotes extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: "",
            content: "",
            keyBoardVisible: false,

        }

    }
    UNSAFE_componentWillMount() {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
    }

    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    _keyboardDidShow = () => {
        this.setState({ keyBoardVisible: true })
    }

    _keyboardDidHide = () => {
        this.setState({ keyBoardVisible: false })
    }

    componentDidMount() {
        const { params } = this.props.route;
        this.setState({
            title: params != undefined ?params.note.title : "",
            content: params!= undefined ? params.note.content : ""
        })
    }
    onSaveNotes() {
        const { params } = this.props.route;
        var savedNotes = this.props.allNotes;
        var CurrentDate = moment().format();
        // alert(moment().fromNow(CurrentDate))
        let newNots = {
            title: this.state.title,
            content: this.state.content,
            createnDate: CurrentDate
        }
        if(params != undefined){
            savedNotes[params.position]= newNots;
        }else{
            savedNotes.push(newNots);
        }
        this.props.addNotes(savedNotes);
        this.props.navigation.goBack(null)
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#000' }}>
                <TextInput
                    style={{ height: 70, borderBottomColor: '#171717', borderBottomWidth: 0.5, fontSize: 23, color: '#fff', padding: 10, fontWeight: 'bold' }}
                    onChangeText={(text) => this.setState({ title: text })}
                    placeholder={"Title"}
                    placeholderTextColor={"#333232"}
                    autoCorrect={false}
                    numberOfLines={2}
                    value={this.state.title}
                />
                <TextInput
                    style={{ flex: 1, fontSize: 18, color: '#6b6b6e', padding: 10, textAlignVertical: 'top' }}
                    onChangeText={(text) => this.setState({ content: text })}
                    placeholder={"Content"}
                    placeholderTextColor={"#333232"}
                    autoCorrect={false}
                    multiline={true} value={this.state.content}
                />
                {!this.state.keyBoardVisible ? <TouchableHighlight
                    style={styles.openButton}
                    onPress={() => {
                        this.onSaveNotes();
                    }}
                >
                    <Image style={{ width: 20, height: 25, alignSelf: 'center' }} source={require('../image/tick_w.png')} />
                </TouchableHighlight> : null}
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
    addNotes
})(AddNotes);

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