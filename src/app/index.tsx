import { Image, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { CaretRight, Fish, Gear, MagnifyingGlass } from "phosphor-react-native";
import { Link } from "expo-router";

export default function Index() {
  return (
    <View style={ styles.container }>
      <View style={styles.header}>
        <Text style={styles.logo}>Pokedex</Text>
        <Gear size={32} color="#fff"/>
      </View>

      <Text style={styles.info}>
        Encontre seu pokemon pesquisando pelo nome ou por seu código pokédex.
      </Text>

      <View style={styles.inputContainer}>
        <MagnifyingGlass size={32} color="#fff"/>
        <TextInput 
        placeholder="Pesquise seu Pokemon!" 
        placeholderTextColor="#fff"
        style={styles.input} />
      </View>

      <View style={styles.content}>
        <Text style={styles.contentText}>
          Todos os Pokemons
        </Text>
        <View style={styles.card}>
          <View style={styles.cardInfo}>
            <Image source={require("../assets/bulbasaur.png")}/>
            <View>
              <Text style={{color: 'gray'}}>#001</Text>
              <Text style={{fontWeight: 'bold'}}>Bulbasaur</Text>
            </View>
          </View>
          <Link
            href={{
              pathname: "./pokemon/[id]",
              params: {
                id: "name",
              },
            }}> 
            <CaretRight size={32} />
          </Link>
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.buttonFooter}>
          <Text style={styles.buttonText}>Conhecer um Pokemon</Text>
          <Fish size={32} color="#fff"/>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export const styles = StyleSheet.create ({
  container: {
    flex: 1,
    backgroundColor: '#f7776a',
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
    backgroundColor: "#f98e80",
    marginHorizontal: 20,
    borderRadius: 4,
    flexDirection: 'row',
    padding: 10,
    gap: 15,
    alignItems: 'center',
    marginBottom: 25,
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
    backgroundColor: '#f7776a',
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
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 15,
    elevation: 5,
    justifyContent: 'space-between',
    borderRadius: 4,
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
  }
});