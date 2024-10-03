import { Colors } from "@/constants/Colors";
import { ASPECT_RATIO } from "@/constants/movie";
import { Movie as TMovie } from "@/services/types";
import useFavoriteMovies from "@/store/useFavoriteMovies";
import { Link } from "expo-router";
import { FC, useState } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  Dimensions,
  Pressable,
} from "react-native";

type TMovieProps = {
  movie: TMovie;
};

const ITEM_WIDTH = (Dimensions.get("window").width - 80) / 3;

const PLACEHOLDER_IMAGE = "https://via.placeholder.com/300";

export const Movie: FC<TMovieProps> = ({ movie }) => {
  const { favoriteMovies } = useFavoriteMovies();
  const [error, setError] = useState(false);

  const onFavoritePress = () => {
    if (favoriteMovies.find((m) => m.imdbID === movie.imdbID)) {
      useFavoriteMovies.setState({
        favoriteMovies: favoriteMovies.filter((m) => m.imdbID !== movie.imdbID),
      });
    } else {
      useFavoriteMovies.setState({
        favoriteMovies: [...favoriteMovies, movie],
      });
    }
  };

  const isFavorite = favoriteMovies.find((m) => m.imdbID === movie.imdbID);

  return (
    <Link
      href={{
        pathname: "/movieDetail",
        params: { movieId: movie.imdbID },
      }}
    >
      <View style={styles.movie}>
        <Image
          onError={() => setError(true)}
          source={{ uri: error ? PLACEHOLDER_IMAGE : movie.Poster }}
          style={styles.poster}
        />
        <Text numberOfLines={3} style={styles.movieTitle}>
          {movie.Title}
        </Text>
        <Pressable style={styles.fav} onPress={onFavoritePress}>
          <Text style={styles.heart}>{isFavorite ? "❤️" : "🤍"}</Text>
        </Pressable>
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
    fontSize: 12,
    fontWeight: "bold",
    marginLeft: 10,
    color: Colors.text,
    textAlign: "center",
    marginTop: 10,
  },
  fav: {
    position: "absolute",
    top: ITEM_WIDTH / ASPECT_RATIO - 45,
    right: 5,
    width: 40,
    height: 40,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  heart: {
    color: Colors.background,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    alignSelf: "center",
  },
});
