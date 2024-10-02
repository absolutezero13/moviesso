import { Colors } from "@/constants/Colors";
import { apiService } from "@/services/api";
import { Movie } from "@/services/types";
import { useEffect, useState } from "react";
import { Image, StyleSheet, Platform, View, Text, Alert } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const [data, setData] = useState<Movie[]>([]);

  useEffect(() => {
    apiService
      .getMovies({
        searchText: "batman",
        page: 4,
      })
      .then((data) => {
        setData(data.Search);
      })
      .catch((error) => {
        Alert.alert("Error", error.message);
      });
  }, []);

  const Movie = ({ movie }: { movie: Movie }) => {
    return (
      <View style={styles.movie}>
        <Image source={{ uri: movie.Poster }} style={styles.poster} />
        <Text style={styles.movieTitle}>{movie.Title}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <Text style={styles.title}>Popular Movies</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.imdbID}
        renderItem={({ item }) => <Movie movie={item} />}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between", marginTop: 10 }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
    color: Colors.text,
  },
  poster: {
    width: 100,
    height: 150,
  },
  movie: {
    alignItems: "center",
    width: "48%",
    borderRadius: 10,
    padding: 10,
  },
  movieTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
    color: Colors.text,
    textAlign: "center",
    marginTop: 10,
  },
});
