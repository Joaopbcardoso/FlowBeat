import { Text, View, StyleSheet, Image } from 'react-native';
import { Link } from 'expo-router';
import Perfil from '../app/perfil';

export default function Header({ titulo }) {
    return (
        <View style={styles.header}>
            <Text style={styles.titulo}>{titulo}</Text>
            <Link href="/perfil" style={styles.link}>
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center', 
        paddingHorizontal: 15, 
    },

    titulo: {
        color: '#fff',
        fontSize: 25,
        fontWeight: 'bold',
    },

    perfil: {
        width: 30,
        height: 30,
        backgroundColor: '#FFF',
        borderRadius: 100,
    },

    link: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
