import React, { useContext, useState } from 'react';
import { AppContext } from '../../scripts/userContext';
import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native';
import Header from '../../components/Header.jsx';

export default function Perfil() {
  const { dataUser, updateUser } = useContext(AppContext);
  const [newPassword, setNewPassword] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  if (!dataUser) {
    return (
      <View style={style.container}>
        <Text style={style.label}>Carregando...</Text>
      </View>
    );
  }

  const handlePasswordChange = async () => {
    try {
      const response = await fetch("http://localhost:8000/usuarios/updatePassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "*/*"
        },
        body: JSON.stringify({
          email: dataUser.email,
          newPassword: newPassword,
        })
      });

      const result = await response.json();

      if (response.ok) {
        alert('Senha atualizada com sucesso');
        updateUser({ ...dataUser, senha: newPassword });
        setIsEditing(false);
      } else {
        alert(result.message || 'Erro ao atualizar a senha');
      }
    } catch (error) {
      console.log(error);
      alert('Erro ao conectar ao servidor');
    }
  };

  return (
    <>
      <Header titulo={'Perfil'} />
      <View style={style.container}>
        <Text style={style.label}>Nome: {dataUser.nome}</Text>
        <Text style={style.label}>Sobrenome: {dataUser.sobreNome}</Text>
        <Text style={style.label}>Email: {dataUser.email}</Text>
        <Text style={style.label}>Senha: {dataUser.senha}</Text>

        {isEditing ? (
          <>
            <TextInput
              style={style.input}
              placeholder="Nova Senha"
              secureTextEntry={true}
              value={newPassword}
              onChangeText={setNewPassword}
            />
            <Pressable onPress={handlePasswordChange}>
              <Text style={style.botao}>Salvar</Text>
            </Pressable>
            <Pressable onPress={() => setIsEditing(false)}>
              <Text style={style.botao}>Cancelar</Text>
            </Pressable>
          </>
        ) : (
          <Pressable onPress={() => setIsEditing(true)}>
            <Text style={style.botao}>Editar Senha</Text>
          </Pressable>
        )}
      </View>
    </>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2E2E2E',
    padding: 20
  },
  label: {
    fontSize: 18,
    color: '#FFF',
    marginVertical: 10
  },
  input: {
    height: 40,
    margin: 15,
    borderWidth: 1,
    padding: 10,
    width: 350,
    borderRadius: 10,
    backgroundColor: '#FFF',
    fontSize: 15
  },
  botao: {
    backgroundColor: '#00ff43',
    borderRadius: 20,
    textAlign: 'center',
    padding: 10,
    color: '#FFF',
    width: 150,
    margin: 10,
    alignSelf: "center",
    textAlignVertical: "center"
  }
});