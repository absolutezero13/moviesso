import MovieList from "@/components/MovieList";
import Wrapper from "@/components/Wrapper";
import { Colors } from "@/constants/Colors";
import useFavoriteMovies from "@/store/useFavoriteMovies";
import { StyleSheet, Text, View } from "react-native";

export default function Favorites() {
  const { favoriteMovies } = useFavoriteMovies();
  return (
    <Wrapper>
      <Text style={styles.title}>Favorite Movies</Text>
      <MovieList
        data={favoriteMovies}
        listEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>
              You don't have any favorite movies yet 💔
            </Text>
          </View>
        }
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
  empty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    color: Colors.text,
    textAlign: "center",
    marginTop: 20,
    fontSize: 24,
    fontWeight: "bold",
  },
});
