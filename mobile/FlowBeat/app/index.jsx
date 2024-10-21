import React from "react";
import { View, Text, StyleSheet, TextInput, Pressable, Image } from "react-native"
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


export default function Login(){
    return(
        <View style={style.container}>
            <Image 
                style={style.logoLogin}
                source={require('../assets/images/FlowBeat.png')}
            />
            <View>   
            <KeyboardAwareScrollView 
            style={style.form}
            resetScrollToCoords={{ x: 0, y: 0 }}
            scrollEnabled={false}>
                <View>
                    <View style={style.inputContainer}>
                        <Text style={style.inputTxt}>Email</Text>
                        <TextInput 
                        style={style.input} 
                        keyboardType='email-address' 
                        />
                    </View>
                    <View style={style.inputContainer}>
                        <Text style={style.inputTxt}>Password</Text>
                        <TextInput 
                        secureTextEntry = {true}
                        style={style.input} 
                        />
                    </View>
                    <Pressable><Text style={style.botao}>Sign Up</Text></Pressable>
                </View>
            </KeyboardAwareScrollView>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#2E2E2E'
    },

    logoLogin : {
        resizeMode: 'cover',
        width: 400,
        height: 300
    }, 
    form: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        rowGap: 5,
        marginTop: 50
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 25,
        width: 350,
        borderRadius: 10,
        backgroundColor: '#FFF'
    },
    titleForm: {
        textAlign: "left",
        fontSize: 30,
        fontWeight: "bold",
        marginBottom: 20
    },
    inputContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "baseline"
    },
    botao: {
        backgroundColor: '#00ff43',
        borderRadius: 3,
        textAlign: 'center',
        padding: 5,
        color: '#FFF', 
        width: 150,
        margin: 10
    },
    txtPress: {
        color: "#000"
    },
    inputTxt: {
        marginLeft: 12,
        color: "white"
    }
})