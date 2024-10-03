import { Movie } from "@/services/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useFavoriteMovies = create(
  persist(
    () => ({
      favoriteMovies: [] as Movie[],
    }),
    {
      storage: createJSONStorage(() => AsyncStorage),
      name: "favorite-movies",
    }
  )
);

export default useFavoriteMovies;
