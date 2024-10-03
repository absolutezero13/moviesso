import { Movie } from "@/components/ Movie";
import MovieList from "@/components/MovieList";
import Wrapper from "@/components/Wrapper";
import { Colors } from "@/constants/Colors";
import { apiService } from "@/services/api";
import useMovieStore from "@/store/useMovieSotre";
import { useEffect, useRef, useState } from "react";
import { StyleSheet, View, Text, Alert, ActivityIndicator } from "react-native";
import { FlatList, TextInput } from "react-native-gesture-handler";

const INITIAL_SEARCH_TEXT = "batman";

export default function HomeScreen() {
  const { movies } = useMovieStore();
  const textRef = useRef<string>("");
  const timeoutIdRef = useRef<NodeJS.Timeout>();

  const [loading, setLoading] = useState(false);

  const getMovies = async (searchText?: string) => {
    setLoading(true);
    try {
      await apiService.getMovies({
        searchText: searchText ?? INITIAL_SEARCH_TEXT,
      });
    } catch (error) {
      Alert.alert("Something went wrong, please try again later");
    } finally {
      setLoading(false);
    }
  };

  const onChangeText = (text: string) => {
    textRef.current = text;

    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
    }

    timeoutIdRef.current = setTimeout(() => {
      getMovies(textRef.current);
    }, 500);
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <Wrapper>
      <Text style={styles.title}>Popular Movies</Text>
      <TextInput
        placeholder="Search for a movie"
        style={styles.input}
        placeholderTextColor={Colors.text}
        onChangeText={onChangeText}
        autoComplete="off"
        autoCapitalize="none"
      />
      {loading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={styles.loadingText}>Searching for movies 🍿🔍</Text>
          <ActivityIndicator size="large" color={Colors.text} />
        </View>
      ) : (
        <MovieList
          data={movies}
          listEmptyComponent={
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>
                No movies found for this search 😢
              </Text>
            </View>
          }
        />
      )}
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
  input: {
    backgroundColor: Colors.background,
    color: Colors.text,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 10,
    borderColor: Colors.text,
  },
  emptyState: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  emptyStateText: {
    color: Colors.text,
    textAlign: "center",
    marginTop: 20,
    fontSize: 24,
    fontWeight: "bold",
  },
  loadingText: {
    color: Colors.text,
    marginBottom: 10,
    fontSize: 24,
    fontWeight: "bold",
  },
});
