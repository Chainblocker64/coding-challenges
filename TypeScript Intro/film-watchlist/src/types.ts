export interface Watchable {
  readonly id: number;
  title: string;
  year: number;
}

export interface Film extends Watchable {
  watched: boolean;
  rating?: 1 | 2 | 3 | 4 | 5;
}

export interface Playlist {
  name: string;
  films: Film[];
}

export function formatFilm(film: Film): string {
  return `I have ${!film.watched ? "not " : ""}watched the movie ${film.title} from ${film.year} (ID MV-${film.id}).${film.rating ? " I would rate it " + film.rating + " out of 5." : ""}`;
}

export function getUnwatched(playlist: Playlist): Film[] {
  return playlist.films.filter((film) => film.watched);
}
