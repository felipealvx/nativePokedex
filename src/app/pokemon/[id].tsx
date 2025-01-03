import { Image, StyleSheet, Text, View } from "react-native";

export default function Pokemon() {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image
                style={styles.img} 
                source={require("../../assets/bulbasaur.png")}/>
            </View>

            <View style={styles.titlePokemon}>
                <Text style={styles.namePokemon}>
                    Bulbasaur
                </Text>
                <Text style={{color: 'gray'}}>
                    POISON
                </Text>
            </View>

            <View style={styles.infoPokemon}>
                <View style={styles.info}>
                    <Text style={styles.infoText1}>6.92kg</Text>
                    <Text style={styles.infoText2}>Peso</Text>
                </View>
                <View style={styles.info}>
                    <Text style={styles.infoText1}>0.9m</Text>
                    <Text style={styles.infoText2}>Altura</Text>
                </View>
            </View>
            
            <Text style={styles.evolutionsTitle}>Evoluções</Text>

            <View style={styles.footer}>
                <View style={styles.footerCardContainer}>
                    <View style={styles.footerCard}>
                        <Image style={styles.img} source={require("../../assets/bulbasaur.png")}/>
                    </View>
                    <Text>Bulbasaur</Text>
                </View>
                <View style={styles.footerCardContainer}>
                    <View style={styles.footerCard}>
                        <Image style={styles.img} source={require("../../assets/bulbasaur.png")}/>
                    </View>
                    <Text>Bulbasaur</Text>
                </View>
                <View style={styles.footerCardContainer}>
                    <View style={styles.footerCard}>
                        <Image style={styles.img} source={require("../../assets/bulbasaur.png")}/>
                    </View>
                    <Text>Bulbasaur</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create ({
    container: {
        backgroundColor: '#fff',
        flex: 1,
        padding: 25,
    },
    header: { 
        backgroundColor: '#f6f6f6',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 25,
        borderRadius: 5,
    },
    img: {
        height: 70,
        width: 70,
    },
    titlePokemon: {
        marginVertical: 20,
    },
    namePokemon: {
        fontSize: 25,
        fontWeight: 'bold',
        color: "#1e1e1e"
    },
    infoPokemon: {
        flexDirection: 'row',
        gap: 20,
    },
    info: {
        padding: 25,
        borderWidth: 1,
        borderRadius: 4,
        borderColor: '#f2f2f2',
        justifyContent: 'center',
        alignItems: 'center',
    },
    infoText1: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    infoText2: {
        color: 'gray',
    },
    evolutionsTitle: {
        fontSize: 20, 
        fontWeight: 'bold', 
        marginVertical: 20,
        color: '#1e1e1e'
    },
    footer: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    footerCardContainer: {
        borderWidth: 1,
        padding: 5,
        borderRadius: 5,
        borderColor: '#c1c1c1',
        gap: 5,
    },
    footerCard: {
        backgroundColor: '#f6f6f6',
        padding: 8,
        borderWidth: 1,
        borderColor: '#f2f2f2',
        borderRadius: 2.5,
        alignItems: 'center',
        justifyContent: 'center',
    },
});