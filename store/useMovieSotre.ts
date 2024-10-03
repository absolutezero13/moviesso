import { Movie } from "@/services/types";
import { create } from "zustand";

interface MovieStore {
  movies: Movie[];
}

const useMovieStore = create<MovieStore>((set) => ({
  movies: [],
}));

export default useMovieStore;
