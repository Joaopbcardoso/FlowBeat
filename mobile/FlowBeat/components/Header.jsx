import { Text, View, StyleSheet, Image } from 'react-native';
import { Link } from 'expo-router';

export default function Header({ titulo, linkPerfil }) {
    return (
        <View style={styles.header}>
            <Text style={styles.titulo}>{titulo}</Text>
            <Link href={`${linkPerfil}`}>
                <Image 
                    source={require('../assets/images/user.png')}
                    style={styles.perfil}
                />
            </Link>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#1B1616',
        height: '10%',
        width: '100%',
        display: 'flex',
        flexDirection: 'row', // Dispor os itens na horizontal
        justifyContent: 'space-between', // Espaço entre o título e o perfil
        alignItems: 'center', // Alinha verticalmente no centro
        paddingHorizontal: 10, // Adiciona espaçamento nas laterais
    },

    titulo: {
        color: '#fff',
        fontSize: 25,
        fontWeight: 'bold',
    },

    perfil: {
        width: 25,
        height: 25,
        backgroundColor: '#FFF',
        borderRadius: 100,
    }
});
