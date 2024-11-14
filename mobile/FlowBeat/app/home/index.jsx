import React, { useContext } from 'react';
import { AppContext } from '../../scripts/userContext.js';
import { View, StyleSheet } from 'react-native';
import Header from '../../components/Header.jsx';
import Perfil from '../perfil/perfil.jsx';

const Home = () => {
  return (
    <>
      <Header 
        titulo={'Bem vindo!'}
        LinkPerfil={"./perfil"}
      />
      <View style={style.container}>
      </View>
    </>
  );
};

export default Home;

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#2E2E2E'
  },

  logoLogin: {
    resizeMode: 'cover',
    width: 400,
    height: 300
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: 'center',
    rowGap: 5,
    marginTop: 10,
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

  link: {
    color: "#00ff43",
    textDecorationLine: "underline"
  },

  titleForm: {
    textAlign: "left",
    fontSize: 30,
    fontWeight: "bold",
  },
  inputContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "baseline"
  },
  botao: {
    backgroundColor: '#00ff43',
    borderRadius: 20,
    textAlign: 'center',
    padding: 5,
    color: '#FFF',
    width: 150,
    height: 45,
    margin: 20,
    alignSelf: "center",
    textAlignVertical: "center",
    marginTop: 80
  },

  label: {
    marginLeft: 12,
    color: "white"
  }
})