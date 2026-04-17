"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function describeTrack(track) {
    return `${track.title} by ${track.artist}`;
}
const tracks = [
    {
        id: 1,
        title: "Blue Lights",
        artist: "Jorja Smith",
        liked: true,
    },
    {
        id: 2,
        title: "Nights",
        artist: "Frank Ocean",
        liked: false,
    },
];
const label = "My library";
const trackCount = tracks.length;
function formatId(id) {
    return `TRK-${id}`;
}
const ids = tracks.map((t) => {
    return formatId(t.id);
});
console.log(ids, label, trackCount);
const pick = {
    id: 3,
    title: "Golden",
    artist: "Jill Scott",
    liked: true,
    curatedBy: "editorial",
    addedDate: "2024-01-15",
};
console.log(`${pick.title} — featured since ${pick.addedDate}`);
//# sourceMappingURL=index.js.map