import axios from "axios";
import { MovieApiResponse, MovieRequestParams } from "./types";
import useMovieStore from "@/store/useMovieSotre";

const API_ENDPOINT = "https://movie-database-alternative.p.rapidapi.com";
const API_KEY = "b957481432msh3b62100f3bb045ep19fc0ejsn704144e11e85";

class ApiService {
  private options: any;

  constructor() {
    this.options = {
      headers: {
        "x-rapidapi-key": API_KEY,
      },
    };
  }

  public getMovies = async ({ searchText, page = 1 }: MovieRequestParams) => {
    const url = `${API_ENDPOINT}/?s=${searchText}&r=json&page=${page}`;
    const response = await axios.get<MovieApiResponse>(url, this.options);
    useMovieStore.setState({ movies: response.data.Search });
    return response.data;
  };
}

export const apiService = new ApiService();
