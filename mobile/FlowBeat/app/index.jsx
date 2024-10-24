import React from "react";
import { View, Text, StyleSheet, TextInput, Pressable, Image } from "react-native";
import { Link } from "expo-router"


export default function Login() {
  return (
    <View style={style.container}>
      <Image
        style={style.logoLogin}
        source={require("../assets/images/FlowBeat.png")}
      />
      <View>
        <View style={style.form}>
          <View>
            <View style={style.inputContainer}>
              <Text style={style.label}>Email</Text>
              <TextInput
                style={style.input}
                keyboardType="email-address"
                placeholder="E-mail"
              />
            </View>
            <View style={style.inputContainer}>
              <Text style={style.label}>Password</Text>
              <TextInput
                secureTextEntry={true}
                style={style.input}
                placeholder="Senha"
              />
            </View>
            <Text style={style.label}>Não possui cadastro? <Link href="./cadastro"><Text style={style.link}>Cadastre-se</Text></Link></Text>
            <Pressable><Text style={style.botao}>Sign Up</Text></Pressable>
          </View>
          </View>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#2E2E2E'
    },

    logoLogin : {
        resizeMode:'cover',
        width: 400,
        height: 300
    }, 
    form: {
        display: "flex",
        flexDirection: "column",
        alignItems: 'center',
        rowGap: 5,
        marginTop: 50,
    },
    input: {
        height: 40,
        margin: 15,
        borderWidth: 1,
        padding: 25,
        width: 350,
        borderRadius: 10,
        backgroundColor: '#FFF',
        fontSize: 15
    },

    link:{
      color: "#00ff43",
      textDecorationLine: "underline"
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
        height: 45,
        margin: 20,
        alignSelf: "center",
        textAlignVertical: "center"
    },

    label: {
        marginLeft: 12,
        color: "white"
    }
})