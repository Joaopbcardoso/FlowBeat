import React from "react";
import { Slot, Stack } from "expo-router";
import { AppProvider } from "../scripts/userContext.js";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useRouter, usePathname } from "expo-router";

const CustomHeader = ({ titulo }) => {
  const router = useRouter();
  const pathname = usePathname(); // Obtém o caminho atual da rota

  // Define se o botão de voltar será exibido
  const hideBackButton = ["/", "/home"].includes(pathname);

  return (
    <View style={styles.header}>
      {/* Botão de voltar (aparece apenas se não estiver em "/", "/home") */}
      {!hideBackButton && (
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Image
            source={require("../assets/images/arrow_back.png")} // Imagem local
            style={styles.backImage}
          />
        </TouchableOpacity>
      )}

      {/* Título */} 
      <Text style={styles.title}>{titulo}</Text>

      {/* Botão de perfil */}
      <TouchableOpacity onPress={() => router.push("/perfil")} style={styles.profileButton}>
        <Image
          source={require("../assets/images/user.png")} // Imagem local
          style={styles.profileImage}
        />
      </TouchableOpacity>
    </View>
  );
};

const Layout = () => {
  const pathname = usePathname(); // Obtém o pathname atual

  // Defina os títulos personalizados para cada rota
  const customTitles = {
    "/": "Login",
    "/cadastro": "Cadastro",
    "/home": "Home",
    "/perfil": "Perfil do Usuário",
  };

  // Obtém o título correspondente à rota atual
  const titulo = customTitles[pathname] || "Página";

  return (
    <AppProvider>
      <Stack
        screenOptions={{
          header: () => <CustomHeader titulo={titulo} />, // Define o cabeçalho customizado
        }}
      >
        <Slot /> {/* Renderiza as páginas das rotas */}
      </Stack>
    </AppProvider>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#1B1616",
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  backButton: {
    marginRight: 15,
  },
  backImage: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  profileButton: {
    marginLeft: 15,
  },
  profileImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
});

export default Layout;
