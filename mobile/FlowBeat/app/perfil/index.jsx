import React, { useState, useContext, useEffect } from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity, Pressable, Modal, TextInput } from 'react-native'
import { AppContext } from '../../scripts/userContext.js';
import * as ImagePicker from 'expo-image-picker';

export default function User() {
    const { foto, setFoto, dataUser, setDataUser, ngrok } = useContext(AppContext);
    const [image, setImage] = useState(foto || 'https://www.jet.ir/uploadFiles/avatar/noprofile.png');
    const [newImage, setNewImage] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [novaSenha, setNovaSenha] = useState('');
    const [confirmarNovaSenha, setConfirmarNovaSenha] = useState('');

    useEffect(() => {
        if (dataUser && dataUser.profile_image) {
            setImage(dataUser.profile_image);
        }
    }, [dataUser]);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.canceled) {
            setImage(result.assets[0].uri);
            setNewImage(true);
        }
    };

    const handleSendImage = async () => {
        try {
            const data = {
                "file": image,
                "upload_preset": 'ml_default',
            }
            const res = await fetch('https://api.cloudinary.com/v1_1/dykauix6q/upload', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const result = await res.json();
            setImage(result.url);
            setDataUser({ ...dataUser, profile_image: result.url });
            await saveNewImageURLonBackend(result);
        } catch (e) {
            console.log(e);
        }
    };

    const saveNewImageURLonBackend = async (result) => {
        try {
            const response = await fetch(`${ngrok}/usuarios/setfoto`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ foto: result.url, email: dataUser.email })
            });
            if (response.ok) {
                alert('Imagem de perfil atualizada com sucesso');
            } else {
                alert('Erro ao atualizar a imagem');
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleChangePassword = async () => {
        if (novaSenha !== confirmarNovaSenha) {
            alert('As senhas não coincidem');
            return;
        }
        const res = await fetch(`${ngrok}/usuarios/atualiza`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: dataUser.email, senha: novaSenha })
        });
        if (res.status === 200) {
            alert('Senha trocada com sucesso');
            setIsModalOpen(false);
        } else {
            alert('Houve um erro ao trocar a senha');
            setIsModalOpen(false);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.profileContainer}>
                <TouchableOpacity onPress={pickImage}>
                    <Image
                        style={styles.logo}
                        source={{ uri: image }}
                    />
                </TouchableOpacity>

                {newImage && (
                    <Pressable onPress={handleSendImage} style={styles.changeImageButton}>
                        <Text style={styles.changeImageText}>Trocar Imagem</Text>
                    </Pressable>
                )}

                <View style={styles.userInfoContainer}>
                    <Text style={styles.infoText}>Nome: {dataUser?.nome}</Text>
                    <Text style={styles.infoText}>Email: {dataUser?.email}</Text>
                </View>

                <Pressable onPress={() => setIsModalOpen(true)} style={styles.changeImageButton}>
                    <Text style={styles.changeImageText}>Trocar Senha</Text>
                </Pressable>
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={isModalOpen}
                onRequestClose={() => {
                    setIsModalOpen(!isModalOpen);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <TextInput
                            placeholder='Nova senha'
                            style={styles.inputTextBox}
                            onChangeText={setNovaSenha}
                            value={novaSenha}
                            secureTextEntry={true}
                        />
                        <TextInput
                            placeholder='Confirmar nova senha'
                            style={styles.inputTextBox}
                            onChangeText={setConfirmarNovaSenha}
                            value={confirmarNovaSenha}
                            secureTextEntry={true}
                        />
                        <Pressable onPress={handleChangePassword} style={styles.changeImageButton}>
                            <Text style={styles.changeImageText}>Alterar Senha</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: '#2E2E2E',
    paddingTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%'
  },
  profileContainer: { 
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingVertical: 30,
    backgroundColor: '#2E2E2E',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    padding: 20,
    alignSelf: 'stretch',
    maxWidth: 400,
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#FF8746',
    marginBottom: 20,
  },
  changeImageButton: {
    backgroundColor: '#FF8746',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginVertical: 15,
  },
  changeImageText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  userInfoContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  infoText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 5,
  },
  inputTextBox: {
    backgroundColor: 'antiquewhite',
    margin: 10,
    padding: 10,
    borderRadius: 10,
    placeholderTextColor: 'lightgray',
    width: '85%',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,   

    shadowRadius: 4,
    elevation:   
 5,
    backgroundColor: 'F7F7F7',
  },
});