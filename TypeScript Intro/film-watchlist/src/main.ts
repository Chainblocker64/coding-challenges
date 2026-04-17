// src/main.ts
import type { Playlist } from "./types.js";
import { formatFilm, getUnwatched } from "./types.js";

const newPlaylist: Playlist = {
  name: "Some movies",
  films: [
    {
      id: 1,
      title: "The Dark Knight",
      year: 2008,
      watched: true,
      rating: 5,
    },
    {
      id: 2,
      title: "Shutter Island",
      year: 2018,
      watched: true,
    },
    {
      id: 3,
      title: "300",
      year: 2006,
      watched: false,
    },
  ],
};

newPlaylist.films.forEach((film) => {
  console.log(formatFilm(film));
});

console.log(`Unwatched films from playlist "${newPlaylist.name}":`);
console.log(getUnwatched(newPlaylist));
