import express from "express";
import nunjucks from "nunjucks";
import path from "path";
import blogData from "./blog-data.json";

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, "../public")));

const env = nunjucks.configure("src/views", {
  autoescape: true,
  express: app,
});

//Convert timestamps in blog data to readable dates
const blogPosts = blogData.map((post) => {
  const { createdAt, ...otherFields } = post;
  return {
    ...otherFields,
    createdAt: readableDate(new Date(createdAt * 1000)),
    urlSlug: slugifyTitle(post.title),
  };
});

app.get("/index.html", (req, res) => {
  res.render("index.html", {
    posts: blogPosts,
  });
});

app.get("/post.html", (req, res) => {
  res.render("sample-post.html");
});

//Convert post titles to slugs
app.get("/post/:urlSlug", (req, res) => {
  let post = {};

  blogPosts.forEach((blogPost) => {
    if (blogPost.urlSlug === req.params.urlSlug) {
      post = blogPost;
    }
  });
  res.render("post.html", {
    post: post,
  });
});

app.get("/contact.html", (req, res) => {
  res.render("contact.html");
});

app.get("/about.html", (req, res) => {
  res.render("about.html");
});

app.listen(port, () => {
  console.log(`Listening on Port ${port}`);
});

function readableDate(timestamp: Date): string {
  const formatter = new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
  });

  return formatter.format(timestamp);
}

function slugifyTitle(title: string): string {
  const regexp = "/^[a-z]+$/";
  //Remove everything from the title that is not a letter, number or space
  title = title.toLowerCase().replace(/[^a-z0-9\s]/g, "");
  //Replace spaces with hyphens
  title = title.replaceAll(" ", "-");
  return title;
}
