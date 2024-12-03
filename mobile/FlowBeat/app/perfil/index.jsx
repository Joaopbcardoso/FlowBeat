import React, { useState, useContext, useEffect } from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity, Pressable, Modal, TextInput } from 'react-native'
import { AppContext } from '../../scripts/userContext.js';
import * as ImagePicker from 'expo-image-picker';

export default function User() {
    const { foto, setFoto, dataUser, setDataUser, ngrok } = useContext(AppContext);
    const [image, setImage] = useState(foto || 'https://www.jet.ir/uploadFiles/avatar/noprofile.png');
    const [newImage, setNewImage] = useState(false);
    const [isModalLogoutOpen, setIsModalLogoutOpen] = useState(false);
    const [isModalPasswordOpen, setIsModalPasswordOpen] = useState(false);
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
        if (!dataUser || !dataUser.email) {
            alert('Dados do usuário não encontrados');
            return;
        }
    
        if (novaSenha !== confirmarNovaSenha) {
            alert('As senhas não coincidem');
            return;
        }
    
        try {
            const res = await fetch(`http://192.168.0.12:8000/updatePassword`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: dataUser.email,  
                    novaSenha: novaSenha,   
                }),
            });
    
            if (res.status === 200) {
                alert('Senha atualizada com sucesso');
                setIsModalPasswordOpen(false);
            } else {
                const errorResponse = await res.json();
                alert(errorResponse.message || 'Erro ao atualizar a senha');
            }
        } catch (error) {
            console.log(error);
            alert('Erro ao tentar alterar a senha');
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

                <Pressable onPress={() => setIsModalPasswordOpen(true)} style={styles.changeImageButton}>
                    <Text style={styles.changeImageText}>Trocar Senha</Text>
                </Pressable>
                <View>
                    <Pressable onPress={() => setIsModalLogoutOpen(true)}><Text >Logout</Text></Pressable>
                    <Image 
                        style={styles.logoutimg}
                        source={{uri: "../assets/images/logout.png"}}
                    />
                </View>
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={isModalPasswordOpen}
                onRequestClose={() => {
                    setIsModalOpen(!isModalPasswordOpen);
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
                        <Pressable onPress={!isModalLogoutOpen} >
                            <Text style={styles.cancel}>Cancelar</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            <Modal
                animationType="slide"
                transparent={true}
                visible={isModalLogoutOpen}
                onRequestClose={() => {
                    setIsModalOpen(!isModalOpen);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <TextInput
                            placeholder='Tem certeza que deseja sair da sua conta?'
                            style={styles.inputTextBox}
                            onChangeText={setConfirmarNovaSenha}
                            value={confirmarNovaSenha}
                            secureTextEntry={true}
                        />
                        <Pressable onPress={!isModalLogoutOpen}>
                            <Text style={styles.cancel}>Cancelar</Text>
                        </Pressable>
                        <Pressable onPress={handleChangePassword} style={styles.changeImageText}>
                            <Text >Sim</Text>
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
    borderColor: '#00ff43',
    marginBottom: 20,
  },
  changeImageButton: {
    backgroundColor: '#00ff43',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginVertical: 15,
  },
  cancel: {
    backgroundColor: '#FF0033',
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