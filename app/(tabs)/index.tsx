import { Movie } from "@/components/ Movie";
import Wrapper from "@/components/Wrapper";
import { Colors } from "@/constants/Colors";
import { apiService } from "@/services/api";
import { Movie as TMovie } from "@/services/types";
import useMovieStore from "@/store/useMovieSotre";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Image, StyleSheet, Platform, View, Text, Alert } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const { movies } = useMovieStore();
  const getMovies = async () => {
    try {
      await apiService.getMovies({
        searchText: "batman",
        page: 4,
      });
    } catch (error) {
      Alert.alert("Error");
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <Wrapper>
      <Text style={styles.title}>Popular Movies</Text>
      <FlatList
        data={movies}
        keyExtractor={(item) => item.imdbID}
        renderItem={({ item }) => <Movie movie={item} />}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between", marginTop: 10 }}
        showsVerticalScrollIndicator={false}
      />
    </Wrapper>
  );
}

const styles = StyleSheet.create({
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
