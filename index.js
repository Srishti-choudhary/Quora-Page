const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require('uuid');


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));



let posts = [
    {
        id: uuidv4(),
        username: "sr",
        content: "i love coding"
    },
    {
        id: uuidv4(),
        username: "srtt",
        content: "i love coding dsfefd"
    },
    {
        id: uuidv4(),
        username: "srtgrf",
        content: "i love coding rdvd dfber"
    },
];
app.get("/posts", (req, res) => {
    res.render("index.ejs", { posts });
})
app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
    console.log("post request working");
})
app.get("/posts/:id", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    console.log("post");
    res.render("show.ejs", { post });
})

app.post("/posts", (req, res) => {
    let { username, content } = req.body;
    let newId = uuidv4();
    posts.push({ newId, username, content });
    res.redirect("/posts");
})

app.patch("posts/:id", (req, res) => {
    let { id } = req.params;
    let newcontent = req.body.content;
    let post = posts.find((p) => id === p.id);
    post.content = newcontent;
    console.log(post);
    res.send("patch request working");
    req.redirect("/posts");
})


app.get("/posts/:id/edit", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs", { post });

})


app.delete("/posts/:id", (req, res) => {
    let { id } = req.params;
    posts = posts.filter((p) => id !== p.id);
    res.send("delete success");


})
app.listen(port, () => {
    console.log("listening to port:8080");
});
