export interface Movie {
  Poster: string;
  Title: string;
  Type: string;
  Year: string;
  imdbID: string;
}

export interface MovieApiResponse {
  Response: "True" | "False";
  Search: Movie[];
  totalResults: string;
}

export type MovieRequestParams = {
  searchText: string;
  page?: number;
};
