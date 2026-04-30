import express from "express";
import nunjucks from "nunjucks";
const app = express();
const port = 3000;
const events = [
    {
        name: "React Conf",
        date: "June 10, 2025",
        location: "Berlin",
        soldOut: false,
    },
    {
        name: "Vue.js Summit",
        date: "July 2, 2025",
        location: "Amsterdam",
        soldOut: true,
    },
    {
        name: "Node.js Interactive",
        date: "August 15, 2025",
        location: "London",
        soldOut: false,
    },
];
nunjucks.configure("views", {
    autoescape: true,
    express: app,
});
app.get("/", (req, res) => {
    res.render("index.html");
});
app.get("/events", (req, res) => {
    res.render("events.html", { events: events });
});
/**
 * Dynamic Routing
 *
app.get("/:view", (req, res) => {
  const view = req.params.view || "";

  if (!view) {
    return;
  }

  res.render(`${view}.html`);
});
*/
app.listen(port, (error) => {
    console.log(`Listening on port ${port}`);
});
//# sourceMappingURL=index.js.map