"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatFilm = formatFilm;
exports.getUnwatched = getUnwatched;
function formatFilm(film) {
    return `I have ${!film.watched ? "not " : ""}watched the movie ${film.title} from ${film.year} (ID MV-${film.id}).${film.rating ? " I would rate it " + film.rating + " out of 5." : ""}`;
}
function getUnwatched(playlist) {
    return playlist.films.filter((film) => film.watched);
}
//# sourceMappingURL=types.js.map