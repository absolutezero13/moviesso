import { Movie } from "@/components/ Movie";
import MovieList from "@/components/MovieList";
import Wrapper from "@/components/Wrapper";
import { Colors } from "@/constants/Colors";
import { apiService } from "@/services/api";
import useMovieStore from "@/store/useMovieSotre";
import Checkbox from "expo-checkbox";
import { useEffect, useRef, useState } from "react";
import { StyleSheet, View, Text, Alert, ActivityIndicator } from "react-native";
import { TextInput } from "react-native-gesture-handler";

const INITIAL_SEARCH_TEXT = "superman";

export default function HomeScreen() {
  const { movies } = useMovieStore();
  const textRef = useRef<string>("");
  const timeoutIdRef = useRef<NodeJS.Timeout>();
  const pageRef = useRef(1);
  const isFetchingRef = useRef(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [showMovies, setShowMovies] = useState(true);
  const [showSeries, setShowSeries] = useState(true);

  const filteredMovies = movies.filter((movie) => {
    if (showMovies && showSeries) {
      return true;
    }

    if (!showMovies && !showSeries) {
      return true;
    }

    if (showMovies) {
      return movie.Type === "movie";
    }

    if (showSeries) {
      return movie.Type === "series";
    }

    return false;
  });

  const getMovies = async (searchText: string, page = 1) => {
    setError(false);
    if (isFetchingRef.current) {
      return;
    }
    setLoading(true);
    try {
      const data = await apiService.getMovies({
        searchText,
        page,
      });

      if (!data.Search) {
        throw new Error("No movies found");
      }

      console.log(data.Search);

      useMovieStore.setState({
        movies: [...movies, ...data.Search],
      });
    } catch (error) {
      useMovieStore.setState({ movies: [] });
      if (page === 1) {
        setError(true);
      }
    } finally {
      isFetchingRef.current = false;
      setLoading(false);
    }
  };

  const onChangeText = (text: string) => {
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
    }
    pageRef.current = 1;
    textRef.current = text;
    if (text.length < 2) {
      return;
    }

    timeoutIdRef.current = setTimeout(() => {
      getMovies(textRef.current);
    }, 500);
  };

  const onEndReached = () => {
    if (loading) {
      return;
    }
    getMovies(textRef.current || INITIAL_SEARCH_TEXT, pageRef.current + 1);
    pageRef.current++;
  };
  useEffect(() => {
    getMovies(INITIAL_SEARCH_TEXT);
  }, []);

  const shouldRenderLoading = loading && pageRef.current === 1;
  const shouldRenderBottomLoading = loading && pageRef.current > 1;

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
      <View style={{ flexDirection: "row", gap: 10, marginVertical: 10 }}>
        <Text style={styles.checkbox}>Movies</Text>
        <Checkbox
          color={Colors.main}
          value={showMovies}
          onValueChange={setShowMovies}
        />
        <Text style={styles.checkbox}>Series</Text>
        <Checkbox
          color={Colors.main}
          value={showSeries}
          onValueChange={setShowSeries}
        />
      </View>

      {error && (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={styles.loadingText}>
            An error occurred while fetching movies 😢
          </Text>
        </View>
      )}

      {shouldRenderLoading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={styles.loadingText}>Searching for movies 🍿🔍</Text>
          <ActivityIndicator size="large" color={Colors.text} />
        </View>
      ) : null}

      {!shouldRenderLoading && !error && (
        <MovieList
          data={filteredMovies}
          onEndReached={onEndReached}
          listEmptyComponent={
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>
                No movies found for this search 😢
              </Text>
            </View>
          }
        />
      )}
      {shouldRenderBottomLoading && (
        <View style={{ position: "absolute", bottom: 0, alignSelf: "center" }}>
          <ActivityIndicator size="large" color={Colors.text} />
        </View>
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
    textAlign: "center",
  },
  checkbox: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: "500",
  },
});
