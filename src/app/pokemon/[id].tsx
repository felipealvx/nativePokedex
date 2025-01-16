import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { api } from "../services/api";

interface Props {
    name?: string | null;
}

interface Evolution {
    name: string;
    image: string;
}

export default function Pokemon({name}: Props) {
    const [pokemon, setPokemon] = useState<any>(null);
    const [evolutions, setEvolutions] = useState<Evolution[]>([])

    useEffect(() => {
        const loadPokemon = async () => {
            const response = await api.get(`/pokemon/${name}`);
            setPokemon(response.data);
            const speciesURL = response.data.species.url;

            const speciesResponse = await api.get(speciesURL);
            const evolutionsURL = speciesResponse.data.evolution_chain.url;

            const evolutionResponse = await api.get(evolutionsURL);

            const evolutions = extractEvolution(evolutionResponse.data.chain);

            const evolutionImages = await Promise.all (
                evolutions.map(async (evoName) => {
                    const response = await api.get(`/pokemon/${evoName}`)
                    return {
                        name: evoName,
                        image: response.data.sprites.other.home.front_default,
                    };
                })
            )
            setEvolutions(evolutionImages);
        };
        loadPokemon();
    }, [name]);

    const extractEvolution= (chain: any): string[] => {
        const evolutions: string[] = [];
        let current = chain;
        while (current) {
            evolutions.push(current.species.name);
            current = current.evolves_to[0];
        }

        return evolutions;
    }

    if (!pokemon) {
        return <Text>OOOPS! Carregando informações do pokemon.</Text>
    }

    return (
        <View style={styles.container}>
            <View style={styles.headerContent}> 
                <View style={styles.header}>
                    <Image
                    style={styles.imgHeader} 
                    source={{uri: pokemon.sprites.other.home.front_default}}/>
                </View>
                <View style={styles.infosHeader}>
                    <View style={styles.titlePokemon}>
                        <Text style={styles.namePokemon}>
                            {name}
                        </Text>
                        <Text style={{color: 'gray', textTransform: 'uppercase'}}>
                            {pokemon.types.map((t: any) => t.type.name).join(' and ')}
                        </Text>
                    </View>

                    <View style={styles.infoPokemon}>
                        <View style={styles.info}>
                            <Text style={styles.infoText1}>{pokemon.weight / 10}kg</Text>
                            <Text style={styles.infoText2}>Peso</Text>
                        </View>
                        <View style={styles.info}>
                            <Text style={styles.infoText1}>{pokemon.height / 10}m</Text>
                            <Text style={styles.infoText2}>Altura</Text>
                        </View>
                    </View>
                </View>
            </View>
            
            <Text style={styles.evolutionsTitle}>Evoluções</Text>

            <View style={styles.footer}>
                {evolutions.map((evo, index) => (
                    <View key={index} style={styles.footerCardContainer}>
                        <View style={styles.footerCard}>
                            <Image style={styles.img} source={{uri: evo.image}}/>
                        </View>
                        <Text style={styles.footerTitle}>{evo.name}</Text>
                    </View>
                ))}
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
    headerContent: {
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        alignContent: 'space-between',
    },
    header: { 
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        height: 150,
        width: 100,
    },
    infosHeader: {
        justifyContent: 'space-between'
    },
    img: {
        height: 70,
        width: 70,
    },
    imgHeader: {
        position: 'absolute',
        bottom: -10,
        height: 200,
        width: 200,
    },
    titlePokemon: {
    },
    namePokemon: {
        fontSize: 25,
        fontWeight: 'bold',
        color: "#1e1e1e",
        textTransform: 'uppercase'
    },
    infoPokemon: {
        flexDirection: 'row',
        gap: 10,
    },
    info: {
        padding: 20,
        borderWidth: 1,
        borderRadius: 4,
        borderColor: '#f2f2f2',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.72)',
        // filter: 'blur(10)'
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
    footerTitle: {
        textTransform: 'capitalize'
    },
});