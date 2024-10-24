import React, {useState} from "react";
import { View, Text, StyleSheet, TextInput, Pressable, Image, ScrollView } from "react-native";
import { Link } from "expo-router"

export default function Login() {
    const [data, setData] = useState({
        nome: '',
        sobreNome: '',
        email: '',
        senha: '',
        dataNascimento: ''
    });

    const handleSignup = async () =>{
        try{
            const response = await fetch("http://localhost:8000/registro",{
                method: "POST",
                headers:{
                    "Content-Type": "application/json",
                    "Accept":"*/*"
                },
                body: JSON.stringify({
                    "nome": data.nome,
                    "sobrenome": data.sobreNome,
                    "email": data.email,
                    "senha": data.senha,
                    "dataNascimento": data.dataNascimento
                })
            })
            const catchMessage = await response.text()
            alert(catchMessage)

        }catch(error){
            alert("Erro ao cadastrar novo usuário");
            console.log(error);
        }
    }

  return (
    <ScrollView style={style.container}>
      <Image
        style={style.logoLogin}
        source={require("../../assets/images/FlowBeat.png")}
      />
      <View style={style.form}>
        <Text style={style.titleForm}>Cadastrar</Text>
        
        <View style={style.inputContainer}>
          <Text style={style.label}>Nome</Text>
          <TextInput
           style={style.input} 
           placeholder="Nome" 
           value={data.nome}
           onChangeText={(valor)=>{setData({ ...data, nome: valor})}}
           />
        </View>

        <View style={style.inputContainer}>
          <Text style={style.label}>Sobrenome</Text>
          <TextInput 
            style={style.input} 
            placeholder="Sobrenome" 
            value={data.sobreNome}
            onChangeText={(valor)=>{setData({ ...data, sobreNome: valor})}}           
            />
        </View>

        <View style={style.inputContainer}>
          <Text style={style.label}>Email</Text>
          <TextInput
            style={style.input}
            keyboardType="email-address"
            placeholder="E-mail"
            value={data.email}
            onChangeText={(valor)=>{setData({ ...data, email: valor})}}
          />
        </View>

        <View style={style.inputContainer}>
          <Text style={style.label}>Senha</Text>
          <TextInput
            secureTextEntry={true}
            style={style.input}
            placeholder="Senha"
            value={data.senha}
            onChangeText={(valor)=>{setData({ ...data, senha: valor})}}
          />
        </View>

        <View style={style.inputContainer}>
          <Text style={style.label}>Data de Nascimento</Text>
          <TextInput
            style={style.input}
            placeholder="Data de Nascimento"
            value={data.dataNascimento}
            onChangeText={(valor)=>{setData({ ...data, dataNascimento: valor})}}
          />
        </View>
        <Text style={style.label}>Já possui cadastro? Fazer <Link href="/"><Text style={style.link}>Login</Text></Link></Text>
        <Pressable onPress={handleSignup}>
          <Text style={style.botao}>Sign Up</Text>
        </Pressable>
      </View>
      
    </ScrollView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2E2E2E',
  },

  logoLogin: {
    resizeMode: 'cover',
    width: 400,
    height: 300,
    alignSelf: 'center', // Centraliza a imagem dentro da ScrollView
  },
  
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: 'center', // Centraliza o conteúdo do formulário
    rowGap: 10,
    paddingBottom: 20, // Adiciona um pouco de espaço na parte inferior
  },

  input: {
    height: 40,
    margin: 15,
    borderWidth: 1,
    padding: 10,
    width: 350,
    borderRadius: 10,
    backgroundColor: '#FFF',
    fontSize: 15,
  },

  link:{
    color:'#00ff43',
    textDecorationLine: 'underline'
  },

  titleForm: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
    color: 'white',
  },

  inputContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },

  botao: {
    backgroundColor: '#00ff43',
    borderRadius: 3,
    textAlign: 'center',
    padding: 10,
    color: '#FFF', 
    width: 150,
    margin: 10,
    alignSelf: "center"
  },

  label: {
    marginLeft: 12,
    color: "white",
  },
});
