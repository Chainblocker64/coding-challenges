"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_js_1 = require("./types.js");
const newPlaylist = {
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
    console.log((0, types_js_1.formatFilm)(film));
});
console.log(`Unwatched films from playlist "${newPlaylist.name}":`);
console.log((0, types_js_1.getUnwatched)(newPlaylist));
//# sourceMappingURL=main.js.map