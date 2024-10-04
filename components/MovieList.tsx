import { Movie as TMovie } from "@/services/types";
import { FC } from "react";
import { FlatList } from "react-native-gesture-handler";
import { Movie } from "./ Movie";

interface Props {
  data: TMovie[];
  listEmptyComponent?: JSX.Element;
  onEndReached?: () => void;
}

const MovieList: FC<Props> = ({ data, listEmptyComponent, onEndReached }) => {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.imdbID}
      renderItem={({ item }) => <Movie movie={item} />}
      numColumns={3}
      columnWrapperStyle={{ marginTop: 10, gap: 20 }}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={listEmptyComponent}
      contentContainerStyle={{ flexGrow: 1 }}
      onEndReached={onEndReached}
      windowSize={5}
    />
  );
};

export default MovieList;
