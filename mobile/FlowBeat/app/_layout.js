import React from "react";
import { Slot, Stack } from "expo-router";
import { AppProvider } from "../scripts/userContext.js";
import { ArtistProvider } from "../scripts/artistContext.js"; // Importa o contexto de artista
import { AlbumProvider } from "../scripts/albunsContext.js"; // Importa o contexto de álbum
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useRouter, usePathname } from "expo-router";

const CustomHeader = ({ titulo }) => {
  const router = useRouter();
  const pathname = usePathname();

  const hideBackButton = ["/", "/home"].includes(pathname);

  return (
    <View style={styles.header}>
      {!hideBackButton && (
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Image
            source={require("../assets/images/arrow_back.png")}
            style={styles.backImage}
          />
        </TouchableOpacity>
      )}
      <Text style={styles.title}>{titulo}</Text>
      <TouchableOpacity onPress={() => router.push("/perfil")} style={styles.profileButton}>
        <Image
          source={require("../assets/images/user.png")}
          style={styles.profileImage}
        />
      </TouchableOpacity>
    </View>
  );
};

const Layout = () => {
  const pathname = usePathname();

  const customTitles = {
    "/": "Login",
    "/cadastro": "Cadastro",
    "/home": "Home",
    "/perfil": "Perfil do Usuário",
  };

  const titulo = customTitles[pathname] || "Página";

  return (
    <AppProvider>
      <ArtistProvider> 
        <AlbumProvider>
          <Stack
            screenOptions={{
              header: () => <CustomHeader titulo={titulo} />,
            }}
          >
            <Slot />
          </Stack>
        </AlbumProvider>
      </ArtistProvider>
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
