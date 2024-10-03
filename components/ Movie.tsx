import { Colors } from "@/constants/Colors";
import { ASPECT_RATIO } from "@/constants/movie";
import { Movie as TMovie } from "@/services/types";
import { Link } from "expo-router";
import { FC } from "react";
import { Text, View, Image, StyleSheet, Dimensions } from "react-native";

type TMovieProps = {
  movie: TMovie;
};

const ITEM_WIDTH = (Dimensions.get("window").width - 20) / 2 - 20;

export const Movie: FC<TMovieProps> = ({ movie }) => {
  console.log(movie.Title, movie.Poster);
  return (
    <Link
      href={{
        pathname: "/movieDetail",
        params: { movieId: movie.imdbID },
      }}
    >
      <View style={styles.movie}>
        <Image source={{ uri: movie.Poster }} style={styles.poster} />
        <Text style={styles.movieTitle}>{movie.Title}</Text>
      </View>
    </Link>
  );
};

const styles = StyleSheet.create({
  poster: {
    width: ITEM_WIDTH,
    height: ITEM_WIDTH / ASPECT_RATIO,
    borderRadius: 20,
  },
  movie: {
    alignItems: "center",
    width: ITEM_WIDTH,
    borderRadius: 10,
    marginTop: 10,
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
