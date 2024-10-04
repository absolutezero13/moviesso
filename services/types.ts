export interface Movie {
  Poster: string;
  Title: string;
  Type: string;
  Year: string;
  imdbID: string;
}

type MovieRating = {
  Source: string;
  Value: string;
};

export type MovieDetail = {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: MovieRating[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
};

export interface MovieApiResponse {
  Response: "True" | "False";
  Search: Movie[];
  totalResults: string;
}

export interface MovieDetailApiResponse {
  Response: "True" | "False";
  data: MovieDetail;
}

export type MovieRequestParams = {
  searchText: string;
  page?: number;
};
