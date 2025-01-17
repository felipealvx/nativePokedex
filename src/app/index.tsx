import { Dimensions, FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { CaretRight, Fish, Gear, MagnifyingGlass } from "phosphor-react-native";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { fetchPokemons } from "./services/api";
import { PokemonListItem } from "./types/pokemon";
import Modal from "react-native-modal";
import Pokemon from "./pokemon/[id]";

const {height} = Dimensions.get('window');

export default function Index() {
  const [pokemons, setPokemons] = useState<PokemonListItem[]>([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState<string | null>(null)
  const [filteredPokemons, setFilteredPokemons] = useState<PokemonListItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleModal = (pokemonName?: string) => {
    if (pokemonName){
      setSelectedPokemon(pokemonName);
    }
    setModalVisible(!isModalVisible)
  };

  const randomPokemon = () => {
    if (pokemons.length === 0) return;

    const randomIndex = Math.floor(Math.random () * pokemons.length);

    const selected = pokemons[randomIndex];
    setSelectedPokemon(selected.name);

    setModalVisible(true);
  }

  useEffect(() => {
    const loadPokemons = async () => {
      const data = await fetchPokemons();
      const fetchPokemonsData: PokemonListItem[] = await Promise.all(
        data.map(async (item: {name: string; url: string}) => {
          const response = await fetch(item.url);
          const details = await response.json();

          return {
            name: item.name,
            image: details.sprites.other.home.front_default,
          };
        })
      );
      setPokemons(fetchPokemonsData);
    };
    loadPokemons();
  }, [])

  const handleSearch = (query: string) => {
    setSearchQuery(query);

    const filtered = pokemons.filter (pokemon => pokemon.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredPokemons(filtered)
  }

  return (
    <View style={ styles.container }>
      <View style={styles.header}>
        <Text style={styles.logo}>Pokedex</Text>
      </View>

      <Text style={styles.info}>
        Encontre seu pokemon pesquisando pelo nome ou por seu código pokédex.
      </Text>

      <View style={styles.inputContainer}>
        <MagnifyingGlass size={32} color="#fff"/>
        <TextInput 
        placeholder="Pesquise seu Pokemon!" 
        placeholderTextColor="#fff"
        value={searchQuery}
        onChangeText={handleSearch}
        style={styles.input} />
      </View>


      <View style={styles.content}>
        <Text style={styles.contentText}>
          Todos os Pokemons
        </Text>

        { filteredPokemons.length > 0 ? (
          <FlatList 
            data={pokemons && filteredPokemons}
            keyExtractor={(item) => item.name}
            renderItem={({item, index}) => (
              <TouchableOpacity style={styles.card} onPress={() => toggleModal(item.name)}>
                <View style={styles.cardInfo}>
                  <Image source={{uri: item.image}}
                  style={{width: 60, height: 60}} />
                  <View>
                    <Text style={{color: 'gray'}}>#{index + 1}</Text>
                    <Text style={{fontWeight: 'bold', textTransform: 'uppercase'}}>{item.name}</Text>
                  </View>
                </View>
                {/* <Link
                  href={{
                    pathname: "./pokemon/[id]",
                    params: {
                      id: "name",
                    },
                  }}> 
                </Link> */}
                <CaretRight size={25} color="gray"/>
              </TouchableOpacity>
            )}
          />
        ) : (
          <View style={styles.imgContainer}>
            <Image 
            style={styles.pikachuImage}
            source={require("../assets/pikachu.png")}/>
            <Text>QUE PENA! Pokemon não encontrado.</Text>
          </View>
        )}
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.buttonFooter} onPress={randomPokemon}>
          <Text style={styles.buttonText}>Conhecer um Pokemon</Text>
          <Fish size={32} color="#fff"/>
        </TouchableOpacity>
      </View>

      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => toggleModal()}
        swipeDirection={"down"}
        onSwipeComplete={() => toggleModal()}
        style={styles.modal}> 
        <View style={styles.modalContent}>
          <Pokemon name={selectedPokemon}/>
        </View>
      </Modal>
    </View>
  );
}

export const styles = StyleSheet.create ({
  container: {
    flex: 1,
    backgroundColor: '#252422',
  },
  header: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingTop: 20,
    justifyContent: 'space-between',
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  info: {
    color: '#fff',
    padding: 20,
  },
  inputContainer:{
    backgroundColor: "#403D39",
    marginHorizontal: 20,
    borderRadius: 4,
    flexDirection: 'row',
    padding: 10,
    gap: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    color: '#fff'
  },
  content: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    padding: 20,
  },
  footer: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#f2f2f2',
    padding: 20,
  },
  buttonFooter: {
    width: '100%',
    backgroundColor: '#403D39',
    padding: 14,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderRadius: 4,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 600,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#f1f1f1',
    alignItems: 'center',
    padding: 15,
    justifyContent: 'space-between',
    borderRadius: 4,
    marginBottom: 10,
  },
  cardInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,

  },
  contentText: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 20,
  },
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContent: {
    height: height*0.8,
    padding: 20,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  imgContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  pikachuImage: {
    width: 200,
    height: 200,
  },
});