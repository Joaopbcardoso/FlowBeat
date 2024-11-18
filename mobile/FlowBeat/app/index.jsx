import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, Image } from 'react-native';
import { Link, router } from 'expo-router';
import { AppContext } from '../scripts/userContext'; 

export default function Login() {
  const [data, setData] = useState({
    email: '',
    senha: ''
  });
  const { updateUser } = useContext(AppContext);

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:8000/autenticacao/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "*/*"
        },
        body: JSON.stringify({
          "email": data.email,
          "senha": data.senha,
        })
      });

      const catchMessage = await response.json(); // Assume que a resposta é um JSON com os dados do usuário
      console.log(catchMessage); // Adicione esta linha para verificar o conteúdo da resposta

      if (response.ok) {
        const { userData } = catchMessage; // Acesse os dados do usuário a partir de userData
        updateUser({
          nome: userData.nome,
          sobreNome: userData.sobrenome,
          email: userData.email, // Use userData.email para garantir que está pegando do backend
          dataNascimento: userData.dataNascimento,
          senha: data.senha, // Adicione a senha aqui se necessário
        });

        router.navigate('/home');
      } else {
        alert(catchMessage.message || 'Erro ao fazer login');
        router.navigate('/');
      }

    } catch (error) {
      console.log(error);
      alert('Erro ao conectar ao servidor');
      router.navigate('/');
    }
  };

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
                value={data.email}
                onChangeText={(valor) => { setData({ ...data, email: valor }) }}
              />
            </View>
            <View style={style.inputContainer}>
              <Text style={style.label}>Password</Text>
              <TextInput
                secureTextEntry={true}
                style={style.input}
                placeholder="Senha"
                value={data.senha}
                onChangeText={(valor) => { setData({ ...data, senha: valor }) }}
              />
            </View>
            <Text style={style.label}>
              Não possui cadastro? <Link href="./cadastro"><Text style={style.link}>Cadastre-se</Text></Link>
            </Text>
            <Pressable onPress={handleLogin}><Text style={style.botao}>Sign Up</Text></Pressable>
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
});