import { Colors } from "@/constants/Colors";
import { apiService } from "@/services/api";
import { MovieDetail as TMovieDetail } from "@/services/types";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import {
  Image,
  Text,
  View,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;

const MovieDetail = () => {
  const [movie, setMovie] = useState<TMovieDetail | null>(null);
  const params = useLocalSearchParams<{ movieId: string }>();
  const navigation = useNavigation();

  useEffect(() => {
    apiService.getMovieById(params.movieId).then((data) => {
      setMovie(data);
    });
  }, []);

  useEffect(() => {
    navigation.setOptions({
      title: movie?.Title ?? "",
    });
  }, [movie]);

  if (!movie) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={Colors.text} />
      </View>
    );
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
        <Info label="Country" value={movie.Country} />
        <Info label="Director" value={movie.Director} />
        <Info label="Imdb Rating" value={movie.imdbRating} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: "center",
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
    flex: 1,
  },
  infos: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    borderRadius: 10,
    marginHorizontal: 20,
    padding: 10,
  },
  loading: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MovieDetail;
