import { Colors } from "@/constants/Colors";
import useMovieStore from "@/store/useMovieSotre";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect } from "react";
import { Image, Text, View, StyleSheet, Dimensions } from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;

const MovieDetail = () => {
  const { movies } = useMovieStore();
  const params = useLocalSearchParams<{ movieId: string }>();
  const navigation = useNavigation();

  const movie = movies.find((movie) => movie.imdbID === params.movieId);

  useEffect(() => {
    navigation.setOptions({
      title: movie?.Title ?? "Movie",
    });
  }, []);

  if (!movie) {
    return null;
  }

  const Info = ({ label, value }: { label: string; value: string }) => {
    return (
      <View style={styles.info}>
        <Text style={styles.label}>{label}: </Text>
        <Text style={styles.value}>{value}</Text>
      </View>
    );
  };

  return (
    <View style={styles.wrapper}>
      <Image
        source={{ uri: movie.Poster }}
        style={styles.poster}
        resizeMode="cover"
      />
      <View style={styles.infos}>
        <Info label="Title" value={movie.Title} />
        <Info label="Year" value={movie.Year} />
        <Info label="Type" value={movie.Type} />
        <Info label="IMDB ID" value={movie.imdbID} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  poster: {
    width: SCREEN_WIDTH,
    height: Dimensions.get("window").height,
    opacity: 0.2,
    position: "absolute",
  },
  info: {
    flexDirection: "row",
    padding: 10,
  },
  label: {
    color: Colors.text,
    fontWeight: "bold",
    fontSize: 20,
  },
  value: {
    color: Colors.text,
    fontSize: 20,
  },
  infos: {
    marginTop: 20,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    borderRadius: 10,
    marginHorizontal: 20,
    padding: 10,
  },
});

export default MovieDetail;
