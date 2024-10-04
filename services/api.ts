import axios from "axios";
import {
  MovieApiResponse,
  MovieDetail,
  MovieDetailApiResponse,
  MovieRequestParams,
} from "./types";

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
    return response.data;
  };

  public getMovieById = async (id: string) => {
    const url = `${API_ENDPOINT}/?i=${id}&r=json`;
    const response = await axios.get<MovieDetail>(url, this.options);
    return response.data;
  };
}

export const apiService = new ApiService();
